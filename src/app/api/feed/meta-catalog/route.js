/**
 * Meta (Facebook/Instagram) Product Catalog Feed
 * Format: CSV (Meta\'s preferred format for simple catalogs)
 * Submit this URL in Meta Commerce Manager → Catalog → Data Sources → Feed
 * URL: https://pawhavenpets.org/api/feed/meta-catalog
 *
 * Required fields: id, title, description, availability, condition, price,
 *                  link, image_link, brand
 * Recommended:     sale_price, google_product_category, product_type,
 *                  additional_image_link, retailer_product_group_id
 */

import { products } from '@/lib/products';

const BASE = 'https://pawhavenpets.org';
const BRAND = 'PawHaven';

function csvCell(value) {
  const str = String(value ?? '').replace(/"/g, '""');
  // Quote if contains comma, newline, or double-quote
  return /[,"\n\r]/.test(str) ? `"${str}"` : str;
}

function csvRow(cells) {
  return cells.map(csvCell).join(',');
}

// Meta category taxonomy (subset relevant to pet supplies)
// https://www.facebook.com/products/categories
function metaCategory(tag) {
  const map = {
    Feeding:         'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Bowls & Feeders',
    Comfort:         'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Beds',
    Play:            'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Toys',
    Walking:         'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Collars, Harnesses & Leashes',
    Safety:          'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Collars, Harnesses & Leashes',
    Travel:          'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Carriers & Travel Products',
    Grooming:        'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Grooming Supplies',
    Training:        'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Training & Obedience Supplies',
    'Anxiety Relief':'Animals & Pet Supplies > Pet Supplies > Dog Supplies',
    Enrichment:      'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Toys',
    'Cat Feeding':   'Animals & Pet Supplies > Pet Supplies > Cat Supplies > Cat Bowls & Feeders',
    'Cat Comfort':   'Animals & Pet Supplies > Pet Supplies > Cat Supplies > Cat Beds',
    'Cat Play':      'Animals & Pet Supplies > Pet Supplies > Cat Supplies > Cat Toys',
    'Cat Accessories':'Animals & Pet Supplies > Pet Supplies > Cat Supplies',
  };
  return map[tag] || 'Animals & Pet Supplies > Pet Supplies';
}

export async function GET() {
  const headers = [
    'id',
    'title',
    'description',
    'availability',
    'condition',
    'price',
    'sale_price',
    'link',
    'image_link',
    'additional_image_link',
    'brand',
    'google_product_category',
    'product_type',
    'retailer_product_group_id',
    'custom_label_0',
    'custom_label_1',
  ];

  const rows = products.map((p) => {
    const inStock = (p.stock ?? 1) > 0;
    const price = `${p.price.toFixed(2)} USD`;
    const salePrice = p.comparePrice ? `${p.price.toFixed(2)} USD` : '';
    const image = p.images?.[0] || p.image || '';
    // Meta supports up to 10 additional images, comma-separated in one cell
    const additionalImages = (p.images || []).slice(1, 10).join(',');
    const description = (p.shortDescription || p.description || p.name).slice(0, 5000);

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
      metaCategory(p.tag),
      p.tag || 'Pet Accessories',
      p.id, // group_id = product id (variants would share this)
      p.badge || '',             // custom_label_0: badge (Best Seller, etc.)
      p.category || '',          // custom_label_1: Dogs / Cats
    ]);
  });

  const csv = [csvRow(headers), ...rows].join('\n');

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=UTF-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Content-Disposition': 'inline; filename="meta-catalog.csv"',
    },
  });
}
