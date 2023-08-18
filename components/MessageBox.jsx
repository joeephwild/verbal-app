import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ClipboardDocumentIcon,
} from "react-native-heroicons/solid";

const MessageBox = ({ role, message }) => {
  return (
    <View
      style={{
        width: wp(60),
        //   alignSelf: role === "ai" ? "flex-end" : "flex-start"
      }}
      className={` ${
        role === "ai"
          ? "self-end rounded-br-[15px]"
          : "self-start rounded-bl-[15px]"
      } bg-[#fff] p-[12px] `}
    >
      <Text className="text-[15px] font-normal font-[spaceMono]">
        {message}
      </Text>
    </View>
  );
};

export default MessageBox;
