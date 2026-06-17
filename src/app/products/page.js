import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export const metadata = {
  title: 'All Products — PawHaven',
  description: 'Shop our full collection of vet-approved pet accessories for dogs and cats.',
};

const categories = ['All', 'Dogs', 'Cats'];

export default function ProductsPage({ searchParams }) {
  const category = searchParams?.category || 'All';

  const filtered =
    category === 'All'
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-black text-navy-900 mb-2">
            {category === 'All' ? 'All Products' : `${category} Accessories`}
          </h1>
          <p className="text-gray-500 text-lg">
            {filtered.length} vet-approved product{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category filter tabs */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <a
              key={cat}
              href={cat === 'All' ? '/products' : `/products?category=${cat}`}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                category === cat
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'bg-white text-navy-700 border border-gray-200 hover:border-brand-300 hover:text-brand-500'
              }`}
            >
              {cat}
            </a>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🐾</div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">No products found</h2>
            <p className="text-gray-500">Check back soon — we're always adding new items.</p>
          </div>
        )}
      </div>
    </div>
  );
}
