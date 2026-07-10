# PawHaven — Complete Project Handoff
**Date:** 2026-07-09  
**For:** New computer with no existing data  
**Project owner:** Ross Hughes (rossphughes@gmail.com)

---

## 1. WHAT THIS IS

PawHaven is a fully autonomous dropshipping store at **https://pawhavenpets.org**. It's built on Next.js 14, deployed on Vercel, uses CJDropshipping for auto-fulfillment, Stripe for payments, Upstash Redis for data, and Resend for email. It has 9 automated crons running weekly/daily tasks with zero manual intervention needed.

**Current revenue: $0** — store is built and live but blocked from Google Shopping traffic because of a Merchant Center policy violation that was just fixed in code. The #1 priority is to get the Merchant Center review approved so Shopping ads can run.

---

## 2. ACCOUNTS & CREDENTIALS

### Google Merchant Center
- **URL:** https://merchants.google.com
- **Account ID:** 5815174397
- **Status:** Misrepresentation policy violation (FIXED in code as of 2026-07-09, needs review requested)
- **Action needed:** Policy Violations → Request Review + add physical address/phone + submit ID verification

### Google Analytics
- **URL:** https://analytics.google.com
- **Property ID:** G-[set as NEXT_PUBLIC_GA_ID in Vercel env]
- **Google Ads Conversion ID:** AW-18269545115

### Meta Business / Pixel
- **URL:** https://business.facebook.com
- **Pixel ID:** set as NEXT_PUBLIC_META_PIXEL_ID in Vercel env
- **Action needed:** Verify Meta ad campaign is actually published and running (was left mid-setup in a prior session)

### Stripe
- **URL:** https://dashboard.stripe.com
- **Keys:** STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_ID (all in Vercel)

### Vercel (pawhaven store)
- **URL:** https://vercel.com/dashboard
- **Project name:** pawhaven
- **Live URL:** https://pawhavenpets.org
- **Env vars ALREADY SET:** STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_ID, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, RESEND_API_KEY, RESEND_AUDIENCE_ID, CJ_API_KEY, CRON_SECRET, NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_META_PIXEL_ID
- **Env vars MISSING (must add):**
  - `ANTHROPIC_API_KEY` — get from https://console.anthropic.com (enables AI contact triage + weekly blog auto-publish)
  - `GITHUB_TOKEN` — fine-grained PAT from https://github.com/settings/tokens (Contents read+write on pawhaven repo; enables weekly blog auto-commit)

### Vercel (dashboard)
- **Project name:** pawhaven-dashboard
- **Live URL:** https://pawhaven-dashboard.vercel.app
- **Purpose:** Hughes Financials internal dashboard — reads from same Upstash Redis

### GitHub
- **URL:** https://github.com/rosshughesbusiness-hue/pawhaven
- **Branch:** main (Vercel auto-deploys every push)

### Upstash Redis
- **URL:** https://console.upstash.com
- **Purpose:** pageviews, product performance, cart recovery, loyalty points, order data
- **Verify connection:** visit https://pawhavenpets.org/api/track/health

### Resend (email)
- **URL:** https://resend.com/dashboard
- **From address:** support@pawhavenpets.org
- **Owner email (escalations go here):** rossphughes@gmail.com

### CJDropshipping
- **URL:** https://app.cjdropshipping.com
- **API key env var:** CJ_API_KEY (already in Vercel)
- **NOTE:** CJ API v2.0 uses CJ_API_KEY only — NOT CJ_EMAIL/CJ_PASSWORD

### Anthropic (Claude API)
- **URL:** https://console.anthropic.com
- **Used for:** /api/contact AI triage (Haiku), /api/cron/blog-generator weekly posts

---

## 3. CHROME URLS TO HAVE OPEN

```
https://pawhavenpets.org                          — live store
https://pawhavenpets.org/api/track/health         — Redis health check / view counts
https://merchants.google.com/mc/policy/violations — CRITICAL: request review here
https://merchants.google.com                      — Merchant Center dashboard
https://vercel.com/dashboard                      — Vercel (check deploy status, add env vars)
https://github.com/rosshughesbusiness-hue/pawhaven — repo + commit history
https://dashboard.stripe.com                      — Stripe orders + webhooks
https://console.upstash.com                       — Redis console
https://resend.com/dashboard                      — Email logs
https://app.cjdropshipping.com                    — Fulfillment orders
https://analytics.google.com                      — GA4 traffic
https://business.facebook.com                     — Meta ads
https://console.anthropic.com                     — Get ANTHROPIC_API_KEY
https://github.com/settings/tokens               — Create GITHUB_TOKEN (fine-grained PAT)
https://pawhaven-dashboard.vercel.app             — Hughes Financials dashboard
```

