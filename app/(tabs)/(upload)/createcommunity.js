import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon, PhotoIcon } from "react-native-heroicons/solid";
import { Input } from "react-native-elements";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { createCommunity } from "../../../lib/services/communityService";
import { pickImage } from "../../../lib/services/userService";

const CreateCommunity = () => {
  const [communityName, setCommunityName] = useState("");
  const [communityDesc, setCommunityDesc] = useState("");
  const [image, setImage] = useState("");

  const handleImageUpload = async () => {
    const result = await pickImage();
    setImage(result);
  };
  return (
    <SafeAreaView>
      <View className="mt-[16px] mx-[24px]">
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center space-x-4 "
        >
          <ChevronLeftIcon
            onPress={() => router.back()}
            color="#fff"
            size={25}
          />
          <Text className="text-[20px] font-semibold text-[#fff] leading-normal">
            Create a community
          </Text>
        </Pressable>
        <View className="space-y-[6px] mt-[28px]">
          <View className="space-y-[8px] items-start">
            <Text className="text-[16px] text-start font-semibold text-[#fff]">
              Community name
            </Text>
            <Input
              placeholder=""
              value={communityName}
              onChangeText={(text) => setCommunityName(text)}
              className="bg-[#000] border-2 border-[#ccca] w-[338px] h-[48px] rounded-[5px]"
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
              className="bg-[#000] border-2 border-[#ccca] w-[338px] h-[48px] rounded-[5px]"
              numberOfLines={20}
            />
          </View>
          <Pressable
            onPress={handleImageUpload}
            className="border border-[#ccca] w-full h-[40%] py-[16px] rounded-[8px] items-center justify-center"
          >
            <PhotoIcon size={25} color="#fff" />
            <Text className="text-[16px] text-start font-semibold text-[#fff]">
              Upload A community Image
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() =>
            createCommunity({ communityName, communityDesc, image })
          }
          className="bg-[#F70] w-full py-[16px] mt-[58px] rounded-[8px] items-center justify-center"
        >
          <Text className="text-[16px] text-white font-bold leading-normal">
            Create A Community
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CreateCommunity;
