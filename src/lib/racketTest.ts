export type Profile = "CONTROL" | "POWER" | "ALLROUND" | "BUDGET";

export interface Option {
  id: string;
  emoji?: string;
  label: string;
  sublabel?: string;
  scores: Partial<Record<Profile, number>>;
}

export interface Question {
  id: string;
  title: string;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: "niveau",
    title: "WAT IS JE PADELNIVEAU?",
    options: [
      { id: "beginner", emoji: "🟢", label: "Beginner", sublabel: "Ik speel minder dan 1 jaar", scores: { CONTROL: 1, BUDGET: 1 } },
      { id: "gevorderd", emoji: "🔵", label: "Gevorderd", sublabel: "Playtomic 2.5 tot 4.0", scores: { ALLROUND: 2, CONTROL: 1 } },
      { id: "pro", emoji: "🔴", label: "Gevorderd+", sublabel: "Playtomic 4.0 en hoger", scores: { POWER: 2, ALLROUND: 1 } },
    ],
  },
  {
    id: "stijl",
    title: "HOE SPEEL JE HET LIEFST?",
    options: [
      { id: "aanvallend", emoji: "⚡", label: "Aanvallend", sublabel: "Ik ga voor de smash", scores: { POWER: 3 } },
      { id: "controlerend", emoji: "🎯", label: "Controlerend", sublabel: "Rustig opbouwen en slim spelen", scores: { CONTROL: 3 } },
      { id: "allround", emoji: "⚖️", label: "Allround", sublabel: "Beetje van alles", scores: { ALLROUND: 3 } },
    ],
  },
  {
    id: "positie",
    title: "WAAR SPEEL JE OP HET BAAN?",
    options: [
      { id: "achter", label: "Altijd achteraan", scores: { CONTROL: 2 } },
      { id: "voor", label: "Altijd vooraan", scores: { POWER: 2 } },
      { id: "wissel", label: "Wissel ik af", scores: { ALLROUND: 2 } },
    ],
  },
  {
    id: "budget",
    title: "WAT IS JE BUDGET?",
    options: [
      { id: "lt100", label: "Onder €100", scores: { BUDGET: 5 } },
      { id: "100-200", label: "€100 tot €200", scores: { BUDGET: 1, ALLROUND: 1 } },
      { id: "200-350", label: "€200 tot €350", scores: { ALLROUND: 1, POWER: 1, CONTROL: 1 } },
      { id: "350plus", label: "€350+", scores: { POWER: 2, CONTROL: 1 } },
    ],
  },
  {
    id: "gewicht",
    title: "HOE ZWAAR MAG JE RACKET ZIJN?",
    options: [
      { id: "licht", label: "Licht", sublabel: "Makkelijk manoeuvreren", scores: { CONTROL: 2 } },
      { id: "middel", label: "Middel", sublabel: "Goede balans", scores: { ALLROUND: 2 } },
      { id: "zwaar", label: "Zwaar", sublabel: "Meer power", scores: { POWER: 2 } },
    ],
  },
  {
    id: "balans",
    title: "WAAR ZIT DE BALANS IN JE RACKET?",
    options: [
      { id: "laag", label: "Laag", sublabel: "Meer controle", scores: { CONTROL: 2 } },
      { id: "midden", label: "Midden", sublabel: "Allround", scores: { ALLROUND: 2 } },
      { id: "hoog", label: "Hoog", sublabel: "Meer power", scores: { POWER: 2 } },
      { id: "weet-niet", label: "Weet ik niet", scores: { ALLROUND: 1 } },
    ],
  },
  {
    id: "vorm",
    title: "WELKE VORM SPREEKT JOU AAN?",
    options: [
      { id: "rond", label: "Rond", sublabel: "Groot sweet spot, vergevingsgezind", scores: { CONTROL: 2 } },
      { id: "druppel", label: "Druppel", sublabel: "Allround, populairste vorm", scores: { ALLROUND: 2 } },
      { id: "diamant", label: "Diamant", sublabel: "Klein sweet spot, maximale power", scores: { POWER: 2 } },
    ],
  },
  {
    id: "prioriteit",
    title: "WAT IS VOOR JOU HET BELANGRIJKST?",
    options: [
      { id: "controle", label: "Controle en gevoel", scores: { CONTROL: 3 } },
      { id: "power", label: "Power en snelheid", scores: { POWER: 3 } },
      { id: "duurzaam", label: "Duurzaamheid en stevigheid", scores: { ALLROUND: 2, POWER: 1 } },
      { id: "prijs", label: "Prijs kwaliteit", scores: { BUDGET: 3 } },
    ],
  },
];

export interface Racket {
  id: string;
  name: string;
  brand: string;
  profile: Profile[];
  description: string;
  weight: string;
  balance: string;
  vorm: string;
  price: string;
  affiliateUrl: string;
}

