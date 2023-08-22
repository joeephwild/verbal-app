import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const SetProfile = ({
  setEmail,
  email,
  password,
  setPassword,
  setConfirmPassword,
  confirmPassword,
  nextStep,
}) => {

  return (
    <SafeAreaView className="">
      <StatusBar style="light" />
      <View>
        <View className="space-y-[9px] items-start">
          <Text className="text-[34px] font-bold text-[#fff] leading-normal">
            Create Account
          </Text>
        </View>
        <Text className="text-[16px] w-[342px] h-[69px] font-normal text-[#AAAAAAAA]">
          To tailor your experience and help you connect with fellow learners,
          set up your profile today. Let's get started on your learning journey!
        </Text>
        <View className="space-y-[24px] mt-[40px]">
          <View className="space-y-[8px] text-white">
            <Text className="text-[#fff] font-bold text-[15px]">
              Email Address
            </Text>
            <TextInput
              label="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={"none"}
              keyboardType="email-address"
              placeholderTextColor={"#fff"}
              labelStyle={{
                color: "#fff",
                paddingBottom: 8,
              }}
              className="w-full border text-[12px] text-[#fff] h-[56px] px-[24px] py-[16px] items-center justify-center rounded-[8px]  border-[#aaa]"
            />
          </View>
          <View className="space-y-[8px] text-white">
            <Text className="text-[#fff] font-bold text-[15px]">Password</Text>
            <TextInput
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholder="**********"
              keyboardType="visible-password"
              placeholderTextColor={"#fff"}
              autoCapitalize={"none"}
              className="w-full border  text-[12px] text-[#fff] h-[56px] px-[24px] py-[16px] items-center justify-center rounded-[8px]  border-[#aaa]"
            />
          </View>
          <View className="space-y-[8px] text-white">
            <Text className="text-[#fff] font-bold text-[15px]">
              Confirm Password
            </Text>
            <TextInput
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              placeholder="************"
              keyboardType="visible-password"
              placeholderTextColor={"#fff"}
              autoCapitalize={"none"}
              className="w-full border text-[12px] text-[#fff] h-[56px] px-[24px] py-[16px] items-center justify-center rounded-[8px]  border-[#aaa]"
            />
          </View>
        </View>
      </View>
      {/* <View className="items-center my-5 justify-center">
        <Pressable
          onPress={handleAuth}
          className="bg-[#F70] w-[342px] py-[16px] rounded-[8px]"
        >
          <Text className="text-[16px] text-center text-white  font-bold leading-normal">
            Continue
          </Text>
        </Pressable>
      </View> */}
    </SafeAreaView>
  );
};

export default SetProfile;
