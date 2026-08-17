// Placeholder content for the scaffold — replace with real API data once the
// backend/data model referenced in the brief's §7 is defined.
import type { Ionicons } from '@expo/vector-icons';
import type { ImageSourcePropType } from 'react-native';

import type { RaceStatus } from '@/components/status-badge';

export const Photos = {
  // Official Liwa International Festival brand assets, sourced from the
  // LINKVIVA/LIWA website-rebuild project — the real event this club's races run at.
  liwaLogoRed: require('@/assets/images/photos/liwa-logo-red.png'),
  liwaLogoWhite: require('@/assets/images/photos/liwa-logo-white.png'),
  villageOrbitNight: require('@/assets/images/photos/village-orbit-night.jpg'),
  motorsportDrift: require('@/assets/images/photos/motorsport-drift.jpg'),
  driftCarsAerial: require('@/assets/images/photos/drift-cars-aerial.jpg'),
  duneTrackDay: require('@/assets/images/photos/dune-track-day.jpg'),
  villageAerialDay: require('@/assets/images/photos/village-aerial-day.jpg'),
  nightMarket: require('@/assets/images/photos/night-market.jpg'),
  wanasaFireworks: require('@/assets/images/photos/wanasa-fireworks.jpg'),
  familyRun: require('@/assets/images/photos/family-run.jpg'),
  craftWorkshop: require('@/assets/images/photos/craft-workshop.jpg'),

  // Stock photography filling categories the brand set doesn't cover (camel/horse
  // racing, falconry, pigeon racing, athlete portraits) — sourced from Unsplash.
  camelCaravan: require('@/assets/images/photos/camel-caravan.jpg'),
  horseGallop: require('@/assets/images/photos/horse-gallop.jpg'),
  falconer: require('@/assets/images/photos/falconer.jpg'),
  pigeonsFlock: require('@/assets/images/photos/pigeons-flock.jpg'),
  duneRider: require('@/assets/images/photos/dune-rider.jpg'),
  desertTentNight: require('@/assets/images/photos/desert-tent-night.jpg'),
  athleteMale: require('@/assets/images/photos/athlete-male.jpg'),
  athleteFemale: require('@/assets/images/photos/athlete-female.jpg'),
};

export type RaceCategory = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  status: RaceStatus;
  closesInDays?: number;
  photo: ImageSourcePropType;
};

export const RACE_CATEGORIES: RaceCategory[] = [
  {
    id: 'cars',
    name: 'Cars',
    icon: 'car-sport-outline',
    status: 'open',
    photo: Photos.motorsportDrift,
  },
  {
    id: 'drift',
    name: 'Drift',
    icon: 'flame-outline',
    status: 'closingSoon',
    closesInDays: 3,
    photo: Photos.driftCarsAerial,
  },
  { id: 'utv', name: 'UTV', icon: 'car-outline', status: 'open', photo: Photos.duneTrackDay },
  { id: 'bikes', name: 'Bikes', icon: 'bicycle', status: 'open', photo: Photos.duneRider },
  {
    id: 'camel',
    name: 'Camel Racing',
    icon: 'paw-outline',
    status: 'full',
    photo: Photos.camelCaravan,
  },
  {
    id: 'horse',
    name: 'Horse Racing',
    icon: 'paw',
    status: 'open',
    photo: Photos.horseGallop,
  },
  {
    id: 'falconry',
    name: 'Falconry',
    icon: 'airplane-outline',
    status: 'closed',
    photo: Photos.falconer,
  },
  {
    id: 'pigeon',
    name: 'Pigeon Racing',
    icon: 'paper-plane-outline',
    status: 'open',
    photo: Photos.pigeonsFlock,
  },
];

export const NEXT_EVENT = {
  name: 'Liwa International Festival 2027',
  date: '2027-01-08',
};

export const HOME_STATS = { races: 8, bookings: 240, participants: 1850 };

export const NEWS_ITEMS = [
  {
    id: 'n1',
    title: 'Camping bookings open next week',
    date: '2026-08-01',
    photo: Photos.desertTentNight,
  },
  {
    id: 'n2',
    title: 'New falconry category added for 2027',
    date: '2026-07-20',
    photo: Photos.falconer,
  },
];

export const BOOKING_TYPES = [
  {
    id: 'camping',
    labelKey: 'bookings.camping',
    spotsLeft: 42,
    photo: Photos.desertTentNight,
  },
  {
    id: 'rv',
    labelKey: 'bookings.rvParking',
    spotsLeft: 8,
    photo: Photos.duneTrackDay,
  },
  {
    id: 'vip',
    labelKey: 'bookings.vipCamp',
    spotsLeft: 0,
    photo: Photos.villageAerialDay,
  },
];

export const ATHLETES = [
  {
    id: 'a1',
    name: 'Rashid Al Mazrouei',
    category: 'Cars',
    seasons: 6,
    photo: Photos.athleteMale,
  },
  {
    id: 'a2',
    name: 'Fatima Al Ketbi',
    category: 'Horse Racing',
    seasons: 3,
    photo: Photos.athleteFemale,
  },
];

export const EVENT_FEED_PHOTOS = [
  Photos.falconer,
  Photos.horseGallop,
  Photos.nightMarket,
  Photos.wanasaFireworks,
  Photos.familyRun,
  Photos.craftWorkshop,
];
