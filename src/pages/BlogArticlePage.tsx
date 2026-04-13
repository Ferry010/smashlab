import { useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogBySlug } from '@/lib/blogData';
import BlogPostPage from './BlogPostPage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ─── Reusable styled components ─── */

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 glass-card p-5">
      <p className="font-body text-sm text-foreground/90">{children}</p>
    </div>
  );
}

function BlogLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="font-body font-medium text-lime hover:underline">
      {children}
    </Link>
  );
}

/* ─── Blog 1: Niveau uitgelegd ─── */
function NiveauContent() {
  return (
    <>
      <p>Je staat op de baan, speelt een potje mee en iemand vraagt: "Wat is je niveau?" Je haalt je schouders op. Klinkt bekend?</p>
      <p className="mt-4">Het Playtomic niveausysteem loopt van 0 tot 7.0 en wordt door bijna alle Nederlandse padelspelers gebruikt om tegenstanders te matchen, baantjes te boeken en hun eigen voortgang bij te houden. Maar wat betekenen die nummers nu eigenlijk? En hoe weet je waar jij staat?</p>
      <p className="mt-4">In dit artikel leggen we het complete systeem uit, zodat jij niet alleen weet wat je scoort maar ook precies weet wat je moet doen om naar het volgende niveau te stijgen.</p>

      <h2 className="mt-10 font-display text-3xl text-foreground">WAAROM HET PLAYTOMIC NIVEAUSYSTEEM BESTAAT</h2>
      <p className="mt-4">Padel is een sport waarbij niveauverschil de fun compleet kan verpesten. Als je als beginner speelt tegen iemand op niveau 4.5, is het geen wedstrijd - het is een les. En andersom: als gevorderde spelers constant winnen van beginners, verliezen ze de uitdaging.</p>
      <p className="mt-4">Playtomic loste dit op met een dynamisch systeem: je rating wordt na elke competitieve wedstrijd automatisch bijgesteld op basis van wie je versloeg, wie je verloor van, en hoe sterk je partner en tegenstanders waren. Geen zelfbeoordeling, maar objectieve data.</p>

      <h2 className="mt-10 font-display text-3xl text-foreground">DE PLAYTOMIC NIVEAUS - VOLLEDIG UITGELEGD</h2>

      <h3 className="mt-8 font-display text-2xl text-foreground">NIVEAU 0 - GEEN ERVARING</h3>
      <p className="mt-3">Je hebt nog nooit een racketsport gespeeld. Alles is nieuw. Het systeem plaatst je hier als startpunt bij de eerste aanmelding.</p>
      <p className="mt-2"><strong>Wat je kunt:</strong> de baan betreden</p>
      <p><strong>Wat je nog niet kunt:</strong> consistent de bal over het net slaan</p>

      <h3 className="mt-8 font-display text-2xl text-foreground">NIVEAU 0.5 - 1.0 - ABSOLUTE BEGINNER</h3>
      <p className="mt-3">Je speelt minder dan 6 maanden en hebt weinig of geen les gehad. Je kent de basisregels maar techniek en tactiek zijn nog niet aanwezig.</p>
      <p className="mt-2"><strong>Wat je kunt:</strong> de bal over het net slaan, basis service uitvoeren</p>
      <p><strong>Focus:</strong> regelmatig spelen, lessen volgen, vertrouwdheid opbouwen</p>
      <p><strong>Passend racket:</strong> rond, licht (340-360g), EVA-kern voor maximale vergeving</p>

      <h3 className="mt-8 font-display text-2xl text-foreground">NIVEAU 1.5 - 2.0 - BEGINNER GEMIDDELD</h3>
      <p className="mt-3">Je hebt lessen gevolgd en speelt een paar wedstrijden per maand. Rally's lukken op lage snelheid. Je kent de regels goed en begint positie op de baan te begrijpen.</p>
      <p className="mt-2"><strong>Wat je kunt:</strong> consistente korte rally's, basis service, backhand en forehand op lage snelheid</p>
      <p><strong>Focus:</strong> balcontrole, positie op de baan (net vs. achterlijn), de wanden leren gebruiken</p>
      <p><strong>Passend racket:</strong> rond of druppel, 350-370g, zachte kern</p>

      <h3 className="mt-8 font-display text-2xl text-foreground">NIVEAU 2.5 - 3.0 - GEMIDDELD</h3>
      <p className="mt-3">Je hebt de meeste basisvormen in huis en speelt in normaal tempo. Je maakt nog onnodige fouten maar je begrijpt het spel. Dit is waar de meeste recreatieve Nederlandse spelers zitten na 1-2 jaar.</p>
      <p className="mt-2"><strong>Wat je kunt:</strong> rally's op normaal tempo, gebruik van de wanden, slice beginnen te leren</p>
      <p><strong>Focus:</strong> minder ongedwongen fouten, positionering met je partner, gebruik van de glazen wand</p>
      <p><strong>Passend racket:</strong> druppel, 360-375g, middelzachte kern</p>

      <Tip>💡 Wist je dit? De meeste recreatieve spelers in Nederland zitten tussen niveau 2.5 en 3.5. Ben je hier, dan speel je in goed gezelschap.</Tip>

      <h3 className="mt-8 font-display text-2xl text-foreground">NIVEAU 3.5 - 4.0 - BOVEN GEMIDDELD</h3>
      <p className="mt-3">Je beheerst de meeste slagen. Je kunt slice forehand, slice backhand en flat spelen. Je geeft richting aan de bal en maakt aanzienlijk minder onnodige fouten. Je speelt strategischer.</p>
      <p className="mt-2"><strong>Wat je kunt:</strong> slagvariatie, goede richting, gebruik van tempo en spin</p>
      <p><strong>Focus:</strong> tactiek verfijnen, beginnen met bandeja en lob, aanvallend spelen aan het net</p>
      <p><strong>Passend racket:</strong> druppel of begin diamant, 365-380g, harder oppervlak voor meer controle</p>

      <h3 className="mt-8 font-display text-2xl text-foreground">NIVEAU 4.5 - 5.0 - GEVORDERD</h3>
      <p className="mt-3">Je beheerst slagen en richting goed. Je bent klaar om echt tactisch padel te spelen. Bandeja, vibora, chiquita - je begint ze te leren of te beheersen. Je speelt op snelheid en past je speelstijl aan op je tegenstander.</p>
      <p className="mt-2"><strong>Wat je kunt:</strong> gevorderde slagen, aanval en verdediging, hoog tempo wedstrijden</p>
      <p><strong>Focus:</strong> consistentie op hoog tempo, partnercoordinatie, mentaal spel</p>
      <p><strong>Passend racket:</strong> druppel of diamant, 370-385g, carbon frame voor meer power</p>

      <h3 className="mt-8 font-display text-2xl text-foreground">NIVEAU 5.5 - 6.0 - GEVORDERD NAAR COMPETITIEF</h3>
      <p className="mt-3">Je speelt op clubniveau en doet mee aan toernooien. Techniek, tactiek en fysiek zijn op hoog niveau. Je begrijpt het spel op een manier die zichtbaar is voor tegenstanders.</p>
      <p className="mt-2"><strong>Wat je kunt:</strong> volledige technische beheersing, tactisch coachen van je partner, spelen op competitief niveau</p>
      <p><strong>Focus:</strong> toernooivoorbereiding, physical conditioning, mentale weerbaarheid</p>
      <p><strong>Passend racket:</strong> diamant, 375-390g, volledig carbon, aanvallende balans</p>

      <h3 className="mt-8 font-display text-2xl text-foreground">NIVEAU 7.0 - ELITE / PROFESSIONEEL</h3>
      <p className="mt-3">Top 30 van de World Padel Tour. Genoeg gezegd.</p>

      <h2 className="mt-10 font-display text-3xl text-foreground">HOE STIJG JE IN NIVEAU?</h2>
      <p className="mt-4">Het systeem past je niveau automatisch aan na competitieve wedstrijden - niet na vriendschappelijke potjes. Drie factoren tellen mee:</p>
      <ul className="mt-3 list-inside list-disc space-y-1 text-foreground/80">
        <li><strong>Wedstrijdresultaat</strong> - win of verlies</li>
        <li><strong>Niveau van tegenstanders</strong> - winnen van sterkere spelers geeft meer punten</li>
        <li><strong>Betrouwbaarheidsscore</strong> - hoe meer wedstrijden je speelt, hoe nauwkeuriger je rating</li>
      </ul>
      <p className="mt-4">De snelste manier om te stijgen: speel competitief, ook als je verliest. Consistent spelen tegen spelers net boven jouw niveau trekt je niveau omhoog, zelfs bij verlies.</p>

      <h2 className="mt-10 font-display text-3xl text-foreground">HOE WEET JE WAT JOUW HUIDIGE NIVEAU IS?</h2>
      <p className="mt-4">Als je nog geen Playtomic account hebt, kun je je niveau inschatten via deze checklist:</p>

      <div className="my-6 overflow-x-auto">
        <table className="w-full glass-card text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left font-body font-semibold text-foreground">Vraag</th>
              <th className="px-4 py-3 text-left font-body font-semibold text-foreground">Antwoord</th>
              <th className="px-4 py-3 text-left font-body font-semibold text-foreground">Niveau indicatie</th>
            </tr>
          </thead>
          <tbody className="text-foreground/80">
            <tr className="border-b border-border/50"><td className="px-4 py-2.5">Speel ik minder dan 6 maanden?</td><td className="px-4 py-2.5">Ja</td><td className="px-4 py-2.5 text-lime">0.5 - 1.0</td></tr>
            <tr className="border-b border-border/50"><td className="px-4 py-2.5">Kan ik consistente rally's spelen?</td><td className="px-4 py-2.5">Ja</td><td className="px-4 py-2.5 text-lime">1.5 - 2.5</td></tr>
            <tr className="border-b border-border/50"><td className="px-4 py-2.5">Gebruik ik de wanden bewust?</td><td className="px-4 py-2.5">Ja</td><td className="px-4 py-2.5 text-lime">2.5 - 3.5</td></tr>
            <tr className="border-b border-border/50"><td className="px-4 py-2.5">Beheers ik slice en richting?</td><td className="px-4 py-2.5">Ja</td><td className="px-4 py-2.5 text-lime">3.5 - 4.5</td></tr>
            <tr className="border-b border-border/50"><td className="px-4 py-2.5">Speel ik bandeja en vibora?</td><td className="px-4 py-2.5">Ja</td><td className="px-4 py-2.5 text-lime">4.5 - 5.5</td></tr>
            <tr><td className="px-4 py-2.5">Doe ik mee aan toernooien?</td><td className="px-4 py-2.5">Ja</td><td className="px-4 py-2.5 text-lime">5.0+</td></tr>
          </tbody>
        </table>
      </div>

      <Tip>🎾 Smashlab tip: gebruik je niveau als spiegel, niet als label. Je niveau is geen identiteit - het is een meting. Het zegt iets over waar je staat, niet over wie je bent als speler.</Tip>

      <p className="mt-4">Op Smashlab houden we je voortgang bij, koppelen we content aan jouw niveau en helpen we je de juiste gear te vinden voor de fase waar je nu in zit.</p>
      <p className="mt-4">Wil je weten welk racket past bij jouw niveau? Lees dan ons artikel: <BlogLink to="/blogs/beste-padelracket-per-niveau-2026">Beste padelracket voor jouw niveau in 2026 →</BlogLink></p>

      <h2 className="mt-10 font-display text-3xl text-foreground">SAMENVATTING</h2>
      <ul className="mt-4 list-inside list-disc space-y-1 text-foreground/80">
        <li>Playtomic gebruikt een schaal van 0 tot 7.0</li>
        <li>Je niveau wordt automatisch bijgesteld na competitieve wedstrijden</li>
        <li>De meeste Nederlandse recreatieve spelers zitten tussen 2.5 en 3.5</li>
        <li>Stijgen gaat sneller door te spelen dan door te trainen</li>
        <li>Elk niveau vraagt om ander materiaal, andere focus en andere tactiek</li>
      </ul>
    </>
  );
}

