import { View, Text, TextInput, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { PaperAirplaneIcon } from "react-native-heroicons/solid";
import { mindDbQueryCall } from "../lib/mindDb";
import { getDatabase, ref, set } from "firebase/database";
import { auth, database, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const InputBox = ({ index, text, setText }) => {
  const [isFetching, setIsFetching] = React.useState(false);
  const [userUid, setUserUid] = useState("");
  const handleSend = async () => {
    await mindDbQueryCall(index, text);
  };
  useEffect(() => {
    const getUser = () => {
      const user = auth.currentUser;
      setUserUid(user.uid);
    };
    getUser();
  }, []);

  const sendMessage = async () => {
    try {
      if (text.trim() === "") return;
      const user = auth.currentUser;
      const currentDate = new Date(); // Get the current date and time
      const timestamp = currentDate.toISOString();
      // // Add the new message to the Firestore collection
      const docRef = await addDoc(collection(db, "chatrooms"), {
        role: "user",
        message: text,
        userId: user.uid,
        created_at: timestamp,
      });
      setText("");
      const response = await mindDbQueryCall("joseph", text);
      console.log(response);

      const airesponse = await addDoc(collection(db, "chatrooms"), {
        role: "ai",
        message: response,
        userId: user.uid,
        created_at: timestamp,
      });

      // Clear the input box
    } catch (error) {
      console.log("error sending message", error.message);
    }
  };
  return (
    <View style={{ flex: 0 }} className="bg-[#fff] p-2.5 flex-row items-center">
      <TextInput
        value={text}
        onChangeText={(text) => setText(text)}
        placeholder="Ask Something..."
        placeholderTextColor="#000"
        className="w-[95%]"
      />
      <Pressable onPress={sendMessage}>
        <PaperAirplaneIcon color="#000" />
      </Pressable>
    </View>
  );
};

export default InputBox;
