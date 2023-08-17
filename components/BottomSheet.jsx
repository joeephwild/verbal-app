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
import { Link, router } from "expo-router";
import { Modalize } from "react-native-modalize";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Portal } from "@gorhom/portal";

const BottomSheets = () => {
  const [isVisible, setIsVisible] = useState(false);
  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  return (
    <SafeAreaProvider>
      <Pressable>
        <TouchableNativeFeedback onPress={onOpen} className="items-center">
          <PlusCircleIcon size={45} color="#FF7700" />
        </TouchableNativeFeedback>
      </Pressable>
      <Portal>
        <Modalize
          modalStyle={{
            width: wp(100),
            height: hp(50),
          }}
          modalHeight={350}
          ref={modalizeRef}
        >
          <View className="items-start pl-[25px] pt-[31px] space-y-[40px]">
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
        </Modalize>
      </Portal>
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
