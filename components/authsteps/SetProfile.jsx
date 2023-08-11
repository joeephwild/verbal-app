import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Button, Input } from "react-native-elements";

const SetProfile = ({
  setEmail,
  email,
  password,
  setPassword,
  setConfirmPassword,
  confirmPassword,
}) => {
  const [age, setAge] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState([]);
  const [image, setImage] = useState(null);
  const ageLevels = [
    { key: "1", value: "11-15" },
    { key: "2", value: "16-20" },
    { key: "3", value: "21-26" },
    { key: "4", value: "26-above" },
  ];

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
            <Input
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
            <Input
              label="Set Password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholder="**********"
              keyboardType="visible-password"
              placeholderTextColor={"#fff"}
              autoCapitalize={"none"}
              labelStyle={{
                color: "#fff",
                paddingBottom: 8,
              }}
              className="w-full border  text-[12px] text-[#fff] h-[56px] px-[24px] py-[16px] items-center justify-center rounded-[8px]  border-[#aaa]"
            />
          </View>
          <View className="space-y-[8px] text-white">
            <Input
              label="Confirm Password"
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              placeholder="************"
              keyboardType="visible-password"
              placeholderTextColor={"#fff"}
              autoCapitalize={"none"}
              labelStyle={{
                color: "#fff",
                paddingBottom: 8,
              }}
              className="w-full border text-[12px] text-[#fff] h-[56px] px-[24px] py-[16px] items-center justify-center rounded-[8px]  border-[#aaa]"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SetProfile;
