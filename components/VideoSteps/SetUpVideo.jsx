import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import {
  MicrophoneIcon,
  Cog6ToothIcon,
  VideoCameraIcon,
  VideoCameraSlashIcon,
} from "react-native-heroicons/outline";

const SetUpVideo = ({ setEnterRoom }) => {
  const [muted, setMuted] = React.useState(false);

  return (
    <View className="items-center mt-[194px] space-y-[24px] justify-center mx-[24px]">
      <Text className="text-center text-[24px] font-bold text-[#fff] leading-[32px]">
        Get Started
      </Text>
      <Text className="text-[14px] font-normal text-[#E0ECFFCC] leading-[20px] tracking-[0.24px]">
        Setup your audio and video before joining
      </Text>
      <View
        style={{
          width: wp(90),
          height: hp(39),
        }}
        className="justify-center items-center bg-[#0F1115]"
      >
        <Image
          source={require("../../assets/images/Tile.png")}
          className="w-[144px] h-[144px] object-cover"
        />
        <Text className="text-[14px] font-normal text-[#E0ECFFCC] leading-[20px] tracking-[0.24px]">
          Karen A
        </Text>
      </View>
      <View className="mt-[24px] flex-row items-center w-full justify-between">
        <View className="flex-row space-x-[16px] items-center">
          <Pressable className="bg-[#2D3440] p-[8px] rounded-[12px] gap-[4px]">
            <MicrophoneIcon size={32} color="#fff" />
          </Pressable>
          <Pressable
            onPress={() => setMuted(!muted)}
            className="bg-[#F5F9FFF2] p-[8px] rounded-[12px] gap-[4px]"
          >
            {muted ? (
              <VideoCameraSlashIcon size={32} color="#000" />
            ) : (
              <VideoCameraIcon size={32} color="#000" />
            )}
          </Pressable>
        </View>
        <View className="border-[#2D3440] border-2 p-[8px] rounded-[12px] gap-[4px]">
          <Cog6ToothIcon color="#F5F9FFF2" size={32} />
        </View>
      </View>
      <View className="flex-row space-x-[16px] mt-[64px] items-center justify-between">
        <Pressable className="bg-[#1E232A] w-[164px] py-[16px] rounded-[8px] items-center justify-center">
          <Text className="text-[16px] text-white  font-bold leading-normal">
            Karen A
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setEnterRoom(true)}
          className="flex-row bg-[#F70] w-[165px] h-[48px] py-[16px] rounded-[8px] items-center justify-center"
        >
          <MicrophoneIcon size={24} color="#fff" />
          <Text className="text-[16px] text-white  font-bold leading-normal">
            Join Studio
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SetUpVideo;
