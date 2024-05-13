import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ClipboardDocumentIcon,
  MicrophoneIcon,
} from "react-native-heroicons/solid";
import * as Speech from "expo-speech";

const MessageBox = ({ role, message, aiLoading, isCurrentMessage }) => {
  const speakResponse = (response) => {
    let options = {};
    Speech.speak(response, options);
  };

  return (
    <View
      style={{
        width: role === "ai" ? wp(90) : wp(60),
      }}
      className={` ${
        role === "ai" ? "self-end " : "self-start "
      } bg-[#fff] p-[12px] rounded-[12px] `}
    >
      <Text className="text-[15px]  font-normal font-[SpaceMono]">
        {message}
      </Text>

      {role === "ai" && isCurrentMessage && aiLoading && (
        <ActivityIndicator color="#f70" size={26} />
      )}

      {role === "ai" && (
        <View className="flex-row items-center border-t-2 w-full py-2 justify-between px-3">
          <View className="flex-row space-x-3 items-center">
            <HandThumbUpIcon color="#000" />
            <HandThumbDownIcon color="#000" />
          </View>
          {/* Use TouchableOpacity to handle the MicrophoneIcon press */}
          <TouchableOpacity>
            <MicrophoneIcon size={23} color="#000" />
          </TouchableOpacity>
          <View className="flex-row items-center">
            <ClipboardDocumentIcon color="#000" />
            <Text className="font-[SpaceMono]">Copy</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default MessageBox;
