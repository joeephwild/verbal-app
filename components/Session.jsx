import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { router } from "expo-router";

const Session = ({time}) => {
  return (
    <View className="items-center mt-[30px] justify-center">
      <Image
        source={require("../assets/images/nosession.png")}
        className="w-[160px] h-[160px] object-cover"
      />
      <Text className="text-[#AAAAAAAA] text-[16px] font-semibold">
        No upcoming session
      </Text>
      <View className="items-start mt-[60px] ">
        <Text
          className={`text-[#fff] text-[16px] leading-normal font-semibold`}
        >
          Next Available
        </Text>
        <Text
          className={`text-[#676767] text-[12px] leading-normal font-semibold`}
        >
          11 Aug 2023, 3:00pm
        </Text>
      </View>
      <Pressable
        onPress={() => router.push("/availablityform")}
        className="bg-[#F70] w-full py-[16px] mt-[9px] rounded-[8px] items-center justify-center"
      >
        <Text className="text-[16px] text-white font-bold leading-normal">
         Schdule Call
        </Text>
      </Pressable>
    </View>
  );
};

export default Session;
