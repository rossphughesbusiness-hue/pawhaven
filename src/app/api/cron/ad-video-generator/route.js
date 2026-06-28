/**
 * GET /api/cron/ad-video-generator
 * Runs every Sunday at 07:00 UTC.
 *
 * 1. Reads top 3 products by revenue from Redis (keys: "revenue:{slug}")
 * 2. Skips any product that already has an ad generated this month
 *    (Redis key: "ad_video:{slug}:{YYYY-MM}")
 * 3. Generates a 5-second ad video via Runway gen4_turbo using the product's hero image
 * 4. Uploads the video to Cloudflare R2 (S3-compatible)
 * 5. Emails rossphughes@gmail.com with video links + ad copy variants for 3 platforms
 *
 * Required env vars:
 *   RUNWAY_API_KEY        — from dev.runwayml.com
 *   CLOUDFLARE_R2_ACCOUNT_ID
 *   CLOUDFLARE_R2_ACCESS_KEY_ID
 *   CLOUDFLARE_R2_SECRET_ACCESS_KEY
 *   CLOUDFLARE_R2_BUCKET_NAME
 *   CLOUDFLARE_R2_PUBLIC_URL  — e.g. https://pub-xxxx.r2.dev (or custom domain)
 *   RESEND_API_KEY        — already set
 *   UPSTASH_REDIS_REST_URL — already set
 *   UPSTASH_REDIS_REST_TOKEN — already set
 *   CRON_SECRET           — already set (any random string)
 */

import { NextResponse } from 'next/server';
import { products } from '@/lib/products';

const ADMIN_EMAIL = 'rossphughes@gmail.com';

// ─── Redis helpers ──────────────────────────────────────────────────────────────

async function redisGet(key) {
  const res = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
  });
  const json = await res.json();
  return json.result ?? null;
}

async function redisSet(key, value, exSeconds = null) {
  const url = exSeconds
    ? `${process.env.UPSTASH_REDIS_REST_URL}/set/${encodeURIComponent(key)}/${encodeURIComponent(value)}/EX/${exSeconds}`
    : `${process.env.UPSTASH_REDIS_REST_URL}/set/${encodeURIComponent(key)}/${encodeURIComponent(value)}`;
  await fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
  });
}

