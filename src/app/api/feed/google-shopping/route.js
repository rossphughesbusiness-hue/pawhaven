import { products } from '@/lib/products';

const BASE = 'https://pawhavenpets.org';
const STORE_NAME = 'PawHaven';

function escapeXml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Map product tags to Google product categories
const CATEGORY_MAP = {
  Feeding: 'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Bowls & Feeders',
  Comfort: 'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Beds',
  Play: 'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Toys',
  Walking: 'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Collars, Harnesses & Leashes',
  Safety: 'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Collars, Harnesses & Leashes',
  Travel: 'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Carriers & Travel Products',
  Grooming: 'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Grooming Supplies',
  Health: 'Animals & Pet Supplies > Pet Supplies > Dog Supplies',
  Training: 'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Training & Obedience Supplies',
  'Cat Feeding': 'Animals & Pet Supplies > Pet Supplies > Cat Supplies > Cat Bowls & Feeders',
  'Cat Comfort': 'Animals & Pet Supplies > Pet Supplies > Cat Supplies > Cat Beds',
  'Cat Accessories': 'Animals & Pet Supplies > Pet Supplies > Cat Supplies',
};

function getGoogleCategory(product) {
  return CATEGORY_MAP[product.tag] || 'Animals & Pet Supplies > Pet Supplies';
}

function buildItem(p) {
  const url = `${BASE}/products/${p.slug}`;
  const image = p.images?.[0] || '';
  const additionalImages = (p.images || []).slice(1, 10);
  const inStock = (p.stock ?? 1) > 0;
  const price = p.price.toFixed(2);
  const category = getGoogleCategory(p);

  // Build variant entries if product has variants
  const variants = p.variants || [];
  const hasVariants = variants.length > 0;

  if (!hasVariants) {
    return `
    <item>
      <g:id>${escapeXml(String(p.id))}</g:id>
      <g:title>${escapeXml(p.name)}</g:title>
      <g:description>${escapeXml(p.description || p.shortDescription || p.name)}</g:description>
      <g:link>${escapeXml(url)}</g:link>
      <g:image_link>${escapeXml(image)}</g:image_link>
      ${additionalImages.map(img => `<g:additional_image_link>${escapeXml(img)}</g:additional_image_link>`).join('\n      ')}
      <g:availability>${inStock ? 'in_stock' : 'out_of_stock'}</g:availability>
      <g:price>${price} USD</g:price>
      <g:brand>${STORE_NAME}</g:brand>
      <g:condition>new</g:condition>
      <g:google_product_category>${escapeXml(category)}</g:google_product_category>
      <g:product_type>${escapeXml(p.tag || 'Pet Accessories')}</g:product_type>
      <g:shipping>
        <g:country>US</g:country>
        <g:service>Standard</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
      ${p.supplierSku ? `<g:mpn>${escapeXml(p.supplierSku)}</g:mpn>` : `<g:identifier_exists>no</g:identifier_exists>`}
      ${p.rating ? `<g:rating>${p.rating}</g:rating>` : ''}
    </item>`;
  }

  // For products with variants, emit one entry per variant combination
  // (simplified: emit a single entry with item_group_id marker)
  return `
    <item>
      <g:id>${escapeXml(String(p.id))}</g:id>
      <g:item_group_id>${escapeXml(String(p.id))}</g:item_group_id>
      <g:title>${escapeXml(p.name)}</g:title>
      <g:description>${escapeXml(p.description || p.shortDescription || p.name)}</g:description>
      <g:link>${escapeXml(url)}</g:link>
      <g:image_link>${escapeXml(image)}</g:image_link>
      ${additionalImages.map(img => `<g:additional_image_link>${escapeXml(img)}</g:additional_image_link>`).join('\n      ')}
      <g:availability>${inStock ? 'in_stock' : 'out_of_stock'}</g:availability>
      <g:price>${price} USD</g:price>
      <g:brand>${STORE_NAME}</g:brand>
      <g:condition>new</g:condition>
      <g:google_product_category>${escapeXml(category)}</g:google_product_category>
      <g:product_type>${escapeXml(p.tag || 'Pet Accessories')}</g:product_type>
      <g:shipping>
        <g:country>US</g:country>
        <g:service>Standard</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
      <g:identifier_exists>no</g:identifier_exists>
    </item>`;
}

export async function GET() {
  const items = products.map(buildItem).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${STORE_NAME} — Premium Pet Accessories</title>
    <link>${BASE}</link>
    <description>Shop vet-approved accessories for dogs and cats. Free shipping on orders over $50.</description>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=UTF-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
