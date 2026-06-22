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
