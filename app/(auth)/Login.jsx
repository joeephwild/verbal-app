import { View, Text, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, router, useNavigation } from "expo-router";
import { useAuth } from "../../context/auth";
import { supabase } from "../../lib/supabase";

const Login = () => {
  const { signin, session } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigation();

  const signInWithEmail = async () => {
    if (!email || !password) return Alert.alert("Fill up required input");
    const user = signin(email, password);
    if (user) {
      navigate.navigate("(tabs)");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 36 }}>
      <View className="mt-[77px] mx-[24px] space-y-[8px]">
        <View className="space-y-[9px] items-start">
          <Text className="text-[34px] text-center font-bold text-[#fff] leading-normal">
            Welcome back
          </Text>
        </View>
        <Text className="text-[16px] w-[342px] h-[69px] font-normal text-[#AAAAAAAA]">
          To tailor your experience and help you connect with fellow learners,
          set up your profile today. Let's get started on your learning journey!
        </Text>
      </View>
      <View className="mx-[24px]">
        <View className="space-y-[24px] mt-[40px]">
          <View className="space-y-[8px] text-white">
            <Input
              label="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={"none"}
              placeholderTextColor={"#fff"}
              labelStyle={{
                color: "#fff",
                paddingBottom: 8,
              }}
              className="w-full border text-[12px] text-[#fff] h-[56px] px-[24px] py-[16px] items-center justify-center rounded-[8px]  border-[#aaa]"
            />
          </View>
          <View className="space-y-[8px] text-white">
            <Input
              label="Password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholder="**********"
              placeholderTextColor={"#fff"}
              autoCapitalize={"none"}
              labelStyle={{
                color: "#fff",
                paddingBottom: 8,
              }}
              className="w-full border  text-[12px] text-[#fff] h-[56px] px-[24px] py-[16px] items-center justify-center rounded-[8px]  border-[#aaa]"
            />
          </View>
        </View>
      </View>
      <View className="items-center mt-[174px] justify-center">
        <Pressable
          // disabled={!email && !password}
          onPress={signInWithEmail}
          className="bg-[#F70] w-[342px] py-[16px] rounded-[8px]"
        >
          <Text className="text-[16px] text-center text-white  font-bold leading-normal">
            Continue
          </Text>
        </Pressable>
        <Text className="text-[16px] mt-[16px] font-normal leading-normal text-[#aaa]">
          Don’t have an account?
          <Text
            onPress={() => router.push("/CreateAccount")}
            className="text-[#f70]"
          >
            Create one
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
