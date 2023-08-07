import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { Input, CheckBox } from "react-native-elements";

const uploadPodcast = () => {
  return (
    <SafeAreaView>
      <View className="mt-[16px] mx-[24px]">
        <View className="flex-row items-center space-x-4 ">
          <ChevronLeftIcon color="#fff" size={25} />
          <Text className="text-[20px] font-semibold text-[#fff] leading-normal">
            Upload Podcast
          </Text>
        </View>
        <View className="space-y-[6px] mt-[28px]">
          <View className="space-y-[8px] items-start">
            <Text className="text-[16px] text-start font-semibold text-[#fff]">
              Podcast Title
            </Text>
            <Input
              placeholder=""
              className="bg-[#fff] w-[338px] h-[48px] rounded-[5px]"
            />
          </View>
          <View className="space-y-[8px] items-start">
            <Text className="text-[16px] text-start font-semibold text-[#fff]">
              Description
            </Text>
            <Input
              placeholder=""
              className="bg-[#fff] w-[338px] h-[48px] rounded-[5px]"
            />
          </View>
          <View className="space-y-[8px] items-start">
            <Text className="text-[16px] text-start font-semibold text-[#fff]">
              Add Thumbnail
            </Text>
            <Input
              placeholder=""
              errorMessage=""
              className="bg-[#fff] w-[338px] h-[48px] rounded-[5px]"
            />
            {/* <Text className="text-[12px] text-center font-semibold text-[#AAAAAAAA]">
              Supported formates: JPEG, PNG, AI, PPT
            </Text> */}
          </View>
          <View className="space-y-[8px] items-start">
            <Text className="text-[16px] text-start font-semibold text-[#fff]">
              Add Podcast
            </Text>
            <Input
              placeholder=""
              className="bg-[#fff] w-[338px] h-[48px] rounded-[5px]"
            />
          </View>
          <View className="space-y-[8px] items-start">
            <Text className="text-[16px] text-start font-semibold text-[#fff]">
              Category
            </Text>
            <Input
              placeholder=""
              className="bg-[#fff] w-[338px] h-[48px] rounded-[5px]"
            />
          </View>
        </View>
        <Pressable
          // onPress={() => router.push("/CreateAccount")}
          className="bg-[#F70] w-full py-[16px] mt-[15px] rounded-[8px] items-center justify-center"
        >
          <Text className="text-[16px] text-white font-bold leading-normal">
            Get Started
          </Text>
        </Pressable>
        <View className="flex-row space-X-[8px] justify-center items-center">
          <CheckBox
            checkedColor="#fff"
            className="border-[#fff] border-5 w-[28px] h-[28px] rounded-[5px]"
          />
          <Text className="text-[12px] w-[254px] h-[44px] leading-[22px] tracking-[-0.408px] text-start font-semibold text-[#AAAAAAAA]">
            This Podcast does not contain Explicit contents. You agree to our
            <Text className="text-[#fff]"> Terms</Text> and
            <Text className="text-[#fff]">Conditions</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default uploadPodcast;
