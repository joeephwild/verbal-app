import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { Input } from "react-native-elements";

const CreateCommunity = () => {
  return (
    <SafeAreaView>
      <View className="mt-[16px] mx-[24px]">
        <View className="flex-row items-center space-x-4 ">
          <ChevronLeftIcon color="#fff" size={25} />
          <Text className="text-[20px] font-semibold text-[#fff] leading-normal">
            Create a community
          </Text>
        </View>
        <View className="space-y-[6px] mt-[28px]">
          <View className="space-y-[8px] items-start">
            <Text className="text-[16px] text-start font-semibold text-[#fff]">
              Community name
            </Text>
            <Input
              placeholder=""
              className="bg-[#fff] w-[338px] h-[48px] rounded-[5px]"
            />
          </View>
          <View className="space-y-[8px] items-start">
            <Text className="text-[16px] text-start font-semibold text-[#fff]">
              Language
            </Text>
            <Input
              placeholder=""
              className="bg-[#fff] w-[338px] h-[48px] rounded-[5px]"
            />
          </View>
          <View className="space-y-[8px] items-start">
            <Text className="text-[16px] text-start font-semibold text-[#fff]">
              Resources
            </Text>
            <Input
              placeholder=""
              className="bg-[#fff] w-[338px] h-[48px] rounded-[5px]"
            />
          </View>
        </View>
        <Pressable
          // onPress={() => router.push("/CreateAccount")}
          className="bg-[#F70] w-full py-[16px] mt-[158px] rounded-[8px] items-center justify-center"
        >
          <Text className="text-[16px] text-white font-bold leading-normal">
            Get Started
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CreateCommunity;