async function redisKeys(pattern) {
  const res = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/keys/${encodeURIComponent(pattern)}`, {
    headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
  });
  const json = await res.json();
  return json.result ?? [];
}

// ─── Get top N products by revenue ─────────────────────────────────────────────

async function getTopProductsByRevenue(n = 3) {
  // Revenue is tracked as "revenue:{slug}" keys (set by Stripe webhook per order)
  // Each key holds a number (total revenue in cents for that product)
  const keys = await redisKeys('revenue:*');
  if (!keys.length) {
    // Fallback: return the 3 highest-rated products if no revenue data yet
    return products
      .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
      .slice(0, n);
  }

  const entries = await Promise.all(
    keys.map(async (key) => {
      const slug = key.replace('revenue:', '');
      const revenue = parseInt(await redisGet(key) || '0', 10);
      return { slug, revenue };
    })
  );

  entries.sort((a, b) => b.revenue - a.revenue);
  const topSlugs = entries.slice(0, n).map(e => e.slug);
  return topSlugs.map(slug => products.find(p => p.slug === slug)).filter(Boolean);
}

// ─── Build Runway prompt for a product ─────────────────────────────────────────

function buildRunwayPrompt(product) {
  const promptMap = {
    'calming-lick-mat': `Slow cinematic close-up of a golden retriever's tongue rhythmically licking a blue silicone lick mat spread with smooth peanut butter. The dog's eyes are half-closed in deep contentment, ears relaxed. Warm late-afternoon sunlight streams through a window casting a golden glow. Camera slowly pulls back to reveal a dog lying on a cozy rug, completely at peace. No text. 5 seconds. Cinematic, 4K quality.`,
    'dog-snuffle-mat': `Overhead and ground-level shots of a border collie mix nose-diving into a lush green snuffle mat, sniffing deeply through fleece strips with intense focus. Dog's nose twitches rapidly, ears perked — pure foraging instinct. Warm natural light, shallow depth of field. Camera sweeps low across mat surface. No text overlays. 5 seconds.`,
    'cat-puzzle-slow-feeder': `Playful close-up footage of a tabby cat using one precise paw to fish kibble from a turquoise puzzle feeder with rotating chambers. The cat's eyes are wide and focused — hunting mode activated. Warm kitchen light, shallow focus. Camera slowly circles feeder as cat works. No text. 5 seconds. Real cat, cinematic quality.`,
    'self-cleaning-slicker-brush': `Satisfying footage of a fluffy golden doodle being brushed with a self-cleaning slicker brush — fur flowing and lifting in slow motion. A hand presses release button mid-video and a neat clump of fur pops free. The dog looks blissful. Late afternoon golden hour light. No text. 5 seconds.`,
    'dog-water-bottle-leakproof': `Outdoor adventure footage of a labrador on a sunny trail drinking from an orange squeezable dog water bottle. Owner squeezes, water fills built-in trough, dog laps enthusiastically, water catching the light. After drinking, owner tips trough back — zero drips. No text. 5 seconds. Vivid, energetic.`,
    'maze-slow-feeder-bowl': `Top-down and side-angle footage of a golden retriever carefully working through a colorful maze slow feeder bowl, tongue navigating each channel. The dog pauses to look up — satisfied and engaged. Bright natural kitchen light. Satisfying to watch. No text. 5 seconds.`,
    'dog-anxiety-wrap': `Gentle emotional footage of a beagle being wrapped in a snug grey anxiety wrap by caring hands. Before: ears back, panting slightly. After: eyes softening, body relaxing, dog leans into owner's chest. Soft indoor light, warm tones. Slow calming camera movement. No text. 5 seconds.`,
  };

  // Fallback generic prompt based on product category
  if (promptMap[product.slug]) return promptMap[product.slug];

  const catMap = {
    Dogs: 'happy energetic dog',
    Cats: 'curious content cat',
  };
  const pet = catMap[product.category] || 'happy pet';
  return `Cinematic product showcase: a ${pet} using and enjoying a ${product.name}. Warm natural lighting, shallow depth of field, satisfied and calm animal. No text overlays. 5 seconds. Real pet footage aesthetic.`;
}

// ─── Build ad copy for a product ───────────────────────────────────────────────

function buildAdCopy(product) {
  const { name, price, slug } = product;
  const url = `pawhavenpets.org/products/${slug}`;

  return {
    metaFeed: {
      hook: getHook(slug, name),
      body: getBody(slug, name, price),
      cta: `Shop now → ${url}`,
    },
    metaReels: {
      hookOverlay: getHookOverlay(slug, name),
      voiceover: getVoiceover(slug, name, price),
      endCard: `${name} — $${price} | ${url}`,
    },
    googleDisplay: {
      headline: truncate(`${getGoogleHeadline(slug, name)}`, 30),
      description: truncate(`${getGoogleDesc(slug, name)}`, 90),
      cta: getGoogleCta(slug),
    },
  };
}

function truncate(str, max) {
  return str.length <= max ? str : str.slice(0, max - 1) + '…';
}

function getHook(slug, name) {
  const hooks = {
    'calming-lick-mat': 'Bye bye anxiety...',
    'dog-snuffle-mat': 'This mat tires out your dog...',
    'cat-puzzle-slow-feeder': 'Your cat is bored. Fix it.',
    'self-cleaning-slicker-brush': 'Fur everywhere? One button fixes it.',
    'dog-water-bottle-leakproof': 'Every dog walk needs this.',
    'maze-slow-feeder-bowl': 'Stop the dangerous bolt-eating.',
    'dog-anxiety-wrap': 'Fireworks freak your dog out?',
  };
  return hooks[slug] || `Your pet deserves ${name}.`;
}

