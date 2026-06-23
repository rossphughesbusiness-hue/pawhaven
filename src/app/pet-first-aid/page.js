import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Pet First Aid Guide 2026 — What Every Owner Needs to Know | PawHaven',
  description: 'Know what to do when your pet is hurt or sick. Emergency first aid steps for dogs and cats — from cut paws to heatstroke to toxic ingestion — with vet-reviewed guidance.',
  alternates: { canonical: 'https://pawhavenpets.org/pet-first-aid' },
  openGraph: {
    title: 'Pet First Aid Guide 2026 | PawHaven',
    description: 'Vet-reviewed emergency guidance for pet owners — heatstroke, toxic ingestion, cut paws, seizures, and more.',
    url: 'https://pawhavenpets.org/pet-first-aid',
  },
};

const featured = [
  {
    slug: 'calming-lick-mat',
    name: 'Calming Lick Mat',
    tag: 'Anxiety Relief',
    price: 19.99,
    comparePrice: 34.99,
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=85&auto=format&fit=crop',
    badge: '42% off',
    blurb: 'Post-stress calm after a vet visit or scary incident — licking reduces cortisol in minutes.',
  },
  {
    slug: 'orthopedic-memory-foam-dog-bed',
    name: 'Orthopedic Memory Foam Dog Bed',
    tag: 'Recovery',
    price: 79.99,
    comparePrice: 129.99,
    img: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=600&q=85&auto=format&fit=crop',
    badge: '38% off',
    blurb: 'Supportive recovery surface for post-surgery, injury, or illness — reduces joint pressure during rest.',
  },
  {
    slug: 'portable-paw-cleaner',
    name: 'Portable Paw Cleaner',
    tag: 'Grooming',
    price: 22.99,
    comparePrice: 34.99,
    img: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600&q=85&auto=format&fit=crop',
    badge: '34% off',
    blurb: 'Gently clean and rinse cut or irritated paws — silicone bristles remove debris without aggravating wounds.',
  },
];

const actionCards = [
  {
    icon: '🚨',
    title: 'Emergency Vet Now',
    color: 'bg-red-100 border-red-300',
    titleColor: 'text-red-700',
    situations: [
      'Difficulty breathing or choking',
      'Seizure lasting over 2 minutes',
      'Suspected poisoning or toxic ingestion',
      'Collapse, unresponsiveness, or pale gums',
      'Severe bleeding that won\'t stop',
      'Suspected broken bone',
      'Heatstroke (panting, drooling, wobbly)',
      'Eye injury or sudden vision loss',
    ],
  },
  {
    icon: '📞',
    title: 'Call Vet Today',
    color: 'bg-orange-100 border-orange-300',
    titleColor: 'text-orange-700',
    situations: [
      'Vomiting or diarrhea more than twice',
      'Limping that doesn\'t resolve in 30 min',
      'Bee sting with facial swelling',
      'Swallowed a small foreign object',
      'Persistent coughing or sneezing',
      'Loss of appetite for over 24 hours',
      'Wound that may need stitches',
      'Eye discharge or redness',
    ],
  },
  {
    icon: '👁️',
    title: 'Monitor at Home',
    color: 'bg-yellow-100 border-yellow-300',
    titleColor: 'text-yellow-700',
    situations: [
      'Minor cut or scrape (cleaned, not deep)',
      'Single episode of vomiting, acting normal',
      'Mild limping after vigorous play',
      'Small bee sting, no facial swelling',
      'Brief coughing after drinking water',
      'Small scratch on paw pad',
      'Slight lethargy after unusual exertion',
      'Minor ear irritation without discharge',
    ],
  },
  {
    icon: '🛡️',
    title: 'Preventive Care',
    color: 'bg-green-100 border-green-300',
    titleColor: 'text-green-700',
    situations: [
      'Keep emergency vet number saved in phone',
      'Know nearest 24-hr emergency animal hospital',
      'Keep basic first aid kit (gauze, antiseptic)',
      'Learn your pet\'s normal baseline vitals',
      'Know which human foods are toxic to pets',
      'Keep ASPCA Poison Control # handy: 888-426-4435',
      'Annual vet checkups to catch issues early',
      'Microchip + ID tag updated with current info',
    ],
  },
];

