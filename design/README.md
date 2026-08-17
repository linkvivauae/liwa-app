# Design — Liwa Sport Club app

The original product-design mock-up for this app, kept alongside the code so the
build always has its design reference to hand.

| File | What it is |
| --- | --- |
| `Liwa-Sport-Club-App-Pitch.pdf` | The full pitch deck, 12 slides, portable and viewable anywhere |
| `mockup/slide-01.jpg` … `slide-12.jpg` | Each slide rendered as an image, for quick reference and diffing |
| `../design-handoff.md` | Design-system notes — colour, type, spacing, component behaviour |
| `../image-list.md` | Image inventory and intended usage |

The editable source (`Liwa_Sport_Club_-_App_Pitch.pptx`, 37 MB) lives in
LINKVIVA's OneDrive under *LIWA / LIWA 2026-2027 Preparation / LSC App Mockup*.
It is not committed here — a 37 MB binary that can never be diffed would be
carried by every future clone. Re-export from OneDrive when the deck changes and
replace the PDF and slide images.

---

## Slides

| # | Section | Screen |
| --- | --- | --- |
| 01 | — | Cover — "A year-round companion for the Liwa International Festival" |
| 02 | Races | Eight disciplines, one desert — race list with live status badges |
| 03 | Registration | Enter in three steps — details, payment, review |
| 04 | Races | **Duplicate of slide 02** |
| 05 | Race detail | Intelligent race pages — entrants, weather advisory, rules, schedule |
| 06 | Registration | **Duplicate of slide 03** |
| 07 | Confirmed | Confirmed on the spot — booking reference and add-to-calendar |
| 08 | Bookings | Stay for the whole festival — camping, RV bays, VIP majlis tents |
| 09 | Community | A crowd that stays all year — festival stories, athletes to follow |
| 10 | Membership | Membership in your pocket — QR entry, tier progress, Gold/Platinum |
| 11 | Built for context | Dawn/day/dusk/night themes and full Arabic right-to-left |
| 12 | — | Closing — "Ready to walk it through, live" |

### Two known faults in the deck

1. **Slides 04 and 06 are duplicates** of 02 and 03. The deck has 12 slides but
   only 10 unique ones.
2. **The narrative order is jumbled.** Registration (03) appears before Race
   detail (05), then repeats at 06. The intended reading order is
   Cover → Races → Race detail → Registration → Confirmed → Bookings →
   Community → Membership → Themes → Closing.

Both are faults in the source deck, carried over unchanged rather than silently
corrected. Fix them in the PowerPoint and re-export.

Section numbering is also inconsistent — Races, Race detail, Registration and
Confirmed are all labelled "02", and no section is labelled "01".

---

## How the build compares to the mock-up

Implemented and matching: the races list with status badges, race detail,
the three-step registration flow, the confirmation screen, bookings (camping,
RV parking, VIP camp), the community feed with athletes to follow, the profile
and membership card, English/Arabic switching with RTL, and the time-of-day
theming shown on slide 11.

Designed but not yet built:

- **Payment.** Slide 03 shows a saved card, an "add a new card" row and a fee
  breakdown (AED 250 entry + AED 40 timing chip). The app's registration flow is
  an interface prototype and takes no payment.
- **Scannable QR entry** on the membership card (slide 10). The card renders,
  the QR does not.
- **Tier progress toward Platinum** (slide 10, "1240 / 2000").
- **Add to calendar** on the confirmation screen (slide 07).
- **Weather advisory on race pages** (slide 05). The app fetches live Liwa
  weather for the home hero, but does not yet surface a per-race advisory.

Two naming details differ between the deck and the build and should be settled
one way or the other: the deck's member is *Rashid Al Mansoori*, the app's is
*Yousef Al Mansoori*; the deck's booking reference format is `LIWA-2X4F9`, the
app generates `LSC-XXX-4821`.

---

© LINKVIVA. Design and deck are the property of LINKVIVA. Not for redistribution.
