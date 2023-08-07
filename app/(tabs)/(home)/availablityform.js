import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import PickDate from "../../../src/components/availabilitystep/PickDate";
import ConfirmBooking from "../../../src/components/availabilitystep/ConfirmBooking";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/solid";

const availablityform = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [endReg, setEndReg] = useState(false);

  const steps = ["Intro", "Select Language"];

  const handleClick = (direction) => {
    if (direction === "next") {
      // Navigate to the next step
      setCurrentStep((prevStep) => prevStep + 1);
    } else if (direction === "back") {
      // Navigate to the previous step
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const displayStep = (step) => {
    switch (step) {
      case 0:
        return <PickDate handleClick={handleClick} />;
      case 1:
        return <ConfirmBooking />;
      default:
        <PickDate />;
    }
  };
  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <ScrollView>{displayStep(currentStep)}</ScrollView>
    </SafeAreaView>
  );
};

export default availablityform;
