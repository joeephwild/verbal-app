import { Image, Pressable, View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Link, router, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  return (
    <SafeAreaView style={{ flex: 1, }}>
      <View className="mt-[60px] mx-[15px]">
        <StatusBar style="light" />
        <Image
          style={{
            height: hp(52),
            width: wp(90),
          }}
          source={require("../../assets/images/Map.png")}
          className="w-[360px] h-[460px] object-cover"
        />

        <View className="items-start">
          <Text
            style={{
              fontFamily: "SpaceMono",
            }}
            className="text-[34px] mt-3 text-[#ffffff] font-bold leading-normal"
          >
            Welcome to Verbal
          </Text>
          <Text
            style={{
              fontFamily: "SpaceMono",
            }}
            className="text-[16px] mt-3 text-[#CCCCCC] font-semibold leading-normal"
          >
            Experience revolutionary learning with blockchain technology and
            AI-tailored lessons, connecting with a vibrant community.
          </Text>
          {/* <View className="mt-[40px] w-full space-y-[24px]"> */}
          <Link href={"/CreateAccount"} asChild>
            <Pressable
              style={{
                width: wp(90),
              }}
              className="bg-[#F70] mt-[30px] mb-[24px] w-full py-[16px] rounded-[8px] items-center justify-center"
            >
              <Text className="text-[16px] text-white  font-bold leading-normal">
                Get Started
              </Text>
            </Pressable>
          </Link>
          <Link href={"/Login"} asChild>
            <Pressable
              style={{
                width: wp(90),
              }}
              className="border-2 border-[#F70] w-full py-[16px] rounded-[8px] items-center justify-center"
            >
              <Text className="text-[16px] text-white  font-bold leading-normal">
                Login
              </Text>
            </Pressable>
          </Link>
          {/* </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
