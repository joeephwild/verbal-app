import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import SetUpVideo from "../../src/components/VideoSteps/SetUpVideo";
import MainStudio from "../../src/components/VideoSteps/MainStudio";
import { MeetingProvider, useMeeting } from "@videosdk.live/react-native-sdk";
import { createMeeting } from "../../src/utils/create-room";
import { useEffect } from "react";
import { useState } from "react";
import { Text, View } from "react-native";

const RoomDetails = () => {
  const [enterRoom, setEnterRoom] = React.useState(false);
  const [meetingId, setMeetingId] = useState("");
  const [token, setToken] = useState();

  useEffect(() => {
    const fetchMeetingIdandToken = async () => {
      //We will fetch token and meetingId and update it in the state
      const newMeetingId = await createMeeting();
      setMeetingId(newMeetingId);
    };
    fetchMeetingIdandToken();
  }, []);
  return token && meetingId ? (
    <SafeAreaView className="items-stretch">
      <MeetingProvider
        config={{
          meetingId: meetingId,
          name: "joseph",
          micEnabled: true,
          webcamEnabled: true, // optional, default: SDK will generate
        }}
        token={process.env.EXPO_PUBLIC_HUDDLE01_APIKEY}
        joinWithoutUserInteraction={true}
      >
        <StatusBar style="light" />
        <View className="flex-1 items-center justify-center">
          <Text className="text-white">No Call</Text>
        </View>
      </MeetingProvider>
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      <View className="flex-1 items-center justify-center">
        <Text className="text-white">No Call</Text>
      </View>
    </SafeAreaView>
  );
};

export default RoomDetails;
