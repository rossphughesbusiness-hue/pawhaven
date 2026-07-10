# PawHaven — Master Prompt for New Claude Session
# Copy everything below the line and paste as your first message

---

You are continuing autonomous development on my PawHaven dropshipping store. This prompt is 100% self-contained — everything you need is here. Do not ask me any questions. Do not wait for permission. Start working immediately.

---

## CRITICAL INSTRUCTION

**You must not ask a single question before acting.** If a folder is not connected, use `request_cowork_directory` to ask me to select one, then proceed the moment I connect it. If something is missing, figure it out from what's available. The only thing I want to see is you working.

---

## WHAT THIS PROJECT IS

PawHaven is a fully automated pet accessories dropshipping store.

- **Live store:** https://pawhavenpets.org
- **GitHub repo:** https://github.com/rosshughesbusiness-hue/pawhaven
- **Dashboard:** https://pawhaven-dashboard.vercel.app (Hughes Financials)
- **Owner:** Ross Hughes — rossphughes@gmail.com
- **Stack:** Next.js 14 App Router, Tailwind CSS, Vercel, Stripe, CJDropshipping, Upstash Redis, Resend
- **Deployment:** Vercel auto-deploys every push to `main` branch (~2 min)

---

## CURRENT REVENUE: $0 — HERE IS WHY AND WHAT MUST HAPPEN

The store is blocked from Google Shopping because of a **Merchant Center Misrepresentation policy violation** (Account ID: 5815174397). The code fix was deployed on 2026-07-09 (commits 9a37486 and b44988f). What's left is the user manually requesting review.

**The user (Ross) must do these — Claude cannot do them:**

1. **MOST CRITICAL:** https://merchants.google.com/mc/policy/violations → click "Request Review"
2. **Merchant Center:** Add physical address + phone number in Business Information
3. **Merchant Center:** Submit identity verification (government-issued ID)
4. **Vercel env var:** Add `ANTHROPIC_API_KEY` to pawhaven project — get from https://console.anthropic.com — enables AI contact triage + weekly blog auto-publish
5. **Vercel env var:** Add `GITHUB_TOKEN` to pawhaven project — fine-grained PAT at https://github.com/settings/tokens (Contents: Read & Write on pawhaven repo) — enables blog-generator cron to auto-commit posts
6. **Meta Ads:** Check https://business.facebook.com — verify the ad campaign is published and live

---

## ACCOUNTS & CREDENTIALS

| Service | URL | Notes |
|---------|-----|-------|
| Google Merchant Center | https://merchants.google.com | Account ID: 5815174397 — policy violation FIXED in code, needs review request |
| Vercel (store) | https://vercel.com/dashboard | Project: pawhaven → pawhavenpets.org |
| Vercel (dashboard) | https://vercel.com/dashboard | Project: pawhaven-dashboard → pawhaven-dashboard.vercel.app |
| GitHub | https://github.com/rosshughesbusiness-hue/pawhaven | main branch, Vercel auto-deploys |
| Stripe | https://dashboard.stripe.com | Keys in Vercel env |
| Upstash Redis | https://console.upstash.com | Pageviews, product tracking, cart, loyalty, orders |
| Resend | https://resend.com/dashboard | Emails from support@pawhavenpets.org |
| CJDropshipping | https://app.cjdropshipping.com | Auto-fulfillment, env var: CJ_API_KEY |
| Google Analytics | https://analytics.google.com | NEXT_PUBLIC_GA_ID in Vercel |
| Meta Business | https://business.facebook.com | NEXT_PUBLIC_META_PIXEL_ID in Vercel |
| Anthropic Console | https://console.anthropic.com | Get ANTHROPIC_API_KEY here |
| Google Ads | https://ads.google.com | Conversion ID: AW-18269545115 |

**Vercel env vars already set (pawhaven project):**
STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_ID, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, RESEND_API_KEY, RESEND_AUDIENCE_ID, CJ_API_KEY, CRON_SECRET, NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_META_PIXEL_ID

