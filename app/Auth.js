import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Congrat,
  ConnectWallet,
  Intro,
  SelectLang,
  SetProfile,
} from "../src/components/steps";
import { UseContextProvider } from "../src/context/StepperContext";
import { useState } from "react";
import { StepperControl } from "../src/components";

export default function Auth() {
  const [currentStep, setCurrentStep] = useState(1);
  const [endReg, setEndReg] = useState(false);

  const regEnd = () => {
    setEndReg(true);
  };

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Intro />;
      case 2:
        return <SelectLang />;
      case 3:
        return <SetProfile />;
      case 4:
        return <ConnectWallet handleClick={regEnd} />;
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
    let newStep = currentStep;

    direction === "next" ? (newStep += 1) : (newStep -= 1);
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };
  return (
    <View className="flex-1">
      <SafeAreaView className=" ">
        <StatusBar style="light" />
        <Intro />
        <View className="my-[20px] items-center justify-center">
          {/* navigation button */}
          {currentStep !== steps.length && (
            <StepperControl
              handleClick={handleClick}
              currentStep={currentStep}
              steps={steps}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
