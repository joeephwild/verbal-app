import { Link, router, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable } from "react-native";
import { Text, View, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../src/lib/supabase";

export default function Page() {
  const navigate = useNavigation();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const checkUserSession = async () => {
      const session = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUserSession();

    if (user) {
      navigate.navigate("(tabs)");
    }
  }, []);
  return (
    <View className="flex-1  items-center bg-[#121214">
      <SafeAreaView className="mt-[90px] mx-[15px]">
        <StatusBar style="light" />
        <Image
          source={require("../src/assets/Map.png")}
          className="w-[360px] h-[460px] object-cover"
        />

        <View className="items-start">
          <Text className="text-[34px] mt-3 text-[#ffffff] font-bold leading-normal">
            Welcome to Verbal
          </Text>
          <Text className="text-[16px] mt-3 text-[#CCCCCC] font-semibold leading-normal">
            Experience revolutionary learning with blockchain technology and
            AI-tailored lessons, connecting with a vibrant community.
          </Text>
          <View className="flex-1 mt-[40px] w-full space-y-[24px]">
            <Pressable
              onPress={() => router.push("/CreateAccount")}
              className="bg-[#F70] w-full py-[16px] rounded-[8px] items-center justify-center"
            >
              <Text className="text-[16px] text-white font-bold leading-normal">
                Get Started
              </Text>
            </Pressable>
            <Link href={"home"} asChild>
              <Pressable className="border-2 border-[#F70] w-full py-[16px] rounded-[8px] items-center justify-center">
                <Text className="text-[16px] text-white  font-bold leading-normal">
                  Login
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