const emergencies = [
  {
    scenario: '🥄 Swallowed object',
    immediate: 'Don\'t induce vomiting unless instructed by a vet. Note the object\'s size, material, and time of ingestion. Call your vet immediately — sharp objects and batteries are emergencies. Watch for gagging, drooling, or inability to swallow.',
    urgency: '📞 Call vet',
  },
  {
    scenario: '☀️ Heatstroke',
    immediate: 'Move pet to shade or A/C immediately. Apply cool (not ice cold) water to paw pads, armpits, and groin. Offer small sips of cool water if conscious. Rush to emergency vet — heatstroke can cause organ failure within minutes.',
    urgency: '🚨 Emergency vet',
  },
  {
    scenario: '🐾 Cut paw',
    immediate: 'Apply gentle pressure with a clean cloth for 5 minutes. Rinse with clean water using a paw cleaner or gentle stream. If bleeding stops and cut is minor, clean and bandage loosely. Deep cuts or those that won\'t stop bleeding need vet care.',
    urgency: '👁️ Monitor / 📞 call vet if deep',
  },
  {
    scenario: '🐝 Bee sting',
    immediate: 'Remove stinger by scraping sideways with a card — don\'t squeeze. Apply a cool compress to reduce swelling. Watch closely for 30 minutes. Facial swelling, hives, vomiting, or collapse indicate allergic reaction — emergency vet immediately.',
    urgency: '👁️ Monitor / 🚨 if swelling',
  },
  {
    scenario: '🤢 Vomiting',
    immediate: 'A single vomiting episode in an otherwise alert dog is usually not an emergency. Withhold food for 2–4 hours, offer water in small amounts. If vomiting is repeated, contains blood, or your pet seems lethargic or in pain, call your vet.',
    urgency: '👁️ Monitor / 📞 if repeated',
  },
  {
    scenario: '⚡ Seizure',
    immediate: 'Stay calm. Move furniture away to prevent injury — do not restrain the pet. Time the seizure. Keep the area quiet and dim. After the seizure, speak gently and keep them warm. Seizures over 2 minutes or clusters require emergency vet.',
    urgency: '🚨 Emergency vet if >2 min',
  },
  {
    scenario: '🦵 Limping',
    immediate: 'Check the paw for cuts, thorns, or foreign objects. Feel gently for obvious swelling or heat. Restrict activity for 30 minutes. If limping improves with rest and the pet is putting weight on it, monitor. Non-weight-bearing or worsening limp: call your vet.',
    urgency: '👁️ Monitor / 📞 if no weight',
  },
  {
    scenario: '👁️ Eye injury',
    immediate: 'Do not rub or touch the eye. Flush gently with clean saline or water. Keep the pet calm and prevent pawing at the eye — an E-collar helps. Eye injuries can worsen rapidly and should be seen by a vet same-day, even if they look minor.',
    urgency: '📞 Call vet today',
  },
];

const vetTips = [
  {
    icon: '📱',
    tip: 'Save your vet\'s number AND the nearest 24-hour emergency clinic right now',
    detail: 'In a real emergency you won\'t have time to search. Save both numbers in your phone contacts today — your regular vet for business hours, an emergency clinic for nights and weekends.',
  },
  {
    icon: '🏥',
    tip: 'Know where your nearest emergency animal hospital is before you need it',
    detail: 'Drive past it once so you know the route. Emergency animal hospitals are different from regular vet clinics — they\'re open 24/7 and handle trauma, surgery, and critical care. The ASPCA Animal Poison Control Center (888-426-4435) is also available 24/7.',
  },
  {
    icon: '🚫',
    tip: 'Never induce vomiting without explicit vet or Poison Control instruction',
    detail: 'For some toxins (acids, alkalis, petroleum products) and sharp objects, inducing vomiting causes additional damage. Always call Poison Control or your vet first — describe exactly what was ingested, how much, and when.',
  },
  {
    icon: '🧘',
    tip: 'Keep your pet calm — your stress transfers directly to them',
    detail: 'Pets look to their owners to gauge threat level. Speaking in a calm, low voice and moving slowly reduces their fear response, lowers heart rate, and makes examination and treatment significantly easier — both at home and at the vet.',
  },
];

