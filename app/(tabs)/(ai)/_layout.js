import { View, Text, TouchableNativeFeedback } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";

export default () => {
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
};
