import { View, Text, TextInput, FlatList, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
} from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { languageCommunity } from "../../../utils/index";
import { FlashList } from "@shopify/flash-list";
import { ScrollView } from "react-native-gesture-handler";

const CommunityCard = ({ item }) => {
  return (
    <View className="mx-[20px] items-center justify-center">
      <View
        style={{
          width: wp(90),
        }}
        className="bg-[#fff] mb-[16px] px-[5px]  py-[16px] mx-[24px] h-[90px] rounded-[5px]"
      >
        <View className="flex-row items-center">
          <Image
            source={{
              uri: item.image,
            }}
            className="w-[50px] h-[50px] rounded-full"
          />
          <Text>{item.name}</Text>
        </View>
      </View>
    </View>
  );
};

const index = () => {
  const [data, setData] = useState(languageCommunity);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View className="mt-[16px] mx-[24px]">
          <View className="flex-row items-center space-x-[12px]">
            <ArrowLeftIcon size={25} color="#fff" />
            <Text className="text-[#fff] text-[20px] font-normal">
              Community
            </Text>
          </View>
          <TextInput
            placeholder="Search"
            style={{
              width: wp(90),
            }}
            className="bg-[#fff] mt-[16px] h-[48px] px-[8px] rounded-[8px]"
          />
          <View className="mt-[24px]">
            {languageCommunity.slice(0, 3).map((item) => {
              return <CommunityCard item={item} />;
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
