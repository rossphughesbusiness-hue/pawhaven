import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/blog';

export const metadata = {
  title: 'Blog — Pet Care Tips & Product Guides',
  description: 'Vet-approved advice on dog nutrition, anxiety, safety, and more. Plus honest product reviews from real pet owners.',
};

function formatDate(str) {
  return new Date(str).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="text-brand-500 font-bold text-sm uppercase tracking-widest mb-3">PawHaven Blog</p>
          <h1 className="text-4xl sm:text-5xl font-black text-navy-900 mb-4">Pet Care, Simplified</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Vet-reviewed guides on feeding, health, safety, and the products that actually make a difference.
          </p>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {posts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative sm:w-72 h-52 sm:h-auto flex-shrink-0 overflow-hidden">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 288px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority={i === 0}
                  />
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-600 text-xs font-bold px-3 py-1 rounded-full">
                      <span>{post.emoji}</span>
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-xs">{post.readTime}</span>
                  </div>

                  <h2 className="text-xl font-black text-navy-900 mb-3 group-hover:text-brand-500 transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-gray-400 text-xs">{formatDate(post.date)}</span>
                    <span className="text-brand-500 font-bold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read article →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
