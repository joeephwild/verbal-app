import { View, Text } from "react-native";
import React from "react";

const AiChatBox = ({ response }) => {
  return (
    <View className="bg-[#FFFBF2] p-[12px] items-center gap-5">
      <Text className="text-[16px] font-normal leading-[22px] text-[#000]">
        {response}
      </Text>
    </View>
  );
};

export default AiChatBox;
