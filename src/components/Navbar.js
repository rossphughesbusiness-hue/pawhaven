'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import SearchModal from './SearchModal';
import { useWishlist } from '@/context/WishlistContext';

const DOG_LINKS = [
  { href: '/dogs', label: '🐶 All Dogs', desc: 'Browse every dog product' },
  { href: '/puppies', label: '🐕 Puppies', desc: 'New puppy essentials' },
  { href: '/small-dogs', label: '🦮 Small Dogs', desc: 'Sized for small breeds' },
  { href: '/senior-dogs', label: '🐾 Senior Dogs', desc: 'Joint, mobility & comfort' },
  { href: '/dog-training', label: '🎯 Training', desc: 'Treat pouches & gear' },
  { href: '/dog-walking', label: '🐾 Walking Gear', desc: 'Harness, leash & more' },
  { href: '/dog-toys', label: '🧸 Toys', desc: 'Tug, puzzle & squeaky' },
  { href: '/dog-enrichment', label: '🧠 Enrichment', desc: 'Puzzles & mental stim' },
  { href: '/dog-beds', label: '🛏️ Beds', desc: 'Orthopedic & cooling' },
  { href: '/grooming', label: '✂️ Grooming', desc: 'Brushes & paw cleaners' },
  { href: '/travel', label: '✈️ Travel', desc: 'Car & on-the-go gear' },
  { href: '/anxiety', label: '😌 Anxiety', desc: 'Calming products' },
];

const CAT_LINKS = [
  { href: '/cats', label: '🐱 All Cats', desc: 'Browse every cat product' },
  { href: '/kittens', label: '🐱 Kittens', desc: 'New kitten essentials' },
  { href: '/indoor-cats', label: '🏠 Indoor Cats', desc: 'Essential indoor kit' },
  { href: '/cat-enrichment', label: '🎾 Enrichment', desc: 'Toys & mental stimulation' },
  { href: '/cat-toys', label: '🧶 Cat Toys', desc: 'Wands, lasers & tunnels' },
  { href: '/cat-beds', label: '😴 Cat Beds', desc: 'Caves, perches & hideaways' },
  { href: '/senior-cats', label: '🌸 Senior Cats', desc: 'Comfort & care for cats 7+' },
  { href: '/grooming', label: '✂️ Grooming', desc: 'Brushes & deshedding tools' },
  { href: '/travel', label: '✈️ Travel', desc: 'Carriers & on-the-go gear' },
];

function NavDropdown({ label, href, links }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        className="flex items-center gap-1 text-navy-700 hover:text-brand-500 font-medium transition-colors duration-200 relative group py-1"
      >
        {label}
        <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 group-hover:w-full transition-all duration-300" />
      </Link>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex flex-col px-4 py-2.5 hover:bg-brand-50 transition-colors group/item"
            >
              <span className="font-semibold text-navy-900 text-sm group-hover/item:text-brand-500 transition-colors">{link.label}</span>
              <span className="text-xs text-gray-400 mt-0.5">{link.desc}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dogsOpen, setDogsOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Shop All' },
    { href: '/bundles', label: '🎁 Bundles' },
    { href: '/quiz', label: '✨ Quiz' },
    { href: '/blog', label: 'Blog' },
    { href: '/affiliates', label: '🤝 Affiliates' },
    { href: '/contact', label: 'Help' },
  ];

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-navy-900 text-white text-center py-2 text-sm font-medium">
        🐾 Free shipping on orders over $50 &nbsp;|&nbsp; Use code{' '}
        <span className="text-brand-400 font-bold">WELCOME10</span> for 10% off your first order
      </div>

      {/* Main nav */}
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-md'
            : 'bg-white shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                🐾
              </span>
              <span className="text-xl font-black text-navy-900 tracking-tight">
                Paw<span className="text-brand-500">Haven</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-navy-700 hover:text-brand-500 font-medium transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
              <NavDropdown label="🐶 Dogs" href="/dogs" links={DOG_LINKS} />
              <NavDropdown label="🐱 Cats" href="/cats" links={CAT_LINKS} />
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-navy-700 hover:text-brand-500 font-medium transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg text-navy-700 hover:bg-gray-100 transition-colors"
                aria-label="Search products"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 rounded-lg text-navy-700 hover:bg-gray-100 transition-colors"
                aria-label="Wishlist"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center leading-none px-1">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/30 active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="hidden sm:inline text-sm">Cart</span>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-navy-900 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Hamburger (mobile) */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg text-navy-700 hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search modal */}
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 shadow-lg">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-4 text-navy-700 hover:text-brand-500 hover:bg-brand-50 rounded-lg font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {/* Dogs section */}
            <div>
              <button
                onClick={() => setDogsOpen((v) => !v)}
                className="w-full flex items-center justify-between py-3 px-4 text-navy-700 hover:text-brand-500 hover:bg-brand-50 rounded-lg font-medium transition-colors"
              >
                🐶 Dogs
                <svg className={`h-4 w-4 transition-transform ${dogsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dogsOpen && (
                <div className="ml-4 space-y-1 mt-1">
                  {DOG_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-2 px-4 text-navy-600 hover:text-brand-500 hover:bg-brand-50 rounded-lg text-sm font-medium transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {/* Cats section */}
            <div>
              <button
                onClick={() => setCatsOpen((v) => !v)}
                className="w-full flex items-center justify-between py-3 px-4 text-navy-700 hover:text-brand-500 hover:bg-brand-50 rounded-lg font-medium transition-colors"
              >
                🐱 Cats
                <svg className={`h-4 w-4 transition-transform ${catsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {catsOpen && (
                <div className="ml-4 space-y-1 mt-1">
                  {CAT_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-2 px-4 text-navy-600 hover:text-brand-500 hover:bg-brand-50 rounded-lg text-sm font-medium transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-4 text-navy-700 hover:text-brand-500 hover:bg-brand-50 rounded-lg font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
