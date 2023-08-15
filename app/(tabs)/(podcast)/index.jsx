import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/solid";
import { Podcast } from "../../../utils";
import { router } from "expo-router";
import { Modalize } from "react-native-modalize";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Portal, PortalHost } from "@gorhom/portal";

const index = () => {
  const tabs = [
    "Trending",
    "Latest",
    "Old",
    "Korean",
    "German",
    "Spanish",
    "English",
  ];

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const podcastRef = useRef(null);
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  const onOpen = (item) => {
    setSelectedPodcast(item);
    podcastRef.current?.open();
  };

  const onClose = () => {
    setSelectedPodcast(null);
    podcastRef.current?.close();
  };

  return (
    <SafeAreaView>
      <ScrollView className="mx-[28px]">
        <Text className="text-[26px] font-bold text-[#fff] ml-9">Podcast</Text>
        <View className="mt-[16px] bg-[#252836] flex-row items-center h-[53px] px-4 py-2.5">
          <TextInput
            placeholderTextColor="#fff"
            placeholder="Search"
            style={{
              width: wp(70),
            }}
            className=" placeholder:text-white"
          />
          <MagnifyingGlassIcon size={24} color="#fff" />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 6, marginTop: 16 }}
        >
          {tabs.map((item) => (
            <View className="bg-[#2F3142] px-4 py-2.5 rounded-full">
              <Text className="text-[#fff] font-normal text-[16px]">
                {item}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View>
          <View className="flex-row flex-wrap gap-5 pt-4 ">
            {Podcast.map((item) => (
              <Pressable onPress={() => onOpen(item)} key={item.id}>
                <Image
                  source={{
                    uri: item.image,
                  }}
                  className="w-[160px] h-[160px] object-cover"
                />
                <View className="w-[158px] mt-2 h-[43px]">
                  <Text className="text-[13px] font-bold text-[#fff]">
                    {item.name}
                  </Text>
                  <Text className="text-[10px] font-medium text-[#CCCCCC]">
                    {item.author}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
      <Portal>
        <Modalize
          ref={podcastRef}
          modalStyle={{ backgroundColor: "#000" }}
          // snapPoint={snapPoints}
          HeaderComponent={() => (
            <View className="mt-[16px] px-[24px]">
              {/* Customize your header */}
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                Podcasts
              </Text>
              <Pressable
                onPress={() => onClose()}
                className="flex-row mt-5 items-center space-x-[12px]"
              >
                <ChevronLeftIcon size={25} color="#fff" />
                <Text className="text-[#fff] text-[20px] font-normal">
                  Now playing
                </Text>
              </Pressable>
            </View>
          )}
        >
          <View>
            {/* <Image style={{
              width: wp(80)
            }} source={{
              uri: selectedPodcast.image
            }} /> */}
          </View>
        </Modalize>
        <PortalHost name="CustomPortalHost" />
      </Portal>
    </SafeAreaView>
  );
};

export default index;