function getBody(slug, name, price) {
  const bodies = {
    'calming-lick-mat': `The easiest 2-minute fix for dog anxiety. Spread peanut butter on the Calming Lick Mat — licking releases natural endorphins, calming them during storms, baths, and vet visits. Over 2,800 sold.`,
    'dog-snuffle-mat': `10 minutes on a snuffle mat = 1 hour of physical exercise. Activates your dog's foraging instincts, burns mental energy, and reduces destructive behavior. Just hide their kibble in the fleece strips.`,
    'cat-puzzle-slow-feeder': `Indoor cats need mental challenges — our puzzle feeder turns every meal into a stimulating hunt. Rotating chambers and sliding covers keep them engaged. Vets love it. Cats obsess over it.`,
    'self-cleaning-slicker-brush': `The Self-Cleaning Slicker Brush collects loose fur in seconds — press the button and it pops right off. No mess, no pulling fur from bristles. Works on every coat type.`,
    'dog-water-bottle-leakproof': `Built-in drinking trough fills at a squeeze, tips back without a drop wasted. Clips to your bag. One-handed. Your dog drinks fresh water on every walk, hike, or road trip.`,
    'maze-slow-feeder-bowl': `Dogs who bolt their food risk bloating and vomiting. Our maze slow feeder cuts eating speed by 10x and turns mealtime into a rewarding puzzle. Vet-recommended, dishwasher safe.`,
    'dog-anxiety-wrap': `Gentle constant pressure wraps calm your dog's nervous system in minutes — during storms, fireworks, and vet visits. Drug-free. Vet-endorsed. Works in under 2 minutes.`,
  };
  return bodies[slug] || `${name} — loved by pet owners, designed for results. Just $${price}.`;
}

function getHookOverlay(slug) {
  const hooks = {
    'calming-lick-mat': 'POV: Your dog finally chills 😮‍💨',
    'dog-snuffle-mat': 'The toy that actually wears them out 🐶',
    'cat-puzzle-slow-feeder': 'Watch a bored cat become obsessed 🐱',
    'self-cleaning-slicker-brush': "Dog owners are losing it over this 😭",
    'dog-water-bottle-leakproof': 'Take this on every single walk 🌿',
    'maze-slow-feeder-bowl': 'Your vet wants you to see this 🥣',
    'dog-anxiety-wrap': "This stopped my dog's panic attacks 🙏",
  };
  return hooks[slug] || '🐾 Pet owners are obsessed with this';
}

function getVoiceover(slug, name, price) {
  const scripts = {
    'calming-lick-mat': `If your dog is anxious during thunderstorms or bath time — this is the one. It's called a lick mat, and the licking literally releases endorphins. Spread any soft treat on it and your dog will be in another universe. We've shipped over two thousand eight hundred of these and the reviews speak for themselves.`,
    'dog-snuffle-mat': `Instead of a 45-minute walk, try this. A snuffle mat hides your dog's kibble in layers of fleece and makes them use their nose to find it. It activates their natural foraging instincts. Ten minutes in and they're done — calm, tired, and happy. Dog owners are obsessed.`,
    'cat-puzzle-slow-feeder': `This is what happens when your indoor cat gets actual mental stimulation. It's a puzzle feeder — your cat has to slide panels, spin chambers, and fish out kibble with their paw. They go from lounging all day to completely locked in. Vets recommend it for preventing obesity and boredom.`,
    'self-cleaning-slicker-brush': `This is the most satisfying grooming thing I've ever seen. You brush your dog, fur collects on the bristles, then you press this button and the fur just pops right off into the trash. No picking it out by hand. No mess. Dog hair is officially not my problem anymore.`,
    'dog-water-bottle-leakproof': `I can't believe I went years without this on hikes. You squeeze it, it fills a built-in trough, your dog drinks, and when they're done you tip it back — zero leaking, zero waste. Clips right to your backpack. My dog literally looks up at it mid-walk like 'yes please.'`,
    'maze-slow-feeder-bowl': `If your dog inhales their food in under a minute — stop. That puts them at serious risk for bloating and digestive issues. This maze slow feeder forces them to pace their eating naturally. My vet recommended it and I've never looked back. It's also basically a fun puzzle for them.`,
    'dog-anxiety-wrap': `If your dog shakes during thunderstorms or fireworks — this is the drug-free solution that actually works. It's called an anxiety wrap. It applies gentle pressure like a swaddle, and it calms them in under two minutes. Thousands of pet parents use this instead of medication.`,
  };
  return scripts[slug] || `Meet the ${name}. $${price} and your pet will love you for it. Link in bio.`;
}