**Vercel env vars MISSING (pawhaven project):**
- `ANTHROPIC_API_KEY` — enables /api/contact AI triage + /api/cron/blog-generator
- `GITHUB_TOKEN` — enables blog-generator to auto-commit new posts

---

## REPO STRUCTURE

```
pawhaven/
├── src/
│   ├── app/
│   │   ├── layout.js               — root layout, PageViewTracker, GA4, Meta Pixel, Google Ads
│   │   ├── page.js                 — homepage
│   │   ├── about/page.js           — about page (all fake stats removed)
│   │   ├── contact/page.js         — contact + FAQ + trust badges (CLIENT component)
│   │   └── api/
│   │       ├── contact/route.js    — Claude Haiku AI triage + auto-reply to customer
│   │       ├── feed/route.js       — Google Shopping XML feed (GTIN fix applied)
│   │       ├── track/route.js      — pageview tracking → Upstash Redis
│   │       ├── track/health/route.js — Redis health check + live pageview counts
│   │       ├── webhook/route.js    — Stripe webhook: fulfillment + per-product tracking
│   │       └── cron/
│   │           ├── review-requests/    daily 10am — email review requests
│   │           ├── win-back/           daily 11am — win-back emails
│   │           ├── recommendations/    daily 12pm — product recommendations
│   │           ├── daily-digest/       daily 7am  — daily stats email to owner
│   │           ├── cart-recovery/      daily 8am  — abandoned cart recovery
│   │           ├── transit-upsell/     daily 9am  — in-transit upsell emails
│   │           ├── ad-video-generator/ weekly Sun 7am
│   │           ├── blog-generator/     weekly Mon 6am (needs ANTHROPIC_API_KEY + GITHUB_TOKEN)
│   │           └── performance/        weekly Mon 8am — emails top sellers report to Ross
│   ├── components/
│   │   ├── Footer.js               — trust badges (accurate claims only, no fake stats)
│   │   └── PageViewTracker.js      — client component, tracks pathname → /api/track
│   └── lib/
│       ├── products.js             — 40 products (IDs 1–40)
│       └── blog.js                 — 79+ blog posts
├── vercel.json                     — 9 crons configured
├── git_push.command                — double-click in Finder to commit + push (see below)
└── PAWHAVEN_HANDOFF.md             — full reference doc
```

---

## WHAT WAS BUILT (last session: 2026-07-09)

**Commit 9a37486** — removed all unsubstantiated claims sitewide:
- Removed: vet-approved, vet-backed, vet-reviewed, vet-recommended, "licensed veterinarians" — from 50+ files
- Removed: "10,000+ Happy Pet Owners", "4.8★", "4.8/5 Rating", "10K+ Reviews" — fabricated stats
- Kept only verifiable: "40+ Curated Products", "30-Day Returns", "Free Shipping Over $50"

**Commit b44988f** — built sales tracking + automation:
- Webhook tracks per-product order counts in Redis (`product_perf:{id}` keys)
- NEW: `/api/cron/performance` — weekly Mon 8am email with top sellers + dead products list
- NEW: `/api/track/health` — GET endpoint showing Redis connection + live pageview counts
- Added blog-generator + performance to vercel.json (9 crons total now)
- Footer + contact page trust signals updated

---

## CRITICAL CODE RULES (breaking these breaks the site)

1. **`blog.js` array syntax** — the posts array ends with `]` (NO semicolon). A semicolon after `]` breaks the file. Use Python scripts to edit blog.js — it's too large for the Edit tool.

2. **No `'use client'` on page files** — only on component files. If a page needs React state, extract to a separate client component. This is Next.js 14 App Router.

3. **CJ placeholder products** — products 36–40 have `supplierProductId` starting with `'cj-placeholder-'`. The Shopping feed (`/api/feed/route.js`) excludes these from GTINs. Don't break this logic.

