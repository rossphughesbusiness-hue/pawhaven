/**
 * Frequently Bought Together pairings.
 * Key: product slug. Value: array of 2 companion slugs.
 */
export const FBT_MAP = {
  // Feeding
  'maze-slow-feeder-bowl':         ['calming-lick-mat', 'iq-puzzle-feeder-toy'],
  'calming-lick-mat':              ['maze-slow-feeder-bowl', 'orthopedic-memory-foam-dog-bed'],
  'iq-puzzle-feeder-toy':          ['maze-slow-feeder-bowl', 'calming-lick-mat'],
  'collapsible-travel-bowl-set':   ['retractable-pro-dog-leash', 'dog-car-seat-hammock'],

  // Walking & safety
  'safeglow-led-collar':           ['reflective-step-in-harness', 'retractable-pro-dog-leash'],
  'reflective-step-in-harness':    ['safeglow-led-collar', 'retractable-pro-dog-leash'],
  'retractable-pro-dog-leash':     ['reflective-step-in-harness', 'safeglow-led-collar'],

  // Comfort & wellness
  'orthopedic-memory-foam-dog-bed': ['calming-lick-mat', 'iq-puzzle-feeder-toy'],

  // Grooming
  'portable-paw-cleaner':          ['self-cleaning-slicker-brush', 'reflective-step-in-harness'],
  'self-cleaning-slicker-brush':   ['portable-paw-cleaner', 'orthopedic-memory-foam-dog-bed'],

  // Travel
  'dog-car-seat-hammock':          ['collapsible-travel-bowl-set', 'retractable-pro-dog-leash'],

  // Toys
  'crinkle-squeaky-toy-bundle':    ['iq-puzzle-feeder-toy', 'calming-lick-mat'],

  // Cats
  'silent-cat-water-fountain':     ['feather-wand-cat-teaser', 'cat-window-perch-hammock'],
  'feather-wand-cat-teaser':       ['interactive-automatic-laser-toy', 'cat-window-perch-hammock'],
  'cat-window-perch-hammock':      ['feather-wand-cat-teaser', 'silent-cat-water-fountain'],
  'interactive-automatic-laser-toy': ['feather-wand-cat-teaser', 'cozy-cat-cave-hideaway'],
  'premium-cat-carrier-backpack':  ['collapsible-travel-bowl-set', 'feather-wand-cat-teaser'],
  'cat-deshedding-grooming-glove': ['cat-window-perch-hammock', 'cozy-cat-cave-hideaway'],
  'cozy-cat-cave-hideaway':        ['cat-window-perch-hammock', 'silent-cat-water-fountain'],

  // New products (IDs 25-30)
  'cat-interactive-feeder-bowl':   ['silent-cat-water-fountain', 'cat-deshedding-grooming-glove'],
  'cat-tunnel-crinkle-play-tube':  ['feather-wand-cat-teaser', 'interactive-automatic-laser-toy'],
  'dog-cooling-gel-mat':           ['orthopedic-memory-foam-dog-bed', 'portable-paw-cleaner'],
  'sisal-cat-scratching-post':     ['cozy-cat-cave-hideaway', 'cat-window-perch-hammock'],
  'dog-treat-training-pouch':      ['reflective-step-in-harness', 'retractable-pro-dog-leash'],
  'heavy-duty-rope-tug-toy':       ['crinkle-squeaky-toy-bundle', 'iq-puzzle-feeder-toy'],

  // New products (IDs 31-35)
  'dog-water-bottle-leakproof':    ['reflective-step-in-harness', 'retractable-pro-dog-leash'],
  'cat-scratcher-curved-board':    ['cozy-cat-cave-hideaway', 'cat-tunnel-crinkle-play-tube'],
  'pet-nail-grinder-rechargeable': ['self-cleaning-slicker-brush', 'portable-paw-cleaner'],
  'dog-reflective-raincoat':       ['safeglow-led-collar', 'reflective-step-in-harness'],
  'cat-circuit-ball-track':        ['feather-wand-cat-teaser', 'cat-tunnel-crinkle-play-tube'],

  // New products (IDs 36-40)
  'dog-snuffle-mat':               ['iq-puzzle-feeder-toy', 'calming-lick-mat'],
  'cat-self-groomer-wall-corner':  ['cat-deshedding-grooming-glove', 'cozy-cat-cave-hideaway'],
  'dog-paw-balm-stick':            ['portable-paw-cleaner', 'self-cleaning-slicker-brush'],
  'cat-puzzle-slow-feeder':        ['silent-cat-water-fountain', 'cat-interactive-feeder-bowl'],
  'dog-reflective-safety-vest':    ['safeglow-led-collar', 'reflective-step-in-harness'],
};

/**
 * Returns up to 2 companion products for a given slug, resolved from the products array.
 */
export function getFBT(slug, products) {
  const companions = FBT_MAP[slug] || [];
  return companions
    .map((s) => products.find((p) => p.slug === s))
    .filter(Boolean)
    .slice(0, 2);
}
