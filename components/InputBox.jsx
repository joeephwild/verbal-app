import { View, Text, TextInput, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { PaperAirplaneIcon } from "react-native-heroicons/solid";
import { mindDbQueryCall } from "../lib/mindDb";
import { getDatabase, ref, set } from "firebase/database";
import { auth, database, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const InputBox = ({
  index,
  text,
  setText,
  setAiLoading,
  setIscurrentMessages,
}) => {
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
      setText("");
      // Add the new message to the Firestore collection
      const docRef = await addDoc(collection(db, "chatrooms"), {
        role: "user",
        message: text,
        userId: user.uid,
        created_at: serverTimestamp(), // Use serverTimestamp() to set the timestamp
      });

      setAiLoading(true);
      setIscurrentMessages(true);
      const response = await mindDbQueryCall(
        auth.currentUser.displayName,
        text
      );
      setAiLoading(false);
      setIscurrentMessages(false);
      await addDoc(collection(db, "chatrooms"), {
        role: "ai",
        message: response,
        userId: user.uid,
        created_at: serverTimestamp(), // Use serverTimestamp() for the AI response as well
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