---

## 4. REPOSITORY STRUCTURE

```
~/Claude/Projects/Drop Shipping/
├── pawhaven/                          # Main store (Next.js 14)
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.js             # Root layout, PageViewTracker, GA4, Meta Pixel, Google Ads
│   │   │   ├── page.js               # Homepage
│   │   │   ├── about/page.js         # About page (all fake stats/vet claims removed)
│   │   │   ├── contact/page.js       # Contact + FAQ + trust badges (client component)
│   │   │   └── api/
│   │   │       ├── contact/route.js  # Claude Haiku AI triage + auto-reply
│   │   │       ├── feed/route.js     # Google Shopping XML feed (GTIN fix applied)
│   │   │       ├── track/route.js    # Pageview tracking → Upstash Redis
│   │   │       ├── track/health/route.js  # Debug: Redis connection + live counts
│   │   │       ├── webhook/route.js  # Stripe webhook: fulfillment + per-product tracking
│   │   │       └── cron/
│   │   │           ├── review-requests/   # Daily 10am
│   │   │           ├── win-back/          # Daily 11am
│   │   │           ├── recommendations/  # Daily 12pm
│   │   │           ├── daily-digest/     # Daily 7am
│   │   │           ├── cart-recovery/    # Daily 8am
│   │   │           ├── transit-upsell/   # Daily 9am
│   │   │           ├── ad-video-generator/ # Weekly Sun 7am
│   │   │           ├── blog-generator/   # Weekly Mon 6am (needs ANTHROPIC_API_KEY + GITHUB_TOKEN)
│   │   │           └── performance/      # Weekly Mon 8am (emails top sellers report)
│   │   ├── components/
│   │   │   ├── Footer.js             # Trust badges (no fake stats)
│   │   │   └── PageViewTracker.js    # Client component: tracks pathname → /api/track
│   │   └── lib/
│   │       ├── products.js           # 40 products (IDs 1–40), CJ supplier IDs
│   │       └── blog.js               # 79+ blog posts (array ends with ] NO semicolon)
│   └── vercel.json                   # 9 crons configured
└── git_push.command                  # Double-click in Finder to git add + commit + push
```

---

## 5. WHAT WAS BUILT (this session, 2026-07-09)

### Commits pushed:

**9a37486** — `fix: remove all unsubstantiated vet/review claims sitewide — resolve Merchant Center misrepresentation`
- Ran Python scripts across all 50+ files
- Removed ALL: vet-approved, vet-backed, vet-reviewed, vet-recommended, "licensed veterinarians"
- Removed fabricated: "10,000+ Happy Pet Owners", "4.8★", "4.8/5 Rating", "10K+ Reviews"
- Kept only verifiable: "40+ Curated Products", "30-Day Returns", "Free Shipping Over $50"
- About page, homepage, footer, contact page all fixed individually with precise edits

**b44988f** — `feat: sales tracking, blog/performance crons, trust signals, view health check`
- Webhook now tracks per-product order counts in Redis (`product_perf:{id}` keys)
- NEW: `/api/cron/performance/route.js` — weekly email with top sellers + dead products (Mon 8am)
- NEW: `/api/track/health/route.js` — GET endpoint showing Redis connection + live view counts
- Updated `vercel.json` — added blog-generator (Mon 6am) + performance (Mon 8am) crons
- Footer: replaced fake "10K+ Happy Pets" badge with 4 accurate trust badges
- Contact page: added business info block + trust badges grid

### What was already built before this session:
- Full Next.js store with 40 products
- Stripe checkout + CJDropshipping auto-fulfillment
- 7 other cron automations (review requests, win-back, cart recovery, etc.)
- 79+ blog posts + 30+ SEO landing pages
- Loyalty points, referral tracking, affiliate pages
- Google Shopping feed with GTIN fix
- AI contact responder (Claude Haiku) — needs ANTHROPIC_API_KEY to activate
- Hughes Financials dashboard (separate Vercel project)

---

## 6. CRITICAL PENDING USER ACTIONS (cannot be done by AI)

### 🔴 CRITICAL — Do these first:

**1. Google Merchant Center — Request Policy Review**
- URL: https://merchants.google.com/mc/policy/violations
- Click "Request Review" on the Misrepresentation violation
- The code fix is already live. This is what unblocks Google Shopping ads.

**2. Google Merchant Center — Add Business Info**
- URL: https://merchants.google.com → Business Information
- Add a physical address (can be a registered business address or home)
- Add a phone number
- This is required for identity verification

**3. Google Merchant Center — Submit Identity Verification**
- Upload a government-issued ID
- Required before the review can be approved

### 🟡 IMPORTANT — Do these next:

