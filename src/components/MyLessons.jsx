import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, useNavigation, router } from "expo-router";
import { MyLesson } from "../utils";

const MyLessons = () => {
  const navigate = useNavigation();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 20, alignContent: "center" }}
    >
      {MyLesson.map((item, i) => (
        <Pressable
          className="mx-[28px] mt-[20px] bg-[#fff]  px-6 py-2.5 w-[342px] h-[157px] rounded-[5px]"
          key={i}
          onPress={() => router.push(`/mylesson/${item.course}`)}
        >
          {/* <View> */}
          <View className="flex-row items-center justify-between">
            <Text className="text-[16px] font-bod text-[#000]">My Lesson</Text>
            <Text className="text-[16px] font-bod text-[#015834]">
              Upcoming
            </Text>
          </View>

          <View className="flex-row mt-[27px] items-center  space-x-4">
            <Image source={item.image} className="w-[60px] h-[60px]" />
            <View className="items-start space-y-2">
              <Text className="text-[20px] font-semibold text-[#000]">
                {item.course}
              </Text>
              <Text className="text-[16px] font-normal text-[#000]">
                With {item.tutor}
              </Text>
              <Text className="text-[#015834] text-[16px] font-normals">
                Scheduled for {item.period}
              </Text>
            </View>
          </View>
          {/* </View> */}
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default MyLessons;
