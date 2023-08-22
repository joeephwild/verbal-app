import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useWalletConnectModal,
  WalletConnectModal,
} from "@walletconnect/modal-react-native";
import { Link, router } from "expo-router";
import { useRally } from "../../hooks/useRallly";
import {
  createAccount,
  getAccountPhrase,
  getAccount,
  RlyMumbaiNetwork,
} from "@rly-network/mobile-sdk";
import { useAuth } from "../../context/auth";

const ConnectWallet = ({ nextStep }) => {
  const [walletAccount, setWalletAccount] = useState("");
  useEffect(() => {
    const getAccount = async () => {
      const account = await getAccount();
      setWalletAccount(account);
    };
  });
  return (
    <SafeAreaView>
      <View>
        <Image
          source={require("../../assets/images/walllet.png")}
          className="w-[320px] animate-bounce delay-500 transition-all h-[320px] object-cover"
        />
        <View className="space-y-[8px]">
          <Text className="text-[34px] font-bold leading-normal text-[#fff]">
            Wallet Created SucessFully
          </Text>
          <Text className="text-[16px] text-[#CCCCCCAA] font-semibold w-[342px] h-[114px]">
            An in app wallet has been minted and configured for you, towards
            better and secure decentralized journey in the web3 space here is
            your wallet address: {walletAccount}, learn more at 
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConnectWallet;
