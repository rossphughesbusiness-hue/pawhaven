import { NextResponse } from 'next/server';
import { products } from '@/lib/products';

const BASE = 'https://pawhavenpets.org';

// Google Product Category IDs for pet accessories
const GOOGLE_CATEGORY = {
  Dogs: '3, 2, 63', // Animals & Pet Supplies > Pet Supplies > Dog Supplies
  Cats: '3, 2, 46', // Animals & Pet Supplies > Pet Supplies > Cat Supplies
};

// Google product condition
const CONDITION = 'new';
const AVAILABILITY = 'in stock';

// Force JPEG on Unsplash URLs — Merchant Center requires JPEG/PNG/GIF
function forceJpeg(url) {
  if (!url || !url.includes('unsplash.com')) return url;
  return url.replace(/auto=format/g, 'fm=jpg').replace(/&fm=jpg&fm=jpg/g, '&fm=jpg');
}

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function productToItem(product) {
  const url = `${BASE}/products/${product.slug}`;
  const imageLink = forceJpeg(product.images?.[0] || product.image || '');
  const additionalImages = (product.images || []).slice(1, 4).map(forceJpeg);
  const price = product.price.toFixed(2);
  const comparePrice = product.comparePrice ? product.comparePrice.toFixed(2) : null;
  const category = GOOGLE_CATEGORY[product.category] || GOOGLE_CATEGORY.Dogs;
  const realSupplierId = product.supplierProductId && !String(product.supplierProductId).startsWith('cj-placeholder')
    ? product.supplierProductId : null;
  const gtin = realSupplierId ? `<g:gtin>${escapeXml(realSupplierId)}</g:gtin>` : '';
  const salePrice = comparePrice
    ? `<g:sale_price>${price} USD</g:sale_price>\n    <g:price>${comparePrice} USD</g:price>`
    : `<g:price>${price} USD</g:price>`;

  const additionalImageTags = additionalImages
    .map((img) => `    <g:additional_image_link>${escapeXml(img)}</g:additional_image_link>`)
    .join('\n');

  // Build product type path
  const productType = `Pet Supplies > ${product.category === 'Dogs' ? 'Dog' : 'Cat'} Supplies > ${escapeXml(product.tag)}`;

  return `  <item>
    <g:id>${escapeXml(String(product.id))}</g:id>
    <g:title>${escapeXml(product.name)}</g:title>
    <g:description>${escapeXml(product.shortDescription || product.description)}</g:description>
    <g:link>${url}</g:link>
    <g:image_link>${escapeXml(imageLink)}</g:image_link>
${additionalImageTags ? additionalImageTags + '\n' : ''}    <g:availability>${AVAILABILITY}</g:availability>
    <g:condition>${CONDITION}</g:condition>
    ${salePrice}
    <g:brand>PawHaven</g:brand>
    <g:google_product_category>${category}</g:google_product_category>
    <g:product_type>${productType}</g:product_type>
    ${gtin}
    <g:shipping>
      <g:country>US</g:country>
      <g:service>Standard</g:service>
      <g:price>${product.price >= 50 ? '0.00' : '5.99'} USD</g:price>
    </g:shipping>
    <g:identifier_exists>no</g:identifier_exists>
  </item>`;
}

export async function GET() {
  const now = new Date().toISOString();

  const items = products
    .filter((p) => p.stock > 0)
    .map(productToItem)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>PawHaven — Pet Accessories</title>
    <link>${BASE}</link>
    <description>Premium pet accessories for dogs and cats. Free shipping on orders over $50.</description>
    <lastBuildDate>${now}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
    },
  });
}
