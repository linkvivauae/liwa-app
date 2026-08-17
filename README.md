# LIWA App — Liwa Sport Club

The Liwa Sport Club (LSC) member application: race registration, campsite and RV bookings, club community feed, and member profile — built for the Liwa International Festival season.

Owned and maintained by **LINKVIVA** (linkvivaevents.onmicrosoft.com).

---

## Technology

A single Expo codebase targeting iOS, Android and the web.

| Layer | Technology |
| --- | --- |
| Framework | Expo SDK 57, React Native 0.86, React 19.2 |
| Language | TypeScript 6 (strict), React Compiler enabled |
| Routing | `expo-router` v57, file-based, with typed routes |
| Styling | StyleSheet + a shared design-token theme (`src/constants/theme.ts`) |
| Localisation | `i18next` / `react-i18next` — English and Arabic, with RTL support |
| Fonts | Manrope, Fraunces, Almarai (bundled via `@expo-google-fonts`) |
| Animation | `react-native-reanimated` v4 + `react-native-worklets` |
| Effects | `expo-blur`, `expo-glass-effect`, `expo-linear-gradient` |
| Storage | `@react-native-async-storage/async-storage` (language preference) |
| Web output | Static export (`app.json` → `web.output: "static"`) |

---

## Requirements

- Node.js 18 or newer
- npm 9 or newer
- For iOS builds: macOS with Xcode
- For Android builds: Android Studio with an SDK platform installed
- Expo Go on a physical device is enough for day-to-day development

---

## Installation

```bash
git clone https://github.com/linkvivauae/liwa-app.git
cd liwa-app
npm install
```

---

## Development commands

```bash
npm start          # Expo dev server — scan the QR code with Expo Go
npm run ios        # open in the iOS simulator
npm run android    # open in the Android emulator
npm run web        # open in a browser
npm run lint       # Expo lint
npx tsc --noEmit   # type-check without emitting
```

---

## Production build

**Web** — produces a static site in `dist/`:

```bash
npx expo export --platform web
```

**iOS and Android** — via EAS Build (no local native folders are committed; `ios/` and `android/` are generated on demand):

```bash
npm install -g eas-cli
eas login
eas build --platform ios
eas build --platform android
```

---

## Deployment

**Web.** `npx expo export --platform web` writes a fully static bundle to `dist/`, which can be served by any static host — GitHub Pages, Netlify, Vercel, or Azure Static Web Apps. `dist/` is intentionally git-ignored; build it in CI rather than committing it.

This repository deploys automatically. `.github/workflows/deploy-web.yml` type-checks, exports and publishes to GitHub Pages on every push to `main`:

**https://linkvivauae.github.io/liwa-app/**

Two details make that work, and both matter if you change hosts:

- `app.json` → `experiments.baseUrl` is set to `/liwa-app`, because GitHub Pages serves the project from a sub-path. Serving from a domain root instead means removing that key and rebuilding.
- The workflow writes a `.nojekyll` file into `dist/`. Without it GitHub Pages runs Jekyll, which silently discards the `_expo/` directory and the whole bundle 404s.

Static export produces routes as `.html` files (`/races`, `/races/[id]`, `/bookings`, `/community`, `/profile`). A host that rewrites unknown paths to `index.html` will also work.

**Mobile.** Distribute through EAS Build and submit with `eas submit`. The bundle identifier and Android package are both `com.linkviva.liwasportclub`.

---

## Environment variables

None are currently required. The app runs entirely on bundled sample data plus one public, unauthenticated API:

- **Open-Meteo** (`https://api.open-meteo.com/v1/forecast`) — live Liwa weather, used to tint the home hero. No API key.

If a backend is added, expose values through `EXPO_PUBLIC_*` variables and document the names in `.env.example`. Never commit real values; `.env*` is already git-ignored.

---

## Folder structure

```
liwa-app/
├── app.json                 Expo configuration — name, icons, splash, plugins
├── src/
│   ├── app/                 expo-router routes (file-based)
│   │   ├── _layout.tsx      Root layout — fonts, i18n, theme, tabs
│   │   ├── index.tsx        Home — countdown, quick actions, news
│   │   ├── races/           Race list, detail, register, confirmation
│   │   ├── bookings.tsx     Camping, RV parking, VIP camp
│   │   ├── community.tsx    Community feed
│   │   └── profile.tsx      Member profile and membership card
│   ├── components/          Shared UI — cards, hero carousel, tabs, badges
│   ├── constants/theme.ts   Colours, typography, spacing, radii
│   ├── context/             Language context
│   ├── data/mock.ts         Sample races, bookings, community content
│   ├── hooks/               useTheme, useTimePeriod, useWeather
│   ├── i18n/                i18next setup and en/ar dictionaries
│   └── utils/
├── assets/
│   ├── images/photos/       LIWA photography used across the app
│   ├── images/tabIcons/     Tab bar icons
│   └── expo.icon/           iOS app icon set
├── design-handoff.md        Design system notes for designers
└── image-list.md            Image inventory and intended usage
```

---

## Notes for future developers

- **All content is sample data.** `src/data/mock.ts` holds the races, bookings and community entries. Replace it with real API calls; keep the record IDs stable, because the registration and confirmation screens reference them.
- **The theme reacts to real conditions.** `useTimePeriod` shifts the palette by time of day and `useWeather` tints the home hero using live Liwa weather. Both degrade gracefully when the network is unavailable.
- **Registration and booking flows do not submit anywhere.** They are interface prototypes; the confirmation reference (`LSC-XXX-4821`) is generated locally.
- **Arabic is supported end to end** — the language toggle switches the i18next locale, swaps to the Almarai typeface and flips layout direction. Add new copy to *both* `src/i18n/locales/en.json` and `ar.json`.
- **No native folders are committed.** `ios/` and `android/` are generated by prebuild or EAS; edit `app.json` rather than native project files.
- **Known non-blocking console warning on web.** The static web build logs one React hydration mismatch on first paint. It originates inside `@expo/vector-icons`: the icon font is not resolved during static rendering, so the prerendered HTML omits the glyph and its `fontFamily` style, and the client render disagrees. React re-renders that subtree and the icons display correctly. It is a library-level behaviour, not project code — the alternatives are patching a dependency or switching `web.output` to `"single"`, which would cost server-side rendering. Left as-is deliberately; re-test after each `@expo/vector-icons` upgrade.
- A few Expo starter assets (`expo-logo.png`, `react-logo*.png`, `expo-badge*.png`, `tutorial-web.png`) remain in `assets/images/` and can be removed once nothing references them.
- **This repository carries no open-source licence.** The MIT `LICENSE` file inherited from the Expo starter template was deliberately not carried over, because publishing it would have granted the public reuse rights over LINKVIVA client work. Add a licence deliberately if one is ever wanted.

---

## Ownership

© LINKVIVA. This repository and its contents are the property of LINKVIVA and are maintained for the Liwa Sport Club. Not for redistribution.
