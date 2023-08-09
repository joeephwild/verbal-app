import { View, Text, Pressable } from "react-native";
import React from "react";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { CalendarIcon, ClockIcon } from "react-native-heroicons/outline";
import { router } from "expo-router";
import { Input } from "react-native-elements";

const ConfirmTime = ({ selectedDate, time, handleClick }) => {
  return (
    <View className="mx-[24px] mt-[16px]">
      <View className="flex-row items-center space-x-4 ">
        <ChevronLeftIcon onPress={() => router.back()} color="#fff" size={25} />
        <Text className="text-[20px] font-semibold text-[#fff] leading-normal">
          Confirm your booking
        </Text>
      </View>
      <View className="gap-[16px] mt-[24px] space-y-[16px]">
        <View className="flex-row items-center space-x-[16px]">
          <CalendarIcon color="#AAAAAAAA" size={25} />
          <Text className="text-[16px] font-normal leading-[22px] text-[#fff]">
            {selectedDate}
          </Text>
        </View>
        <View className="flex-row items-center space-x-[16px]">
          <ClockIcon color="#AAAAAAAA" size={25} />
          <Text className="text-[16px] font-normal leading-[22px] text-[#fff]">
            {time}
          </Text>
        </View>
      </View>
      {/** availablit form */}
      <View className="mt-[24px]">
        <View className="items-start space-y-4">
          <Text className="text-[16px] font-normal leading-[22px] text-[#fff]">
            Select main topic
          </Text>
          <Input className="bg-[#fff] w-[338px] h-[48px] px-4" />
        </View>
        <View className="items-start space-y-4">
          <Text className="text-[16px] font-normal leading-[22px] text-[#fff]">
            Add your question to this booking
          </Text>
          <Input className="bg-[#fff] w-[338px] h-[120px] px-4" />
        </View>
      </View>
      <Pressable
        onPress={() => handleClick("next")}
        className="bg-[#F70] w-full mt-[127px]  py-[16px] rounded-[8px] items-center justify-center"
      >
        <Text className="text-[16px] text-white font-bold leading-normal">
          Continue
        </Text>
      </Pressable>
    </View>
  );
};

export default ConfirmTime;
