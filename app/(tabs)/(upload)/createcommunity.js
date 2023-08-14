import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { Input } from "react-native-elements";
import { createCommunity } from "../../../lib/supabaseService";
import { router } from "expo-router";

const CreateCommunity = () => {
  const [communityName, setCommunityName] = useState("");
  const [communityDesc, setCommunityDesc] = useState("");
  return (
    <SafeAreaView>
      <View className="mt-[16px] mx-[24px]">
        <View className="flex-row items-center space-x-4 ">
          <ChevronLeftIcon onPress={() => router.back()} color="#fff" size={25} />
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
              value={communityName}
              onChangeText={(text) => setCommunityName(text)}
              className="bg-[#fff] w-[338px] px-[8px] py-2.5 h-[48px] rounded-[5px]"
            />
          </View>
          <View className="space-y-[8px] items-start">
            <Text className="text-[16px] text-start font-semibold text-[#fff]">
              Description
            </Text>
            <Input
              value={communityDesc}
              onChangeText={(text) => setCommunityDesc(text)}
              multiline
              placeholder=""
              className="bg-[#fff] w-[338px] h-[88px] px-[8px] py-2.5 rounded-[5px]"
              numberOfLines={20}
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
          onPress={() => createCommunity({ communityName, communityDesc })}
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
