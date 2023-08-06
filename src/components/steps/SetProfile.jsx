import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ChevronDownIcon, PlusIcon } from "react-native-heroicons/solid";
import { SelectList } from "react-native-dropdown-select-list";

const SetProfile = () => {
  const [age, setAge] = useState("");
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
            Set up Your Profile
          </Text>
        </View>
        <Text className="text-[16px] w-[342px] h-[69px] font-normal text-[#AAAAAAAA]">
          To tailor your experience and help you connect with fellow learners,
          set up your profile today. Let's get started on your learning journey!
        </Text>
        <View className="space-y-[24px] mt-[40px]">
          <View>
            <View className="border-2 border-dashed w-[71px] h-[69px] border-[#AAAAAAAA] p-[24px]">
              <PlusIcon size={25} color="white" />
            </View>
            <Text className="text-[16px] font-normal text-[#CCCCCCAA] leading-normal">
              Add an Avatar
            </Text>
          </View>
          <View className="space-y-[8px]">
            <Text className="text-[16px] font-bold text-[#ffff] leading-normal">
              Age
            </Text>
            <SelectList
              setSelected={(val) => setAge(val)}
              data={ageLevels}
              save="value"
              dropdownItemStyles={{
                borderColor: "#AAAAAAAA",
                backgroundColor: "#000",
                marginTop: 8
              }}
              search={false}
              arrowicon={<ChevronDownIcon size={25} color="#fff" />}
              dropdownTextStyles={{ color: "#fff" }}
              inputStyles={{ color: "#fff" }}
              placeholder="11 - 15"
            />
          </View>
          <View className="space-y-[8px]">
            <Text className="text-[16px] font-bold text-[#ffff] leading-normal">
              Full Name
            </Text>
            <TextInput
              style={{ color: "#ccccccaa" }}
              placeholder="John Doe"
              className="w-full border placeholder:text-[#ccccccaa] h-[56px] px-[24px] py-[16px] items-center justify-center rounded-[8px]  border-[#aaa]"
            />
          </View>
          <View className="space-y-[8px]">
            <Text className="text-[16px] font-bold text-[#ffff] leading-normal">
              Bio
            </Text>
            <TextInput
              style={{ color: "#ccccccaa" }}
              placeholder="Short description of yourself"
              className="w-full border h-[56px] placeholder:text-[#ccccccaa] px-[24px] py-[16px] items-center justify-center rounded-[8px]  border-[#aaa]"
            />
          </View>
          <View className="space-y-[8px]">
            <Text className="text-[16px] font-bold text-[#ffff] leading-normal">
              Email address
            </Text>
            <TextInput
              placeholder="JohnDoe@gmail.com"
              style={{ color: "#ccccccaa" }}
              className="w-full border h-[56px] px-[24px] py-[16px] items-center justify-center rounded-[8px]  border-[#aaa]"
            />
          </View>
          <View className="space-y-[8px]">
            <Text className="text-[16px] font-bold text-[#ffff] leading-normal">
              Set Password
            </Text>
            <TextInput
              placeholder="JohnDoe@gmail.com"
              style={{ color: "#ccccccaa" }}
              className="w-full border h-[56px] px-[24px] py-[16px] items-center justify-center rounded-[8px]  border-[#aaa]"
            />
          </View>
          <View className="space-y-[8px]">
            <Text className="text-[16px] font-bold text-[#ffff] leading-normal">
              Confirm Password
            </Text>
            <TextInput
              placeholder="JohnDoe@gmail.com"
              style={{ color: "#ccccccaa" }}
              className="w-full border h-[56px] px-[24px] py-[16px] items-center justify-center rounded-[8px]  border-[#aaa]"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SetProfile;
