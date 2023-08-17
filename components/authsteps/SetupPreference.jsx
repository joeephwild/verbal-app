import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ChevronDownIcon } from "react-native-heroicons/solid";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import { Input } from "react-native-elements";
import { useEnsName, useEnsAvatar } from "wagmi";
import { updateUserProfile } from "../../lib/services/userService";
import { useAuth } from "../../context/auth";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";

const SetupPreference = ({ nextStep }) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [selectedLanguageLevel, setSelectedLanguageLevel] = useState("");
  const { open, isConnected, address } = useWalletConnectModal();
  const { id, account } = useAuth();
  const ageLevels = [
    { key: "1", value: "11-15" },
    { key: "2", value: "16-20" },
    { key: "3", value: "21-26" },
    { key: "4", value: "26-above" },
  ];

  const availablityTimes = [
    { key: "1", value: "2:00-2:30" },
    { key: "2", value: "3:00-3:30" },
    { key: "3", value: "4:00-4:30" },
    { key: "4", value: "5:00-5:30" },
    { key: "5", value: "6:00-6:30" },
  ];

  const accountType = [
    { key: "1", value: "Learner" },
    { key: "2", value: "Mentor" },
  ];

  const language = [
    {
      key: "1",
      title: "English",
      imageSource: require("./lib/local-assets/america.png"),
      language: "en",
    },
    {
      key: "2",
      title: "Italian",
      imageSource: require("./lib/local-assets/italy.png"),
    },
    {
      key: "3",
      title: "German",
      imageSource: require("./lib/local-assets/germany.png"),
    },
    {
      key: "4",
      title: "Turkish",
      imageSource: require("./lib/local-assets/turkey.png"),
      language: "tr-TR",
    },
    {
      key: "5",
      title: "Swedish",
      imageSource: require("./lib/local-assets/sweden.png"),
    },
    {
      key: "6",
      title: "Japanese",
      imageSource: require("./lib/local-assets/japan.png"),
    },
  ];
  const { data: name, error } = useEnsName({
    address: address ? address : account,
    chainId: 5,
  });

  const { data: avatar } = useEnsAvatar({
    name: name,
  });
  console.log(avatar);

  const handleProfile = async () => {
    const userObj = {
      username: name ? name : username,
      full_name: fullName,
      avatar_url: avatar,
      account_type: selectedAccountType,
      availability_timestamp: selectedAvailability,
      languages: selectedLanguage,
      language_level: selectedLanguageLevel,
      cover_image: "",
    };
    updateUserProfile(id, userObj);
  };
  return (
    <View className="flex-1 ">
      <StatusBar style="light" />

      <View className="">
        <View className="space-y-[9px] items-start">
          <Text className="text-[34px] pb-4 font-bold text-[#fff] leading-normal">
            Edit Profile
          </Text>
        </View>
        <Text className="text-[16px] w-[342px] h-[69px] font-normal text-[#AAAAAAAA]">
          To tailor your experience and help you connect with fellow learners,
          set up your profile today. Let's get started on your learning journey!
        </Text>
        <View className="space-y-[24px] mt-[20px]">
          <View className="space-y-[8px]">
            <Text className="text-[16px] font-bold text-[#ffff] leading-normal">
              Full Name
            </Text>
            <Input
              value={fullName}
              onChange={(text) => setFullName(text)}
              style={{ color: "#ccccccaa" }}
              placeholder="John Doe"
              className="w-full border placeholder:text-[#ccccccaa] h-[56px] px-[24px] py-[16px] items-center justify-center rounded-[8px]  border-[#aaa]"
            />
          </View>
          <View className="space-y-[8px]">
            <Text className="text-[16px] font-bold text-[#ffff] leading-normal">
              Username
            </Text>
            <Input
              value={username}
              onChange={(text) => setUsername(text)}
              disabled={name}
              style={{ color: "#ccccccaa" }}
              placeholder={name ? name : "UserName"}
              className="w-full border h-[56px] placeholder:text-[#ccccccaa] px-[24px] py-[16px] items-center justify-center rounded-[8px]  border-[#aaa]"
            />
          </View>
          <View className="space-y-[9px]">
            <Text className="text-[16px] font-bold text-[#ffff] leading-normal">
              Languages
            </Text>
            <MultipleSelectList
              setSelected={(val) => setSelectedLanguage(val)}
              data={language}
              save="value"
              dropdownItemStyles={{
                borderColor: "#AAAAAAAA",
                backgroundColor: "#000",
                marginTop: 8,
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
              Account Type
            </Text>
            <SelectList
              setSelected={(val) => setSelectedAccountType(val)}
              data={accountType}
              save="value"
              dropdownItemStyles={{
                borderColor: "#AAAAAAAA",
                backgroundColor: "#000",
                marginTop: 8,
              }}
              search={false}
              arrowicon={<ChevronDownIcon size={25} color="#fff" />}
              dropdownTextStyles={{ color: "#fff" }}
              inputStyles={{ color: "#fff" }}
              placeholder="11 - 15"
            />
          </View>
          {selectedAccountType === "Mentor" && (
            <View className="space-y-[8px]">
              <Text className="text-[16px] font-bold text-[#ffff] leading-normal">
                Availability
              </Text>
              <MultipleSelectList
                setSelected={(val) => setSelectedAvailability(val)}
                data={availablityTimes}
                save="value"
                dropdownItemStyles={{
                  borderColor: "#AAAAAAAA",
                  backgroundColor: "#000",
                  marginTop: 8,
                }}
                search={false}
                arrowicon={<ChevronDownIcon size={25} color="#fff" />}
                dropdownTextStyles={{ color: "#fff" }}
                inputStyles={{ color: "#fff" }}
                placeholder="11 - 15"
              />
            </View>
          )}
          <View className="space-y-[8px]">
            <Text className="text-[16px] font-bold text-[#ffff] leading-normal">
              Confirm Password
            </Text>
            <Input
              placeholder="JohnDoe@gmail.com"
              style={{ color: "#ccccccaa" }}
              className="w-full border h-[56px] px-[24px] py-[16px] items-center justify-center rounded-[8px]  border-[#aaa]"
            />
          </View>
        </View>
        <View className="items-center my-5 justify-center">
          <Pressable
            onPress={handl}
            className="bg-[#F70] w-[342px] py-[16px] rounded-[8px]"
          >
            <Text className="text-[16px] text-center text-white  font-bold leading-normal">
              Save Account
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SetupPreference;