export const rackets: Racket[] = [
  {
    id: "head-delta-pro",
    name: "Head Delta Pro",
    brand: "Head",
    profile: ["ALLROUND", "CONTROL"],
    description: "Perfect voor spelers die controle willen zonder power op te offeren.",
    weight: "360g",
    balance: "Midden",
    vorm: "Druppel",
    price: "€189",
    affiliateUrl: "https://JOUW-AFFILIATE-LINK-HIER.nl/head-delta-pro",
  },
  {
    id: "babolat-viper",
    name: "Babolat Viper",
    brand: "Babolat",
    profile: ["POWER", "ALLROUND"],
    description: "Explosieve power met genoeg controle voor gevorderde spelers.",
    weight: "370g",
    balance: "Hoog",
    vorm: "Druppel",
    price: "€229",
    affiliateUrl: "https://JOUW-AFFILIATE-LINK-HIER.nl/babolat-viper",
  },
  {
    id: "nox-ml10",
    name: "NOX ML10 Pro",
    brand: "NOX",
    profile: ["CONTROL", "ALLROUND"],
    description: "Het racket van Miguel Lamperti. Uitzonderlijk gevoel en precisie.",
    weight: "355g",
    balance: "Laag",
    vorm: "Rond",
    price: "€249",
    affiliateUrl: "https://JOUW-AFFILIATE-LINK-HIER.nl/nox-ml10",
  },
  {
    id: "bullpadel-vertex",
    name: "Bullpadel Vertex",
    brand: "Bullpadel",
    profile: ["POWER"],
    description: "Maximale power voor aanvallers die de bal hard willen raken.",
    weight: "375g",
    balance: "Hoog",
    vorm: "Diamant",
    price: "€289",
    affiliateUrl: "https://JOUW-AFFILIATE-LINK-HIER.nl/bullpadel-vertex",
  },
  {
    id: "adidas-adipower",
    name: "Adidas Adipower",
    brand: "Adidas",
    profile: ["POWER", "ALLROUND"],
    description: "Stijlvol en krachtig. Geliefd bij gevorderde allround spelers.",
    weight: "365g",
    balance: "Midden hoog",
    vorm: "Druppel",
    price: "€219",
    affiliateUrl: "https://JOUW-AFFILIATE-LINK-HIER.nl/adidas-adipower",
  },
  {
    id: "wilson-carbon",
    name: "Wilson Carbon Force",
    brand: "Wilson",
    profile: ["BUDGET", "CONTROL"],
    description: "Beste prijs kwaliteit onder €100. Ideaal voor beginners.",
    weight: "350g",
    balance: "Midden",
    vorm: "Rond",
    price: "€79",
    affiliateUrl: "https://JOUW-AFFILIATE-LINK-HIER.nl/wilson-carbon",
  },
];

export const profileCopy: Record<Profile, { title: string; description: string }> = {
  CONTROL: {
    title: "CONTROL SPELER",
    description: "Jij speelt slim en precies. Een racket met groot sweet spot en lage balans past perfect bij jouw stijl.",
  },
  POWER: {
    title: "POWER SPELER",
    description: "Jij gaat voor de winnende klap. Een zwaar racket met hoge balans geeft jou maximale knal achter elke bal.",
  },
  ALLROUND: {
    title: "ALLROUND SPELER",
    description: "Jij past je aan elke situatie aan. Een veelzijdig racket met druppelvorm geeft jou de beste balans tussen controle en power.",
  },
  BUDGET: {
    title: "SLIMME KOPER",
    description: "Jij wilt het beste racket voor je geld. Wij hebben de scherpste prijs kwaliteit opties voor jou geselecteerd.",
  },
};

export function scoreAnswers(answers: Record<string, string>): Profile[] {
  const totals: Record<Profile, number> = { CONTROL: 0, POWER: 0, ALLROUND: 0, BUDGET: 0 };
  for (const [qid, optId] of Object.entries(answers)) {
    const q = questions.find((q) => q.id === qid);
    const opt = q?.options.find((o) => o.id === optId);
    if (!opt) continue;
    for (const [p, v] of Object.entries(opt.scores)) {
      totals[p as Profile] += v as number;
    }
  }
  if (answers.budget === "lt100") totals.BUDGET += 999;
  return (Object.entries(totals) as [Profile, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([p]) => p);
}

export function pickRackets(topProfiles: Profile[]): Racket[] {
  const scored = rackets
    .map((r) => {
      const overlap = r.profile.filter((p) => topProfiles.includes(p)).length;
      const primaryBoost = topProfiles[0] && r.profile[0] === topProfiles[0] ? 0.5 : 0;
      return { r, score: overlap + primaryBoost };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  const picks = scored.slice(0, 4).map((x) => x.r);
  // Fallback: vul aan tot 4 als er te weinig matches zijn
  if (picks.length < 4) {
    for (const r of rackets) {
      if (picks.length >= 4) break;
      if (!picks.find((p) => p.id === r.id)) picks.push(r);
    }
  }
  return picks;
}
