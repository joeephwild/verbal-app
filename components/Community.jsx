import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import React from "react";
import { router, useNavigation } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";

const Community = ({ item }) => {
  return (
    <View className="">
      <View className="flex-row items-center justify-between">
        <Text className="text-white text-xl mb-5">Communities</Text>
        <Text className="text-[12px] font-normal text-[#989797]">See all</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
      >
        {item.map((commnity) => (
          <Pressable
            key={commnity.id}
            onPress={() => router.push(`/community/${commnity.id}`)}
            className=" bg-white rounded-[8px] px-4 py-3.5 w-[349px] min-h-[200px]"
          >
            <View className="space-y-8">
              <View className="flex-row items-start space-x-9">
                <Image
                  source={{
                    uri: commnity.img_url,
                  }}
                  className="w-[60px] rounded-full object-cover h-[60px]"
                />
                <View className="items-start">
                  <Text className="text-[20px] font-bold text-[#000]">
                    {commnity.name}
                  </Text>
                  <Text className="text-[16px] font-normal text-[#FF7700]">
                    {commnity.members.length} members
                  </Text>
                </View>
              </View>
              <Text>{commnity.description}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Community;
