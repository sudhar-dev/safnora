import { Stack } from 'expo-router';
import React from 'react';

export default function TripsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[id]" />
      <Stack.Screen name="add-trip" />
      <Stack.Screen name="friends" />
      <Stack.Screen name="invite-members" />
      <Stack.Screen name="start-trip" />
      <Stack.Screen name="calculator" />
      <Stack.Screen name="trip-invoice" />
    </Stack>
  );
}
