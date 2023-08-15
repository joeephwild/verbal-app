import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeftIcon,
  PaperAirplaneIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ClipboardDocumentIcon,
} from "react-native-heroicons/solid";
import { Pressable } from "react-native";
import { router } from "expo-router";
import mindDb from "../../../lib/mindDb";
import { useAuth } from "../../../context/auth";
import { Messages } from "../../../utils/index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  createBotChatHistory,
  createUserChatHistory,
} from "../../../lib/services/aiChatService";

const Ai = () => {
  const { session } = useAuth();
  const [text, setText] = React.useState("");
  const [user, setUser] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState("");
  const [chatHistory, setChatHistory] = useState(Messages);
  console.log(chatHistory);

  useEffect(() => {
    if (session) {
      setUser(session?.user?.email);
    }
  }, [session]);

  const queryAi = async () => {
    try {
      //   setLoading(true);
      // if (!session?.user) {
      //   throw new Error("No user on the session!");
      // }

      const response = await mindDb(user, text);
      if (response) {
        console.log(response);
        setResponse(response);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const sendMessage = async () => {
    if (!text.trim()) {
      return; // Don't send empty messages
    }

    const newMessage = {
      message: text,
      author_id: user, // Assuming you have the user's ID
    };
    createUserChatHistory(user, text);
    try {
      // Send the message to the AI and get the response
      const aiResponse = await mindDb(user, text);

      // Update the response state
      setResponse(aiResponse);

      // Update AI chat history
      const newAiMessage = {
        message: aiResponse,
        author_id: "AI", // Assign a unique identifier for the AI
      };
      createBotChatHistory(user, response);

      // Clear the input field
      setText("");
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Behavior depends on platform
        style={{ flex: 1 }}
      >
        <StatusBar style="light" />
        <Pressable
          onPress={() => router.back()}
          className="flex-row py-4 items-center space-x-[12px]"
        >
          <ChevronLeftIcon size={25} color="#fff" />
          <Text className="text-[#fff] text-[20px] font-normal">
            Learn with Ai
          </Text>
        </Pressable>

        <View style={{ flex: 1, }}>
          {/* Your chat messages can go here */}

          {chatHistory.length > 0 ? (
            <View className="mt-[0px] px-[4px] flex-1">
              <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                className="space-y-[20px]"
                keyboardShouldPersistTaps="handled"
              >
                {chatHistory.map((item, i) => {
                  if (item.role == "ai") {
                    return (
                      <View key={i} className="flex-row justify-center">
                        <View
                          style={{
                            width: wp(90),
                          }}
                          className="bg-[#fff] p-[12px] gap-[8px] rounded-[12px]"
                        >
                          <Text>{item.message}</Text>
                          <View className="border-t-2 p-1.5 flex-row items-center justify-between">
                            <View className="flex-row items-center">
                              <HandThumbUpIcon color="#000" size={24} />
                              <HandThumbDownIcon color="#000" size={24} />
                            </View>
                            <View className="flex-row items-center">
                              <ClipboardDocumentIcon color="#000" size={24} />
                              <Text>Copy</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  } else {
                    return (
                      <View key={i} className="flex-row">
                        <View
                          style={{
                            width: wp(70),
                          }}
                          className="bg-[#fff] p-[12px] gap-[8px] rounded-[12px]"
                        >
                          <Text>{item.message}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </View>
          ) : (
            <View className="flex-1 items-center justify-center">
              <View className=" items-center justify-center">
                <Image
                  source={require("../../../assets/images/Logo.png")}
                  className="w-[32px] h-[30.659px] object-contain"
                />
                <Text className="text-[34px] pt-[16px] text-[#ffffff] font-normal leading-[41px]] text-center">
                  Verbal AI
                </Text>
              </View>
              <View className="text-center pt-[24px]">
                <Text className="text-[17px] w-[327px] pb-[24px] text-center font-normal leading-[22px] text-[#ffffff]">
                  I'm here to help you with whatever Language you want to learn,
                  send a message let’s start learning.
                </Text>
                <Text className="text-[17px] text-center font-normal leading-[22px] text-[#ffffff]">
                  Example: Welcome in french
                </Text>
              </View>
            </View>
          )}
        </View>

        <View
          style={{
            width: wp(95),
          }}
          className="flex-row h-[48px] items-center rounded-[8px] px-[25px] mt-9 bg-white"
        >
          <TextInput
            // style={styles.input}
            className="h-[40px] bg-transparent w-[90%] items-center border-none outline-none focus:outline-none"
            placeholder="Ask me anything..."
            // Add your text input handling here (e.g., onChangeText, onSubmitEditing, etc.)
          />
          <Pressable className=" p-2 object-contain " onPress={sendMessage}>
            <PaperAirplaneIcon size={26} color="gray" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#000",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
    // You can add additional styling for chat messages here if needed
  },
  inputContainer: {
    borderTopWidth: 1,
    padding: 10,
    backgroundColor: "#000",
    display: "flex",
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: "#fff", // Adjust input background color
    borderRadius: 8, // Add some border radius to match design
    marginBottom: 10, // Add some spacing to separate input from send button
  },
  sendButton: {
    alignSelf: "flex-end",
    padding: 8,
  },
});

export default Ai;
