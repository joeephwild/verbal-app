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

var { width, height } = Dimensions.get("window");

const Speakers = () => {
  const [data, setData] = useState([1, 2, 3, 4, 5]);
  const navigate = useNavigation();
  const handleNaviagte = (item) => {
    navigate.navigate("Movie", item);
  };
  return (
    <View className="">
      <View className="flex-row items-center justify-between">
        <Text className="text-white text-xl mb-5">Speaker</Text>
        <Text className="text-[12px] font-normal text-[#989797]">See all</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
      >
        {data.map((item, i) => (
          <Pressable
            onPress={() => router.push(`tutor/${item.id}`)}
            key={i}
            className=" bg-white rounded-[8px] px-4 py-3.5 w-[250px] min-h-[48px]"
          >
            <View className="flex-row items-start space-x-2">
              <Image
                source={require("../assets/image1.png")}
                className="w-[60px] h-[60px]"
              />
              <View className="items-start">
                <Text className="text-[20px] font-bold text-[#000]">
                  John Stone
                </Text>
                <Text className="text-[16px] font-normal text-[#000]">
                  Korean Tutor
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
