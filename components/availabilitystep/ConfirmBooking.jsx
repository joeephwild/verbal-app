import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { CalendarIcon, ClockIcon } from "react-native-heroicons/outline";
import { router } from "expo-router";
import { Input } from "react-native-elements";


const ConfirmBooking = ({ selectedDate, time, handleClick }) => {
  return (
    <View className="mx-[24px] mt-[16px]">
      <View className="flex-row items-center space-x-4 ">
        <ChevronLeftIcon onPress={() => router.back()} color="#fff" size={25} />
        <Text className="text-[20px] font-semibold text-[#fff] leading-normal">
          Mentors
        </Text>
      </View>
      <ScrollView>
        
      </ScrollView>
    </View>
  );
};

export default ConfirmBooking;
