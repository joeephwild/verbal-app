import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { View } from "react-native";
import {
  ChatBubbleLeftRightIcon,
  HomeIcon,
  UserGroupIcon,
  UserIcon,
} from "react-native-heroicons/solid";
import BottomSheets from "../../components/BottomSheet";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

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
            <ChatBubbleLeftRightIcon color={color} size={35} />
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
        name="(profile)"
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <UserIcon color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
