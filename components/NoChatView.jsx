import { View, Text, Image } from "react-native";
import React from "react";

const NoChatView = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <View className=" items-center justify-center">
        <Image
          source={require("../assets/images/Logo.png")}
          className="w-[32px] h-[30.659px] object-contain"
        />
        <Text
          style={{
            fontFamily: "SpaceMono",
          }}
          className="text-[34px] pt-[16px] text-[#ffffff] font-normal leading-[41px]] text-center"
        >
          Verbal AI
        </Text>
      </View>
      <View className="text-center pt-[24px]">
        <Text className="text-[17px] w-[327px] pb-[24px] text-center font-normal leading-[22px] text-[#ffffff]">
          I'm here to help you with whatever Language you want to learn, send a
          message let’s start learning.
        </Text>
        <Text className="text-[17px] text-center font-normal leading-[22px] text-[#ffffff]">
          Example: Welcome in french
        </Text>
      </View>
    </View>
  );
};

export default NoChatView;
