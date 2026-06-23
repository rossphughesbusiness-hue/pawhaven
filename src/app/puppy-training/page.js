import Link from 'next/link';

export const metadata = {
  title: 'Puppy Training Tips 2026 — How to Train a Puppy | PawHaven',
  description: 'Vet-backed puppy training tips covering positive reinforcement, crate training, leash basics, and socialization. Shop training essentials: treat pouches, harnesses & lick mats.',
  alternates: { canonical: 'https://pawhavenpets.org/puppy-training' },
  openGraph: {
    title: 'Puppy Training Tips 2026 | PawHaven',
    description: 'How to train a puppy with positive reinforcement, crate training, leash skills, and socialization — plus the gear that makes it work.',
    url: 'https://pawhavenpets.org/puppy-training',
  },
};

const featured = [
  {
    slug: 'rapid-reward-treat-pouch',
    name: 'Rapid Reward Treat Pouch',
    tag: 'Training',
    price: 19.99,
    comparePrice: 29.99,
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=85&auto=format&fit=crop',
    badge: '33% off',
    blurb: 'Magnetic closure delivers treats in under 1 second — the timing difference between a trained and untrained puppy.',
  },
  {
    slug: 'reflective-step-in-harness',
    name: 'Reflective Step-In Harness',
    tag: 'Walking',
    price: 34.99,
    comparePrice: 54.99,
    img: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=600&q=85&auto=format&fit=crop',
    badge: '36% off',
    blurb: 'Step-in design makes harness training a 10-second routine. Reflective strips for early-morning or evening walks.',
  },
  {
    slug: 'calming-lick-mat',
    name: 'Calming Lick Mat',
    tag: 'Anxiety Relief',
    price: 14.99,
    comparePrice: 22.99,
    img: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&q=85&auto=format&fit=crop',
    badge: '35% off',
    blurb: 'Use during crate introductions or vet visits — repetitive licking calms the nervous system within minutes.',
  },
];

const trainingMethods = [
  {
    icon: '🎯',
    method: 'Positive Reinforcement',
    summary: 'Reward the behavior you want',
    desc: 'Mark the exact moment your puppy does the right thing (sit, stay, come) with a treat or praise. Timing within 1–2 seconds is critical — puppies cannot connect delayed rewards to past behavior. Short sessions of 3–5 minutes are more effective than long ones.',
    tip: 'A treat pouch worn on your hip keeps rewards accessible and speeds up your mark-reward loop.',
  },
  {
    icon: '🏠',
    method: 'Crate Training',
    summary: 'Build a safe, calm space',
    desc: 'Crates are not punishment — they become a den where puppies feel safe. Introduce the crate with the door open, high-value treats inside, and never force your puppy in. Progress to closing the door only after your puppy enters voluntarily. Most puppies adapt within a week.',
    tip: 'A lick mat with frozen peanut butter inside the crate extends your puppy's calm crate time and associates it with reward.',
  },
  {
    icon: '🦮',
    method: 'Leash Training',
    summary: 'Teach loose-leash walking early',
    desc: 'Start leash training at 8 weeks before pulling becomes a habit. Reward your puppy for walking beside you with a loose leash. The moment the leash goes taut, stop moving. Reward heavily when they return to your side. Consistency across every walk is more important than session length.',
    tip: 'A step-in harness distributes pressure across the chest — far better than collars for puppies whose tracheas are still developing.',
  },
  {
    icon: '🐶',
    method: 'Socialization',
    summary: 'The 8–16 week window is critical',
    desc: 'The socialization window closes around 16 weeks. During this period, expose your puppy to as many safe experiences as possible: different people, sounds, surfaces, animals, and environments. Each positive experience in this window builds lifelong confidence. Missed socialization is the #1 cause of adult dog fear and aggression.',
    tip: 'Keep treats on you during every socialization outing. Pair new, potentially scary experiences with high-value rewards.',
  },
];

const milestones = [
  {
    week: 'Week 8',
    goals: ['Name recognition', 'Sit', 'Crate introduction'],
    notes: 'First week home — focus on building safety and routine. Keep training sessions under 3 minutes.',
  },
  {
    week: 'Week 12',
    goals: ['Stay (5 seconds)', 'Come when called', 'Loose leash basics'],
    notes: 'Socialization window still fully open. Prioritize new environments and people over trick training.',
  },
  {
    week: 'Week 16',
    goals: ['Down', 'Leave it', 'Off (jumping)'],
    notes: 'Socialization window closing. Increase duration and distance on sit/stay. Begin basic recall training.',
  },
  {
    week: '6 Months',
    goals: ['Reliable recall', 'Walk politely on leash', 'Wait at doors'],
    notes: 'Adolescence begins — expect regression. Maintain consistency. Increase mental enrichment to manage energy.',
  },
];

