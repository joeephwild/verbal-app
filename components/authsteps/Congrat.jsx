import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router, useNavigation } from "expo-router";

const Congrat = () => {
  const navigate = useNavigation();
  return (
    <SafeAreaView>
      <View>
        <Image
          source={require("../../assets/images/icon2.png")}
          className="w-[320px] animate-bounce delay-500 transition-all h-[320px] object-cover"
        />
        <View className="space-y-[8px]">
          <Text className="text-[34px] font-bold leading-normal text-[#fff]">
            Congratulation
          </Text>
          <Text className="text-[16px] text-[#CCCCCCAA] font-semibold w-[342px] h-[114px]">
            Congratulations! Your profile setup is complete, and your wallet is
            securely connected. Get ready to embark on an exciting language
            learning journey enriched with Web 3 benefits and rewarding
            achievements. Let the learning adventure begin!
          </Text>
        </View>
      </View>
      <View
        onPress={() => navigate.navigate("(home)")}
        asChild
        className="items-center my-5 justify-center"
      >
        <Pressable className="bg-[#F70] w-[342px] py-[16px] rounded-[8px]">
          <Text className="text-[16px] text-center text-white  font-bold leading-normal">
            Continue
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Congrat;
