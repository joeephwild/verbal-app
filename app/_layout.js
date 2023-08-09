import { Stack, SplashScreen } from "expo-router";
import "../global.css";

export default function () {
  return (
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#000000",
          },
        }}
      />
  );
}