4. **All crons check auth** — `x-cron-secret` header must match `CRON_SECRET` env var. Without this, crons silently fail on Vercel.

5. **Two Vercel projects** — `pawhaven` (store) and `pawhaven-dashboard` (dashboard). Env vars must go to the correct project.

6. **CJDropshipping API** — uses `CJ_API_KEY` only. NOT `CJ_EMAIL`/`CJ_PASSWORD`. API v2.0.

---

## GIT COMMIT WORKFLOW (non-standard — read this)

Claude's sandbox can't delete `.git/index.lock` on the FUSE-mounted user filesystem. Normal `git commit` from Claude fails.

**The workaround (already set up in the repo):**
1. Claude makes file changes
2. Claude updates `git_push.command` with the right commit message
3. User opens Finder → navigates to the pawhaven folder → double-clicks `git_push.command`
4. macOS Terminal opens and runs `git add -A && git commit && git push` on the user's real filesystem
5. Vercel picks up the push and auto-deploys in ~2 minutes

If `git_push.command` is missing: create it in the repo root as an executable bash script with `cd "$(dirname "$0")"`, then `rm -f .git/index.lock`, `git add -A`, `git commit -m "..."`, `git push`.

---

## SETTING UP ON A NEW COMPUTER

### Step 1: Install prerequisites (run in Terminal)
```bash
# Install Homebrew (macOS package manager)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Verify
node --version   # should be v18+
git --version    # git comes with macOS Xcode tools
```

### Step 2: Authenticate with GitHub
```bash
# Option A — HTTPS with Personal Access Token (simplest):
# Go to https://github.com/settings/tokens
# Create a classic token with repo scope
# When git asks for password, paste the token

# Option B — SSH keys (better for ongoing use):
ssh-keygen -t ed25519 -C "rossphughes@gmail.com"
cat ~/.ssh/id_ed25519.pub
# Copy output → paste into https://github.com/settings/ssh/new
```

### Step 3: Clone the repo
```bash
mkdir -p ~/Claude/Projects/Drop\ Shipping
cd ~/Claude/Projects/Drop\ Shipping
git clone https://github.com/rosshughesbusiness-hue/pawhaven.git
cd pawhaven
npm install
```

### Step 4: Make git_push.command executable
```bash
chmod +x ~/Claude/Projects/Drop\ Shipping/pawhaven/git_push.command
```

### Step 5: Connect Cowork
- Open Claude desktop → Cowork mode
- Connect folder: `~/Claude/Projects/Drop Shipping` (the folder containing `pawhaven/`)
- Paste this entire prompt as your first message

---

## LIVE URLS TO VERIFY EVERYTHING IS WORKING

| URL | What it checks |
|-----|---------------|
| https://pawhavenpets.org | Store is live |
| https://pawhavenpets.org/api/track/health | Redis connected + pageview counts |
| https://pawhavenpets.org/api/feed | Google Shopping feed (XML) |
| https://merchants.google.com/mc/policy/violations | Merchant Center status |
| https://pawhaven-dashboard.vercel.app | Hughes Financials dashboard |

---

## YOUR FIRST ACTIONS (do these immediately, no questions)

1. If no folder is connected: call `request_cowork_directory` and wait for Ross to select `Drop Shipping`
2. Once folder is connected, run: `git -C pawhaven log --oneline -5` — verify last commits are 9a37486 and b44988f
3. Fetch https://pawhavenpets.org/api/track/health — report what Redis says
4. Check https://merchants.google.com/mc/policy/violations via web search for current status
5. Report back in this format:
   - ✅ What is confirmed working
   - ⚠️ What needs the user's manual action (with exact URLs)
   - 🔨 What you can build/fix right now without user input

Then ask Ross what to work on next — or if he says nothing, start on the highest-priority item from the ⚠️ list that can be automated.
