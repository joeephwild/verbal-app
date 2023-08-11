import React, { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList,
} from "react-native";
import { MainStudio } from "../../components";
// import {
//   MeetingProvider,
//   useMeeting,
//   useParticipant,
//   MediaStream,
//   RTCView,
// } from "@videosdk.live/react-native-sdk";
// import { createMeeting, token } from "../../src/utils/create-room";

const RoomDetails = () => {
  // const [meetingId, setMeetingId] = useState(null);

  // const getMeetingId = async (id) => {
  //   const meetingId = id == null ? await createMeeting({ token }) : id;
  //   setMeetingId(meetingId);
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainStudio />
    </SafeAreaView>
  );
};

export default RoomDetails;
