import { Stack } from 'expo-router';

export default function RacesStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]/index" />
      <Stack.Screen name="[id]/register" />
      <Stack.Screen name="[id]/confirmation" options={{ gestureEnabled: false }} />
    </Stack>
  );
}
