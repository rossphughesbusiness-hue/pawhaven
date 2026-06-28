#!/usr/bin/env node
/**
 * PawHaven — Phase 1 Runway Ad Video Generator
 *
 * Generates 5-second cinematic product ad videos using Runway gen4_turbo.
 * Saves .mp4 files to ../ad-videos/<slug>.mp4
 *
 * Usage:
 *   RUNWAY_API_KEY=<your-key> node scripts/generate-runway-ads.js
 *
 * Or add RUNWAY_API_KEY to .env.local and run:
 *   node -e "require('dotenv').config({path:'.env.local'})" scripts/generate-runway-ads.js
 *
 * Cost estimate: 6 products × 5 seconds × $0.05/sec = $1.50 total
 * Runtime: ~3–5 minutes (tasks run in parallel, ~60s each)
 *
 * Install deps first:
 *   npm install @runwayml/sdk node-fetch
 */

import RunwayML, { TaskFailedError } from '@runwayml/sdk';
import { createWriteStream, mkdirSync } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '..', 'ad-videos');
mkdirSync(OUTPUT_DIR, { recursive: true });

const API_KEY = process.env.RUNWAY_API_KEY;
if (!API_KEY) {
  console.error('❌  RUNWAY_API_KEY not set. Run: RUNWAY_API_KEY=<your-key> node scripts/generate-runway-ads.js');
  process.exit(1);
}

const client = new RunwayML({ apiKey: API_KEY });

// ─── PRODUCT AD CONFIGS ──────────────────────────────────────────────────────
// Hero image = first image in each product's images[] array from src/lib/products.js
// NOTE: dog-anxiety-wrap is not yet in the product catalog; using placeholder image.
//       Add the product and update heroImage before generating.

const PRODUCTS = [
  {
    slug: 'calming-lick-mat',
    name: 'Calming Lick Mat',
    heroImage: 'https://ae-pic-a1.aliexpress-media.com/kf/Sd3e4e4bfe83d48979660c3cdd7e53290V.jpg_960x960q75.jpg',
    prompt: `Slow cinematic close-up of a golden retriever's tongue rhythmically licking a blue silicone lick mat spread with smooth peanut butter. The dog's eyes are half-closed in deep contentment, ears relaxed. Warm late-afternoon sunlight streams in from a window, casting a soft golden glow. The textured mat fills the foreground — honeycomb grooves catching the light. Camera slowly pulls back to reveal the dog lying on a cozy rug, completely at peace. Real dog, real fur, real textures. No text. 5 seconds. Cinematic, 4K quality.`,
  },
  {
    slug: 'dog-snuffle-mat',
    name: 'Dog Snuffle Mat',
    heroImage: 'https://images.unsplash.com/photo-1587300003-02b8176a61eb?w=800&q=85&auto=format&fit=crop',
    prompt: `Overhead and ground-level shots of a border collie mix nose-diving into a lush green snuffle mat, sniffing deeply through fleece strips with intense focus. Kibble pieces are hidden throughout. The dog's nose twitches rapidly, ears perked — pure foraging instinct at work. Warm natural light, shallow depth of field, soft bokeh on the fleece. Camera sweeps low across the mat surface, then cuts to the dog triumphantly finding a piece. Joyful, energetic, satisfying to watch. No text overlays. Real dog footage aesthetic. 5 seconds.`,
  },
  {
    slug: 'dog-anxiety-wrap',
    name: 'Dog Anxiety Wrap',
    // ⚠️  PLACEHOLDER — update this image when you add the product to the catalog
    heroImage: 'https://images.unsplash.com/photo-1587300003-02b8176a61eb?w=800&q=85&auto=format&fit=crop',
    prompt: `Gentle, emotional footage of a trembling beagle being wrapped in a snug, grey thundershirt-style anxiety wrap by caring hands. The transformation is visible: before — ears back, tail tucked, panting slightly; after — eyes softening, body relaxing, the dog leans into their owner's chest. Soft indoor light, warm tones. Close-up on the velcro fastening, then the dog's face as tension melts away. Slow, calming camera movement. Emotional, trustworthy brand aesthetic. No text. 5 seconds. Cinematic and real.`,
  },
  {
    slug: 'cat-puzzle-slow-feeder',
    name: 'Cat Puzzle Slow Feeder',
    heroImage: 'https://images.unsplash.com/photo-1561037414-61da46a1b1d4?w=800&q=85&auto=format&fit=crop',
    prompt: `Playful close-up footage of a tabby cat using one precise paw to fish kibble from a turquoise puzzle feeder with rotating chambers and sliding covers. The cat's eyes are wide and focused — hunting mode activated. Each successful retrieval is a small victory. Warm kitchen light, shallow focus on the feeder's colorful sections, cat's face sharp in the background. Camera slowly circles the feeder as the cat works. Satisfying, engaging, adorable. No text overlays. 5 seconds. Real cat, real textures, cinematic quality.`,
  },
  {
    slug: 'self-cleaning-slicker-brush',
    name: 'Self-Cleaning Slicker Brush',
    heroImage: 'https://ae-pic-a1.aliexpress-media.com/kf/S55eb7932a4194d3a8cc30bf63b9c45cff.jpg_960x960q75.jpg',
    prompt: `Satisfying ASMR-adjacent footage of a fluffy golden doodle being brushed with a self-cleaning slicker brush — fur flowing and lifting off in slow motion. A hand presses the release button mid-video and a neat clump of fur pops free in one clean motion. The dog looks blissful, leaning into the brush. Late afternoon golden hour light makes the fur glow. Camera alternates between extreme close-ups of bristles moving through fur and wide shots of the happy dog. Beautiful, tactile, deeply satisfying to watch. No text. 5 seconds.`,
  },
  {
    slug: 'dog-water-bottle-leakproof',
    name: 'Portable Dog Water Bottle',
    heroImage: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=800&q=85&auto=format&fit=crop',
    prompt: `Outdoor adventure footage of a labrador on a sunny trail eagerly drinking from an orange squeezable dog water bottle — owner squeezes, water fills the built-in trough, dog laps it up enthusiastically, water catching the light. Bright, energetic morning light through trees. After the dog drinks, the owner tips the trough back (no drips) and clips the bottle to their pack. Dynamic camera movement — handheld, natural, active energy. Shows the on-the-go convenience perfectly. No text. 5 seconds. Real footage aesthetic, vivid colors.`,
  },
];