function getGoogleHeadline(slug, name) {
  const headlines = {
    'calming-lick-mat': 'Calm Your Anxious Dog Today',
    'dog-snuffle-mat': 'Tire Out Your Dog in 10 Mins',
    'cat-puzzle-slow-feeder': 'Bored Cat? Try This Feeder',
    'self-cleaning-slicker-brush': 'One-Button Dog Brush Cleanup',
    'dog-water-bottle-leakproof': 'Hydrate Your Dog On Any Trail',
    'maze-slow-feeder-bowl': 'Stop Dangerous Fast Eating',
    'dog-anxiety-wrap': 'Calm Storm Anxiety Naturally',
  };
  return headlines[slug] || name;
}

function getGoogleDesc(slug) {
  const descs = {
    'calming-lick-mat': 'Lick mats release natural endorphins. Instant calm for storms, baths & vet visits.',
    'dog-snuffle-mat': 'Mental enrichment that burns energy fast. Dog snuffle mats turn meals into foraging.',
    'cat-puzzle-slow-feeder': 'Puzzle feeders turn mealtime into mental enrichment. Reduces anxiety & overeating in cats.',
    'self-cleaning-slicker-brush': 'Self-cleaning slicker brush ejects fur at the press of a button. No mess, happy dog.',
    'dog-water-bottle-leakproof': 'Leakproof squeeze bottle with built-in trough. Perfect for hikes, walks & road trips.',
    'maze-slow-feeder-bowl': 'Vet-recommended maze bowl slows eating by 10x. Prevents bloating & aids digestion.',
    'dog-anxiety-wrap': 'Gentle pressure wraps ease dog anxiety in minutes. Drug-free, vet-endorsed relief.',
  };
  return descs[slug] || 'Shop premium pet accessories at PawHaven. Free shipping on orders over $35.';
}

function getGoogleCta(slug) {
  const ctas = {
    'calming-lick-mat': 'Shop the Lick Mat',
    'dog-snuffle-mat': 'Shop Snuffle Mats',
    'cat-puzzle-slow-feeder': 'Shop Cat Feeders',
    'self-cleaning-slicker-brush': 'Shop Grooming Tools',
    'dog-water-bottle-leakproof': 'Shop Water Bottles',
    'maze-slow-feeder-bowl': 'Shop Slow Feeders',
    'dog-anxiety-wrap': 'Shop Anxiety Wraps',
  };
  return ctas[slug] || 'Shop Now';
}

// ─── Runway API call ────────────────────────────────────────────────────────────

