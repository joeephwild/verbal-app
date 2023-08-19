import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import { PaperAirplaneIcon } from "react-native-heroicons/solid";
import { mindDbQueryCall } from "../lib/mindDb";

const InputBox = ({ index, text, setText }) => {
  
  const [isFetching, setIsFetching] = React.useState(false)
  const handleSend = async () => {
    await mindDbQueryCall(index, text);
  };
  return (
    <View className="bg-[#fff] p-2.5 flex-row items-center">
      <TextInput
        value={text}
        onChangeText={(text) => setText(text)}
        placeholder="Ask Something..."
        placeholderTextColor="#000"
        className="w-[95%]"
      />
      <Pressable onPress={handleSend}>
        <PaperAirplaneIcon color="#000" />
      </Pressable>
    </View>
  );
};

export default InputBox;
