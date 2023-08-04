import { Slot, Stack } from "expo-router";

import "../global.css";

export default function () {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#000000"
        }
      }}
     
    >
      <Stack.Screen name="Create" options={{
        presentation: "modal"
      }} />
    </Stack>
  );
}
