import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import {
  Congrat,
  ConnectWallet,
  Intro,
  SelectLang,
  SetProfile,
  SetupPreference,
} from "../../components/authsteps";
import { StatusBar } from "expo-status-bar";
import { StepperControl } from "../../components";
import { useAuth } from "../../context/auth";
import { router } from "expo-router";
import {
  WalletConnectModal,
  useWalletConnectModal,
} from "@walletconnect/modal-react-native";

const CreateAccount = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = React.useState([]);
  const [selectedLevel, setSelectedLevel] = React.useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    } else {
      router.back();
    }
  };

  const displayStep = (step) => {
    switch (step) {
      case 0:
        return <Intro nextStep={nextStep} />;
      case 1:
        return (
          <SetProfile
            setEmail={setEmail}
            email={email}
            password={password}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            confirmPassword={confirmPassword}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <SelectLang
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            nextStep={nextStep}
          />
        );
      case 3:
        return <SetupPreference nextStep={nextStep} />;
        case 4:
          return <ConnectWallet nextStep={nextStep} />;
      case 5:
        return <Congrat />;
      default:
        <Congrat />;
    }
  };

  const steps = [
    "Intro",
    "Select Language",
    "Create Profile",
    "Update Profile",
    "connect wallet",
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <ScrollView>
        <View className="flex-row my-[38px] items-center space-x-[28px] px-4 py-2.5">
          {currentStep !== steps.length && (
            <TouchableOpacity onPress={prevStep}>
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
          {displayStep(currentStep)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAccount;
