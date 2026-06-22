import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/blog';

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.heroImage, alt: post.title }],
      type: 'article',
      publishedTime: post.date,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description, images: [post.heroImage] },
  };
}

function formatDate(str) {
  return new Date(str).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

/** Very simple Markdown-to-JSX renderer — handles ##, **bold**, - bullets, paragraphs */
function renderContent(raw) {
  const lines = raw.trim().split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) { i++; continue; }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-2xl font-black text-navy-900 mt-10 mb-4">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('- ')) {
      // Collect consecutive list items
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-2 my-4 text-gray-700">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
          ))}
        </ul>
      );
      continue;
    } else {
      // Paragraph
      elements.push(
        <p key={i} className="text-gray-700 leading-relaxed my-4 text-base"
          dangerouslySetInnerHTML={{ __html: inlineFormat(line) }}
        />
      );
    }

    i++;
  }

  return elements;
}

function inlineFormat(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-navy-900">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.heroImage,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'PawHaven' },
    publisher: { '@type': 'Organization', name: 'PawHaven', url: 'https://pawhavenpets.org' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-white">
        {/* Hero image */}
        <div className="relative h-72 sm:h-96 overflow-hidden bg-gray-100">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 bg-brand-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {post.emoji} {post.category}
                </span>
                <span className="text-white/70 text-sm">{post.readTime}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">{post.title}</h1>
            </div>
          </div>
        </div>

        {/* Article */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-100">
            <span>By <strong className="text-navy-900">PawHaven Team</strong></span>
            <span>·</span>
            <time>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          {/* Lead */}
          <p className="text-lg text-gray-600 leading-relaxed font-medium mb-8 italic">{post.description}</p>

          {/* Body */}
          <div className="prose-content">
            {renderContent(post.content)}
          </div>

          {/* CTA */}
          <div className="mt-14 bg-gradient-to-br from-brand-50 to-orange-50 border border-brand-100 rounded-3xl p-8 text-center">
            <div className="text-4xl mb-3">🐾</div>
            <h3 className="text-2xl font-black text-navy-900 mb-2">Ready to Try It?</h3>
            <p className="text-gray-500 mb-6 text-sm">
              Everything mentioned in this article ships free. Use code <strong className="text-brand-500">WELCOME10</strong> for 10% off your first order.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-bold px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/30 hover:-translate-y-0.5"
            >
              Shop PawHaven →
            </Link>
          </div>

          {/* More articles */}
          {allPosts.length > 0 && (
            <div className="mt-14">
              <h2 className="text-2xl font-black text-navy-900 mb-6">More Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {allPosts.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                    <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-200 transition-colors">
                      <div className="relative h-36 overflow-hidden">
                        <Image
                          src={p.heroImage}
                          alt={p.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <span className="text-xs font-bold text-brand-500">{p.emoji} {p.category}</span>
                        <h3 className="font-bold text-navy-900 text-sm mt-1 line-clamp-2 group-hover:text-brand-500 transition-colors">
                          {p.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back */}
          <div className="mt-10 pt-8 border-t border-gray-100">
            <Link href="/blog" className="text-brand-500 font-semibold hover:text-brand-600 transition-colors">
              ← All Articles
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
