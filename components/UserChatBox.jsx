import { View, Text } from "react-native";
import React from "react";

const UserChatBox = ({ text }) => {
  return (
    <View className="bg-[#FFFBF2] w-[106px] p-[12px] items-center gap-5">
      <Text className="text-[16px] font-normal leading-[22px] text-[#000]">
        {text}
      </Text>
    </View>
  );
};

export default UserChatBox;
