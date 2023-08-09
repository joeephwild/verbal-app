import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import SetUpVideo from "../../src/components/VideoSteps/SetUpVideo";
import MainStudio from "../../src/components/VideoSteps/MainStudio";
import { MeetingProvider } from "@videosdk.live/react-native-sdk";

const RoomDetails = () => {
  const [enterRoom, setEnterRoom] = React.useState(false);
  return (
    <SafeAreaView className="items-stretch">
      <MeetingProvider
        config={{
          meetingId: "<Id-of-meeting>",
          name: "<Name-of-participant>",
          micEnabled: true,
          webcamEnabled: true, // optional, default: SDK will generate
        }}
        token={process.env.EXPO_PUBLIC_HUDDLE01_APIKEY}
        joinWithoutUserInteraction
      >
        <StatusBar style="light" />
        {enterRoom ? (
          <MainStudio setEnterRoom={setEnterRoom} />
        ) : (
          <SetUpVideo setEnterRoom={setEnterRoom} />
        )}
      </MeetingProvider>
    </SafeAreaView>
  );
};

export default RoomDetails;
