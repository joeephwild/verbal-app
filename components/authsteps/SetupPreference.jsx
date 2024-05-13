import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ChevronDownIcon } from "react-native-heroicons/solid";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import { Input } from "react-native-elements";
import { useEnsName, useEnsAvatar } from "wagmi";
import {
  getUserDetails,
  updateUserProfile,
} from "../../lib/services/userService";
import { useAuth } from "../../context/auth";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";

const SetupPreference = ({ nextStep }) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [selectedLanguageLevel, setSelectedLanguageLevel] = useState("");
  const { address } = useWalletConnectModal();
  const { id, account } = useAuth();

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

  const languageLevel = [
    { key: "1", value: "Newbie" },
    { key: "2", value: "Amateur" },
    { key: "2", value: "Pro" },
    { key: "2", value: "Expert" },
  ];

  const language = [
    { key: "1", value: "English" },
    { key: "2", value: "Italian" },
    {
      key: "3",
      value: "German",
    },
    {
      key: "4",
      value: "Turkish",
    },
    {
      key: "5",
      value: "Swedish",
    },
    {
      key: "6",
      value: "Japanese",
    },
  ];
  const { data: name, error } = useEnsName({
    address: address ? address : account,
    chainId: 5,
  });

  const { data: avatar } = useEnsAvatar({
    name: name,
  });

  const handleProfile = async () => {
    try {
      const userObj = {
        username: username,
        full_name: fullName,
        avatar_url: "",
        account_type: selectedAccountType,
        availability_timestamp: selectedAvailability,
        languages: selectedLanguage,
        language_levels: selectedLanguageLevel,
        cover_image: "",
      };

      const result = await updateUserProfile(id, userObj);

      if (result) {
        // console.log(result);
        alert("Profile updated successfully");
      } else {
        console.log("User not found or no changes made.");
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
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
          <View></View>
          <View className="space-y-[8px]">
            <Text className="text-[16px] font-bold text-[#ffff] leading-normal">
              Full Name
            </Text>
            <Input
              value={fullName}
              onChangeText={(text) => setFullName(text)}
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
              onChangeText={(text) => setUsername(text)}
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
              placeholder="Select a Language"
            />
          </View>
          <View className="space-y-[8px]">
            <Text className="text-[16px] font-bold text-[#ffff] leading-normal">
              Language Level
            </Text>
            <SelectList
              setSelected={(val) => setSelectedLanguageLevel(val)}
              data={languageLevel}
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
              placeholder="Select an Account Type"
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
              placeholder="Select an Account Type"
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
                placeholder="Select an Availablity"
              />
            </View>
          )}
        </View>
        <View className="items-center my-5 justify-center">
          <Pressable
            onPress={handleProfile}
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
