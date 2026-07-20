/**
 * Business categories, the top-level taxonomy.
 *
 * `targetPages` documents the planned 1,000-page distribution so future content
 * can be added by category without re-architecting anything.
 */

export type Category = {
  slug: string;
  name: string;
  shortName: string;
  /** Honest one-paragraph explanation of what this category covers. */
  description: string;
  /** The single most important thing to know before starting here. */
  mostImportant: string;
  /** Planned page count at 500-page scale. */
  targetPages: number;
  /** Related category slugs for internal linking. */
  related: string[];
};

export const CATEGORIES: Category[] = [
  {
    slug: 'service-businesses',
    name: 'Service Businesses',
    shortName: 'Services',
    description:
      'Service businesses sell your time, skill, and reliability rather than a physical product. Think cleaning, lawn care, bookkeeping, or notary work. They tend to have the lowest startup costs and the fastest path to a first paying customer, which is why they are where most self-funded founders begin. The trade-off is that your income is tied to hours worked until you hire help.',
    mostImportant:
      'In a service business your reputation is the entire product. One reliable, well-reviewed operator out-earns a dozen flaky competitors. Show up on time, do what you said, and ask every happy customer for a review, that single habit drives most service-business growth.',
    targetPages: 130,
    related: ['local-and-community', 'trades-and-skilled-work', 'health-and-wellness'],
  },
  {
    slug: 'online-businesses',
    name: 'Online Businesses',
    shortName: 'Online',
    description:
      'Online businesses are run primarily through a screen, freelancing, e-commerce, content, software, and digital services. They offer location freedom and the potential to scale beyond your own hours, but the competition is global and "free to start" usually means "slow to earn." Realistic timelines here are measured in months, not weeks.',
    mostImportant:
      'Online businesses look cheap to start but expensive in time. The real cost is the months of unpaid work before the first consistent income. Pick a model where you can show proof of skill or product quality early, because trust is harder to build when nobody can meet you in person.',
    targetPages: 140,
    related: ['technology-and-software', 'creative-and-content', 'retail-and-products'],
  },
  {
    slug: 'trades-and-skilled-work',
    name: 'Trades and Skilled Work',
    shortName: 'Trades',
    description:
      'Trades and skilled-work businesses are built on hands-on expertise, HVAC, handyman work, electrical, plumbing-adjacent services, and finish work. Demand is steady, margins are healthy, and skilled operators are genuinely hard to replace. The barrier is real: you need competence (and often licensing) before customers will pay, and many trades require an apprenticeship or certification first.',
    mostImportant:
      'Competence and licensing come before customers. In skilled trades, an undertrained operator does expensive damage and loses the business to a single bad job or insurance claim. Get the certification, get insured, and apprentice if you can, the skill is the moat.',
    targetPages: 100,
    related: ['service-businesses', 'local-and-community', 'real-estate-and-property'],
  },
  {
    slug: 'food-and-beverage',
    name: 'Food and Beverage',
    shortName: 'Food',
    description:
      'Food and beverage businesses range from food trucks and catering to home-based baking and specialty products. They are emotionally appealing and have built-in demand, but they are also among the most regulated and capital-intensive small businesses, with thin margins and high failure rates. Permits, commercial kitchens, and food-safety rules are not optional.',
    mostImportant:
      'Food margins are thin and regulation is heavy. Before buying any equipment, confirm your local cottage-food laws, permit requirements, and where you are legally allowed to prepare food. Many promising food businesses die on permitting, not on product quality.',
    targetPages: 70,
    related: ['retail-and-products', 'local-and-community', 'service-businesses'],
  },
  {
    slug: 'retail-and-products',
    name: 'Retail and Products',
    shortName: 'Retail',
    description:
      'Retail and product businesses buy, make, or source physical goods and sell them at a margin, reselling, private-label products, Amazon FBA, dropshipping, and vending. The model is intuitive, but inventory ties up cash and most of the work is in sourcing, logistics, and marketing rather than the product itself. Cash-flow management makes or breaks these businesses.',
    mostImportant:
      'In products, the money is made in the buy, not the sell. Sourcing well, pricing for real all-in costs (fees, shipping, returns), and not over-ordering inventory matter more than any single sales tactic. Cash stuck in unsold stock is the most common way these businesses stall.',
    targetPages: 80,
    related: ['online-businesses', 'food-and-beverage', 'creative-and-content'],
  },
  {
    slug: 'creative-and-content',
    name: 'Creative and Content',
    shortName: 'Creative',
    description:
      'Creative and content businesses sell skill and taste, design, photography, video, writing, and social media. Startup costs can be low if you already own the gear and skill, and a strong portfolio can command premium rates. The hard part is consistent client flow and pricing your work like a business instead of a hobby.',
    mostImportant:
      'Talent gets you noticed; positioning gets you paid. The creatives who earn well are not always the most talented, they are the ones who specialize, show proof, and price confidently. A focused portfolio for one type of client beats a generic "I do everything" pitch.',
    targetPages: 80,
    related: ['online-businesses', 'technology-and-software', 'retail-and-products'],
  },
  {
    slug: 'health-and-wellness',
    name: 'Health and Wellness',
    shortName: 'Wellness',
    description:
      'Health and wellness businesses help people feel and function better, personal training, coaching, massage, and related services. Demand is durable and clients can be loyal for years, but trust, results, and often certification or licensing are prerequisites. Liability and scope-of-practice rules deserve careful attention.',
    mostImportant:
      'Credibility and scope-of-practice are everything. Get the right certification, carry liability insurance, and never make health claims you cannot back up. Client results and referrals, not advertising, are what actually fill a wellness practice.',
    targetPages: 60,
    related: ['service-businesses', 'creative-and-content', 'local-and-community'],
  },
  {
    slug: 'real-estate-and-property',
    name: 'Real Estate and Property',
    shortName: 'Property',
    description:
      'Real estate and property businesses earn from managing, improving, or arranging the use of property, short-term rental management, arbitrage, property services, and related models. Returns can be substantial, but so is the capital and the legal exposure. Lease terms, local regulations, and landlord permission are make-or-break details that are easy to underestimate.',
    mostImportant:
      'The contract and the local rules decide whether you have a business at all. Short-term rental bans, lease clauses against subletting, and zoning rules have ended many property ventures overnight. Confirm legality in writing before committing any money.',
    targetPages: 45,
    related: ['service-businesses', 'trades-and-skilled-work', 'local-and-community'],
  },
  {
    slug: 'technology-and-software',
    name: 'Technology and Software',
    shortName: 'Technology',
    description:
      'Technology and software businesses build or service digital tools, software products, IT services, automation, and tech-enabled freelancing. The upside is high margins and real scalability; the cost is skill. These businesses reward existing technical ability and patience through a long build-and-validate phase.',
    mostImportant:
      'Solve a real, specific problem before writing much code or buying tools. The graveyard of tech businesses is full of well-built products nobody needed. Talk to potential customers first; build only what they will actually pay for.',
    targetPages: 75,
    related: ['online-businesses', 'creative-and-content', 'service-businesses'],
  },
  {
    slug: 'local-and-community',
    name: 'Local and Community Businesses',
    shortName: 'Local',
    description:
      'Local and community businesses serve a specific geographic area, neighborhood services, local events, and businesses that thrive on word of mouth. They benefit from less online competition and strong referral loops, but your growth is capped by the size and density of your area. Knowing your community is a genuine competitive advantage here.',
    mostImportant:
      'Local trust compounds. In a defined area, a handful of visible, well-reviewed jobs and genuine community relationships will out-market any ad budget. Density matters too, make sure there are enough nearby customers to support the business before you commit.',
    targetPages: 35,
    related: ['service-businesses', 'trades-and-skilled-work', 'food-and-beverage'],
  },
  {
    slug: 'automotive',
    name: 'Automotive Businesses',
    shortName: 'Automotive',
    description:
      'Automotive businesses service, repair, clean, customize, or maintain vehicles, from mobile mechanics and detailing to body work, tinting, and fleet maintenance. Demand is constant because cars always break, get dirty, and need upkeep, and many of these can start mobile with low overhead. The trade-offs are real skill or equipment requirements, liability around other people’s vehicles, and pricing pressure from chains.',
    mostImportant:
      'You are working on something expensive that someone depends on daily, so trust and competence are everything. Carry the right garage-keepers/liability insurance, never take on work beyond your skill or tools, and build a reputation for honest diagnosis, the operators who last are the ones customers believe are not ripping them off.',
    targetPages: 45,
    related: ['trades-and-skilled-work', 'service-businesses', 'local-and-community'],
  },
  {
    slug: 'education-and-coaching',
    name: 'Education and Coaching',
    shortName: 'Education',
    description:
      'Education and coaching businesses help people learn a skill or reach a goal, tutoring, test prep, music and language lessons, coaching, and course-based teaching. Startup costs are low and a single great result spreads by referral, but income is tied to your hours until you productize or hire, and trust in your expertise is the whole sale.',
    mostImportant:
      'Results and reputation fill your roster; everything else is secondary. Be honest about what you can and cannot deliver (you cannot guarantee a grade, a job, or an outcome), specialize in a clear niche, and treat each client’s result as marketing, referrals and testimonials are how these businesses actually grow.',
    targetPages: 50,
    related: ['online-businesses', 'creative-and-content', 'health-and-wellness'],
  },
  {
    slug: 'events-and-entertainment',
    name: 'Events and Entertainment',
    shortName: 'Events',
    description:
      'Events and entertainment businesses make gatherings happen and fun possible, planning, DJing, rentals, photo booths, and entertainment venues. Demand clusters on weekends and seasons (weddings, holidays, summer), the work is people-facing and high-energy, and reputation travels fast. The catch is lumpy, seasonal income and, for venues, heavy lease and liability commitments.',
    mostImportant:
      'You are trusted with someone’s once-in-a-lifetime day or a packed venue, so reliability and liability cover are non-negotiable. Get clear contracts, deposits, and event insurance, and over-deliver on communication, most bookings in this world come from referrals and reviews of how calmly you handled the last event.',
    targetPages: 50,
    related: ['creative-and-content', 'local-and-community', 'food-and-beverage'],
  },
  {
    slug: 'pet-and-animal',
    name: 'Pet and Animal Services',
    shortName: 'Pets',
    description:
      'Pet and animal businesses care for, train, groom, transport, and supply for people’s animals, an emotionally driven, recession-resilient market where owners spend willingly on trusted providers. Many start with very low overhead and build loyal, recurring clients. The honest catch is that you are responsible for living creatures, so trust, safety, and the right insurance matter more than in almost any other service.',
    mostImportant:
      'Owners are handing you a member of their family, one injured, lost, or mishandled animal can end the business. Carry pet-business liability insurance (and bonding where relevant), never overbook beyond what you can safely handle, and let genuine care and reliability earn the reviews and referrals that fill your schedule.',
    targetPages: 40,
    related: ['service-businesses', 'retail-and-products', 'local-and-community'],
  },
];

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c]),
);

