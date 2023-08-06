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
 
  return (
    <View className="flex-1">
      <SafeAreaView className=" ">
        <StatusBar style="light" />
        <Intro />
        <View className="my-[20px] items-center justify-center">
          {/* navigation button */}
        
        </View>
      </SafeAreaView>
    </View>
  );
}
