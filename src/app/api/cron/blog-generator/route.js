import Anthropic from '@anthropic-ai/sdk';

export const runtime = 'nodejs';
export const maxDuration = 60;

// ---------------------------------------------------------------------------
// 52-week rotating topic list — covers the full spectrum of high-intent pet
// keywords: dog training, cat health, grooming, enrichment, anxiety,
// nutrition, senior pets, puppies, kittens, and more.
// ---------------------------------------------------------------------------
const TOPICS = [
  // Dogs — training & behaviour
  { title: 'How to Teach a Dog to Stay: Step-by-Step for Beginners', category: 'Dogs', tag: 'Training' },
  { title: 'Why Dogs Jump on People and How to Stop It Fast', category: 'Dogs', tag: 'Training' },
  { title: 'How to Teach a Dog to Come When Called Every Time', category: 'Dogs', tag: 'Training' },
  { title: 'Dog Barking Solutions: Why Dogs Bark and How to Quiet Them', category: 'Dogs', tag: 'Training' },
  { title: 'How to Socialise a Puppy: The Critical Window Every Owner Needs to Know', category: 'Dogs', tag: 'Training' },
  { title: 'Resource Guarding in Dogs: Signs, Causes, and Safe Solutions', category: 'Dogs', tag: 'Training' },
  { title: 'How to Stop a Dog From Digging Up the Yard', category: 'Dogs', tag: 'Training' },
  // Dogs — anxiety & enrichment
  { title: 'Best Enrichment Activities for High-Energy Dogs at Home', category: 'Dogs', tag: 'Enrichment' },
  { title: 'Thunderstorm Anxiety in Dogs: What Actually Helps', category: 'Dogs', tag: 'Anxiety Relief' },
  { title: 'How to Leave Your Dog Home Alone Without Guilt', category: 'Dogs', tag: 'Anxiety Relief' },
  { title: 'Scatter Feeding for Dogs: The Easiest Free Enrichment Idea', category: 'Dogs', tag: 'Enrichment' },
  { title: 'Nose Work for Dogs: How to Start Scent Training at Home', category: 'Dogs', tag: 'Enrichment' },
  // Dogs — health & nutrition
  { title: 'How Much Water Should a Dog Drink Per Day?', category: 'Dogs', tag: 'Health' },
  { title: 'Signs of Joint Pain in Dogs and How to Help at Home', category: 'Dogs', tag: 'Health' },
  { title: 'Dog Nutrition 101: What Every Ingredient Label Is Actually Telling You', category: 'Dogs', tag: 'Health' },
  { title: 'Supplements for Dogs: Which Ones Vets Actually Recommend', category: 'Dogs', tag: 'Health' },
  { title: 'How to Keep a Senior Dog Active and Happy', category: 'Dogs', tag: 'Health' },
  { title: 'Raw Diet for Dogs: Benefits, Risks, and What Vets Say in 2026', category: 'Dogs', tag: 'Health' },
  { title: 'Grain-Free Dog Food: Is It Safe? The Science in Plain English', category: 'Dogs', tag: 'Health' },
  // Dogs — grooming
  { title: 'How to Desensitise a Dog to Nail Trims Without Stress', category: 'Dogs', tag: 'Grooming' },
  { title: 'Best Dog Shampoos for Sensitive Skin (Vet-Approved)', category: 'Dogs', tag: 'Grooming' },
  { title: 'How to Clean a Dog\'s Ears Safely at Home', category: 'Dogs', tag: 'Grooming' },
  // Dogs — puppies
  { title: 'Puppy Sleep Guide: How Much Sleep Puppies Need and How to Get It', category: 'Dogs', tag: 'Training' },
  { title: 'Puppy Biting: Why It Happens and the Fastest Way to Stop It', category: 'Dogs', tag: 'Training' },
  { title: 'First Vet Visit With Your Puppy: What to Expect and Bring', category: 'Dogs', tag: 'Health' },
  // Dogs — senior
  { title: 'Caring for a Senior Dog: Month-by-Month Health Checklist', category: 'Dogs', tag: 'Health' },
  { title: 'Canine Cognitive Dysfunction: Signs Your Older Dog Might Have Dog Dementia', category: 'Dogs', tag: 'Health' },
  // Cats — health & nutrition
  { title: 'Why Is My Cat Not Eating? Common Causes and When to See a Vet', category: 'Cats', tag: 'Health' },
  { title: 'Wet vs Dry Cat Food: Which Is Actually Better for Your Cat?', category: 'Cats', tag: 'Health' },
  { title: 'How to Help an Overweight Cat Lose Weight Safely', category: 'Cats', tag: 'Health' },
  { title: 'Common Cat Illnesses Every Owner Should Know', category: 'Cats', tag: 'Health' },
  { title: 'Hairballs in Cats: How to Prevent and Treat Them', category: 'Cats', tag: 'Health' },
  { title: 'Why Your Cat Is Vomiting and What to Do About It', category: 'Cats', tag: 'Health' },
  // Cats — behaviour
  { title: 'Why Cats Bite During Petting (Petting-Induced Aggression Explained)', category: 'Cats', tag: 'Anxiety Relief' },
  { title: 'How to Bond With a Shy or Fearful Cat', category: 'Cats', tag: 'Anxiety Relief' },
  { title: 'Cat Zoomies: Why They Happen and What They Mean', category: 'Cats', tag: 'Enrichment' },
  { title: 'Why Cats Bring You Dead Animals (And Should You Stop It?)', category: 'Cats', tag: 'Enrichment' },
  { title: 'Multi-Cat Household Guide: Preventing and Resolving Cat Conflict', category: 'Cats', tag: 'Anxiety Relief' },
  // Cats — grooming
  { title: 'How to Brush a Cat That Hates Being Brushed', category: 'Cats', tag: 'Grooming' },
  { title: 'Long-Haired Cat Grooming: Tools and Routine That Actually Work', category: 'Cats', tag: 'Grooming' },
  { title: 'How to Trim Cat Nails Without Getting Scratched', category: 'Cats', tag: 'Grooming' },
  // Cats — kittens
  { title: 'New Kitten Week 1: What to Expect and How to Prepare', category: 'Cats', tag: 'Health' },
  { title: 'How to Litter Train a Kitten in 7 Days', category: 'Cats', tag: 'Health' },
  { title: 'Kitten Vaccinations: Schedule, Costs, and What They Protect Against', category: 'Cats', tag: 'Health' },
  // Cats — enrichment
  { title: 'Cat Window Perches: How to Set Up the Perfect Bird-Watching Station', category: 'Cats', tag: 'Enrichment' },
  { title: 'How to Build a Catio on Any Budget', category: 'Cats', tag: 'Enrichment' },
  { title: 'The Best Cat Puzzle Feeders for Mental Stimulation', category: 'Cats', tag: 'Enrichment' },
  // Cats — senior
  { title: 'Senior Cat Care: 10 Changes to Make When Your Cat Turns 10', category: 'Cats', tag: 'Health' },
  { title: 'Arthritis in Cats: Signs to Watch For and How to Help at Home', category: 'Cats', tag: 'Health' },
  // Mixed / general
  { title: 'How to Travel With Pets in 2026: The Complete Guide', category: 'Dogs', tag: 'Travel' },
  { title: 'Pet Insurance in 2026: Is It Worth It? An Honest Breakdown', category: 'Dogs', tag: 'Health' },
  { title: 'Moving House With Pets: How to Make It Stress-Free', category: 'Cats', tag: 'Anxiety Relief' },
];

