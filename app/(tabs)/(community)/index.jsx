import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { languageCommunity } from "../../../utils/index";
import { ScrollView } from "react-native-gesture-handler";
import { useAuth } from "../../../context/auth";
import { router } from "expo-router";

const CommunityCard = ({ item }) => {
  return (
    <Pressable className="mx-[20px] items-center justify-center">
      <Pressable
        onPress={() => router.push(`/community/${item.name}`)}
        style={{
          width: wp(90),
        }}
        className="bg-[#fff] mb-[16px] px-[5px]  py-[16px] mx-[24px] h-[90px] rounded-[5px]"
      >
        <View className="flex-row space-x-8 items-center">
          <Image
            source={{
              uri: item.img_url,
            }}
            className="w-[50px] h-[50px] rounded-full"
          />
          <View>
            <Text className="text-[16px] font-semibold leading-normal text-[#000]">
              {item.name}
            </Text>
            <Text className="text-[14px] font-normal leading-normal text-[#000]">
              28k Members
            </Text>
          </View>
        </View>
      </Pressable>
    </Pressable>
  );
};

const index = () => {
  const { loading, community, error } = useAuth();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator color="#f70" size="large" />
      ) : (
        <ScrollView>
          <View  className="mt-[16px] mx-[24px]">
            <Pressable onPress={() => router.back()} className="flex-row items-center space-x-[12px]">
              <ChevronLeftIcon size={25} color="#fff" />
              <Text className="text-[#fff] text-[20px] font-normal">
                Community
              </Text>
            </Pressable>
            <TextInput
              placeholder="Search"
              style={{
                width: wp(90),
              }}
              className="bg-[#fff] mt-[16px] h-[48px] px-[8px] rounded-[8px]"
            />
            <View className="mt-[24px]">
              <Text className="text-[#fff] font-semibold text-[20px]">
                Top Community
              </Text>
              {community.map((item) => {
                return <CommunityCard key={item.id} item={item} />;
              })}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default index;
