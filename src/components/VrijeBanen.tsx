import { useState } from 'react';
import { Search, MapPin, Clock, ChevronRight, Loader2 } from 'lucide-react';
interface Slot {
  resource_id: string;
  court_name: string;
  start_time: string;
  duration: number;
  price: string;
  currency: string;
}

interface Venue {
  tenant_id: string;
  name: string;
  city: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  has_indoor: boolean;
  has_outdoor: boolean;
  image_url: string | null;
  slots: Slot[];
}

export default function VrijeBanen() {
  const [query, setQuery] = useState('');
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);

    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const url = `https://${projectId}.supabase.co/functions/v1/search-courts?q=${encodeURIComponent(query)}&date=${selectedDate}`;
      
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
      });

      if (res.ok) {
        const result = await res.json();
        setVenues(result.venues || []);
      } else {
        setVenues([]);
      }
    } catch (err) {
      console.error('Search failed:', err);
      setVenues([]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (isoTime: string) => {
    try {
      return new Date(isoTime).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return isoTime;
    }
  };

  return (
    <section id="vrije-banen" className="bg-bg-2 py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5">
        <p className="section-bar font-body text-xs font-semibold uppercase tracking-widest text-lime">TOOL</p>
        <h2 className="font-display text-4xl text-foreground lg:text-5xl">VRIJE BANEN IN DE BUURT</h2>
        <p className="mt-3 max-w-lg font-body text-[15px] text-muted">
          Boek vandaag nog een court. Real-time beschikbaarheid bij clubs bij jou in de buurt.
        </p>

        <div className="reveal mt-10 overflow-hidden rounded-xl glass-card">
          {/* Lime accent bar */}
          <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, #C8FF00, transparent)' }} />

          <div className="p-7 lg:p-10">
            {/* Search bar */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex flex-1 items-center gap-2 rounded-full px-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <Search size={16} className="text-muted" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Zoek op stad of postcode..."
                  className="w-full bg-transparent py-3 font-body text-sm text-foreground outline-none placeholder:text-muted-2"
                />
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="rounded-full px-4 py-3 font-body text-sm text-foreground outline-none"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
              />
              <button
                onClick={handleSearch}
                disabled={loading || !query.trim()}
                className="rounded-full bg-lime px-6 py-3 font-body text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : 'Zoek banen'}
              </button>
            </div>

            {/* Results */}
            {loading && (
              <div className="mt-10 flex items-center justify-center gap-2 text-muted">
                <Loader2 size={20} className="animate-spin" />
                <span className="font-body text-sm">Banen zoeken...</span>
              </div>
            )}

            {searched && !loading && venues.length === 0 && (
              <div className="mt-10 text-center">
                <p className="font-body text-sm text-muted">Geen banen gevonden. Probeer een andere locatie.</p>
              </div>
            )}

            {!loading && venues.length > 0 && (
              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {venues.map((venue) => (
                  <div
                    key={venue.tenant_id}
                    className="glass-card rounded-lg p-5 transition-colors hover:border-lime/30"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display text-lg text-foreground">{venue.name}</h3>
                        <p className="mt-1 flex items-center gap-1 font-body text-xs text-muted">
                          <MapPin size={12} />
                          {venue.address}, {venue.city}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {venue.has_indoor && (
                          <span className="rounded-full px-2 py-0.5 font-body text-[10px] font-semibold text-lime" style={{ background: 'rgba(200,255,0,0.1)' }}>
                            INDOOR
                          </span>
                        )}
                        {venue.has_outdoor && (
                          <span className="rounded-full px-2 py-0.5 font-body text-[10px] font-semibold text-lime" style={{ background: 'rgba(200,255,0,0.1)' }}>
                            OUTDOOR
                          </span>
                        )}
                      </div>
                    </div>

                    {venue.slots.length > 0 ? (
                      <div className="mt-4">
                        <p className="mb-2 font-body text-xs font-semibold uppercase tracking-wider text-muted">
                          Beschikbare tijden
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {venue.slots.slice(0, 8).map((slot, i) => (
                            <button
                              key={`${slot.resource_id}-${i}`}
                              className="flex items-center gap-1 rounded-full px-3 py-1.5 font-body text-xs text-foreground transition-colors hover:bg-lime/10"
                              style={{ border: '1px solid rgba(200,255,0,0.2)', background: 'rgba(200,255,0,0.05)' }}
                            >
                              <Clock size={10} className="text-lime" />
                              {formatTime(slot.start_time)}
                              <span className="text-muted">&middot;</span>
                              <span className="text-lime">{slot.price ? `€${slot.price}` : 'Gratis'}</span>
                            </button>
                          ))}
                          {venue.slots.length > 8 && (
                            <span className="flex items-center gap-1 px-2 py-1.5 font-body text-xs text-muted">
                              +{venue.slots.length - 8} meer
                              <ChevronRight size={10} />
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <p className="mt-4 font-body text-xs text-muted-2">Geen beschikbare tijden voor deze datum</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Empty state before search */}
            {!searched && (
              <div className="mt-10 grid gap-10 lg:grid-cols-2">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-wider text-lime" style={{ border: '1px solid rgba(200,255,0,0.3)', background: 'rgba(200,255,0,0.06)' }}>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
                    </span>
                    Live beschikbaarheid
                  </span>

                  <h3 className="mt-6 font-display text-[44px] leading-none text-foreground">
                    VIND EEN <span className="text-lime">VRIJE</span> BAAN
                  </h3>
                  <p className="mt-4 font-body text-[14px] leading-relaxed text-muted">
                    Zoek op stad of postcode en zie direct welke clubs vandaag of morgen nog beschikbaar zijn. Koppeling met Playtomic en lokale clubs.
                  </p>
                </div>

                <div className="flex flex-col justify-center">
                  <ul className="w-full space-y-3 font-body text-[13px] text-muted">
                    {[
                      'Real-time beschikbaarheid van courts',
                      'Direct boeken via Playtomic koppeling',
                      'Binnen- en buitenbanen filteren',
                      'Reviews en beoordelingen per club',
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="mt-0.5 text-lime">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