async function generateRunwayVideo(product) {
  const apiKey = process.env.RUNWAY_API_KEY;
  if (!apiKey) throw new Error('RUNWAY_API_KEY not set');

  const heroImage = product.images?.[0] || product.image;
  const prompt = buildRunwayPrompt(product);

  // Create task
  const createRes = await fetch('https://api.dev.runwayml.com/v1/image_to_video', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'X-Runway-Version': '2024-11-06',
    },
    body: JSON.stringify({
      model: 'gen4_turbo',
      promptImage: heroImage,
      promptText: prompt,
      duration: 5,
      ratio: '1280:720',
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.text();
    throw new Error(`Runway API error ${createRes.status}: ${err}`);
  }

  const { id: taskId } = await createRes.json();

  // Poll until complete
  let attempts = 0;
  const maxAttempts = 30; // 2.5 minutes max
  while (attempts < maxAttempts) {
    await new Promise(r => setTimeout(r, 5000));
    const pollRes = await fetch(`https://api.dev.runwayml.com/v1/tasks/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'X-Runway-Version': '2024-11-06',
      },
    });
    const task = await pollRes.json();

    if (task.status === 'SUCCEEDED') return task.output?.[0];
    if (task.status === 'FAILED') throw new Error(`Runway task failed: ${task.failure}`);
    attempts++;
  }
  throw new Error('Runway task timed out after 2.5 minutes');
}

// ─── Upload to Cloudflare R2 ────────────────────────────────────────────────────

async function uploadToR2(videoUrl, slug, month) {
  const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
  const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME;
  const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;

  if (!accountId || !accessKeyId || !secretKey || !bucket) {
    console.warn('R2 env vars not set — returning Runway URL directly (expires in 7 days)');
    return videoUrl;
  }

  // Download video buffer from Runway's temporary URL
  const videoRes = await fetch(videoUrl);
  if (!videoRes.ok) throw new Error('Failed to download video from Runway');
  const videoBuffer = await videoRes.arrayBuffer();

  // S3-compatible upload to Cloudflare R2
  const key = `ad-videos/${month}/${slug}.mp4`;
  const endpoint = `https://${accountId}.r2.cloudflarestorage.com`;

  // Use AWS-compatible S3 PUT (simplified — no SDK needed for a single PUT)
  // For production, use @aws-sdk/client-s3 or the aws4 package for proper signing
  const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');
  const s3 = new S3Client({
    region: 'auto',
    endpoint,
    credentials: { accessKeyId, secretAccessKey: secretKey },
  });

  await s3.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: Buffer.from(videoBuffer),
    ContentType: 'video/mp4',
    CacheControl: 'public, max-age=31536000',
  }));

  return `${publicUrl}/${key}`;
}

// ─── Send email via Resend ──────────────────────────────────────────────────────