const faqs = [
  {
    q: 'What should be in a pet first aid kit?',
    a: 'A well-stocked pet first aid kit includes: gauze pads and self-adhesive bandage wrap, antiseptic wipes (chlorhexidine or povidone-iodine), saline solution for eye and wound flushing, tweezers and blunt-end scissors, digital rectal thermometer (normal dog temp: 101–102.5°F; cat: 100.5–102.5°F), a muzzle (injured animals bite even gentle ones), latex gloves, a cold pack, hydrogen peroxide (only to induce vomiting when specifically instructed by a vet or Poison Control), and a copy of your vet\'s number and the ASPCA Poison Control number (888-426-4435). Store it in a waterproof bag in an accessible location.',
  },
  {
    q: 'Can I use human antiseptic on my dog or cat?',
    a: 'Some human antiseptics are safe for pets; others are toxic. Chlorhexidine solution (diluted) is safe and widely used by vets for wound cleaning. Povidone-iodine (Betadine) is safe when diluted to "weak tea" color. Do NOT use: hydrogen peroxide (damages tissue and slows healing — it\'s only used to induce vomiting, not clean wounds), rubbing alcohol (painful and toxic if licked), Neosporin on cats (polyethylene glycol in it can cause Heinz body anemia), or any product containing benzalkonium chloride (common in hand sanitizers — toxic to cats). When in doubt, flush with clean saline or water until you can reach a vet.',
  },
  {
    q: 'What human foods are toxic to dogs and cats?',
    a: 'High-risk foods for dogs: grapes and raisins (can cause kidney failure even in small amounts), xylitol (sugar substitute in gum, peanut butter, and "sugar-free" products — causes rapid blood sugar drop and liver failure), chocolate and caffeine, onions, garlic, leeks, and chives (damage red blood cells), macadamia nuts, alcohol, and raw yeast dough. For cats: all of the above plus onion/garlic in any form (cats are more sensitive), raw fish fed regularly (breaks down thiamine), and lilies — even the pollen from touching a lily is potentially lethal for cats. If you suspect ingestion of any of these, call ASPCA Poison Control (888-426-4435) immediately — do not wait for symptoms.',
  },
  {
    q: 'How do I know if my pet needs emergency care vs. a wait-and-see approach?',
    a: 'Emergency vet now: difficulty breathing, pale or blue gums, collapse or unresponsiveness, suspected poisoning, seizures over 2 minutes, severe uncontrolled bleeding, suspected broken bone, or obvious extreme pain. Call vet today: repeated vomiting or diarrhea, limping that doesn\'t resolve, wounds that may need stitches, eye injuries (even minor-looking ones), loss of appetite for over 24 hours, or any situation where you\'re genuinely uncertain. Monitor at home: single vomiting episode in an otherwise alert pet, minor cut that stops bleeding and is clean, mild limping after vigorous exercise that improves with rest. When in doubt, call — most vets have a phone triage line and would rather answer a question than treat a worsened injury.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function PetFirstAidPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-red-700 via-rose-600 to-red-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl mb-4">🩹</div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              Pet First Aid —<br />
              <span className="text-red-200">What Every Owner Should Know</span>
            </h1>
            <p className="text-red-100 text-lg max-w-2xl mx-auto mb-8">
              Vet-reviewed guidance for common pet emergencies — when to rush to the ER, when to call your vet, and when to monitor at home. Bookmark this page before you need it.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['🔬 Vet-reviewed', '🚨 Emergency guide', '🐶 Dogs & cats', '📋 Printable checklist'].map(b => (
                <span key={b} className="bg-white/20 backdrop-blur px-4 py-2 rounded-full font-medium">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency banner */}
        <section className="bg-red-700 text-white py-4 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-bold text-sm sm:text-base">
              🚨 <strong>Life-threatening emergency?</strong> Call your vet or emergency animal hospital now — don't search for advice online first.
              ASPCA Poison Control: <strong>888-426-4435</strong> (24/7)
            </p>
          </div>
        </section>

        {/* When to act — 4 cards */}
        <section className="py-14 px-4 bg-red-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">When to Act — Quick Reference</h2>
            <p className="text-gray-500 text-center mb-8 text-sm">Use this guide to make the right call fast</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {actionCards.map(({ icon, title, color, titleColor, situations }) => (
                <div key={title} className={`rounded-2xl border-2 p-5 ${color}`}>
                  <div className="text-2xl mb-2">{icon}</div>
                  <h3 className={`font-black text-sm mb-3 ${titleColor}`}>{title}</h3>
                  <ul className="space-y-1">
                    {situations.map(s => (
                      <li key={s} className="text-xs text-gray-700 flex gap-1.5">
                        <span className="text-gray-400 flex-shrink-0 mt-0.5">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common emergencies table */}
        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">8 Common Pet Emergencies — What to Do Immediately</h2>
            <p className="text-gray-500 text-center mb-8 text-sm">Vet-reviewed first steps for the most frequent emergency situations</p>
            <div className="space-y-3">
              {emergencies.map(({ scenario, immediate, urgency }) => (
                <div key={scenario} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                    <div className="sm:w-36 flex-shrink-0">
                      <div className="font-bold text-gray-900 text-sm">{scenario}</div>
                      <div className="text-xs mt-1 font-semibold text-red-600">{urgency}</div>
                    </div>
                    <div className="text-sm text-gray-600 leading-relaxed flex-1">{immediate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className="py-14 px-4 bg-red-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black text-gray-900 mb-2 text-center">Recovery & Aftercare Essentials</h2>
            <p className="text-gray-500 text-center mb-10 text-sm">Products that help your pet recover and stay calm after a stressful incident</p>
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
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {p.badge}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">{p.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{p.blurb}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-black text-gray-900">${p.price}</span>
                        <span className="text-gray-400 text-sm line-through ml-2">${p.comparePrice}</span>
                      </div>
                      <span className="text-red-600 font-semibold text-sm">Shop →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Vet tips */}
        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">4 Things Every Pet Owner Should Do Now</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vetTips.map(({ icon, tip, detail }) => (
                <div key={tip} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex gap-3 mb-3">
                    <div className="text-2xl flex-shrink-0">{icon}</div>
                    <h3 className="font-bold text-gray-900 self-center text-sm leading-snug">{tip}</h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vet tip strip */}
        <section className="bg-red-700 text-white py-8 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg font-semibold">
              🩺 <strong>Vet tip:</strong> The single most effective thing you can do right now is save your vet's number and the nearest 24-hour emergency animal hospital number in your phone. In an emergency, every second spent searching costs your pet. Do it before you need it.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Pet First Aid FAQs</h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <details key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm group">
                  <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-gray-900 list-none">
                    {q}
                    <span className="text-red-600 text-xl font-light group-open:rotate-45 transition-transform duration-200 ml-4 flex-shrink-0">+</span>
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
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">More Health & Safety Guides</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { href: '/dogs', label: '🐶 All Dogs', desc: 'Browse every dog product' },
                { href: '/cats', label: '🐱 All Cats', desc: 'Browse every cat product' },
                { href: '/dog-anxiety', label: '🧘 Dog Anxiety', desc: 'Calming tools & guidance' },
                { href: '/grooming', label: '✂️ Grooming', desc: 'Paw care & maintenance' },
              ].map(({ href, label, desc }) => (
                <Link key={href} href={href} className="bg-red-50 hover:bg-red-100 rounded-2xl p-4 text-center transition-colors">
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
