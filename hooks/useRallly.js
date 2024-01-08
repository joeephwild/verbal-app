import {
  RlyMumbaiNetwork,
  Network,
  getAccount,
  getAccountPhrase,
} from "@rly-network/mobile-sdk";
import { createAccount } from "@rly-network/mobile-sdk";
import { useState } from "react";
import { Alert } from "react-native";

export const useRally = () => {
  const [account, setAccount] = useState([]);
  const [userAccount, setUserAccount] = useState("");
  const [userBalance, setUserBalalce] = useState();
  const [mnemonic, setMnemonic] = useState("");
  const rlyNetwork = RlyMumbaiNetwork;

  rlyNetwork.setApiKey(process.env.EXPO_PUBLIC_RALLY_APITOKEN);

  const createCryptoAccount = async () => {
    try {
      const newAccount = await createAccount();
      console.log(newAccount);
      setAccount(newAccount);
      Alert.alert("Wallet Created Succesfully");
      return newAccount;
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const getUserAccount = async () => {
    const account = await getAccount();
    setUserAccount(account);
  };

  const getUserBalance = async () => {
    // token contract address
    const erc20TokenAddress = "0x...";

    //get balance
    const balance = await RlyMumbaiNetwork.getBalance(erc20TokenAddress);
    setUserBalalce(balance);
  };

  const getUserAccountPhrase = async () => {
    const mnemonic = await getAccountPhrase();
    setMnemonic(mnemonic);
  };

  return (
    createCryptoAccount,
    getUserAccount,
    getUserBalance,
    getUserAccountPhrase,
    account,
    userAccount,
    userBalance,
    mnemonic
  );
};
