import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ConnectWallet = () => {
  return (
    <SafeAreaView>
      <View>
        <Image
          source={require("../../assets/images/icon2.png")}
          className="w-[320px] animate-bounce delay-500 transition-all h-[320px] object-cover"
        />
        <View className="space-y-[8px]">
          <Text className="text-[34px] font-bold leading-normal text-[#fff]">
            Connect Your Wallet
          </Text>
          <Text className="text-[16px] text-[#CCCCCCAA] font-semibold w-[342px] h-[114px]">
            Connect your preferred Web 3 wallet with just one click, earn
            tokens, NFT badges and unlock exclusive rewards as you progress in
            your language learning journey in our decentralized and secure
            ecosystem
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConnectWallet;
