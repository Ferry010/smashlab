const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PLAYTOMIC_API = "https://api.playtomic.io/v1";

// Simple geocoding using Nominatim (free, no API key)
async function geocode(query: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + ', Nederland')}&format=json&limit=1`,
      { headers: { 'User-Agent': 'Smashlab/1.0' } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
    return null;
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    const date = url.searchParams.get("date") || new Date().toISOString().split("T")[0];
    let lat = url.searchParams.get("lat") ? parseFloat(url.searchParams.get("lat")!) : null;
    let lng = url.searchParams.get("lng") ? parseFloat(url.searchParams.get("lng")!) : null;

    if (!query && !lat) {
      return new Response(
        JSON.stringify({ error: "Geef een stad, postcode of locatie op" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Geocode text query to coordinates
    if (!lat && query) {
      const geo = await geocode(query);
      if (geo) {
        lat = geo.lat;
        lng = geo.lng;
      }
    }

    // Search Playtomic tenants
    const searchParams = new URLSearchParams({
      sport_id: "PADEL",
      size: "20",
    });

    if (lat && lng) {
      searchParams.set("coordinate", `${lat},${lng}`);
      searchParams.set("radius", "50000"); // 50km
    } else {
      // Fallback: use query text
      searchParams.set("q", query);
    }

    const tenantsRes = await fetch(`${PLAYTOMIC_API}/tenants?${searchParams.toString()}`, {
      headers: { "Content-Type": "application/json" },
    });

    interface PlaytomicTenant {
      tenant_id: string;
      tenant_name: string;
      address?: { street?: string; city?: string; postal_code?: string };
      coord?: { lat: number; lon: number };
      properties?: { indoor?: boolean; outdoor?: boolean };
      images?: Array<{ url: string }>;
    }

    let venues: Array<{
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
      slots: Array<{
        resource_id: string;
        court_name: string;
        start_time: string;
        duration: number;
        price: string;
        currency: string;
      }>;
    }> = [];

    if (tenantsRes.ok) {
      const tenants: PlaytomicTenant[] = await tenantsRes.json();

      // Fetch availability for each venue in parallel
      const startMin = `${date}T00:00:00`;
      const startMax = `${date}T23:59:59`;

      const venuePromises = tenants.slice(0, 10).map(async (tenant) => {
        let slots: Array<{
          resource_id: string;
          court_name: string;
          start_time: string;
          duration: number;
          price: string;
          currency: string;
        }> = [];

        try {
          const availRes = await fetch(
            `${PLAYTOMIC_API}/availability?sport_id=PADEL&tenant_id=${tenant.tenant_id}&start_min=${startMin}&start_max=${startMax}`,
            { headers: { "Content-Type": "application/json" } }
          );

          if (availRes.ok) {
            const availData = await availRes.json();
            const arr = Array.isArray(availData) ? availData : [];
            slots = arr.map((s: Record<string, unknown>) => ({
              resource_id: String(s.resource_id || ""),
              court_name: String(s.resource_name || `Court`),
              start_time: String(s.start_time || ""),
              duration: Number(s.duration || 90),
              price: String(s.price || ""),
              currency: String(s.currency || "EUR"),
            }));
          }
        } catch {
          // Availability fetch failed, continue with empty slots
        }

        return {
          tenant_id: tenant.tenant_id,
          name: tenant.tenant_name,
          city: tenant.address?.city || "",
          address: tenant.address?.street || "",
          postcode: tenant.address?.postal_code || "",
          lat: tenant.coord?.lat || 0,
          lng: tenant.coord?.lon || 0,
          has_indoor: tenant.properties?.indoor ?? false,
          has_outdoor: tenant.properties?.outdoor ?? true,
          image_url: tenant.images?.[0]?.url || null,
          slots,
        };
      });

      venues = await Promise.all(venuePromises);
    }

    return new Response(JSON.stringify({ venues, date }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("search-courts error:", error);
    return new Response(
      JSON.stringify({ error: "Er ging iets mis bij het zoeken" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
