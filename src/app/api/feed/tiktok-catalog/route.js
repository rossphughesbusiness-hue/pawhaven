/**
 * TikTok Shop Product Catalog Feed
 * Format: CSV (TikTok\'s required format for catalog ingestion)
 * Submit in TikTok Ads Manager → Assets → Catalog → Create Catalog → Import from URL
 * URL: https://pawhavenpets.org/api/feed/tiktok-catalog
 *
 * Docs: https://ads.tiktok.com/marketing_api/docs?id=1739566752522241
 * Required: sku_id, title, description, availability, condition, price,
 *            link, image_link, brand
 */

import { products } from '@/lib/products';

const BASE = 'https://pawhavenpets.org';
const BRAND = 'PawHaven';

function csvCell(value) {
  const str = String(value ?? '').replace(/"/g, '""');
  return /[,"\n\r]/.test(str) ? `"${str}"` : str;
}

function csvRow(cells) {
  return cells.map(csvCell).join(',');
}

// TikTok uses Google\'s product category taxonomy
function tiktokCategory(tag) {
  const map = {
    Feeding:          'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Bowls & Feeders',
    Comfort:          'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Beds',
    Play:             'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Toys',
    Walking:          'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Collars, Harnesses & Leashes',
    Safety:           'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Collars, Harnesses & Leashes',
    Travel:           'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Carriers & Travel Products',
    Grooming:         'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Grooming Supplies',
    Training:         'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Training & Obedience Supplies',
    'Anxiety Relief': 'Animals & Pet Supplies > Pet Supplies > Dog Supplies',
    Enrichment:       'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Toys',
    'Cat Feeding':    'Animals & Pet Supplies > Pet Supplies > Cat Supplies > Cat Bowls & Feeders',
    'Cat Comfort':    'Animals & Pet Supplies > Pet Supplies > Cat Supplies > Cat Beds',
    'Cat Play':       'Animals & Pet Supplies > Pet Supplies > Cat Supplies > Cat Toys',
    'Cat Accessories':'Animals & Pet Supplies > Pet Supplies > Cat Supplies',
  };
  return map[tag] || 'Animals & Pet Supplies > Pet Supplies';
}

export async function GET() {
  // TikTok field names differ slightly from Meta/Google
  const headers = [
    'sku_id',           // unique product identifier
    'title',
    'description',
    'availability',     // 'in stock' | 'out of stock' | 'preorder'
    'condition',        // 'new' | 'refurbished' | 'used'
    'price',            // e.g. "24.99 USD"
    'sale_price',
    'link',
    'image_link',
    'additional_image_link',
    'brand',
    'google_product_category',
    'custom_label_0',   // used for TikTok audience segmentation
    'custom_label_1',
    'custom_label_2',
    'shipping',         // "US:::0 USD" format
  ];

  const rows = products.map((p) => {
    const inStock = (p.stock ?? 1) > 0;
    const price = `${p.price.toFixed(2)} USD`;
    const salePrice = p.comparePrice ? `${p.price.toFixed(2)} USD` : '';
    const image = p.images?.[0] || p.image || '';
    const additionalImages = (p.images || []).slice(1, 10).join(',');
    const description = (p.shortDescription || p.description || p.name).slice(0, 5000);

    // Compute savings % for segmentation labels
    const savingsPct = p.comparePrice
      ? Math.round(((p.comparePrice - p.price) / p.comparePrice) * 100)
      : 0;
    const savingsLabel = savingsPct >= 40 ? '40%+ Off' : savingsPct >= 25 ? '25-39% Off' : savingsPct > 0 ? 'On Sale' : '';

    return csvRow([
      p.id,
      p.name,
      description,
      inStock ? 'in stock' : 'out of stock',
      'new',
      price,
      salePrice,
      `${BASE}/products/${p.slug}`,
      image,
      additionalImages,
      BRAND,
      tiktokCategory(p.tag),
      p.badge || '',          // custom_label_0: Best Seller, Fan Favorite, etc.
      p.category || '',       // custom_label_1: Dogs / Cats
      savingsLabel,           // custom_label_2: discount tier for DPA targeting
      'US:::0.00 USD',        // free shipping
    ]);
  });

  const csv = [csvRow(headers), ...rows].join('\n');

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=UTF-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Content-Disposition': 'inline; filename="tiktok-catalog.csv"',
    },
  });
}
