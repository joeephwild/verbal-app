import { View, Text, Image, Pressable } from "react-native";

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import SetUpVideo from "../../src/components/VideoSteps/SetUpVideo";
import MainStudio from "../../src/components/VideoSteps/MainStudio";

const RoomDetails = () => {
  const [enterRoom, setEnterRoom] = React.useState(false);
  return (
    <SafeAreaView className="items-stretch">
      <StatusBar style="light" />
      {enterRoom ? <MainStudio setEnterRoom={setEnterRoom} /> : <SetUpVideo setEnterRoom={setEnterRoom} />}
    </SafeAreaView>
  );
};

export default RoomDetails;
