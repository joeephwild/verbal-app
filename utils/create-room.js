import axios from "axios";
import { Alert } from "react-native";

// Replace 'YOUR_API_KEY' with your actual API key
const API_KEY = "Ua-VslmNP6OZo1dQELkNjK93TmwAZc0_";

// API call to create meeting
export const createMeeting = async () => {
  try {
    const { data } = await axios.post(
      "https://api.huddle01.com/api/v1/create-iframe-room",
      {
        title: "Huddle01-Test",
        roomLocked: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
      }
    );
    console.log(data);
    Alert.alert(data.data.meetingLink);
    return data.data.meetingLink;
  } catch (error) {
    console.log(error);
    return "";
  }
};
