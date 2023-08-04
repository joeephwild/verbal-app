import { View, Text } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

const SelectLang = () => {
  const [level, setLevel] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  return (
    <View className="flex-1 bg-[#121214] items-start">
      <View className="mt-[60px]">
        <Text>Choose Your Language</Text>
        <Text>
          Select the language you're eager to master and uncover new
          opportunities
        </Text>
        <DropDownPicker
          open={languageOpen}
          value={value}
          items={items}
          setOpen={setLanguageOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <View className="">
        <Text>Choose Your Language</Text>
        <Text>
          Select the language you're eager to master and uncover new
          opportunities
        </Text>
        <DropDownPicker
          open={level}
          value={value}
          items={items}
          setOpen={setLevel}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
    </View>
  );
};

export default SelectLang;
