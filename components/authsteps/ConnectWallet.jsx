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
  const { open, isConnected, address } = useWalletConnectModal();
  const { createCryptoAccount } = useRally();
  const [accounts, setAccount] = useState("");
  // console.log(accounts);

  useEffect(() => {
    const handleWalletConnect = async () => {
      const account = await getAccount();
      setAccount(account);
    };
    handleWalletConnect();
  }, [accounts]);

  const handleWalletConnect = async () => {
    try {
      await open();
      alert(isConnected);
      if (isConnected) {
        nextStep();
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleRally = async () => {
    try {
      const newAccount = await createAccount();
      const account = await getAccount();
      await RlyMumbaiNetwork.claimRly();
      // console.log(account);
      nextStep();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <SafeAreaView>
      <View>
        <Image
          source={require("../../assets/images/walllet.png")}
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
      {address && (
        <Link
          href="/(tabs)/(home)"
          className="items-center my-5 justify-center"
          asChild
        >
          <Pressable
            // onPress={() => router.push("/(tabs)/(home)")}
            className="bg-[#F70] w-[342px] py-[16px] rounded-[8px]"
          >
            <Text className="text-[16px] text-center text-white  font-bold leading-normal">
              GO HOME
            </Text>
          </Pressable>
        </Link>
      )}
      {!address && (
        <View className="items-center my-5 justify-center">
          <Pressable
            onPress={handleWalletConnect}
            className="bg-[#F70] w-[342px] py-[16px] rounded-[8px]"
          >
            <Text className="text-[16px] text-center text-white  font-bold leading-normal">
              {address.slice(0, 9)}...{address.slice(30, 40)}
            </Text>
          </Pressable>
        </View>
      )}

      {/** create a wallet */}
      {accounts && (
        <View className="items-center my-5 justify-center">
          <Pressable
            onPress={() => router.push("/(tabs)/(home)")}
            className="bg-[#F70] w-[342px] py-[16px] rounded-[8px]"
          >
            <Text className="text-[16px] text-center text-white  font-bold leading-normal">
              GO HOME
            </Text>
          </Pressable>
        </View>
      )}
      {!accounts && (
        <View className="items-center my-5 justify-center">
          <Pressable
            onPress={handleRally}
            className="bg-[#F70] w-[342px] py-[16px] rounded-[8px]"
          >
            <Text className="text-[16px] text-center text-white  font-bold leading-normal">
              {accounts.slice(0, 9)}...{accounts.slice(30, 40)}
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ConnectWallet;
