import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Pressable,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import React, { useState } from "react";
import { router, useNavigation } from "expo-router";
import { ScrollView } from "react-native";
import { Mentors } from "../utils";

var { width, height } = Dimensions.get("window");

const Speakers = () => {
  const [data, setData] = useState(Mentors);
  return (
    <View className="">
      <View className="flex-row items-center justify-between">
        <Text className="text-white text-xl mb-5">Mentors</Text>
        <Text className="text-[12px] font-normal text-[#989797]">See all</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
      >
        {data.map((item, i) => (
          <Pressable
            onPress={() => router.push(`tutor/${item.name}`)}
            key={i}
            className=" bg-white rounded-[8px] px-4 py-3.5 w-[250px] min-h-[48px]"
          >
            <View className="flex-row items-start space-x-2">
              <Image
                source={{
                  uri: item.profileImage
                }}
                className="w-[60px] h-[60px] rounded-full object-cover"
              />
              <View className="items-start">
                <Text className="text-[20px] font-bold text-[#000]">
                  {item.name}
                </Text>
                <Text className="text-[16px] space font-normal text-[#000]">
                  {item.languages[0]}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Speakers;