export function getCategory(slug: string): Category | undefined {
  return CATEGORY_MAP[slug];
}

/** A simple emoji icon per category, for visual identity across the site. */
export const CATEGORY_ICONS: Record<string, string> = {
  'service-businesses': '🧰',
  'online-businesses': '💻',
  'trades-and-skilled-work': '🔧',
  'food-and-beverage': '🍽️',
  'retail-and-products': '🛍️',
  'creative-and-content': '🎨',
  'health-and-wellness': '🧘',
  'real-estate-and-property': '🏠',
  'technology-and-software': '🖥️',
  'local-and-community': '📍',
  automotive: '🚗',
  'education-and-coaching': '🎓',
  'events-and-entertainment': '🎉',
  'pet-and-animal': '🐾',
};

/** Genuine, category-level questions, drives the FAQ on each category page. */
export const CATEGORY_FAQS: Record<string, { question: string; answer: string }[]> = {
  automotive: [
    {
      question: 'Do I need to be a certified mechanic to start an automotive business?',
      answer:
        'It depends on the service. Repair work that affects safety benefits hugely from ASE certification and is sometimes regulated; detailing, washing, and cosmetic services need skill but no formal license in most areas. Any business touching customers’ vehicles should carry garage-keepers and liability insurance regardless.',
    },
    {
      question: 'Can an automotive business start mobile to keep costs down?',
      answer:
        'Yes, mobile mechanics, detailers, windshield repair, and tire services are popular low-overhead starts because you skip a shop lease. The limits are jobs needing a lift, alignment rack, or paint booth, which eventually push successful operators toward a fixed location.',
    },
    {
      question: 'What is the biggest risk in automotive businesses?',
      answer:
        'Liability and trust. You are working on expensive equipment people rely on daily, so a misdiagnosis, damage, or a comeback can be costly and reputation-damaging. Honest diagnosis, proper insurance, and not taking work beyond your tools or skill are what separate lasting shops from short-lived ones.',
    },
  ],
  'education-and-coaching': [
    {
      question: 'Do I need credentials to teach or coach?',
      answer:
        'For academic tutoring and most coaching, expertise and results matter more than a specific license, though certifications build trust. Some areas are regulated (for example, behind-the-wheel driving instruction or licensed therapy), so confirm requirements for your specific niche before advertising.',
    },
    {
      question: 'How do education and coaching businesses get clients?',
      answer:
        'Referrals and demonstrated results. A few students or clients who improve and tell others is the primary growth engine; reviews, a clear niche, and free intro content help. Paid ads work for some, but word of mouth dominates because parents and clients trust recommendations.',
    },
    {
      question: 'Can these businesses scale beyond my own hours?',
      answer:
        'Yes, by raising rates, teaching groups, building courses, or hiring other instructors under your brand. The shift from solo to a roster or productized offering is how teachers and coaches break past the income ceiling of one-on-one work.',
    },
  ],
  'events-and-entertainment': [
    {
      question: 'Is events and entertainment work seasonal?',
      answer:
        'Very often, yes. Weddings, holidays, and summer drive demand, with quiet stretches in between. Successful operators plan cash flow around the busy season, take deposits, and add complementary services (corporate events, off-season packages) to smooth income.',
    },
    {
      question: 'What insurance and contracts do I need?',
      answer:
        'Event liability insurance and a clear written contract with deposits and cancellation terms are essential, you are often handling someone’s once-in-a-lifetime event or a crowded venue. Venues, vehicles, and equipment each carry their own coverage needs; confirm requirements before booking.',
    },
    {
      question: 'How do event businesses build a client base?',
      answer:
        'Referrals, reviews, and relationships with venues and other vendors (planners, photographers, caterers) drive most bookings. Reliability is the product, clients book the vendor they trust to handle problems calmly, and that reputation spreads quickly in tight local event circles.',
    },
  ],
  'pet-and-animal': [
    {
      question: 'What insurance does a pet business need?',
      answer:
        'Pet-business liability insurance is essential, and many situations also call for bonding (especially when entering homes) and care, custody, and control coverage. You are responsible for living animals, so one injury, escape, or illness without coverage can be financially and reputationally devastating.',
    },
    {
      question: 'Do pet businesses require licenses or certifications?',
      answer:
        'It varies. Walking and basic sitting usually need no special license, while grooming, training, boarding facilities, and anything medical may require certification, facility licensing, or veterinary oversight. Certifications are not always mandatory but strongly build the trust these businesses run on.',
    },
    {
      question: 'Why are pet businesses considered resilient?',
      answer:
        'Owners treat pets as family and keep spending on them even in downturns, and many services (walking, grooming, daycare) generate loyal, recurring revenue. The flip side is that trust is hard-won and easily lost, your reputation for safe, caring service is the entire business.',
    },
  ],
  'service-businesses': [
    {
      question: 'Why are service businesses a common first business?',
      answer:
        'They have the lowest startup costs, the fastest path to a first paying customer, and skills that are usually learnable on the job. You trade your time for money at the start, which caps early income but also keeps your risk very low.',
    },
    {
      question: 'Do I need a license or insurance for a service business?',
      answer:
        'It depends on the specific service and your location. Most service businesses need at least a business registration and general liability insurance; some (like food handling or certain trades) need specific licenses. Always confirm local requirements before taking paid work, the individual business pages note where this matters.',
    },
    {
      question: 'How do most service businesses actually get customers?',
      answer:
        'A complete Google Business Profile with real reviews, local word of mouth and referrals, and neighborhood marketing (signs, door hangers, local groups) drive most early jobs. Reviews and photos convert far better than logos or paid ads when you are starting out.',
    },
    {
      question: 'Can a service business grow beyond just me?',
      answer:
        'Yes, but it requires shifting from doing the work to building systems, hiring, and managing, which not everyone enjoys. Many operators are happy and profitable as solo or small-crew businesses; growing into a company is a real change in the job you do day to day.',
    },
  ],
  'online-businesses': [
    {
      question: 'Are online businesses really cheaper to start?',
      answer:
        'They are usually cheaper in money but more expensive in time. The real cost is the months of unpaid work building skills, products, or an audience before consistent income arrives. Budget for that runway honestly.',
    },
    {
      question: 'How long until an online business makes money?',
      answer:
        'It varies widely. Freelancing can produce income within weeks once you have a portfolio; content and product businesses often take six months to a year or more to become consistent. Be skeptical of anything promising fast passive income online.',
    },
    {
      question: 'Do I need technical skills?',
      answer:
        'For some models, yes; for many, no. Freelance writing, virtual assistance, and reselling need little technical skill, while software and certain e-commerce models reward it. Each business page is honest about what you actually need.',
    },
  ],
  'trades-and-skilled-work': [
    {
      question: 'Do I need to be licensed for a skilled trade?',
      answer:
        'Often yes. Many trades require certification, licensing, or an apprenticeship before you can legally and safely do the work. The skill and credential are the barrier, and also the moat that protects your earnings once you have them.',
    },
    {
      question: 'Are the trades still a good business to start?',
      answer:
        'Demand for skilled trades is steady and many skilled operators are genuinely hard to replace, which supports healthy margins. The trade-off is the upfront time and cost to become competent and certified.',
    },
    {
      question: 'How much can a skilled trade business realistically earn?',
      answer:
        'Solo skilled operators commonly earn solid full-time incomes, and those who build crews or specialize can earn well above that. Earnings depend heavily on skill, licensing, local demand, and whether you stay solo or build a company. See each business page for honest ranges.',
    },
  ],
  'food-and-beverage': [
    {
      question: 'What is the biggest hurdle in food and beverage?',
      answer:
        'Regulation and margins. Permits, food-safety rules, and where you are legally allowed to prepare food often decide whether a food business is even possible, long before product quality matters. Margins are also thin, so pricing and waste control are critical.',
    },
    {
      question: 'Can I start a food business from my home kitchen?',
      answer:
        'Sometimes, under "cottage food" laws that vary significantly by location and limit what you can sell and where. Many food businesses require a licensed commercial kitchen. Confirm your local cottage-food rules before investing in anything.',
    },
    {
      question: 'Why do so many food businesses fail?',
      answer:
        'Thin margins leave little room for error, costs (rent, labor, ingredients, waste) add up fast, and demand can be seasonal or location-dependent. Careful cost control and validating demand before scaling are what separate survivors from statistics.',
    },
  ],
  'retail-and-products': [
    {
      question: 'How much inventory should I buy to start?',
      answer:
        'As little as you can while still testing real demand. Cash tied up in unsold inventory is the most common way product businesses stall. Start small, learn what sells, then reorder, do not over-commit on your first buy.',
    },
    {
      question: 'Do product businesses really make money after fees?',
      answer:
        'Only if you price for your true all-in cost, product, shipping, platform fees, returns, and marketing. Many sellers look profitable on paper but lose money once every fee is counted. Honest unit economics are everything in retail.',
    },
    {
      question: 'Is dropshipping or Amazon FBA a get-rich-quick model?',
      answer:
        'No. Both are real businesses with real competition, fees, and skill requirements. They can work, but the easy-money marketing around them is misleading. Our business pages give honest costs, margins, and failure rates.',
    },
  ],
  'creative-and-content': [
    {
      question: 'Do I need expensive equipment to start a creative business?',
      answer:
        'Usually less than people think. If you already own a capable computer or camera, you can often start with what you have and upgrade from earnings. Skill and a focused portfolio matter more than gear early on.',
    },
    {
      question: 'How do creatives find clients?',
      answer:
        'A focused portfolio, referrals, and showing proof of results in a specific niche win more work than generic "I do everything" pitches. Specializing and pricing confidently are what move creatives from underpaid to well-paid.',
    },
    {
      question: 'Can creative work provide a stable income?',
      answer:
        'It can, but income is often uneven, especially early. The creatives who build stability tend to specialize, develop repeat clients or retainers, and treat pricing and client management as seriously as the craft itself.',
    },
  ],
  'health-and-wellness': [
    {
      question: 'Do I need certification to start a wellness business?',
      answer:
        'For most, personal training, massage, coaching modalities, yes, and clients will expect it. Certification builds the credibility and trust these businesses run on, and some services are legally restricted without it.',
    },
    {
      question: 'How do health and wellness businesses get clients?',
      answer:
        'Results and referrals, more than advertising. A handful of clients who get genuine outcomes and refer others is how most practices fill. Trust and reputation are the core assets.',
    },
    {
      question: 'What should I be careful about legally?',
      answer:
        'Stay within your scope of practice, carry liability insurance, and never make health claims you cannot support. Crossing into medical advice or unsupported promises is both a legal and a trust risk.',
    },
  ],
  'real-estate-and-property': [
    {
      question: 'Do I need to own property to start in real estate?',
      answer:
        'Not always. Models like short-term rental management and arbitrage let you earn from property you do not own, but they depend entirely on having the right agreements and local legal permission in place first.',
    },
    {
      question: 'What is the biggest risk in property businesses?',
      answer:
        'Legal and regulatory risk. Short-term rental bans, lease clauses prohibiting subletting, and zoning rules have ended property ventures overnight. Confirm legality in writing before committing money.',
    },
    {
      question: 'How much capital do property businesses need?',
      answer:
        'It varies widely by model. Some require significant capital and carry real financial exposure; others (like management services) are lighter. Each business page is specific about the realistic capital and the risks involved.',
    },
  ],
  'technology-and-software': [
    {
      question: 'Do I need to be a developer to start a tech business?',
      answer:
        'For software products, usually yes or you need a technical partner. But many tech-enabled service businesses (IT support, automation, tech freelancing) reward strong technical aptitude without requiring you to build a full product.',
    },
    {
      question: 'Why do so many software businesses fail?',
      answer:
        'Most build something nobody needed. The single biggest predictor of success is validating a real, specific problem with potential customers before building much. Talk to users first; build only what they will pay for.',
    },
    {
      question: 'How long until a tech business earns?',
      answer:
        'Service and freelance tech work can earn quickly; product businesses typically have a long build-and-validate phase before consistent revenue. Patience and a focus on real customer problems are essential.',
    },
  ],
  'local-and-community': [
    {
      question: 'What makes local businesses different?',
      answer:
        'Less online competition and powerful referral loops within a defined area, but your growth is capped by the size and density of that area. Knowing your community well is a genuine competitive advantage.',
    },
    {
      question: 'How do I market a local business?',
      answer:
        'Visibility and trust in your area: a strong Google Business Profile, local reviews, community relationships, and a few visible, well-done jobs. Local word of mouth out-performs broad advertising for these businesses.',
    },
    {
      question: 'How do I know if my area can support the business?',
      answer:
        'Check that there are enough nearby customers and not too many established competitors before committing. Density and demand in your specific area decide viability more than the business model itself.',
    },
  ],
};
