import { products } from './products';

// Bundle definitions: productIds + bundleTotal drive everything else
const bundleDefs = [
  {
    id: 'mealtime-essentials',
    name: 'Mealtime Essentials Bundle',
    tagline: 'Help your dog eat slower, calmer, and happier',
    emoji: '🍽️',
    gradient: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%)',
    accentColor: '#f97316',
    chipColor: 'bg-orange-100 text-orange-700',
    productIds: [1, 2, 14],
    bundleTotal: 49.99,
    // Discounted per-item prices (proportional, sum = bundleTotal)
    itemPrices: { 1: 20.83, 2: 16.66, 14: 12.50 },
  },
  {
    id: 'walk-essentials',
    name: 'Walk Essentials Bundle',
    tagline: 'Stay safe and in control on every walk',
    emoji: '🦮',
    gradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    accentColor: '#3b82f6',
    chipColor: 'bg-blue-100 text-blue-700',
    productIds: [5, 15, 8],
    bundleTotal: 71.99,
    itemPrices: { 5: 20.45, 15: 27.00, 8: 24.54 },
  },
  {
    id: 'calm-dog',
    name: 'Calm Dog Bundle',
    tagline: 'Reduce anxiety and boredom with enrichment essentials',
    emoji: '🐾',
    gradient: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
    accentColor: '#8b5cf6',
    chipColor: 'bg-purple-100 text-purple-700',
    productIds: [2, 12, 6],
    bundleTotal: 103.99,
    itemPrices: { 2: 16.24, 12: 22.75, 6: 65.00 },
  },
];

export function getBundles() {
  return bundleDefs.map((def) => {
    const bundleProducts = def.productIds
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean);

    const originalTotal = parseFloat(
      bundleProducts.reduce((sum, p) => sum + p.price, 0).toFixed(2)
    );
    const savings = parseFloat((originalTotal - def.bundleTotal).toFixed(2));
    const savingsPct = Math.round((savings / originalTotal) * 100);

    return {
      ...def,
      products: bundleProducts,
      originalTotal,
      savings,
      savingsPct,
    };
  });
}

export function getBundleById(id) {
  return getBundles().find((b) => b.id === id) || null;
}