/* ─── Blog 2: Rackets per niveau ─── */
function RacketContent() {
  return (
    <>
      <p>Er is een fout die bijna elke nieuwe padelspeler maakt: het verkeerde racket kopen.</p>
      <p className="mt-4">Ze zien een professioneel speler op YouTube met een stijf, diamantvormig carbon monster van €280. Ze kopen hetzelfde. En dan vragen ze zich af waarom hun elleboog pijn doet, de bal nergens landt en padel eigenlijk helemaal niet zo leuk is.</p>
      <p className="mt-4">Het goede nieuws: dit is volledig vermijdbaar. Het juiste racket voor jouw niveau maakt padel makkelijker, leuker en beschermt je arm. Het verkeerde racket kost je punten en gezondheid.</p>
      <p className="mt-4">In deze gids koppelen we het Playtomic niveausysteem (0-7.0) aan de rackets die daar echt bij passen. Geen reclame, geen gesponsorde top-5. Gewoon eerlijk advies.</p>

      <Tip>📋 Affiliate disclaimer: sommige links in dit artikel zijn affiliate links. Je betaalt nooit meer dan de normale prijs, maar we ontvangen soms een kleine vergoeding als je via onze link koopt.</Tip>

      <h2 className="mt-10 font-display text-3xl text-foreground">DE DRIE BASISREGELS VOORDAT JE KOOPT</h2>

      <h3 className="mt-6 font-display text-2xl text-foreground">1. GOEDKOPER IS NIET SLECHTER BIJ BEGINNERS</h3>
      <p className="mt-3">Een racket van €60-90 van Head, Babolat of Bullpadel is voor een beginner beter dan een racket van €250. Goedkopere instapmodellen zijn zachter, vergevingsgezinder en beschermen je arm.</p>

      <h3 className="mt-6 font-display text-2xl text-foreground">2. VORM BEPAALT ALLES</h3>
      <ul className="mt-3 list-inside list-disc space-y-1 text-foreground/80">
        <li><strong>Rond</strong> = groot sweetspot, maximale controle, ideaal voor beginners (Playtomic 0-2.5)</li>
        <li><strong>Druppel</strong> = balans tussen controle en power, ideaal voor gemiddeld niveau (Playtomic 2.5-4.5)</li>
        <li><strong>Diamant</strong> = klein sweetspot hoog in de kop, maximale power, alleen voor gevorderden (Playtomic 4.5+)</li>
      </ul>

      <h3 className="mt-6 font-display text-2xl text-foreground">3. GEWICHT TELT</h3>
      <ul className="mt-3 list-inside list-disc space-y-1 text-foreground/80">
        <li><strong>340-360g:</strong> licht, makkelijk te hanteren, minder kracht vereist</li>
        <li><strong>365-380g:</strong> standaard, balans tussen controle en power</li>
        <li><strong>380g+:</strong> zwaar, meer power maar vermoeit je arm sneller</li>
      </ul>

      {/* Niveau 0-1.5 */}
      <h2 className="mt-10 font-display text-3xl text-foreground">PLAYTOMIC 0 - 1.5: JE EERSTE RACKET</h2>
      <p className="mt-4"><strong>Wat je nodig hebt:</strong> maximale vergeving, groot sweetspot, licht gewicht, geen onnodige ballast</p>
      <p className="mt-3">Je slaat de bal nog niet altijd uit het midden van het racket. Dat is normaal. Je racket moet die fouten opvangen, niet bestraffen.</p>

      <div className="my-6 glass-card p-5">
        <p className="font-body text-xs font-semibold uppercase tracking-widest text-lime">Onze pick</p>
        <h4 className="mt-2 font-display text-2xl text-foreground">HEAD EVO SPEED 2025</h4>
        <p className="mt-1 font-body text-sm text-muted">Prijs: €75-95 | Vorm: Rond | Gewicht: 350g | Kern: Soft EVA</p>
        <p className="mt-3 text-foreground/80">Het is geen toeval dat dit racket in elke beginnerslijst van 2026 staat. De Innegra technologie in het frame absorbeert schokken, je arm blijft fris na een uurtje spelen en de sweetspot is vergevingsgezind genoeg dat mis-hits toch redelijk landen.</p>
        <div className="mt-3 space-y-0.5 text-sm text-foreground/80">
          <p>✅ Comfortabel voor je arm</p>
          <p>✅ Grote sweetspot</p>
          <p>✅ Goede balcontrole</p>
          <p>✅ Prijs-kwaliteit verhouding uitstekend</p>
          <p>❌ Beperkte power (maar dat heb je nog niet nodig)</p>
        </div>
        <a href="#" className="mt-4 inline-block rounded-full bg-lime px-5 py-2 font-body text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity">Bekijk prijs →</a>
      </div>

      <div className="my-6 glass-card p-5">
        <p className="font-body text-xs font-semibold uppercase tracking-widest text-muted">Budget alternatief</p>
        <h4 className="mt-2 font-display text-xl text-foreground">BABOLAT CONTACT</h4>
        <p className="mt-1 font-body text-sm text-muted">Prijs: €50-65 | Vorm: Rond | Gewicht: 340g</p>
        <p className="mt-3 text-foreground/80">Als je budget krap is maar je wilt geen troep: dit is je racket. Superlicht, absorbeert trillingen goed en geeft je het gevoel van padel spelen zonder blessurerisico.</p>
      </div>

      {/* Niveau 1.5-2.5 */}
      <h2 className="mt-10 font-display text-3xl text-foreground">PLAYTOMIC 1.5 - 2.5: JE BASISVAARDIGHEDEN GROEIEN</h2>
      <p className="mt-4"><strong>Wat je nodig hebt:</strong> meer controle en iets meer power, maar nog steeds vergevingsgezind</p>

      <div className="my-6 glass-card p-5">
        <p className="font-body text-xs font-semibold uppercase tracking-widest text-lime">Onze pick</p>
        <h4 className="mt-2 font-display text-2xl text-foreground">BULLPADEL INDIGA CONTROL 2026</h4>
        <p className="mt-1 font-body text-sm text-muted">Prijs: €90-115 | Vorm: Rond | Gewicht: 365g | Kern: Soft Foam</p>
        <p className="mt-3 text-foreground/80">Bullpadel heeft iets slims gedaan met dit racket: de Grip Zone technologie helpt je hand automatisch naar de juiste positie. Voor spelers die hun techniek nog aan het opbouwen zijn, is dit een onderschat voordeel.</p>
        <div className="mt-3 space-y-0.5 text-sm text-foreground/80">
          <p>✅ Helpt je techniek actief te verbeteren</p>
          <p>✅ Groot sweetspot voor dit gewicht</p>
          <p>✅ Steviger gevoel dan absolute instapmodellen</p>
          <p>❌ Iets zwaarder - merk je aan het einde van een lange training</p>
        </div>
        <a href="#" className="mt-4 inline-block rounded-full bg-lime px-5 py-2 font-body text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity">Bekijk prijs →</a>
      </div>

      {/* Niveau 2.5-3.5 */}
      <h2 className="mt-10 font-display text-3xl text-foreground">PLAYTOMIC 2.5 - 3.5: JE MAAKT DE SWITCH NAAR DRUPPEL</h2>
      <p className="mt-4"><strong>Wat je nodig hebt:</strong> meer power zonder controle op te offeren, druppelvorm</p>
      <p className="mt-3">Dit is het keerpunt. Je mist de extra kracht die een ronder racket niet geeft. Je wil meer doen met de bal. Tijd voor een druppelvorm.</p>

      <div className="my-6 glass-card p-5">
        <p className="font-body text-xs font-semibold uppercase tracking-widest text-lime">Onze pick</p>
        <h4 className="mt-2 font-display text-2xl text-foreground">HEAD FLASH PRO 2.0 2026</h4>
        <p className="mt-1 font-body text-sm text-muted">Prijs: €60-85 | Vorm: Druppel | Gewicht: 360g</p>
        <p className="mt-3 text-foreground/80">Wacht - zo goedkoop voor dit niveau? Ja. En het is geen concessie. De Flash Pro 2.0 combineert een druppelvorm met een sweetspot die bijna zo groot is als een rondje. Dat is het ideale transitieracket.</p>
        <div className="mt-3 space-y-0.5 text-sm text-foreground/80">
          <p>✅ Ideaal transitieracket van rond naar druppel</p>
          <p>✅ Ongelooflijke prijs-kwaliteitverhouding</p>
          <p>✅ Licht genoeg voor het hele wedstrijdniveau</p>
          <p>❌ Minder premium gevoel dan duurdere opties</p>
        </div>
        <a href="#" className="mt-4 inline-block rounded-full bg-lime px-5 py-2 font-body text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity">Bekijk prijs →</a>
      </div>

      {/* Niveau 3.5-4.5 */}
      <h2 className="mt-10 font-display text-3xl text-foreground">PLAYTOMIC 3.5 - 4.5: GEVORDERD - RICHTING DIAMANT</h2>
      <p className="mt-4"><strong>Wat je nodig hebt:</strong> meer power, iets smaller sweetspot, harder oppervlak, directere respons</p>

      <div className="my-6 glass-card p-5">
        <p className="font-body text-xs font-semibold uppercase tracking-widest text-lime">Onze pick</p>
        <h4 className="mt-2 font-display text-2xl text-foreground">BABOLAT AIR VERTUO 2026</h4>
        <p className="mt-1 font-body text-sm text-muted">Prijs: €145-180 | Vorm: Druppel/Diamant hybrid | Gewicht: 375g</p>
        <p className="mt-3 text-foreground/80">Dit is het racket dat je koopt als je wil aanvallen. De luchtkanalen in het frame geven snelheid aan je slagen zonder dat je de precisie volledig kwijtraakt.</p>
        <div className="mt-3 space-y-0.5 text-sm text-foreground/80">
          <p>✅ Uitstekende combinatie van power en controle</p>
          <p>✅ Merkbare upgrade bij smash en bandeja</p>
          <p>✅ Premium kwaliteit, voelt duurzaam</p>
          <p>❌ Vergeeft mis-hits minder - dat is de bedoeling</p>
          <p>❌ Niet voor spelers onder 3.5</p>
        </div>
        <a href="#" className="mt-4 inline-block rounded-full bg-lime px-5 py-2 font-body text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity">Bekijk prijs →</a>
      </div>

      {/* Niveau 4.5-5.5 */}
      <h2 className="mt-10 font-display text-3xl text-foreground">PLAYTOMIC 4.5 - 5.5: VOLLEDIG GEVORDERD</h2>
      <p className="mt-4"><strong>Wat je nodig hebt:</strong> diamantvorm, volledig carbon, hoge balans, maximale power</p>

      <div className="my-6 glass-card p-5">
        <p className="font-body text-xs font-semibold uppercase tracking-widest text-lime">Onze pick</p>
        <h4 className="mt-2 font-display text-2xl text-foreground">NOX AT10 LUXURY GENIUS 2026</h4>
        <p className="mt-1 font-body text-sm text-muted">Prijs: €249-299 | Vorm: Diamant | Gewicht: 380g | Frame: Volledig carbon</p>
        <p className="mt-3 text-foreground/80">Dit is een serieus racket voor serieuze spelers. Kleine sweetspot hoog in de kop, harde kern, maximale power bij volledig geraakte slagen.</p>
        <div className="mt-3 space-y-0.5 text-sm text-foreground/80">
          <p>✅ Maximale power bij gevorderde slagen</p>
          <p>✅ Uitstekende respons bij volleys aan het net</p>
          <p>✅ Gebouwd voor toernooisspel</p>
          <p>❌ Straft mis-hits hard - bedoeld voor spelers die dat weten</p>
          <p>❌ Niet voor spelers onder 4.0, ongeacht budget</p>
        </div>
        <a href="#" className="mt-4 inline-block rounded-full bg-lime px-5 py-2 font-body text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity">Bekijk prijs →</a>
      </div>

      <Tip>⚠️ De grote fout: te vroeg te veel uitgeven. Elke week zien we het op de baan: iemand op niveau 2.0 met een carbon diamantracket van €250 die constant mis-slaat en zijn elleboog pijnlijk vindt. Een duur racket maakt je niet beter. Koop het racket dat past bij waar je nu staat, niet bij waar je wil zijn.</Tip>

      <h2 className="mt-10 font-display text-3xl text-foreground">SNEL OVERZICHT</h2>
      <div className="my-6 overflow-x-auto">
        <table className="w-full glass-card text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left font-body font-semibold text-foreground">Niveau</th>
              <th className="px-4 py-3 text-left font-body font-semibold text-foreground">Vorm</th>
              <th className="px-4 py-3 text-left font-body font-semibold text-foreground">Gewicht</th>
              <th className="px-4 py-3 text-left font-body font-semibold text-foreground">Budget</th>
              <th className="px-4 py-3 text-left font-body font-semibold text-foreground">Onze pick</th>
            </tr>
          </thead>
          <tbody className="text-foreground/80">
            <tr className="border-b border-border/50"><td className="px-4 py-2.5">0 - 1.5</td><td className="px-4 py-2.5">Rond</td><td className="px-4 py-2.5">340-360g</td><td className="px-4 py-2.5">€50-95</td><td className="px-4 py-2.5 text-lime">Head Evo Speed 2025</td></tr>
            <tr className="border-b border-border/50"><td className="px-4 py-2.5">1.5 - 2.5</td><td className="px-4 py-2.5">Rond</td><td className="px-4 py-2.5">355-370g</td><td className="px-4 py-2.5">€75-115</td><td className="px-4 py-2.5 text-lime">Bullpadel Indiga Control</td></tr>
            <tr className="border-b border-border/50"><td className="px-4 py-2.5">2.5 - 3.5</td><td className="px-4 py-2.5">Druppel</td><td className="px-4 py-2.5">360-375g</td><td className="px-4 py-2.5">€60-175</td><td className="px-4 py-2.5 text-lime">Head Flash Pro 2.0</td></tr>
            <tr className="border-b border-border/50"><td className="px-4 py-2.5">3.5 - 4.5</td><td className="px-4 py-2.5">Druppel/Hybrid</td><td className="px-4 py-2.5">370-380g</td><td className="px-4 py-2.5">€145-180</td><td className="px-4 py-2.5 text-lime">Babolat Air Vertuo</td></tr>
            <tr><td className="px-4 py-2.5">4.5 - 5.5</td><td className="px-4 py-2.5">Diamant</td><td className="px-4 py-2.5">375-390g</td><td className="px-4 py-2.5">€200-300</td><td className="px-4 py-2.5 text-lime">NOX AT10 Luxury</td></tr>
          </tbody>
        </table>
      </div>

      <p className="mt-6">Wil je weten wat jouw Playtomic niveau precies betekent? Lees: <BlogLink to="/blogs/padel-niveau-uitgelegd-playtomic-schaal">Padelniveau uitgelegd - van 0 tot 7.0 →</BlogLink></p>
      <p className="mt-3">Nog helemaal nieuw? Start met: <BlogLink to="/blogs/padel-beginnen-nederland-complete-gids">Padel beginnen in Nederland - de complete startersgids →</BlogLink></p>
    </>
  );
}