// ---------------------------------------------------------------------------
// Unsplash photo IDs by topic tag — ensures visually relevant hero images
// ---------------------------------------------------------------------------
const UNSPLASH_IMAGES = {
  Training:      ['photo-1587300003388-59208cc962cb', 'photo-1544568100-847a188d0d28', 'photo-1552053831-71594a27632d'],
  Enrichment:    ['photo-1601758125946-6ec2ef64daf8', 'photo-1530281700549-e82e7bf110d6', 'photo-1516734212186-a967f81ad0d7'],
  'Anxiety Relief': ['photo-1587300003388-59208cc962cb', 'photo-1548199973-03cce0bbc87b', 'photo-1544568100-847a188d0d28'],
  Health:        ['photo-1548199973-03cce0bbc87b', 'photo-1583337130417-3346a1be7dee', 'photo-1518791841217-8f162f1912da'],
  Grooming:      ['photo-1516734212186-a967f81ad0d7', 'photo-1583337130417-3346a1be7dee', 'photo-1548199973-03cce0bbc87b'],
  Travel:        ['photo-1530281700549-e82e7bf110d6', 'photo-1601758125946-6ec2ef64daf8', 'photo-1544568100-847a188d0d28'],
};

function pickImage(tag) {
  const pool = UNSPLASH_IMAGES[tag] || UNSPLASH_IMAGES['Health'];
  const id = pool[Math.floor(Math.random() * pool.length)];
  return `https://images.unsplash.com/${id}?w=800&q=85&auto=format&fit=crop`;
}

