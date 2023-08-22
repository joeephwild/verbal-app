import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ChevronDownIcon, PhotoIcon } from "react-native-heroicons/solid";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import { useEnsName, useEnsAvatar } from "wagmi";
import { pickImage } from "../../lib/services/userService";
import { useAuth } from "../../context/auth";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";

const CreateProfile = ({
  fullName,
  setFullName,
  setSelectedTutorLanguage,
  username,
  setUsername,
  setSelectedAvailability,
  selectedAccountType,
  setSelectedAccountType,
  setProfile,
  setSelectedLanguageLevel,
  setCoverImage,
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleprofile = async () => {
    try {
      const result = await pickImage();
      let url = `https://gateway.pinata.cloud/ipfs/${result}`;
      setProfile(url);
    } catch (error) {
      // Handle any upload errors here
      console.error("Upload failed:", error);
      // You can show an error message here if needed
    }
  };

  const handleCoverImage = async() => {
    try {
      const result = await pickImage();
      let url = `https://gateway.pinata.cloud/ipfs/${result}`;
      setCoverImage(url);
    } catch (error) {
      // Handle any upload errors here
      console.error("Upload failed:", error);
    }
  };
  return (
    <View className="flex-1 ">
      <StatusBar style="light" />
      <View className="">
        <View className="space-y-[9px] items-start">
          <Text className="text-[34px] pb-4 font-bold text-[#fff] leading-normal">
            Setup Account
          </Text>
        </View>
        <Text className="text-[16px] w-[342px] h-[69px] font-normal text-[#AAAAAAAA]">
          To tailor your experience and help you connect with fellow learners,
          set up your profile today. Let's get started on your learning journey!
        </Text>
        <View className="space-y-[24px] mt-[20px]">
          <View className="flex-row space-x-2 items-center">
            <Pressable
              onPress={handleCoverImage}
              className="border border-[#aaa] w-[171px] h-[200px] rounded-[8px] items-center justify-center"
            >
              <PhotoIcon size={25} color="#fff" />
              <Text className="text-[16px] text-start font-semibold text-[#fff]">
                Cover Image
              </Text>
            </Pressable>

            <Pressable
              onPress={handleprofile}
              className="border border-[#aaa] w-[171px] h-[200px] rounded-[8px] items-center justify-center"
            >
              <PhotoIcon size={25} color="#fff" />
              <Text className="text-[16px] text-start font-semibold text-[#fff]">
                Profile Image
              </Text>
            </Pressable>
          </View>
          <View className="space-y-[8px]">
            <Text className="text-[16px] font-bold text-[#ffff] leading-normal">
              Full Name
            </Text>
            <TextInput
              value={fullName}
              onChangeText={(text) => setFullName(text)}
              style={{ color: "#ccccccaa" }}
              placeholder="John Doe"
              placeholderTextColor="#fff"
              className="w-full border placeholder:text-[#ccccccaa] h-[56px] px-[24px] py-[16px] items-center justify-center rounded-[8px]  border-[#aaa]"
            />
          </View>
          <View className="space-y-[8px]">
            <Text className="text-[16px] font-bold text-[#ffff] leading-normal">
              Username
            </Text>
            <TextInput
              value={username}
              onChangeText={(text) => setUsername(text)}
              disabled={username} // Use username instead of name
              style={{ color: "#ccccccaa" }}
              placeholder={username ? username : "UserName"}
              placeholderTextColor="#fff"
              className="w-full border h-[56px] placeholder:text-[#ccccccaa] px-[24px] py-[16px] items-center justify-center rounded-[8px]  border-[#aaa]"
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
            <View>
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
              <View className="space-y-[8px]">
                <Text className="text-[16px] font-bold text-[#ffff] leading-normal">
                  Select Language
                </Text>
                <SelectList
                  setSelected={(val) => setSelectedTutorLanguage(val)}
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
                  placeholder="Select a Language you can teach"
                />
              </View>
              <View className="space-y-[8px]">
                <Text className="text-[16px] font-bold text-[#ffff] leading-normal">
                  Select Skill Level
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
                  placeholder="Select an Availablity"
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default CreateProfile;
