import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
  Pressable,
} from "react-native";
import {
  PlusCircleIcon,
  UserGroupIcon,
  MicrophoneIcon,
  SignalIcon,
  CalendarDaysIcon,
} from "react-native-heroicons/solid";
import React, { useState, useRef } from "react";
import { BottomSheet } from "react-native-elements";
import { Portal, PortalHost } from "@gorhom/portal";
import { router } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

const BottomSheets = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <SafeAreaProvider>
      <TouchableNativeFeedback
        onPress={() => setIsVisible(true)}
        className="items-center"
      >
        <PlusCircleIcon size={45} color="#FF7700" />
      </TouchableNativeFeedback>
      <Portal>
        <BottomSheet containerStyle={{backgroundColor: "#fff", height: 50}}  modalProps={{}} isVisible={isVisible}>
          <View className="items-start pl-[25px] pt-[71px] space-y-[40px]">
            <Pressable
              onPress={() => router.push("/createcommunity")}
              className="flex-row items-center space-x-[16px]"
            >
              <Pressable className="bg-[#000] w-[10px] h-[10px] rounded-full p-5 items-center justify-center">
                <UserGroupIcon color="#fff" size={25} />
              </Pressable>

              <Text className="text-[16px] font-normal ">
                Create a community
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/uploadPodcast")}
              className="flex-row items-center space-x-[16px]"
            >
              <Pressable className="bg-[#000] w-[10px] h-[10px] rounded-full p-5 items-center justify-center">
                <MicrophoneIcon color="#fff" size={25} />
              </Pressable>

              <Text className="text-[16px] font-normal ">Upload Podcast</Text>
            </Pressable>
            <View className="flex-row items-center space-x-[16px]">
              <Pressable className="bg-[#000] w-[10px] h-[10px] rounded-full p-5 items-center justify-center">
                <SignalIcon color="#fff" size={25} />
              </Pressable>

              <Text className="text-[16px] font-normal ">Go Live</Text>
            </View>
            <View className="flex-row items-center space-x-[16px]">
              <Pressable className="bg-[#000] w-[10px] h-[10px] rounded-full p-5 items-center justify-center">
                <CalendarDaysIcon color="#fff" size={25} />
              </Pressable>

              <Text className="text-[16px] font-normal ">
                Schedule Live Call
              </Text>
            </View>
          </View>
        </BottomSheet>
      </Portal>
      <PortalHost name="custom_host" />
    </SafeAreaProvider>
  );
};

export default BottomSheets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 50,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: "500",
  },
});