/* ─── Blog 3: Beginnen met padel ─── */
function BeginnenContent() {
  return (
    <>
      <p>Je hebt het zien groeien. Op Instagram. Bij je sportschool. Op het terrein van je tennisclub. Overal verschijnen glazen kooien. Iedereen speelt padel.</p>
      <p className="mt-4">En nu wil jij het ook proberen. Maar je weet niet waar te beginnen.</p>
      <p className="mt-4">Goed nieuws: padel is de makkelijkst te leren racketsport ter wereld. Niet omdat het simpel is, maar omdat je binnen een uur al plezier hebt op de baan - zelfs als je nog nooit een racket vasthad. Dat is precies waarom 876.000 Nederlanders het al spelen.</p>
      <p className="mt-4">Dit is de enige gids die je nodig hebt om te beginnen. Van de regels tot je eerste eigen racket, van je eerste baan vinden tot begrijpen wat dat "niveau 2.0" eigenlijk betekent.</p>

      <h2 className="mt-10 font-display text-3xl text-foreground">WAT IS PADEL EIGENLIJK?</h2>
      <p className="mt-4">Padel lijkt op tennis maar is fundamenteel anders. De baan is kleiner (20 x 10 meter), omgeven door glazen wanden en hekken - en die wanden zijn onderdeel van het spel. De bal mag na de stuit van de wand teruggespeeld worden, wat zorgt voor rallies die je in tennis nooit ziet.</p>
      <p className="mt-4">Je speelt altijd met vier spelers (twee koppels). Het racket heeft geen snaren maar een gesponsd oppervlak.</p>
      <ul className="mt-3 list-inside list-disc space-y-1 text-foreground/80">
        <li>Kleiner baan = snellere rallies</li>
        <li>Glazen wanden = tactische diepgang</li>
        <li>Vier spelers = sociale sport</li>
        <li>Lage instapdrempel = iedereen kan meedoen</li>
      </ul>

      <h2 className="mt-10 font-display text-3xl text-foreground">DE BASISREGELS IN 5 MINUTEN</h2>

      <h3 className="mt-6 font-display text-2xl text-foreground">SERVICE</h3>
      <ul className="mt-3 list-inside list-disc space-y-1 text-foreground/80">
        <li>De service is altijd diagonaal, net zoals bij tennis</li>
        <li>De bal moet eerst de grond in het eigen vak raken voor je slaat (onderhandse slag, onder heupniveau)</li>
        <li>De geserveerde bal moet na de stuit in het diagonale servicevak van de tegenstander vallen</li>
        <li>Twee serveerbeurten per punt, net als bij tennis</li>
      </ul>

      <h3 className="mt-6 font-display text-2xl text-foreground">PUNTEN TELLEN</h3>
      <ul className="mt-3 list-inside list-disc space-y-1 text-foreground/80">
        <li>Identiek aan tennis: 15, 30, 40, game</li>
        <li>Sets gaan tot 6 games, bij 6-6 een tiebreak</li>
        <li>Wedstrijden zijn meestal best-of-3 sets</li>
      </ul>

      <h3 className="mt-6 font-display text-2xl text-foreground">DE WANDEN</h3>
      <ul className="mt-3 list-inside list-disc space-y-1 text-foreground/80">
        <li>De bal mag na de eerste stuit van de achterwand of zijwand teruggespeeld worden</li>
        <li>De bal mag de wand bereiken via de lucht (zonder stuit) - maar dan moet hij eerst terug het veld in</li>
        <li>Als de bal buiten de wand uitkomt (over het hek): punt verloren</li>
      </ul>

      <Tip>⚠️ Fouten die beginners altijd maken: de bal over de glazen wand slaan, de bal twee keer laten stuiteren, te hard slaan (controle wint van power in padel), en aan de achterlijn blijven staan in plaats van het net opzoeken.</Tip>

      <h2 className="mt-10 font-display text-3xl text-foreground">JE EERSTE BAAN BOEKEN</h2>
      <p className="mt-4">Nederland heeft inmiddels meer dan 3.600 padelbanen verspreid over 786 locaties. De kans is groot dat er een bij jou in de buurt is.</p>
      <p className="mt-4">De makkelijkste manier is via Playtomic - de grootste padel boekings-app van Nederland. Download de app, zoek op je stad of postcode, en je ziet direct welke clubs beschikbaar zijn.</p>

      <h3 className="mt-6 font-display text-2xl text-foreground">GEMIDDELDE PRIJZEN</h3>
      <ul className="mt-3 list-inside list-disc space-y-1 text-foreground/80">
        <li><strong>Binnenbaan:</strong> €18-28 per uur (gedeeld door 4 = €4,50-7 per persoon)</li>
        <li><strong>Buitenbaan:</strong> €12-18 per uur</li>
        <li><strong>Spitsuren (avond/weekend):</strong> vaak duurder</li>
      </ul>

      <h2 className="mt-10 font-display text-3xl text-foreground">WAT HEB JE NODIG?</h2>

      <h3 className="mt-6 font-display text-2xl text-foreground">VERPLICHT</h3>
      <ul className="mt-3 list-inside list-disc space-y-1 text-foreground/80">
        <li><strong>Racket</strong> - huur er een voor je eerste potje, koop daarna je eigen (<BlogLink to="/blogs/beste-padelracket-per-niveau-2026">zie onze racketgids</BlogLink>)</li>
        <li><strong>Padelschoenen</strong> - dit is belangrijker dan mensen denken. Normale sportschoenen glijden op het kunstgras. Investeer als eerste aankoop liever in schoenen dan in een duur racket.</li>
        <li><strong>Sportkleding</strong> - geen speciale eisen, gewoon bewegingsvriendelijk</li>
      </ul>

      <h3 className="mt-6 font-display text-2xl text-foreground">NIET NODIG ALS BEGINNER</h3>
      <ul className="mt-3 list-inside list-disc space-y-1 text-foreground/80">
        <li>Carbon rackets van €200+</li>
        <li>Professionele padelballen (veel te hard voor beginners)</li>
        <li>Speciale padel tassen (je sporttas doet het prima)</li>
      </ul>

      <h2 className="mt-10 font-display text-3xl text-foreground">HET NIVEAUSYSTEEM - WAT BEN JIJ?</h2>
      <p className="mt-4">Padel gebruikt het Playtomic niveausysteem van 0 tot 7.0. Voor beginners geldt het volgende:</p>
      <ul className="mt-3 list-inside list-disc space-y-1 text-foreground/80">
        <li><strong>Niveau 0 - 1.0:</strong> Je speelt voor het eerst of de eerste maanden. Alles is nieuw.</li>
        <li><strong>Niveau 1.5 - 2.0:</strong> Je hebt een paar maanden gespeeld. Je kunt rally's voeren. Je kent de regels.</li>
        <li><strong>Niveau 2.5 - 3.0:</strong> Je speelt al een jaar of langer. Je gebruikt de wanden. Je begrijpt tactiek.</li>
      </ul>
      <p className="mt-4">De meeste mensen die beginnen met padel zitten na zes maanden regelmatig spelen ergens tussen 1.5 en 2.5.</p>
      <p className="mt-4">Wil je het volledige niveausysteem begrijpen? Lees: <BlogLink to="/blogs/padel-niveau-uitgelegd-playtomic-schaal">Padelniveau uitgelegd - van 0 tot 7.0 →</BlogLink></p>

      <h2 className="mt-10 font-display text-3xl text-foreground">LESSEN OF METEEN SPELEN?</h2>
      <p className="mt-4">Eerlijk antwoord: doe allebei. Je kunt beginnen zonder les - padel is forgiving genoeg dat je gewoon plezier hebt. Maar een paar lessen in het begin versnelt je ontwikkeling enorm.</p>

      <h3 className="mt-6 font-display text-2xl text-foreground">WAT KOST EEN LES?</h3>
      <ul className="mt-3 list-inside list-disc space-y-1 text-foreground/80">
        <li>Groepsles (4-6 spelers): €15-25 per persoon</li>
        <li>Priveles: €40-70 per uur</li>
        <li>Clinic: €20-35 voor een specifiek thema (smash, service, etc.)</li>
      </ul>

      <h2 className="mt-10 font-display text-3xl text-foreground">WAT KOST HET OM PADEL TE SPELEN?</h2>

      <div className="my-6 glass-card p-5">
        <h4 className="font-display text-xl text-foreground">INSTAPKOSTEN (EENMALIG)</h4>
        <ul className="mt-3 list-inside list-disc space-y-1 text-foreground/80">
          <li>Racket beginner: €60-95</li>
          <li>Schoenen: €60-100</li>
          <li><strong>Totaal: €120-195</strong> om volledig uitgerust te zijn</li>
        </ul>
      </div>

      <div className="my-6 glass-card p-5">
        <h4 className="font-display text-xl text-foreground">TERUGKERENDE KOSTEN PER MAAND (2X PER WEEK)</h4>
        <ul className="mt-3 list-inside list-disc space-y-1 text-foreground/80">
          <li>Baankosten: €36-56 (bij €4,50-7 per persoon per uur)</li>
          <li>Ballen (1x per maand): €6-8</li>
          <li><strong>Totaal: ~€42-64 per maand</strong></li>
        </ul>
        <p className="mt-3 text-sm text-muted">Ter vergelijking: tennis club lidmaatschap + baankosten kost al snel €80-150 per maand. Padel is goedkoper en socialer.</p>
      </div>

      <h2 className="mt-10 font-display text-3xl text-foreground">PADEL ETIQUETTE - WAT JE MOET WETEN</h2>
      <ul className="mt-3 list-inside list-disc space-y-1 text-foreground/80">
        <li>Begroet je tegenstanders voor het spel - altijd, op elk niveau</li>
        <li>Geef fouten eerlijk aan - ook als het in je voordeel is</li>
        <li>Geef niet te veel advies aan je partner tenzij ze erom vragen</li>
        <li>Wacht op een rustmoment voordat je de baan oversteekt als er ernaast gespeeld wordt</li>
        <li>Na het spel een handdruk - dat is padel</li>
      </ul>

      <h2 className="mt-10 font-display text-3xl text-foreground">JE EERSTE 30 DAGEN - EEN SIMPEL PLAN</h2>
      <div className="my-6 glass-card p-5">
        <div className="space-y-4 text-foreground/80">
          <p><strong className="text-lime">Week 1:</strong> Boek een baan, huur een racket, neem drie vrienden mee. Geen verwachtingen. Gewoon spelen en ontdekken.</p>
          <p><strong className="text-lime">Week 2:</strong> Boek een beginnersclinic bij een club bij jou in de buurt. Leer de service en basis positionering.</p>
          <p><strong className="text-lime">Week 3:</strong> Speel een tweede keer. Gebruik Playtomic om je eerste Open Match te boeken als je nog geen vaste groep hebt.</p>
          <p><strong className="text-lime">Week 4:</strong> Besluit of je een eigen racket wil kopen (spoiler: ja). <BlogLink to="/blogs/beste-padelracket-per-niveau-2026">Lees onze racketgids</BlogLink> en kies het juiste model voor niveau 1.0-2.0.</p>
        </div>
        <p className="mt-4 text-sm text-muted">Na 30 dagen: Je Playtomic score zal rond 1.0-1.5 liggen. Je weet wat je leuk vindt aan het spel. Je hebt waarschijnlijk al nieuwe mensen leren kennen op de baan.</p>
      </div>

      <h2 className="mt-10 font-display text-3xl text-foreground">SAMENVATTING</h2>
      <ul className="mt-4 list-inside list-disc space-y-1 text-foreground/80">
        <li>Padel is de makkelijkst te leren racketsport - je hebt plezier vanaf je eerste uur</li>
        <li>Je hebt een racket, schoenen en drie medespelers nodig</li>
        <li>Huur een racket voor je eerste potje</li>
        <li>De beste investering is goede schoenen, niet een duur racket</li>
        <li>Gebruik Playtomic om banen te boeken en medespelers te vinden</li>
        <li>Volg een beginnersclinic - het versnelt je ontwikkeling enorm</li>
        <li>Beginners starten op Playtomic niveau 0-1.0 en groeien naar 2.0-2.5 binnen zes maanden</li>
      </ul>
    </>
  );
}

/* ─── Content map ─── */
export const blogContentMap: Record<string, () => JSX.Element> = {
  'padel-niveau-uitgelegd-playtomic-schaal': NiveauContent,
  'beste-padelracket-per-niveau-2026': RacketContent,
  'padel-beginnen-nederland-complete-gids': BeginnenContent,
};
