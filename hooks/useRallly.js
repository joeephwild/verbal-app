import {
  RlyMumbaiNetwork,
  Network,
  getAccount,
  getAccountPhrase,
} from "@rly-network/mobile-sdk";
import { createAccount } from "@rly-network/mobile-sdk";
import { useState } from "react";

export const useRally = () => {
  const [account, setAccount] = useState([]);
  const [userAccount, setUserAccount] = useState("");
  const [userBalance, setUserBalalce] = useState();
  const [mnemonic, setMnemonic] = useState("");
  const rlyNetwork = RlyMumbaiNetwork;

  rlyNetwork.setApiKey(process.env.EXPO_PUBLIC_RALLY_APITOKEN);

  const createCryptoAccount = async () => {
    const newAccount = await createAccount();
    setAccount(newAccount);
    console.log(newAccount);
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
