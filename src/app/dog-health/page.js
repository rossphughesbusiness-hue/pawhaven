import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Dog Health Guide 2026 — Signs, Prevention & Vet-Backed Tips | PawHaven',
  description: 'Learn the early signs your dog is sick, build a preventive care routine, and discover vet-backed tips for dental, joint, weight, and mental health.',
  alternates: { canonical: 'https://pawhavenpets.org/dog-health' },
  openGraph: {
    title: 'Dog Health Guide 2026 — Signs, Prevention & Vet-Backed Tips | PawHaven',
    description: 'Vet-backed preventive care, monthly health checklists, and early warning signs every dog owner should know.',
    url: 'https://pawhavenpets.org/dog-health',
  },
};

const featured = [
  {
    slug: 'orthopedic-memory-foam-dog-bed',
    name: 'Orthopedic Memory Foam Dog Bed',
    tag: 'Comfort',
    price: 79.99,
    comparePrice: 129.99,
    img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=85&auto=format&fit=crop',
    badge: '38% off',
    blurb: 'Therapeutic memory foam relieves joint pressure and supports spinal alignment — recommended for dogs with arthritis or hip dysplasia.',
  },
  {
    slug: 'calming-lick-mat',
    name: 'Calming Lick Mat',
    tag: 'Wellness',
    price: 14.99,
    comparePrice: 22.99,
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=85&auto=format&fit=crop',
    badge: '35% off',
    blurb: 'Licking releases endorphins and reduces cortisol — peer-reviewed stress relief for anxious dogs, vet visits, and grooming sessions.',
  },
  {
    slug: 'self-cleaning-slicker-brush',
    name: 'Self-Cleaning Slicker Brush',
    tag: 'Grooming',
    price: 24.99,
    comparePrice: 39.99,
    img: 'https://images.unsplash.com/photo-1535930891776-0539ec2ecb2b?w=600&q=85&auto=format&fit=crop',
    badge: '37% off',
    blurb: 'Regular brushing distributes skin oils, catches lumps early, and prevents painful matting — a key part of at-home preventive care.',
  },
];

const healthPillars = [
  {
    icon: '🦷',
    title: 'Dental Health',
    desc: 'Dental disease affects 80% of dogs by age 3. Brush teeth 2–3× weekly, offer dental chews, and schedule an annual professional clean. Signs of trouble: bad breath, yellow buildup, pawing at mouth.',
  },
  {
    icon: '🦴',
    title: 'Joint Health',
    desc: 'Joint problems are the #1 reason for vet visits in dogs over 7. Maintain a healthy weight, provide an orthopedic sleeping surface, and watch for stiffness, reluctance to climb stairs, or reduced activity.',
  },
  {
    icon: '⚖️',
    title: 'Weight Management',
    desc: '56% of US dogs are overweight or obese. Even 10% excess weight accelerates joint wear, strains the heart, and shortens lifespan. Measure meals, reduce treats to <10% of daily calories, and weigh monthly.',
  },
  {
    icon: '🧠',
    title: 'Mental Health',
    desc: 'Chronic stress and boredom manifest as destructive behavior, excessive barking, and anxiety. Daily enrichment (puzzle feeders, sniff walks, training) and consistent routine are as important as physical exercise.',
  },
];

const checklist = [
  { task: 'Check eyes for discharge, redness, or cloudiness', freq: 'Weekly' },
  { task: 'Inspect ears for wax buildup, odor, or redness', freq: 'Weekly' },
  { task: 'Brush teeth with pet-safe toothpaste', freq: '2–3× weekly' },
  { task: 'Brush coat — check for lumps, parasites, or skin changes', freq: '2–3× weekly' },
  { task: 'Clean paws after outdoor walks', freq: 'After each walk' },
  { task: 'Trim nails if you can hear clicking on hard floors', freq: 'Every 3–4 weeks' },
  { task: 'Weigh your dog — track trends, not just snapshots', freq: 'Monthly' },
  { task: 'Check gums — should be pink, moist, and have <2s capillary refill', freq: 'Monthly' },
  { task: 'Run hands along body — feel for new lumps or tender spots', freq: 'Monthly' },
  { task: 'Observe gait and posture — any limping, stiffness, or reluctance?', freq: 'Monthly' },
  { task: 'Review diet: is the food still appropriate for current age/weight?', freq: 'Every 3 months' },
  { task: 'Schedule annual vet visit (biannual for dogs 7+)', freq: 'Annually' },
];

