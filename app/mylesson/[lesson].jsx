import { View, Text, Image, Pressable, Alert } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const LessonDetails = () => {
  return (
    <SafeAreaView>
      <View className="mx-[28px]">
        <Text className="text-white mt-9 text-[26px] font-black leading-norma;">
          My Lesson
        </Text>
        <View className="flex-row gap-[20px] mt-[24px] items-center space-x-4">
          <Image
            source={require("../../assets/images/image1.png")}
            className="w-[60px] h-[60px] object-cover"
          />
          <View className="items-start  text-center">
            <Text className="text-[20px] font-extrabold leading-normal text-[#fff]">
              English Lanuguage
            </Text>
            <Text className="text-[16px] font-semibold text-[#fff] leading-normal">
              With Anita Baker
            </Text>
            <Text className="text-[#3EF3A7] text-[12px] font-semibold">
              Scheduled for 15:00 EST
            </Text>
          </View>
        </View>

        <View className="space-y-[24px] mt-[20px]">
          {/** lesson content */}
          <View className="bg-[#fff] w-[342px] h-[162px] rounded-[5px] p-[16px]">
            <Text className="text-[#00B86B] text-[20px] font-semibold mb-[16px]">
              Lesson Content
            </Text>
            <Text className="text-[14px] font-normal text-[#000]">
              Teach the mentee the technicalities in pronoucing two syllable
              words in korean and it’s application
            </Text>
          </View>

          {/** lesson content */}
          <View className="bg-[#fff] w-[342px] h-[162px] rounded-[5px] p-[16px]">
            <Text className="text-[#F34C4C] text-[20px] font-semibold mb-[16px]">
              Missed Lesson Alert!
            </Text>
            <Text className="text-[14px] font-normal text-[#000]">
              Missing scheduled lessons impacts your learning progress. Remember
              to notify your tutor in advance if you need to reschedule. Stay
              committed to your learning journey.
            </Text>
          </View>
          <Pressable
            onPress={() => router.push("/Studio/qwr-bre-w3t")}
            className="bg-[#F70] w-full py-[16px] rounded-[8px] items-center justify-center"
          >
            <Text className="text-[16px] text-white  font-bold leading-normal">
              Join video session
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LessonDetails;
