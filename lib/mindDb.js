import axios from "axios";
import Constants from "expo-constants";
import { getTokenFromHeaders } from "./sessionTokens";
import {
  createUserChatHistory,
  getUserChatHistory,
  createBotChatHistory,
} from "./services/aiChatService";

export const mindDbQueryCall = async (userId, message) => {
  const chatObj = createUserChatHistory(userId, message);
  if (chatObj) {
    console.log("Saved users questions", chatObj.data);
  }
  try {
    const loginResponse = await axios.post(
      "https://cloud.mindsdb.com/cloud/login",
      {
        email: process.env.EXPO_PUBLIC_MINDSDB,
        password: process.env.EXPO_PUBLIC_MINDSDB_PASS,
      }
    );

    const createAxiosInstance = () => {
      const sessionToken = getTokenFromHeaders(loginResponse.headers);
      console.log({ sessionToken });

      return (axiosInstance = axios.create({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }));
    };

    const query = `SELECT * FROM mindsdb.mindsdb.tutor_model WHERE author_username = '${userId}' AND text = '${message} USING prompt_template=${`Act like a chat buddy to ${userId}, be friendly, act like he was chatting with friend while also teaching him a particular language he requested to learn and also go indept into the topic been asked, making the chat friendly and educational and the same time, dont reply with dear anymore just go straight to the message`}'`;

    const fetchData = async () => {
      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.post(
          "https://cloud.mindsdb.com/api/sql/query",
          {
            query,
          }
        );
        const mindDbRes = createBotChatHistory(userId, response.data[0]);
        if (mindDbRes) {
          console.log("Saved bot response", response.data[0]);
        }

        return response.data;
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    };

    const data = await fetchData();

    if (data.data.length > 0) {
      const firstRow = data.data[0];
      console.log({ firstRow });

      return firstRow[0];
    }
    return null;
  } catch (error) {
    throw error;
  }
};
