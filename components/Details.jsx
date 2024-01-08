import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RlyMumbaiNetwork, getAccount } from "@rly-network/mobile-sdk";
import { DocumentDuplicateIcon } from "react-native-heroicons/solid";
import { router } from "expo-router";
import { connectWithContract } from "../hooks/useContract";
import { VerbalAddress, VerbalABI } from "../constants/contract";

const Details = ({ isNotProfile }) => {
  const [wallet, setWallet] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const fetchWallet = async () => {
      const address = await getAccount();
      setWallet(address);
      //get balance
    };
    // const fetchUserVerbalTokenBalance = async () => {
    //   try {
    //     const contract = await connectWithContract(VerbalAddress, VerbalABI);
    //     const userTokenBalance = await contract?.balanceOf(wallet);
    //     console.log("USER BALANCE IS ___", Number(userTokenBalance));
    //     setBalance(Number(userTokenBalance).toString())
    //     return userTokenBalance;
    //   } catch (error) {
    //     console.log(error.message);
    //     console.error("Error fetching user balance:", error.message);
    //     throw error; // Rethrow the error to handle it higher up in your application
    //   }
    // };
    // fetchUserVerbalTokenBalance();
    fetchWallet();
  }, [wallet]);

  const mint = async () => {
    const result = await RlyMumbaiNetwork.claimRly();
    console.log(result);
    alert("Done");
  };
  return (
    <>
      <View className="bg-[#fff flex-1 items-center justify-center">
        <View
          style={{
            width: wp(80),
          }}
          className="bg-white/90 items-center h-[150px] mt-4 p-[16px] rounded-[8px] text-[20px]"
        >
          <View className="flex-row space-x-9 bg-gray-500/40 p-2 rounded-full items-center">
            <Text className="text-[14px] font-semibold leading-normal">
              {wallet.slice(0, 10)}...{wallet.slice(30, 40)}
            </Text>
            <DocumentDuplicateIcon size={14} color="#000" />
          </View>
          <Text className="text-[34px]">0 VT</Text>
          <View className="flex-row space-x-6 items-center">
            <TouchableOpacity
              onPress={mint}
              className="bg-[#f70] p-4 rounded-[8px]"
            >
              <Text>Mint Token</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("mintProfile")}
              className="border border-[#f70] p-4 rounded-[8px]"
            >
              <Text>Mint Ens</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default Details;
