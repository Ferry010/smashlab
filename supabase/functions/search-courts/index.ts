const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PLAYTOMIC_API = "https://api.playtomic.io/v1";

interface PlaytomicTenant {
  tenant_id: string;
  tenant_name: string;
  address: {
    street: string;
    city: string;
    postal_code: string;
    country: string;
  };
  coord: { lat: number; lon: number };
  properties?: {
    indoor?: boolean;
    outdoor?: boolean;
  };
  images?: Array<{ image_id: string; url: string }>;
  opening_hours?: Record<string, unknown>;
}

interface PlaytomicSlot {
  resource_id: string;
  resource_name?: string;
  start_time: string;
  duration: number;
  price: string;
  currency: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    const date = url.searchParams.get("date") || new Date().toISOString().split("T")[0];
    const lat = url.searchParams.get("lat");
    const lng = url.searchParams.get("lng");

    if (!query && !lat) {
      return new Response(
        JSON.stringify({ error: "Geef een stad, postcode of locatie op" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 1: Search Playtomic for venues
    const searchParams = new URLSearchParams({
      sport_id: "PADEL",
      size: "20",
    });

    if (lat && lng) {
      searchParams.set("coordinate", `${lat},${lng}`);
      searchParams.set("radius", "50000");
    } else if (query) {
      searchParams.set("q", query);
    }

    const tenantsRes = await fetch(`${PLAYTOMIC_API}/tenants?${searchParams.toString()}`, {
      headers: { "Content-Type": "application/json" },
    });

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

      // Step 2: Fetch availability for each venue (parallel, max 5)
      const venuePromises = tenants.slice(0, 10).map(async (tenant) => {
        const startMin = `${date}T00:00:00`;
        const startMax = `${date}T23:59:59`;

        try {
          const availRes = await fetch(
            `${PLAYTOMIC_API}/availability?sport_id=PADEL&tenant_id=${tenant.tenant_id}&start_min=${startMin}&start_max=${startMax}`,
            { headers: { "Content-Type": "application/json" } }
          );

          let slots: Array<{
            resource_id: string;
            court_name: string;
            start_time: string;
            duration: number;
            price: string;
            currency: string;
          }> = [];

          if (availRes.ok) {
            const availData: PlaytomicSlot[] = await availRes.json();
            slots = (Array.isArray(availData) ? availData : []).map((s) => ({
              resource_id: s.resource_id,
              court_name: s.resource_name || `Court ${s.resource_id}`,
              start_time: s.start_time,
              duration: s.duration,
              price: s.price,
              currency: s.currency || "EUR",
            }));
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
        } catch {
          return {
            tenant_id: tenant.tenant_id,
            name: tenant.tenant_name,
            city: tenant.address?.city || "",
            address: tenant.address?.street || "",
            postcode: tenant.address?.postal_code || "",
            lat: tenant.coord?.lat || 0,
            lng: tenant.coord?.lon || 0,
            has_indoor: false,
            has_outdoor: true,
            image_url: null,
            slots: [],
          };
        }
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
