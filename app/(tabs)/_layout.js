import { View, Text, TouchableNativeFeedback } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  HomeIcon,
  UserGroupIcon,
  PlusCircleIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
} from "react-native-heroicons/solid";
import BottomSheet from "../../src/components/BottomSheet";
import { PortalProvider } from "@gorhom/portal";

export default () => {
  return (
    <PortalProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FF7700",
          tabBarInactiveTintColor: "#FFFFFF",
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: "#000000",
          },
        }}
        sceneContainerStyle={{
          backgroundColor: "#000000",
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            tabBarIcon: ({ color }) => <HomeIcon color={color} size={29} />,
          }}
        />
        <Tabs.Screen
          name="(ai)"
          options={{
            tabBarIcon: ({ color }) => (
              <ChatBubbleLeftRightIcon color={color} size={35} />
            ),
          }}
        />
        <Tabs.Screen
          name="(upload)"
          options={{
            tabBarButton: () => {
              return <BottomSheet />;
            },
          }}
        />
        <Tabs.Screen
          name="(community)"
          options={{
            tabBarIcon: ({ color }) => (
              <UserGroupIcon color={color} size={29} />
            ),
          }}
        />
        <Tabs.Screen
          name="(profile)"
          options={{
            tabBarIcon: ({ color, focused, size }) => (
              <UserIcon color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </PortalProvider>
  );
};
