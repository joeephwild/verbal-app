import axios from "axios";
import Constants from "expo-constants";
import { getTokenFromHeaders } from "./sessionTokens";

export default mindDbQueryCall = async (authorUsername, searchText) => {
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

    const query = `SELECT * FROM mindsdb.mindsdb.tutor_model WHERE author_username = '${authorUsername}' AND text = '${searchText} USING prompt_template=${`Act like a chat buddy to ${authorUsername}, be friendly, act like he was chatting with friend while also teaching him a particular language he requested to learn and also go indept into the topic been asked, making the chat friendly and educational and the same time`}'`;

    const fetchData = async () => {
      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.post(
          "https://cloud.mindsdb.com/api/sql/query",
          {
            query,
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    };

    const data = await fetchData();
    console.log({ data });

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
