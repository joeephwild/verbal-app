import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeftIcon,
  PaperAirplaneIcon,
} from "react-native-heroicons/solid";
// import { Navigator, useNavigation } from 'expo-router'
// import { useEffect } from "react";
// import mindDb from "../../../src/lib/mindDb";

const Ai = () => {
  // const navigate = useNavigation();
  // const [text, setText] = React.useState("");
  // const [user, setUser] = React.useState("");
  // const [loading, setLoading] = React.useState(false);
  // const [response, setResponse] = React.useState("");

  // // useEffect(() => {
  // //   if (session) {
  // //     setUser(session?.user?.email);
  // //   }
  // // }, [session]);

  // // const queryAi = async () => {
  // //   try {
  // //     //   setLoading(true);
  // //     if (!session?.user) {
  // //       throw new Error("No user on the session!");
  // //     }

  // //     const response = await mindDb(user, text);
  // //     if (response) {
  // //       console.log(response);
  // //       setResponse(response);
  // //     }
  // //   } catch (error) {
  // //     if (error instanceof Error) {
  // //       Alert.alert(error.message);
  // //     }
  // //   }
  // // };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <ChevronLeftIcon
          onPress={() => navigate.goBack()}
          size={25}
          color="white"
        />
        <Text style={styles.headerText}>Learn with Ai</Text>
      </View>

      <View style={styles.chatContainer}>
        {/* Your chat messages can go here */}
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
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // style={styles.inputContainer}
        className="absolute bottom-0 left-0 right-0 p-[10px] mb-6 bg-[#000]"
      >
        <View className="flex-row items-center h-[48px] rounded-[8px] px-[25px] bg-white">
          <TextInput
            // style={styles.input}
            className="h-[40px] bg-transparent w-full border-none outline-none focus:outline-none"
            placeholder="Ask me anything..."
            // Add your text input handling here (e.g., onChangeText, onSubmitEditing, etc.)
          />
          <PaperAirplaneIcon size={26} color="gray" />
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
    // Adjust the position of the input container to be at the bottom
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default Ai;
