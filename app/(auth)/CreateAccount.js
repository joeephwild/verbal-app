import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Congrat,
  ConnectWallet,
  Intro,
  SelectLang,
  SetProfile,
} from "../../src/components/steps";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StepperControl } from "../../src/components";
import { UseContextProvider } from "../../src/context/StepperContext";

const CreateAccount = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [endReg, setEndReg] = useState(false);

  const regEnd = () => {
    setEndReg(true);
  };

  const displayStep = (step) => {
    switch (step) {
      case 0:
        return <Intro />;
      case 1:
        return <SelectLang />;
      case 2:
        return <SetProfile />;
      case 3:
        return <ConnectWallet handleClick={regEnd} />;
      case 4:
        return <Congrat />;
      default:
        <Congrat />;
    }
  };

  const steps = [
    "Intro",
    "Select Language",
    "Create Profile",
    "Connect Wallet",
  ];

  const handleClick = (direction) => {
    if (direction === "next") {
      // Navigate to the next step
      setCurrentStep((prevStep) => prevStep + 1);
    } else if (direction === "back") {
      // Navigate to the previous step
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };
  return (
    <SafeAreaView className="flex-1 min-h-screen">
      <StatusBar style="light" />
      <ScrollView>
        <View className="flex-row my-[38px] items-center space-x-[28px] px-4 py-2.5">
          {currentStep !== steps.length && (
            <TouchableOpacity onPress={() => handleClick("back")}>
              <ArrowLeftIcon size={25} color="white" />
            </TouchableOpacity>
          )}

          {currentStep !== steps.length &&
            steps.map((item, index) => {
              return (
                <View
                  key={index}
                  className={`w-[40px] h-[4px] space-x-2 ${
                    currentStep >= index ? "bg-[#008EFF]" : "bg-[#CCC]"
                  }`}
                />
              );
            })}
        </View>
        <View className="items-center justify-center my-[5px] mx-[24px]">
          <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
        </View>
        <View className="items-center my-5 justify-center">
          {currentStep !== steps.length && (
            <StepperControl
              handleClick={handleClick}
              currentStep={currentStep}
              steps={steps}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAccount;