**4. Vercel — Add ANTHROPIC_API_KEY**
- URL: https://vercel.com → pawhaven project → Settings → Environment Variables
- Get key from: https://console.anthropic.com
- Enables: AI contact responder + weekly blog auto-publish

**5. Vercel — Add GITHUB_TOKEN**
- URL: https://github.com/settings/tokens → Generate new token (fine-grained)
- Permissions needed: Contents = Read and Write, on repository: pawhaven
- Then add to: https://vercel.com → pawhaven project → Settings → Environment Variables
- Enables: weekly blog auto-commit to GitHub

**6. Meta Ads — Verify campaign is running**
- URL: https://business.facebook.com
- Check if the ad campaign set up in a prior session is actually published and live
- If not published, publish it

---

## 7. HOW GIT COMMITS WORK ON THIS SETUP

**The problem:** The sandbox Claude runs in can't delete `.git/index.lock` on the mounted filesystem (FUSE mount restriction). Normal `git commit` fails.

**The solution (already set up):**
1. Claude writes a `.command` file to the workspace folder
2. File is at: `~/Claude/Projects/Drop Shipping/git_push.command`
3. Open Finder → navigate to that folder → double-click `git_push.command`
4. macOS Terminal opens and runs `git add -A && git commit -m "..." && git push` automatically
5. Vercel picks up the push and auto-deploys in ~2 minutes

If `git_push.command` doesn't exist on the new computer (it's a generated file, not in the repo), tell Claude to create it. The content is:
```bash
#!/bin/bash
cd "$(dirname "$0")/pawhaven"
rm -f .git/index.lock .git/HEAD.lock
git add -A
git commit -m "deploy: update pawhaven"
git push
echo "Done. Press any key to close."
read -n 1
```

---

## 8. IMPORTANT CODE RULES (don't break these)

1. **blog.js array syntax** — array of posts ends with `]` (NO semicolon), followed immediately by `export function getPostBySlug`. If there's a semicolon after `]`, the file breaks.

2. **No 'use client' on page.js files** — only on component files. If a page needs state, extract the interactive part to a separate Client Component.

3. **CJ placeholder products** — Products 36–40 have `supplierProductId` starting with `'cj-placeholder-'`. The feed (`/api/feed/route.js`) already handles this: those IDs are NOT sent as GTINs to Google.

4. **All crons must authenticate** — check `x-cron-secret` header against `CRON_SECRET` env var. Without this, crons fail silently on Vercel.

5. **Python for large file edits** — `blog.js` is huge. Use Python scripts to edit it, not the Edit tool (Edit tool times out on very large files).

6. **Two Vercel projects** — `pawhaven` (store, pawhavenpets.org) and `pawhaven-dashboard` (Hughes Financials). Env vars must be added to the correct project.

---

## 9. WHAT TO DO NEXT (after Merchant Center is unblocked)

Once Shopping ads are live and generating revenue:
1. Monitor `/api/cron/performance` weekly email (arrives Monday 8am to rossphughes@gmail.com)
2. Check Hughes Financials dashboard (https://pawhaven-dashboard.vercel.app) for revenue/order data
3. Add ANTHROPIC_API_KEY + GITHUB_TOKEN to Vercel to activate blog auto-publish and AI contact triage
4. Consider running paid Meta ads if Google Shopping is slow
5. Check https://pawhavenpets.org/api/track/health to confirm Redis is tracking views

---

## 10. LIVE URLS TO TEST

| What | URL |
|------|-----|
| Store | https://pawhavenpets.org |
| Google Shopping feed | https://pawhavenpets.org/api/feed |
| Redis health check | https://pawhavenpets.org/api/track/health |
| Contact page | https://pawhavenpets.org/contact |
| About page | https://pawhavenpets.org/about |
| Dashboard | https://pawhaven-dashboard.vercel.app |

---

## 11. SETTING UP ON NEW COMPUTER

```bash
# 1. Install Node.js (https://nodejs.org) — v18 or v20

# 2. Install Git
# macOS: xcode-select --install (or download from git-scm.com)

# 3. Clone the repo
git clone https://github.com/rosshughesbusiness-hue/pawhaven.git

# 4. Install dependencies
cd pawhaven
npm install

# 5. For local dev (optional — store runs on Vercel, no local dev needed)
# Create .env.local with all env vars from Vercel
npm run dev  # runs on localhost:3000

# 6. Set up Cowork / Claude Desktop
# - Download Claude Desktop (https://claude.ai/download)
# - Open Cowork mode
# - Connect to the "Drop Shipping" folder (where you cloned the repo)
```

---

*Handoff created 2026-07-09. Last commits: 9a37486, b44988f.*
