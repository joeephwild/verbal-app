import { Slot, Stack } from "expo-router";

import "../global.css";
import { StatusBar } from "expo-status-bar";

export default function () {
  return (
    
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
        <StatusBar style="Light" />
      <Slot className="body" />
      <Stack.Screen name="index" />
    </Stack>
  );
}
