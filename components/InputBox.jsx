import { View, Text, TextInput, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { PaperAirplaneIcon } from "react-native-heroicons/solid";
import { mindDbQueryCall } from "../lib/mindDb";
import { getDatabase, ref, set } from "firebase/database";
import { auth, database, db } from "../firebase";

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
      // // Add the new message to the Firestore collection
      set(ref(database, `messages/${userUid}`), {
        message: text,
        sender: "user",
      });

      // const response = await mindDbQueryCall("joseph", text);
      // console.log(response);

      set(ref(database, `messages/${userUid}`), {
        aimessage: text,
        sender: "ai",
      });

      setText(""); // Clear the input box
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