const vetTips = [
  {
    tip: 'Know your dog\'s baseline — before they\'re sick',
    why: 'Take a 2-minute video of your dog walking, resting, and eating when healthy. This gives your vet a reference point and lets you notice subtle changes over time. Gum color, resting breathing rate (12–20 breaths/min), and normal stool consistency are worth knowing before an emergency.',
  },
  {
    tip: 'Weight changes of 10%+ warrant a vet call',
    why: 'A 10% unintended weight change — in either direction — is a meaningful clinical sign. Unexplained weight loss can signal diabetes, parasites, cancer, or hyperthyroidism. Weight gain without diet change can indicate thyroid disease or Cushing\'s syndrome. Weigh monthly at the same time of day.',
  },
  {
    tip: 'Annual bloodwork is preventive care, not a luxury',
    why: 'CBC (complete blood count) and chemistry panels catch kidney disease, liver dysfunction, diabetes, and thyroid abnormalities before symptoms appear. Early detection often means treatment instead of management — and a dramatically better prognosis. Most issues are far cheaper to treat early.',
  },
  {
    tip: 'Behavioral changes are often the first sign of pain',
    why: 'Dogs don\'t show pain the way humans do. A dog that\'s become less playful, grumpier when touched, reluctant to jump, or sleeping more may be in chronic pain — not "just getting older." Any behavioral change lasting more than 1–2 weeks without an obvious cause deserves a vet visit.',
  },
];

