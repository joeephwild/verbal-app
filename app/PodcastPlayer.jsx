import { View, Text, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import {
  ChevronLeftIcon,
  HeartIcon,
  BackwardIcon,
  ForwardIcon,
  PlayCircleIcon,
} from "react-native-heroicons/solid";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";

const PodcastPlayer = ({ route }) => {
  // const {} = route.params;
  const { image, title, audio, name } = useLocalSearchParams();
  console.log(image, title, audio);
  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: "https://cdn3.justnaija.me/uploads/music/2023/08/Burna-Boy-City-Boys-(JustNaija.com).mp3",
      },
      {
        shouldPlay: true,
        volume:0.1
      }
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View className="flex-1 mx-[24px] py-6">
      <Text className="text-[26px] text-[#fff] font-black">Podcast</Text>
      <Pressable className="flex-row items- mt-8 space-x-5">
        <ChevronLeftIcon size={25} color="#FFF" />
        <Text className="text-[20px] text-[#fff] font-black">Now Playing</Text>
      </Pressable>

      <View className="mt-[99px] items-start">
        <Image
          source={{
            uri: image,
          }}
          className="flex-row mx-4 w-[322.424px] h-[322.424px] object-cove items-centerr"
        />
        <View className="flex-row items-center mt-4 w-full justify-between">
          <View className="items-start space-y-3">
            <Text className="text-[20px] text-[#fff] w-[295px] text-start">
              {title}
            </Text>
            <Text className="text-[16px] text-[#fff] text-start">{name}</Text>
          </View>
          <HeartIcon size={25} color="#fff" />
        </View>
        <View className="">
          <Slider
            style={{ width: 350, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor=" #0000ff"
            maximumTrackTintColor="#ffffff"
          />
          <View className="flex-row items-center space-x-[24px] justify-center">
            <BackwardIcon size={33} color="#fff" />
            <Pressable onPress={playSound}>
              <PlayCircleIcon size={64} color="#fff" />
            </Pressable>

            <ForwardIcon size={33} color="#fff" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PodcastPlayer;