async function sendAdEmail(results) {
  const month = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const productSections = results
    .filter(r => r.success)
    .map(({ product, videoUrl, copy }) => `
      <div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px;margin-bottom:24px;">
        <h2 style="margin:0 0 8px;color:#1f2937;">${product.name}</h2>
        <p style="margin:0 0 16px;"><a href="${videoUrl}" style="color:#7c3aed;font-weight:600;">▶ Download Video</a></p>

        <h3 style="color:#374151;margin:0 0 8px;">📱 Meta Feed</h3>
        <p style="background:#f9fafb;padding:12px;border-radius:6px;margin:0 0 16px;font-size:14px;">
          <strong>Hook:</strong> ${copy.metaFeed.hook}<br>
          <strong>Body:</strong> ${copy.metaFeed.body}<br>
          <strong>CTA:</strong> ${copy.metaFeed.cta}
        </p>

        <h3 style="color:#374151;margin:0 0 8px;">🎬 Meta Reels / TikTok</h3>
        <p style="background:#f9fafb;padding:12px;border-radius:6px;margin:0 0 16px;font-size:14px;">
          <strong>Hook overlay:</strong> ${copy.metaReels.hookOverlay}<br>
          <strong>Voiceover:</strong> ${copy.metaReels.voiceover}<br>
          <strong>End card:</strong> ${copy.metaReels.endCard}
        </p>

        <h3 style="color:#374151;margin:0 0 8px;">🖥️ Google Display</h3>
        <p style="background:#f9fafb;padding:12px;border-radius:6px;margin:0;font-size:14px;">
          <strong>Headline:</strong> ${copy.googleDisplay.headline}<br>
          <strong>Description:</strong> ${copy.googleDisplay.description}<br>
          <strong>CTA:</strong> ${copy.googleDisplay.cta}
        </p>
      </div>
    `).join('');

  const failedSection = results.filter(r => !r.success).length > 0 ? `
    <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px;margin-bottom:24px;">
      <h3 style="color:#dc2626;margin:0 0 8px;">⚠️ Failed</h3>
      ${results.filter(r => !r.success).map(r => `<p style="margin:4px 0;font-size:14px;">${r.product.name}: ${r.error}</p>`).join('')}
    </div>
  ` : '';

  const html = `
    <div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
      <div style="background:#7c3aed;padding:20px;border-radius:8px;margin-bottom:24px;">
        <h1 style="color:white;margin:0;font-size:22px;">🐾 PawHaven Weekly Ad Videos</h1>
        <p style="color:#e9d5ff;margin:8px 0 0;font-size:14px;">${month} — ${results.filter(r => r.success).length} videos generated</p>
      </div>

      <p style="color:#374151;">Your weekly ad videos are ready. Download each video and upload to Meta Ads Manager, TikTok Ads, and Google Ads.</p>

      <h2 style="color:#1f2937;border-bottom:2px solid #e5e7eb;padding-bottom:8px;">📺 Upload Instructions</h2>
      <ul style="color:#374151;font-size:14px;line-height:1.8;">
        <li><strong>Meta:</strong> Ads Manager → Create → Video Ad → upload .mp4</li>
        <li><strong>TikTok:</strong> TikTok Ads Manager → Creative → Video Library → Upload</li>
        <li><strong>Google:</strong> Google Ads → Assets → Videos → + Add video</li>
      </ul>

      ${failedSection}

      <h2 style="color:#1f2937;border-bottom:2px solid #e5e7eb;padding-bottom:8px;">🎬 This Week's Videos</h2>
      ${productSections}

      <p style="color:#9ca3af;font-size:12px;margin-top:32px;border-top:1px solid #e5e7eb;padding-top:16px;">
        Sent by PawHaven ad-video-generator cron · pawhavenpets.org
      </p>
    </div>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'PawHaven Ads <ads@pawhavenpets.org>',
      to: ADMIN_EMAIL,
      subject: `🎬 ${results.filter(r => r.success).length} New PawHaven Ad Videos — ${month}`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Resend error:', err);
  }
}

// ─── Main cron handler ──────────────────────────────────────────────────────────

export async function GET(request) {
  // Verify cron secret
  const secret = request.headers.get('authorization')?.replace('Bearer ', '');
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const month = new Date().toISOString().slice(0, 7); // "YYYY-MM"
  console.log(`[ad-video-generator] Starting for ${month}`);

  try {
    // 1. Get top 3 products by revenue
    const topProducts = await getTopProductsByRevenue(3);
    console.log(`[ad-video-generator] Top products: ${topProducts.map(p => p.slug).join(', ')}`);

    // 2. Filter out products already generated this month
    const toGenerate = [];
    for (const product of topProducts) {
      const key = `ad_video:${product.slug}:${month}`;
      const existing = await redisGet(key);
      if (existing) {
        console.log(`[ad-video-generator] Skipping ${product.slug} — already generated this month`);
      } else {
        toGenerate.push(product);
      }
    }

    if (!toGenerate.length) {
      return NextResponse.json({ message: 'All top products already have ad videos this month' });
    }

    // 3. Generate videos in parallel
    const results = await Promise.all(
      toGenerate.map(async (product) => {
        try {
          console.log(`[ad-video-generator] Generating video for ${product.slug}`);
          const runwayUrl = await generateRunwayVideo(product);

          // 4. Upload to R2
          const permanentUrl = await uploadToR2(runwayUrl, product.slug, month);

          // Mark as generated in Redis (expires after 35 days to allow re-gen next month)
          await redisSet(`ad_video:${product.slug}:${month}`, permanentUrl, 35 * 24 * 60 * 60);

          const copy = buildAdCopy(product);
          console.log(`[ad-video-generator] ✅ ${product.slug} — ${permanentUrl}`);
          return { product, videoUrl: permanentUrl, copy, success: true };
        } catch (err) {
          console.error(`[ad-video-generator] ❌ ${product.slug}:`, err.message);
          return { product, error: err.message, success: false };
        }
      })
    );

    // 5. Email results
    if (results.some(r => r.success)) {
      await sendAdEmail(results);
    }

    return NextResponse.json({
      generated: results.filter(r => r.success).map(r => r.product.slug),
      failed: results.filter(r => !r.success).map(r => ({ slug: r.product.slug, error: r.error })),
      month,
    });
  } catch (err) {
    console.error('[ad-video-generator] Fatal error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