const faqs = [
  {
    q: 'How often should I take my dog to the vet?',
    a: 'Healthy adult dogs (1–7 years) should have an annual wellness exam including physical exam, core vaccines, flea/tick/heartworm prevention, and ideally bloodwork. Dogs 7 and older should be seen biannually — organ function declines more rapidly and issues caught 6 months earlier often have dramatically better outcomes. Puppies need visits every 3–4 weeks until 16 weeks for their vaccination series. If your dog is on any long-term medication, your vet may recommend 3–6 month check-ins to monitor for side effects.',
  },
  {
    q: 'What are the signs my dog is in pain?',
    a: 'Dogs hide pain instinctively. Key signs to watch for: reduced activity or reluctance to climb stairs, jump, or run; stiffness after rest (especially first thing in the morning); licking or biting at a specific body part; decreased appetite; panting or restlessness at night; flinching when touched; change in posture (hunched, head down); or personality changes like withdrawal, irritability, or unusual neediness. Any combination of these lasting more than a week without an obvious cause (e.g., a known injury) warrants a vet visit.',
  },
  {
    q: 'What is the best preventive care routine for dogs?',
    a: 'A strong preventive routine has four layers: (1) Regular vet care — annual exams, vaccines, bloodwork, dental checks; (2) Daily home care — teeth brushing, post-walk paw cleaning, coat brushing; (3) Weight and diet management — measured meals, limited treats, age-appropriate food; and (4) Mental and physical enrichment — consistent exercise, puzzle feeders, training, and social interaction. Preventive care consistently costs a fraction of reactive treatment. The most impactful single action most owners can take is brushing their dog\'s teeth — it prevents the #1 most common dog health problem.',
  },
  {
    q: 'How do I check my dog\'s weight at home?',
    a: 'For small dogs under 50 lbs: step on a scale while holding your dog, then weigh yourself alone — the difference is your dog\'s weight. For large dogs: use a flat pet scale or ask your vet\'s office to weigh your dog between appointments (most clinics allow free weigh-ins). Alternatively, most large pet stores have scales available. Record the weight monthly at the same time of day (before feeding). A consistent upward or downward trend of more than 5–10% of body weight over 1–2 months is worth discussing with your vet.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pawhavenpets.org' },
    { '@type': 'ListItem', position: 2, name: 'Dog Health', item: 'https://pawhavenpets.org/dog-health' },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function DogHealthPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-700 via-green-700 to-teal-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl mb-4">🏥</div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              Dog Health —<br />
              <span className="text-emerald-200">Prevention, Early Signs & Vet-Backed Care</span>
            </h1>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto mb-8">
              The most important health decisions happen before your dog shows symptoms. Learn what to watch for, how to build a preventive routine, and what vets actually recommend.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['🩺 Vet-backed advice', '📋 Monthly checklist', '🐶 All breeds & ages', '📦 Free shipping $50+'].map(b => (
                <span key={b} className="bg-white/20 backdrop-blur px-4 py-2 rounded-full font-medium">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Health pillars */}
        <section className="py-12 px-4 bg-emerald-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-navy-900 mb-2">The 4 Pillars of Dog Health</h2>
            <p className="text-gray-500 text-center mb-8 text-sm">Every major canine health problem traces back to one of these four areas</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {healthPillars.map(({ icon, title, desc }) => (
                <div key={title} className="bg-white rounded-2xl p-5 shadow-sm border border-emerald-100 text-center">
                  <div className="text-3xl mb-2">{icon}</div>
                  <h3 className="font-bold text-navy-900 text-sm mb-2">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black text-navy-900 mb-2 text-center">Vet-Recommended Health Essentials</h2>
            <p className="text-gray-500 text-center mb-10">Products that support preventive care, joint health, and stress reduction</p>
            <div className="grid sm:grid-cols-3 gap-6">
              {featured.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={p.img}
                      alt={p.name}
                      width={600}
                      height={480}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-emerald-700 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {p.badge}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-navy-900 mb-1 group-hover:text-emerald-700 transition-colors">{p.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{p.blurb}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-black text-navy-900">${p.price}</span>
                        <span className="text-gray-400 text-sm line-through ml-2">${p.comparePrice}</span>
                      </div>
                      <span className="text-emerald-700 font-semibold text-sm">Shop →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/products?category=Dogs"
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-8 py-3 rounded-full transition-colors"
              >
                See All Dog Products →
              </Link>
            </div>
          </div>
        </section>

        {/* Monthly health checklist */}
        <section className="py-14 px-4 bg-emerald-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-2 text-center">Monthly Dog Health Checklist</h2>
            <p className="text-gray-500 text-center mb-8 text-sm">12 things every owner can do at home — no vet training required</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-emerald-700 text-white">
                    <th className="text-left px-5 py-3 font-semibold rounded-tl-2xl">Health Check</th>
                    <th className="text-left px-4 py-3 font-semibold rounded-tr-2xl">Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {checklist.map((row, i) => (
                    <tr key={row.task} className={i % 2 === 0 ? 'bg-white' : 'bg-emerald-50/40'}>
                      <td className="px-5 py-3 text-navy-900 font-medium">✓ {row.task}</td>
                      <td className="px-4 py-3 text-emerald-700 font-semibold whitespace-nowrap">{row.freq}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Vet tips */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">4 Vet Tips Every Dog Owner Should Know</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {vetTips.map(({ tip, why }) => (
                <div key={tip} className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 shadow-sm flex gap-3">
                  <div className="text-emerald-700 text-xl flex-shrink-0">✓</div>
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">{tip}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vet tip strip */}
        <section className="bg-emerald-700 text-white py-8 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg font-semibold">
              🏥 <strong>Vet tip:</strong> The most cost-effective thing you can do for your dog\'s long-term health is brush their teeth. Dental disease is the most common canine health problem — and it\'s almost entirely preventable. Start at 8 weeks for easiest lifetime compliance.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">Dog Health FAQs</h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <details key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm group">
                  <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-navy-900 list-none">
                    {q}
                    <span className="text-emerald-700 text-xl font-light group-open:rotate-45 transition-transform duration-200 ml-4 flex-shrink-0">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related pages */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-navy-900 mb-6 text-center">More Dog Health & Care</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {[
                { href: '/dogs', label: '🐶 All Dogs', desc: 'Browse everything' },
                { href: '/senior-dogs', label: '🐾 Senior Dogs', desc: 'Joint & mobility care' },
                { href: '/dog-anxiety', label: '🧘 Dog Anxiety', desc: 'Calming & stress relief' },
                { href: '/pet-first-aid', label: '🩹 Pet First Aid', desc: 'Emergency preparedness' },
                { href: '/dog-grooming', label: '🐕 Dog Grooming', desc: 'At-home care tools' },
              ].map(({ href, label, desc }) => (
                <Link key={href} href={href} className="bg-emerald-50 hover:bg-emerald-100 rounded-2xl p-4 text-center transition-colors">
                  <div className="font-bold text-navy-900 text-sm">{label}</div>
                  <div className="text-xs text-gray-500 mt-1">{desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
