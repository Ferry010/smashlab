

# Vrije Banen: What's Needed

Making the court finder functional requires three layers: **data**, **users**, and **booking**.

## 1. Backend Setup (Lovable Cloud / Supabase)

- **Enable Lovable Cloud** for database + auth + edge functions
- **Database tables:**
  - `clubs` (name, city, postcode, lat/lng, playtomic_id, contact info, indoor/outdoor)
  - `courts` (club_id, name, surface type, indoor/outdoor)
  - `bookings` (user_id, court_id, date, time_slot, status, payment_id)
  - `reviews` (user_id, club_id, rating, comment)
- **Auth:** Email + password signup so users can book and leave reviews

## 2. Playtomic Integration (Edge Function)

- **Edge function `search-courts`**: Accepts city/postcode, queries Playtomic's API for real-time availability
- Playtomic has an unofficial REST API (`playtomic.io/api/v1/`) for searching clubs and time slots by location
- The edge function proxies these calls server-side (avoids CORS, keeps any keys safe)
- Returns merged results: Playtomic clubs + any manually added clubs from the `clubs` table

## 3. Booking Flow

- **Option A (simpler, recommended first):** Link out to Playtomic for actual booking. Show availability on Smashlab, redirect to Playtomic to complete payment.
- **Option B (full, as requested):** Native booking requires:
  - Stripe payment integration
  - A booking confirmation edge function
  - Club partnership agreements (they need to honor bookings)
  - Cancellation/refund logic

Since you chose "Book on Smashlab," this is significant backend work. My recommendation: **start with Option A** (show availability + link to Playtomic) so the tool is useful immediately, then layer in native booking once club partnerships are in place.

## 4. Frontend Changes

- Enable the search bar, wire it to the `search-courts` edge function
- Results view: list of clubs with available time slots, filters (indoor/outdoor, date, time)
- Club detail view with reviews
- Booking confirmation modal + Stripe checkout

## 5. Prerequisites Before We Start

1. **Enable Lovable Cloud** (database + auth + edge functions)
2. **Playtomic API access** needs investigation. Their API is unofficial, so we need to verify current endpoints work. Alternatively, we could scrape or use a different data source.
3. **Stripe** for payments (if doing native booking)

## Suggested Build Order

1. Enable Lovable Cloud + create database schema
2. Build the Playtomic search edge function
3. Wire up the search UI with results
4. Add user auth (signup/login)
5. Add club detail + reviews
6. Add Stripe + native booking (or start with Playtomic redirect)

Want me to start with step 1 (enable Lovable Cloud + schema)?

