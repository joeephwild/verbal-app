import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import { ChevronDownIcon } from "react-native-heroicons/solid";
import { useAuth } from "../../context/auth";

const SelectLang = ({
  selectedLanguage,
  setSelectedLanguage,
  setSelectedLevel,
  selectedLevel,
  nextStep,
}) => {
  const data = [
    { key: "1", value: "Spanish" },
    { key: "2", value: "Korean" },
    { key: "3", value: "German" },
    { key: "4", value: "Yoruba" },
    { key: "5", value: "Japanese" },
    { key: "6", value: "Italian" },
    { key: "7", value: "Chinese" },
  ];
  const level = [
    { key: "1", value: "Newbie" },
    { key: "2", value: "Beginner" },
    { key: "3", value: "Intermediate" },
    { key: "4", value: "Fluent" },
  ];

  return (
    <View className="items-start space-y-[40px] my-[16px]">
      <View className="space-y-[8px]">
        <Text className="text-[28px] font-bold leading-normal text-[#fff]">
          Choose Your Language
        </Text>
        <Text className="text-[16px] font-semibold text-[#CCCCCCAA]">
          Select the language you're eager to master and uncover new
          opportunities
        </Text>
        <View className="rounded-[8px] mt-[24px]">
          <SelectList
            setSelected={(val) => setSelectedLanguage(val)}
            data={data}
            save="value"
            dropdownItemStyles={{
              borderColor: "#AAAAAAAA",
              backgroundColor: "#000",
            }}
            arrowicon={<ChevronDownIcon size={25} color="#fff" />}
            dropdownTextStyles={{ color: "#fff" }}
            inputStyles={{ color: "#fff" }}
            placeholder="Select language"
          />
        </View>
      </View>
      <View className="space-y-[8px]">
        <Text className="text-[28px] font-bold leading-normal text-[#fff]">
          Proficiency Level
        </Text>
        <Text className="text-[16px] font-semibold text-[#CCCCCCAA]">
          Tell us your current skill level in{" "}
          {selectedLanguage ? selectedLanguage : "Selected langugae"}. We'll
          personalize your learning experience accordingly.
        </Text>
        <View className="rounded-[8px] mt-[24px]">
          <SelectList
            setSelected={(val) => setSelectedLevel(val)}
            data={level}
            save="value"
            dropdownItemStyles={{
              borderColor: "#AAAAAAAA",
              backgroundColor: "#000",
            }}
            search={false}
            arrowicon={<ChevronDownIcon size={25} color="#fff" />}
            dropdownTextStyles={{ color: "#fff" }}
            inputStyles={{ color: "#fff" }}
            placeholder="Newbie"
          />
        </View>
      </View>
      {/* <View className="items-center my-5 justify-center">
        <Pressable
          onPress={handleProfile}
          className="bg-[#F70] w-[342px] py-[16px] rounded-[8px]"
        >
          <Text className="text-[16px] text-center text-white  font-bold leading-normal">
            Continue
          </Text>
        </Pressable>
      </View> */}
    </View>
  );
};

export default SelectLang;
