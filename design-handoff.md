# Liwa Sport Club App — Design Handoff Brief

For handing to another design pass: what the app currently does, screen by screen, plus full specs for the two dynamic systems (time-of-day theming and live weather) and every animation currently implemented. All values below are pulled directly from the working codebase, not approximated.

---

## 1. App structure

Five-tab bottom navigation: **Home · Races · Bookings · Community · Profile**. No side drawer, no duplicate navigation — one system only.

---

## 2. Features by screen

### Home
- **Rotating hero banner** — 4 real photos auto-crossfade behind a fixed countdown overlay (see §3 for timing)
- **Live weather chip** — top-left of hero, icon + current temperature for Liwa Oasis
- **Countdown block** — "Next event in / [N] days / [Festival name]" + "View full schedule" link
- **Stats row** — Races / Bookings / Participants counts, floating card that overlaps the hero's bottom edge
- **Quick actions row** — Register / Book Now / Community, one-tap shortcuts
- **"Book your spot" preview** — horizontally-scrollable cards of the 3 booking types with live availability, "See all" link to Bookings tab
- **News & announcements** — list with thumbnail image, title, date

### Races
- **8 category tiles** in a 2-column grid, each a full-bleed photo with a status badge: Cars, Drift, UTV, Bikes, Camel Racing, Horse Racing, Falconry, Pigeon Racing
- Status states: **Open** (green) / **Closing soon** (amber, shows days left) / **Full** (neutral) / **Closed** (red)
- **Race detail** — full-width photo header, Rules card, Schedule card, single Register CTA (disabled/greyed if not open)
- **Registration flow** — 3 steps (Details → Payment → Review) with a persistent step indicator and back control; submit shows a loading state, and a failed submission surfaces an explicit retry button (no silent failure, no freeze)
- **Confirmation screen** — success checkmark, booking reference code, "Add to calendar" action, "Done" returns to Races

### Bookings
- **3 booking types** — Camping, RV Parking, VIP Camp — each a photo card showing live spot count or a "Fully booked" state, with a "Check availability" CTA (disabled when full)

### Community
- **Athlete profiles** — avatar, name, category, seasons active, and a working **Follow** toggle (button state changes to "Following" with a checkmark, not just decorative)
- **"From the festival" photo feed** — horizontally-scrollable strip of real event photography

### Profile
- **Digital membership card** — gradient card bearing the real Liwa International Festival logo, member name, member ID, membership tier badge
- **Language toggle** — English / العربية, fully functional: switching triggers complete right-to-left layout mirroring (not just translated labels — tab bar order, text alignment, and reading direction all flip)
- **Settings list** — Account details, Membership card, Notification preferences, About the Club, Contact Us

---

## 3. Motion & animation specification

| Element | Type | Duration | Notes |
|---|---|---|---|
| Hero banner image transition | Crossfade between 4 images | 900ms fade, new image every 4,500ms | Auto-loops continuously; respects OS "reduce motion" setting (freezes on current image if enabled) |
| Hero dot indicators | Static → active state swap | — | Active dot widens (6px → 16px) and goes full white; inactive stay 40%-opacity white |
| List/card entrances (news, bookings, race tiles, community rows) | Fade + slide up | 400ms per item | Staggered: each item delayed 50–60ms after the previous, so a list "cascades" in rather than popping in at once |
| Card press feedback | Scale down | Instant on press / instant release | Pressed state scales to 0.98 and drops opacity slightly, on every tappable card and photo tile |
| Confirmation checkmark | Zoom in | 450ms | Paired with a soft radial "glow" shape behind it, gold-tinted |
| Confirmation text block | Fade in | Default duration, 200ms delayed start | Appears just after the checkmark begins its zoom |
| App boot / splash | Scale + fade | 600ms | Existing Expo splash-to-app transition (icon animates in, then splash overlay fades out) |

**Design opportunity for enhancement:** motion is currently limited to entrance/press states — there's no scroll-linked motion (parallax, reveal-on-scroll), no shared-element transition between a race tile and its detail page, and no idle/ambient motion anywhere. All open ground for a design pass.

---

## 4. Dynamic theming system — time of day

The entire color palette switches automatically based on the **device's real clock** (not the OS light/dark setting). Checked every 60 seconds, so it updates live if the app is left open across a boundary.

| Period | Hours (local time) | Mood | Background | Text | Accent |
|---|---|---|---|---|---|
| **Dawn** | 5:00–6:59 | Soft pastel sunrise | `#FDF0E4` | `#2E2015` | `#C17A3E` (warm amber) |
| **Day** | 7:00–16:59 | Main brand look — cream & wine | `#FBF7EF` | `#241F19` | `#A9812E` (olive-gold) |
| **Dusk** | 17:00–18:59 | Warm amber dusk | `#2A1810` | `#FBEEE0` | `#E2A857` (bright gold) |
| **Night** | 19:00–4:59 | Deep charcoal | `#15120F` | `#F8F3E8` | `#C9A24B` (gold) |

Constant across all four periods: primary action color is always the brand wine-red `#9C1730`; primary button text is always white. Only the surface, text, and accent tones shift.

**Design opportunity:** the four palettes currently only affect flat colors (backgrounds, text, borders, card surfaces). They do not yet affect: the hero photography selection (same 4 images regardless of time of day), iconography, or the membership card gradient. A more ambitious pass could have imagery/gradients shift with time-of-day too, not just flat UI color.

---

## 5. Dynamic theming system — live weather

Real weather data is fetched for Liwa Oasis (23.14°N, 53.75°E) via the free Open-Meteo API, refreshed every 15 minutes.

**Displayed as:** a small pill chip (icon + temperature in °C) on the Home hero, top-left.

**Also used to color-grade the hero banner** — a semi-transparent tint layer sits over the rotating photos:

| Condition | Icon | Tint applied over hero photos |
|---|---|---|
| Clear | Sun | None (photos shown at full clarity) |
| Cloudy | Cloud | Cool grey wash, 22% opacity — `rgba(120,130,140,0.22)` |
| Hazy / dusty | Partly-sunny | Warm sand wash, 30% opacity — `rgba(196,154,90,0.30)` |
| Rain | Rain cloud | Cool blue-grey wash, 30% opacity — `rgba(70,90,110,0.30)` |
| Storm | Thunderstorm | Darker blue-grey wash, 38% opacity — `rgba(50,50,70,0.38)` |

**Design opportunity:** currently weather only tints the Home hero. It doesn't touch: the Races/Bookings hero headers, icon choices elsewhere, or any copy (no "hot day — stay hydrated" type contextual messaging). There's also no distinction yet between day/night variants of the same condition (e.g. a clear night vs. a clear day currently render identically aside from the base time-of-day palette).

---

## 6. Typography & spacing reference (for consistency in any new work)

- **Display/heading font:** Fraunces (serif, semi-bold) — English only
- **Body/UI font:** Manrope (regular / semi-bold) — English only
- **Arabic:** Almarai (regular / bold) — used for both display and body when the app is in Arabic, since the Latin fonts above have no Arabic glyphs
- **Type scale:** Display 34px / Heading 26px / Subheading 19px / Body 16px / Caption 13px / Eyebrow 12px (uppercase, letter-spaced)
- **Corner radius scale:** small 8px, medium 14px, large 22px, xlarge 28px, pill/full-round
- **Spacing scale:** 2 / 4 / 8 / 16 / 24 / 32 / 64px increments only — nothing arbitrary

---

## 7. Real brand asset in use
The official **Liwa International Festival** logo (white variant) appears on the Profile membership card — this is the actual client/event logo, not a placeholder, and should stay as-is in any redesign unless the client directs otherwise.
