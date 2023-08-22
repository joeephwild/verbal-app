import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Keyboard,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { Pressable } from "react-native";
import { router } from "expo-router";
import { useAuth } from "../../../context/auth";
import { Messages } from "../../../utils/index";

import {
  getChatBotHistory,
  getUserChatHistory,
} from "../../../lib/services/aiChatService";

import { getUserDetails } from "../../../lib/services/userService";
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

const Ai = () => {
  const { session, id } = useAuth();
  const [text, setText] = React.useState("");
  const [user, setUser] = React.useState("");
  const [chatHistory, setChatHistory] = useState([]);
  // useEffect(() => {
  //   if (session) {
  //     setUser(session?.user?.email);
  //   }
  // }, [session]);

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
        console.log("community chat", chat);
        setChatHistory(chat);
      });
      return () => unsubscribe();
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
          keyboardVerticalOffset={100}
          behavior={"padding"}
        >
          <FlatList
            data={chatHistory}
            renderItem={({ item }) => <MessageBox {...item} />}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
              paddingHorizontal: 10,
              gap: 24,
              paddingBottom: 180,
            }}
            automaticallyAdjustKeyboardInsets
          />

          <InputBox text={text} setText={setText} index={id} />
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Ai;