// ─── DOWNLOAD HELPER ─────────────────────────────────────────────────────────
async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const file = createWriteStream(dest);
    proto.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        file.close();
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      file.close();
      reject(err);
    });
  });
}

// ─── GENERATE ONE VIDEO ───────────────────────────────────────────────────────
async function generateVideo(product) {
  const { slug, name, heroImage, prompt } = product;
  console.log(`\n🎬  Starting: ${name}`);
  console.log(`   Image: ${heroImage.slice(0, 70)}...`);
  console.log(`   Prompt: ${prompt.slice(0, 80)}...`);

  try {
    const task = await client.imageToVideo.create({
      model: 'gen4_turbo',
      promptImage: heroImage,
      promptText: prompt,
      duration: 5,
      ratio: '1280:720',
    });

    console.log(`   ⏳  Task created: ${task.id} — polling for completion...`);

    // Poll until done (Runway SDK waitForTaskOutput not available in all versions)
    let result = task;
    while (result.status === 'PENDING' || result.status === 'RUNNING' || result.status === 'THROTTLED') {
      await new Promise(r => setTimeout(r, 5000));
      result = await client.tasks.retrieve(task.id);
      process.stdout.write('.');
    }
    process.stdout.write('\n');

    if (result.status === 'FAILED') {
      throw new Error(`Task failed: ${result.failure || 'Unknown error'}`);
    }

    const videoUrl = result.output?.[0];
    if (!videoUrl) throw new Error('No output URL in task result');

    const outputPath = path.join(OUTPUT_DIR, `${slug}.mp4`);
    await downloadFile(videoUrl, outputPath);
    console.log(`   ✅  Saved: ad-videos/${slug}.mp4`);
    return { slug, name, path: outputPath, success: true };
  } catch (err) {
    if (err instanceof TaskFailedError) {
      console.error(`   ❌  ${name}: Task failed —`, err.taskDetails);
    } else {
      console.error(`   ❌  ${name}:`, err.message);
    }
    return { slug, name, success: false, error: err.message };
  }
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🐾  PawHaven Ad Video Generator');
  console.log(`📁  Output: ${OUTPUT_DIR}`);
  console.log(`📦  Products: ${PRODUCTS.length}`);
  console.log('');

  // Run all in parallel — Runway handles concurrency on their end
  const results = await Promise.all(PRODUCTS.map(generateVideo));

  console.log('\n─────────────────────────────────────────');
  console.log('📊  Summary:');
  results.forEach(r => {
    const icon = r.success ? '✅' : '❌';
    const msg = r.success ? `ad-videos/${r.slug}.mp4` : r.error;
    console.log(`  ${icon}  ${r.name}: ${msg}`);
  });

  const passed = results.filter(r => r.success).length;
  console.log(`\n${passed}/${results.length} videos generated successfully.`);

  if (passed < results.length) {
    console.log('\nTip: Failed videos can be retried — just re-run the script.');
    console.log('AliExpress image URLs may occasionally timeout. If so, upload the image');
    console.log('to a CDN or Cloudflare R2 and update the heroImage URL in this script.');
  }
}

main().catch(console.error);
