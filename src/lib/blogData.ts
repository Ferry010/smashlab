export interface BlogArticle {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  readingTime: string;
  author: string;
  publishedAt: string;
  focusKeyword: string;
  ogTitle: string;
  ogDescription: string;
  canonical: string;
  levelTags: string[];
  secondaryKeywords: string[];
}

export const blogArticles: BlogArticle[] = [
  {
    slug: 'padel-niveau-uitgelegd-playtomic-schaal',
    title: 'Padelniveau uitgelegd: wat betekent jouw Playtomic score?',
    seoTitle: 'Padelniveau uitgelegd: wat betekent jouw Playtomic score?',
    metaDescription: 'Van 0 tot 7.0 - alles over het Playtomic niveausysteem uitgelegd. Ontdek wat jouw padelniveau betekent, hoe je stijgt en bij welk niveau welk racket past.',
    excerpt: 'Wat betekent een Playtomic 3.0? En hoe kom je van 2.5 naar 4.0? De complete uitleg van het padelniveau systeem dat elke Nederlandse speler gebruikt.',
    category: 'Techniek & Niveau',
    readingTime: '7 min',
    author: 'Smashlab Redactie',
    publishedAt: '13 april 2026',
    focusKeyword: 'padelniveau uitgelegd',
    ogTitle: 'Padelniveau uitgelegd: wat betekent jouw Playtomic score?',
    ogDescription: 'Van 0 tot 7.0 - de complete uitleg van het padelniveau systeem voor Nederlandse spelers.',
    canonical: 'https://smashlab.nl/blogs/padel-niveau-uitgelegd-playtomic-schaal',
    levelTags: ['beginner', 'gevorderd', 'competitief'],
    secondaryKeywords: ['Playtomic niveau', 'padel niveausysteem', 'padel rating nederland', 'hoe goed ben ik padel', 'playtomic schaal 0 tot 7'],
  },
  {
    slug: 'beste-padelracket-per-niveau-2026',
    title: 'Beste padelracket per niveau in 2026 - van 1.0 tot 5.0',
    seoTitle: 'Beste padelracket per niveau in 2026 - van 1.0 tot 5.0',
    metaDescription: 'Welk padelracket past bij jouw Playtomic niveau? Van beginner (1.0) tot gevorderd (5.0) - onze eerlijke top picks per niveau met prijzen, voor- en nadelen.',
    excerpt: 'Niet elk racket past bij elk niveau. Ontdek welk padelracket het beste is voor jouw Playtomic score - van je allereerste racket tot je upgrade naar gevorderd spel.',
    category: 'Gear & Rackets',
    readingTime: '8 min',
    author: 'Smashlab Redactie',
    publishedAt: '13 april 2026',
    focusKeyword: 'beste padelracket per niveau',
    ogTitle: 'Beste padelracket per niveau in 2026 - van 1.0 tot 5.0',
    ogDescription: 'Niet elk racket past bij elk niveau. Onze eerlijke picks per Playtomic score, met voor- en nadelen.',
    canonical: 'https://smashlab.nl/blogs/beste-padelracket-per-niveau-2026',
    levelTags: ['beginner', 'gemiddeld', 'gevorderd'],
    secondaryKeywords: ['padelracket kopen 2026', 'padelracket beginner nederland', 'padelracket gevorderd', 'welk padelracket past bij mij', 'padelracket Playtomic niveau'],
  },
  {
    slug: 'padel-beginnen-nederland-complete-gids',
    title: 'Padel beginnen in Nederland - de complete startersgids 2026',
    seoTitle: 'Padel beginnen in Nederland - de complete startersgids 2026',
    metaDescription: 'Wil je beginnen met padel in Nederland? Alles over de regels, het materiaal, je eerste baan vinden, het niveau systeem en wat het kost. Stap voor stap.',
    excerpt: 'Nog nooit gespeeld maar wel nieuwsgierig? Dit is de enige gids die je nodig hebt om te beginnen met padel in Nederland - van je eerste baan tot je eerste echte wedstrijd.',
    category: 'Beginners',
    readingTime: '9 min',
    author: 'Smashlab Redactie',
    publishedAt: '13 april 2026',
    focusKeyword: 'padel beginnen nederland',
    ogTitle: 'Padel beginnen in Nederland - alles wat je moet weten in 2026',
    ogDescription: 'Van de regels tot je eerste racket en je eerste baan. De complete startersgids voor nieuwe padelspelers in Nederland.',
    canonical: 'https://smashlab.nl/blogs/padel-beginnen-nederland-complete-gids',
    levelTags: ['beginner'],
    secondaryKeywords: ['padel leren', 'padel regels uitleg', 'hoe werkt padel', 'padel voor beginners', 'eerste keer padel spelen', 'padel baan nederland', 'padel kosten'],
  },
];

export function getBlogBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((b) => b.slug === slug);
}
