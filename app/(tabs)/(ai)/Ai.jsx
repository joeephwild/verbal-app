import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeftIcon,
  PaperAirplaneIcon,
} from "react-native-heroicons/solid";
import { Pressable } from "react-native";
import { router } from "expo-router";
import mindDb from "../../../lib/mindDb";
import { useAuth } from "../../../context/auth";
import { Messages } from "../../../utils/index";

import {
  createBotChatHistory,
  createUserChatHistory,
  getChatBotHistory,
  getUserChatHistory,
} from "../../../lib/services/aiChatService";

import { getUserDetails } from "../../../lib/services/userService";
import { mindDbQueryCall } from "../../../lib/mindDb";
import { Input } from "react-native-elements";
import { FlashList } from "@shopify/flash-list";
import MessageBox from "../../../components/MessageBox";
import NoChatView from "../../../components/NoChatView";
import InputBox from "../../../components/InputBox";

const Ai = () => {
  const { session, id } = useAuth();
  const [user, setUser] = React.useState("");
  const [chatHistory, setChatHistory] = useState([]);
  useEffect(() => {
    if (session) {
      setUser(session?.user?.email);
    }
  }, [session]);

  useEffect(() => {
    const fetchChat = async () => {
      const userChat = await getUserChatHistory(id);
      const botChat = await getChatBotHistory(id);
      const userProfileData = await getUserDetails(id);

      const combinedChat = [...userChat, ...botChat];

      // Sort the combined chat messages by their created_at timestamp
      combinedChat.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

      const transformedMessages = [];

      for (const message of combinedChat) {
        if (message.author_name != "mindDb_bot") {
          transformedMessages.push({
            role: "user",
            message: message.message,
          });
        } else if (message.author_name === "mindDb_bot") {
          transformedMessages.push({
            role: "ai",
            message: message.message,
          });
        }
      }
      setChatHistory(transformedMessages);
    };
    fetchChat();
  }, []);

  useEffect(() => {
    console.log("Chat history updated:", chatHistory);
  }, [chatHistory]);

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
        {chatHistory.length > 0 ? (
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
        ) : (
          <NoChatView />
        )}
        <KeyboardAvoidingView
          keyboardVerticalOffset={180}
          behavior={"position"}
        >
          <InputBox index={id} />
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Ai;