// ---------------------------------------------------------------------------
// Determine which topic to use this week (week-of-year mod 52)
// ---------------------------------------------------------------------------
function getTopicForThisWeek() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.floor((now - startOfYear) / (7 * 24 * 60 * 60 * 1000));
  return TOPICS[weekNumber % TOPICS.length];
}

// ---------------------------------------------------------------------------
// GitHub REST API helpers
// ---------------------------------------------------------------------------
async function getFileFromGitHub(token, path) {
  const url = `https://api.github.com/repos/rossphughesbusiness-hue/pawhaven/contents/${path}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
  });
  if (!res.ok) throw new Error(`GitHub GET ${path}: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return {
    content: Buffer.from(data.content, 'base64').toString('utf8'),
    sha: data.sha,
  };
}

async function commitFileToGitHub(token, path, content, sha, message) {
  const url = `https://api.github.com/repos/rossphughesbusiness-hue/pawhaven/contents/${path}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      content: Buffer.from(content, 'utf8').toString('base64'),
      sha,
    }),
  });
  if (!res.ok) throw new Error(`GitHub PUT ${path}: ${res.status} ${await res.text()}`);
  return res.json();
}

// ---------------------------------------------------------------------------
// Inject new post into blog.js source and update POST_RELEVANCE
// ---------------------------------------------------------------------------
function injectPostIntoBlogJs(source, post) {
  // 1. Build the new post object as source code
  const postCode = `  {
    slug: '${post.slug}',
    title: ${JSON.stringify(post.title)},
    excerpt: ${JSON.stringify(post.excerpt)},
    category: '${post.category}',
    tag: '${post.tag}',
    date: '${post.date}',
    readTime: '${post.readTime}',
    img: '${post.img}',
    content: \`
${post.content}
    \`,
  }`;

  // 2. Append before the closing `]` of the posts array
  // The array ends with: `    `,\n  }\n]`
  const ARRAY_END = '\n]';
  const insertIdx = source.lastIndexOf(ARRAY_END);
  if (insertIdx === -1) throw new Error('Could not find end of posts array in blog.js');

  const withPost =
    source.slice(0, insertIdx) +
    ',\n' +
    postCode +
    '\n]' +
    source.slice(insertIdx + ARRAY_END.length);

  // 3. Append new entry to POST_RELEVANCE
  const relevanceTags = buildRelevanceTags(post.category, post.tag);
  const relevanceLine = `  '${post.slug}': ${JSON.stringify(relevanceTags)},`;

  // POST_RELEVANCE ends with `\n};`
  const PR_END = '\n};';
  const prIdx = withPost.lastIndexOf(PR_END);
  if (prIdx === -1) throw new Error('Could not find end of POST_RELEVANCE in blog.js');

  return (
    withPost.slice(0, prIdx) +
    '\n' +
    relevanceLine +
    '\n};' +
    withPost.slice(prIdx + PR_END.length)
  );
}

function buildRelevanceTags(category, tag) {
  const base = [tag, category];
  const extras = {
    Training:       ['Walking', 'Safety'],
    Enrichment:     ['Toys', 'Play', 'Anxiety Relief'],
    'Anxiety Relief': ['Enrichment', 'Comfort'],
    Health:         ['Grooming'],
    Grooming:       ['Health'],
    Travel:         ['Safety', 'Outdoor'],
  };
  return [...new Set([...base, ...(extras[tag] || [])])];
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function GET(request) {
  // Auth check
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const GITHUB_TOKEN   = process.env.GITHUB_TOKEN;
  const ANTHROPIC_KEY  = process.env.ANTHROPIC_API_KEY;
  const RESEND_KEY     = process.env.RESEND_API_KEY;

  if (!GITHUB_TOKEN || !ANTHROPIC_KEY) {
    return Response.json({ error: 'Missing env vars: GITHUB_TOKEN or ANTHROPIC_API_KEY' }, { status: 500 });
  }

  try {
    // -----------------------------------------------------------------------
    // 1. Pick this week's topic
    // -----------------------------------------------------------------------
    const topic = getTopicForThisWeek();
    console.log(`[blog-generator] Generating post for topic: "${topic.title}"`);

    // -----------------------------------------------------------------------
    // 2. Generate blog post via Claude
    // -----------------------------------------------------------------------
    const anthropic = new Anthropic({ apiKey: ANTHROPIC_KEY });

    const systemPrompt = `You are a professional pet content writer for PawHaven, a premium pet accessories store at pawhavenpets.org.
Write practical, trustworthy, vet-informed content that helps pet owners.
Tone: warm, knowledgeable, no fluff. Use UK/US mixed English.
Always weave in 1-2 natural mentions of relevant PawHaven products (slow feeders, lick mats, harnesses, beds, toys, etc.) where they genuinely help.
Output ONLY valid JSON — no markdown code fences, no preamble.`;

    const userPrompt = `Write a blog post for PawHaven on this topic: "${topic.title}"
Category: ${topic.category} | Tag: ${topic.tag}

Return a JSON object with exactly these fields:
{
  "slug": "url-friendly-slug-max-60-chars",
  "title": "The exact post title (can differ slightly from the topic if better)",
  "excerpt": "2-sentence compelling excerpt, 30-50 words",
  "readTime": "X min read",
  "content": "Full blog post body in markdown, 600-800 words. Use ## subheadings, **bold** for key points. No H1 — that comes from the title field."
}`;

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      messages: [{ role: 'user', content: userPrompt }],
      system: systemPrompt,
    });

    const rawText = message.content[0].text.trim();

    // Strip accidental markdown fences if Claude added them
    const jsonText = rawText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    const generated = JSON.parse(jsonText);

    // -----------------------------------------------------------------------
    // 3. Build the full post object
    // -----------------------------------------------------------------------
    const today = new Date().toISOString().split('T')[0];
    const post = {
      slug:     generated.slug,
      title:    generated.title,
      excerpt:  generated.excerpt,
      category: topic.category,
      tag:      topic.tag,
      date:     today,
      readTime: generated.readTime,
      img:      pickImage(topic.tag),
      content:  generated.content,
    };

    console.log(`[blog-generator] Post ready: "${post.title}" (${post.slug})`);

    // -----------------------------------------------------------------------
    // 4. Read blog.js from GitHub, inject new post, commit back
    // -----------------------------------------------------------------------
    const BLOG_PATH = 'src/lib/blog.js';
    const { content: originalSource, sha } = await getFileFromGitHub(GITHUB_TOKEN, BLOG_PATH);
    const updatedSource = injectPostIntoBlogJs(originalSource, post);

    await commitFileToGitHub(
      GITHUB_TOKEN,
      BLOG_PATH,
      updatedSource,
      sha,
      `blog: auto-publish "${post.title}" [${today}]`
    );

    console.log(`[blog-generator] Committed to GitHub — Vercel deploy will pick it up.`);

    // -----------------------------------------------------------------------
    // 5. Send notification email via Resend
    // -----------------------------------------------------------------------
    const postUrl = `https://pawhavenpets.org/blog/${post.slug}`;

    if (RESEND_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'PawHaven Blog <noreply@pawhavenpets.org>',
          to:   ['rossphughes@gmail.com'],
          subject: `✅ New blog post published: ${post.title}`,
          html: `
            <h2>New PawHaven blog post published</h2>
            <p><strong>Title:</strong> ${post.title}</p>
            <p><strong>Slug:</strong> ${post.slug}</p>
            <p><strong>Category:</strong> ${post.category} · ${post.tag}</p>
            <p><strong>Date:</strong> ${today}</p>
            <p><strong>URL:</strong> <a href="${postUrl}">${postUrl}</a></p>
            <p><em>Published automatically via the weekly blog cron. Vercel is deploying now — the post will be live in ~60 seconds.</em></p>
          `,
        }),
      });
    }

    return Response.json({
      ok:    true,
      slug:  post.slug,
      title: post.title,
      url:   postUrl,
      date:  today,
    });

  } catch (err) {
    console.error('[blog-generator] Error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
