import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { Pressable } from "react-native";
import { router } from "expo-router";
import { useAuth } from "../../../context/auth";
import MessageBox from "../../../components/MessageBox";
import NoChatView from "../../../components/NoChatView";
import InputBox from "../../../components/InputBox";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../../firebase";
import * as Speech from "expo-speech";

const Ai = () => {
  const { session, id } = useAuth();
  const [text, setText] = React.useState("");
  const [user, setUser] = React.useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [isCurrentMessage, setIscurrentMessages] = useState(false);

  const speakResponse = (response) => {
    let options = {};
    Speech.speak(response, options);
  };

  useEffect(() => {
    const fetchChat = async () => {
      const user = auth.currentUser;
      const q = query(
        collection(db, "chatrooms"),
        where("userId", "==", user.uid),
        orderBy("created_at")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let chat = [];
        querySnapshot.forEach((doc) => {
          chat.push({ ...doc.data(), id: doc.id });
        });
        setChatHistory(chat);
        // Speak the AI response (assuming the AI response is in the last item of chat)
        // if (chat.length > 0) {
        //   const lastMessage = chat[chat.length - 1];
        //   if (lastMessage.role === "ai" && lastMessage.message) {
        //     // speakResponse(lastMessage.message);
        //     Speech.speak(lastMessage.message);
        //   }
        // }
      });

      return () => {
        unsubscribe();
        // Speech.stop();
      };
    };
    fetchChat();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Pressable
        onPress={() => router.back()}
        className="flex-row py-4 items-center space-x-[12px]"
      >
        <ChevronLeftIcon size={25} color="#fff" />
        <Text
          style={{
            fontFamily: "SpaceMono",
          }}
          className="text-[#fff] text-[20px] font-normal"
        >
          Learn with Ai
        </Text>
      </Pressable>
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={180}
          behavior={"padding"}
        >
          {!chatHistory && chatHistory.length <= 0 ? (
            <NoChatView />
          ) : (
            <FlatList
              data={chatHistory}
              renderItem={({ item }) => (
                <MessageBox aiLoading={aiLoading} isCurrentMessage={isCurrentMessage} {...item} />
              )}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={{
                paddingHorizontal: 10,
                gap: 24,
                paddingBottom: 180,
              }}
              // automaticallyAdjustKeyboardInsets
            />
          )}

          <InputBox
            text={text}
            setText={setText}
            index={id}
            setAiLoading={setAiLoading}
            setIscurrentMessages={setIscurrentMessages}
          />
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Ai;
