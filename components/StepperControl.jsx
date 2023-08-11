import { View, Text, Pressable } from "react-native";
import React from "react";

const StepperControl = ({ handleClick, currentStep, steps }) => {
  return (
    <View>
      {currentStep === 0 ? (
        <></>
      ) : (
        <Pressable
          onPress={() => handleClick("next")}
          className="bg-[#F70] w-[342px] py-[16px] rounded-[8px]"
        >
          <Text className="text-[16px] text-center text-white  font-bold leading-normal">
            Continue
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default StepperControl;
