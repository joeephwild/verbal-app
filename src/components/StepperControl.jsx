import { View, Text, Pressable } from "react-native";
import React from "react";

const StepperControl = ({ handleClick, currentStep, steps }) => {
  return (
    <View>
      <Pressable
        onPress={() => handleClick("next")}
        className="bg-[#F70] w-[342px] py-[16px] rounded-[8px] justify-center items-center"
      >
        <Text className="text-[16px] text-white  font-bold leading-normal">
          Continue
        </Text>
      </Pressable>
    </View>
  );
};

export default StepperControl;
