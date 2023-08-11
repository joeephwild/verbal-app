import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const Congrat = () => {
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
          <View className="items-center my-5 justify-center">
            <Link href={"/home"} asChild>
              <Pressable className="bg-[#F70] w-full py-[16px] rounded-[8px] items-center justify-center">
                <Text className="text-[16px] text-white  font-bold leading-normal">
                  Lets Begin
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Congrat;
