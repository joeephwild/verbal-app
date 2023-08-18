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
    console.log("Saved users questions", chatObj);
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

      return (axiosInstance = axios.create({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }));
    };

    const query = `SELECT * FROM mindsdb.mindsdb.tutor_model2 WHERE author_username = '${userId}' AND text = '${message}';`;
    const fetchData = async () => {
      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.post(
          "https://cloud.mindsdb.com/api/sql/query",
          {
            query,
          }
        );
        if (response.data.data.length > 0) {
          const firstRow = response.data.data[0];

          const mindDbRes = createBotChatHistory(userId, firstRow);
          if (mindDbRes) {
            console.log("Saved bot response", firstRow);
          }
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

      return firstRow[0];
    }
    return null;
  } catch (error) {
    throw error;
  }
};
