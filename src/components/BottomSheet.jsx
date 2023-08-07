import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
  Pressable,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
  PlusCircleIcon,
  UserGroupIcon,
  MicrophoneIcon,
  SignalIcon,
  CalendarDaysIcon,
} from "react-native-heroicons/solid";
import React, { useState, useRef } from "react";
import { Portal, PortalHost } from "@gorhom/portal";
import { Link, router } from "expo-router";

const BottomSheets = () => {
  const bottomSheetModalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }
  const snapPoints = ["40%", "50%"];

  return (
    <>
      <TouchableNativeFeedback onPress={handlePresentModal}>
        <PlusCircleIcon size={45} color="#FF7700" />
      </TouchableNativeFeedback>
      <Portal>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backgroundStyle={{ borderRadius: 50 }}
            onDismiss={() => setIsOpen(false)}
          >
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
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </Portal>
      <PortalHost name="custom_host" />
    </>
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
