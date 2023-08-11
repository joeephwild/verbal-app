import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";

const Community = () => {
  const [data, setData] = useState([1, 2, 3, 4, 5]);
  const navigate = useNavigation();
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
        {data.map((item, i) => (
          <View
            key={i}
            className=" bg-white rounded-[8px] px-4 py-3.5 w-[349px] min-h-[200px]"
          >
            <View className="space-y-8">
              <View className="flex-row items-start space-x-9">
                <Image
                  source={require("../assets/images/image1.png")}
                  className="w-[60px] h-[60px]"
                />
                <View className="items-start">
                  <Text className="text-[20px] font-bold text-[#000]">
                    John Stone
                  </Text>
                  <Text className="text-[16px] font-normal text-[#FF7700]">
                    80978k members
                  </Text>
                </View>
              </View>
              <Text>
                We are focused on ensuring our members meet tutors who will
                volunteer to elp hit their milestone and learn english meet
                tutors who will volunteer to elp hit their milestone and learn
                english
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Community;
