import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { View } from "react-native";
import {
  ChatBubbleLeftRightIcon,
  HomeIcon,
  UserGroupIcon,
  UserIcon,
  MicrophoneIcon,
} from "react-native-heroicons/solid";
import BottomSheets from "../../components/BottomSheet";

export default function TabLayout() {
  return (
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
      initialRouteName="(home)"
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
            <ChatBubbleLeftRightIcon color={color} size={29} />
          ),
        }}
      />

      <Tabs.Screen
        name="(upload)"
        options={{
          tabBarButton: () => {
            return (
              <View className="ml-[15px]">
                <BottomSheets />
              </View>
            );
          },
        }}
      />

      <Tabs.Screen
        name="(community)"
        options={{
          tabBarIcon: ({ color }) => <UserGroupIcon color={color} size={29} />,
        }}
      />
      <Tabs.Screen
        name="(podcast)"
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <MicrophoneIcon color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
