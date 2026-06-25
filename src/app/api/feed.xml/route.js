import { products } from '@/lib/products';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Google product category mapping
const GOOGLE_CATEGORY = {
  Dogs: 'Pets & Animals > Pet Supplies > Dog Supplies',
  Cats: 'Pets & Animals > Pet Supplies > Cat Supplies',
};

function escapeXml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildFeed() {
  const base = 'https://www.pawhavenpets.org';
  const now = new Date().toUTCString();

  const items = products.map((p) => {
    const url = `${base}/products/${p.slug}`;
    const imageUrl = p.image?.startsWith('http') ? p.image : `${base}${p.image}`;
    const price = Number(p.price).toFixed(2);
    const category = GOOGLE_CATEGORY[p.category] ?? 'Pets & Animals > Pet Supplies';

    return `
    <item>
      <g:id>${escapeXml(String(p.id))}</g:id>
      <g:title>${escapeXml(p.name)}</g:title>
      <g:description>${escapeXml(p.shortDescription || p.description?.slice(0, 500) || p.name)}</g:description>
      <g:link>${escapeXml(url)}</g:link>
      <g:image_link>${escapeXml(imageUrl)}</g:image_link>
      <g:price>${price} USD</g:price>
      <g:availability>in_stock</g:availability>
      <g:condition>new</g:condition>
      <g:brand>PawHaven</g:brand>
      <g:google_product_category>${escapeXml(category)}</g:google_product_category>
      <g:product_type>${escapeXml(p.category)} &gt; ${escapeXml(p.tag || p.category)}</g:product_type>
      <g:identifier_exists>no</g:identifier_exists>
      <g:shipping>
        <g:country>US</g:country>
        <g:service>Standard</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>PawHaven</title>
    <link>https://www.pawhavenpets.org</link>
    <description>Premium pet accessories for dogs and cats. Free shipping over $50.</description>
    <lastBuildDate>${now}</lastBuildDate>
    ${items}
  </channel>
</rss>`;
}

export async function GET() {
  const xml = buildFeed();
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