const vetTips = [
  {
    icon: '⏱️',
    tip: 'Train before meals, not after',
    detail: 'A slightly hungry puppy is significantly more motivated. Post-meal training produces half the engagement of pre-meal sessions.',
  },
  {
    icon: '🧠',
    tip: 'Mental fatigue beats physical exercise',
    detail: '10 minutes of training tires a puppy as much as 30 minutes of running — and produces calmer behavior afterward.',
  },
  {
    icon: '🔁',
    tip: 'End on success, always',
    detail: 'If your puppy is struggling with a new command, revert to an easy one they know well and reward that before ending the session.',
  },
  {
    icon: '👨‍👩‍👧',
    tip: 'Everyone in the house uses the same cues',
    detail: 'Inconsistent commands ("sit" vs "sit down" vs "sit!") confuse puppies and slow training significantly. Pick one word and commit.',
  },
];

const faqs = [
  {
    q: 'What age should I start puppy training?',
    a: 'Start the day you bring your puppy home — typically 8 weeks old. Puppies are absorbing information constantly from birth, and waiting is not neutral; it means reinforcing whatever behavior they default to. Short sessions of 3–5 minutes are appropriate at 8 weeks. The socialization window (8–16 weeks) is particularly critical and cannot be recovered later in life.',
  },
  {
    q: 'How long should puppy training sessions be?',
    a: 'At 8–12 weeks, keep sessions to 3–5 minutes, 3–5 times per day. At 3–6 months, sessions can extend to 5–10 minutes. Longer is not better — puppies have short attention spans, and training past the point of engagement is counterproductive. Watch for signals the session is over: yawning, looking away, sniffing the ground, or disengaging from treats.',
  },
  {
    q: 'What are the most important puppy training tips for beginners?',
    a: 'The four most impactful training habits are: (1) mark the exact moment of correct behavior with a treat or marker word, (2) keep sessions short and end while your puppy is still engaged, (3) reward the behavior you want — ignoring unwanted behavior is more effective than punishment, and (4) prioritize socialization before 16 weeks above any trick training. A treat pouch on your hip dramatically improves your timing.',
  },
  {
    q: 'How do I train a puppy to stop biting and nipping?',
    a: 'Puppy biting is normal developmental behavior — puppies explore with their mouths and learn bite inhibition through social feedback. The most effective response is: when your puppy bites too hard, say "ouch" calmly and immediately stop all play and interaction for 10–30 seconds. Resume only when the puppy is calm. Repeat consistently. Do not use your hands as play toys — always redirect to appropriate chew toys. Most puppies significantly reduce biting by 4–5 months with consistent response.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pawhavenpets.org' },
    { '@type': 'ListItem', position: 2, name: 'Puppy Training', item: 'https://pawhavenpets.org/puppy-training' },
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

export default function PuppyTrainingPage() {
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
        <section className="bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl mb-4">🎓</div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              Puppy Training Tips<br />
              <span className="text-yellow-200">That Actually Work</span>
            </h1>
            <p className="text-amber-100 text-lg max-w-2xl mx-auto mb-8">
              Positive reinforcement, crate training, leash basics, and socialization — the vet-backed playbook for training a puppy from week 8 to 6 months. Plus the essentials that make every session faster and more effective.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['🏅 Vet-backed methods', '⏱️ 3–5 min sessions', '🐾 Start at 8 weeks', '📦 Free shipping $50+'].map(b => (
                <span key={b} className="bg-white/20 backdrop-blur px-4 py-2 rounded-full font-medium">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Key stats */}
        <section className="bg-amber-50 py-8 px-4 border-b border-amber-100">
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { stat: '8 wks', label: 'Ideal age to start training' },
              { stat: '16 wks', label: 'Socialization window closes' },
              { stat: '3–5 min', label: 'Optimal session length' },
              { stat: '1–2 sec', label: 'Max reward delay for learning' },
            ].map(({ stat, label }) => (
              <div key={label}>
                <div className="text-2xl font-black text-amber-700">{stat}</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Training methods */}
        <section className="py-12 px-4 bg-amber-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">The 4 Core Puppy Training Methods</h2>
            <p className="text-gray-500 text-center text-sm mb-8">Master these and you've covered 90% of what your puppy needs to learn</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trainingMethods.map(({ icon, method, summary, desc, tip }) => (
                <div key={method} className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-2xl flex-shrink-0">{icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{method}</h3>
                      <p className="text-xs text-amber-700 font-medium mt-0.5">{summary}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">{desc}</p>
                  <div className="bg-amber-50 rounded-xl px-3 py-2">
                    <p className="text-xs text-amber-800 font-medium">💡 Gear tip: {tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black text-gray-900 mb-2 text-center">Puppy Training Essentials</h2>
            <p className="text-gray-500 text-center mb-10">The three tools that make every training session faster and more effective</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {featured.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {p.badge}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-amber-700 font-medium mb-0.5">{p.tag}</p>
                    <h3 className="font-bold text-gray-900 text-sm mb-2 leading-tight group-hover:text-amber-600 transition-colors">{p.name}</h3>
                    <p className="text-xs text-gray-400 mb-3 leading-relaxed">{p.blurb}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-gray-900 text-base">${p.price}</span>
                      <span className="text-gray-400 text-sm line-through">${p.comparePrice}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/products?category=Dogs"
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3 rounded-full transition-colors"
              >
                See All Dog Training Products →
              </Link>
            </div>
          </div>
        </section>

        {/* Week-by-week milestone table */}
        <section className="py-12 px-4 bg-amber-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Week-by-Week Training Milestones</h2>
            <p className="text-gray-500 text-center text-sm mb-8">Realistic goals from 8 weeks to 6 months — what to focus on and when</p>
            <div className="overflow-x-auto rounded-2xl border border-amber-100 shadow-sm">
              <table className="w-full text-sm bg-white">
                <thead>
                  <tr className="bg-amber-600 text-white">
                    <th className="px-5 py-3 text-left font-bold">Age</th>
                    <th className="px-5 py-3 text-left font-bold">Training Goals</th>
                    <th className="px-5 py-3 text-left font-bold hidden sm:table-cell">Focus Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {milestones.map(({ week, goals, notes }, i) => (
                    <tr key={week} className={i % 2 === 0 ? 'bg-white' : 'bg-amber-50'}>
                      <td className="px-5 py-4 font-bold text-amber-700 whitespace-nowrap">{week}</td>
                      <td className="px-5 py-4">
                        <ul className="space-y-1">
                          {goals.map(g => (
                            <li key={g} className="flex items-center gap-2">
                              <span className="text-amber-500 text-xs">✓</span>
                              <span className="text-gray-700">{g}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-5 py-4 text-gray-500 text-xs leading-relaxed hidden sm:table-cell">{notes}</td>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">4 Vet-Backed Puppy Training Tips</h2>
            <p className="text-gray-500 text-center text-sm mb-8">The details that separate owners who see fast results from those who struggle for months</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vetTips.map(({ icon, tip, detail }) => (
                <div key={tip} className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{tip}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vet tip strip */}
        <section className="bg-amber-600 text-white py-8 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg font-semibold">
              🎓 <strong>Vet tip:</strong> The #1 mistake new puppy owners make isn't using the wrong command — it's waiting too long to start. Every week past 8 weeks that passes without training is a week of unintentional habits being reinforced.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Puppy Training FAQs</h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <details key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm group">
                  <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-gray-900 list-none">
                    {q}
                    <span className="text-amber-600 text-xl font-light group-open:rotate-45 transition-transform duration-200 ml-4 flex-shrink-0">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">More for Your Puppy</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { href: '/puppies', label: '🐕 Puppies', desc: 'New puppy essentials' },
                { href: '/dog-training', label: '🎯 Dog Training', desc: 'Treat pouches & gear' },
                { href: '/dog-walking', label: '🐾 Dog Walking', desc: 'Harness & leash gear' },
                { href: '/dogs', label: '🐶 All Dogs', desc: 'Browse everything' },
              ].map(({ href, label, desc }) => (
                <Link key={href} href={href} className="bg-amber-50 hover:bg-amber-100 rounded-2xl p-4 text-center transition-colors">
                  <div className="font-bold text-gray-900 text-sm">{label}</div>
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
