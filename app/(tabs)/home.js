import { View, Text, Image, ImageBackground, TextInput } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { Community, MyLessons, Speakers } from "../../src/components";

const Home = () => {
  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <SafeAreaView className="bg-[#F70] w-full h-[311px] rounded-b-[50px]">
        <View>
          <View className="flex-row items-center py-[20px] justify-between px-[24px] w-full">
            <View className="flex-row space-x-4 items-center">
              <Image
                source={require("../../src/assets/profile.png")}
                className="w-[50px] h-[50px]"
              />
              <Text className="text-[24px] font-bold leading-normal text-[#fff]">
                Hi
                <Text className="text-[#000]"> Peter</Text>
              </Text>
            </View>
            <BellIcon size={35} color="white" />
          </View>
          <View className="bg-[#fff] w-[338px] h-[48px] rounded-[5px] border border-[#706C6C] flex-row px-[20px] items-center mx-[28px] justify-center ">
            <MagnifyingGlassIcon size={15} color="#000" stroke={3} />
            <TextInput
              placeholder="Search"
              className="border-none outline-none focus:outline-none bg-transparent w-full"
            />
          </View>

          {/** My Lesson Section */}
          <MyLessons />

          {/** Speakers */}
          <View className="mx-[28px] mt-[27px]">
            <Speakers />
          </View>

          <View className="mx-[28px] mt-[27px]">
            <Community />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
