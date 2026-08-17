/// <reference types="expo/types" />

// Expo normally writes these ambient declarations into a generated
// `expo-env.d.ts`, which is git-ignored and only created by `expo start`.
// A clean clone therefore has no declarations for CSS modules or static
// asset imports, and `tsc --noEmit` fails in CI before the dev server has
// ever run. This committed file pulls in the same types so type-checking
// works from a fresh checkout.
