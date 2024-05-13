import { View, Text, Pressable, TextInput, Alert, Modal } from "react-native";
import { ens_normalize } from "@adraffy/ens-normalize";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getAccount } from "@rly-network/mobile-sdk";
import { connectWithEnsContract } from "../hooks/useContract";
import { ethers } from "ethers";
import * as Crypto from "expo-crypto";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEnsName } from "wagmi";

const mintProfile = () => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [account, setAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Step 2
  const [statusMessage, setStatusMessage] = useState(
    "Waiting for Ens mint......"
  ); // Step 2
  const [modalVisible, setModalVisible] = useState(false); // Step 3

  const resolver = "0xd7a4F6473f32aC2Af804B3686AE8F1932bC35750";
  const ABI = [
    "function rentPrice(string memory name, uint duration) view public returns(uint)",
    "function available(string memory name) public view returns(bool)",
    "function makeCommitmentWithConfig(string memory name, address owner, bytes32 secret, address resolver, address addr) pure public returns(bytes32)",
    "function commit(bytes32 commitment) public",
    "function registerWithConfig(string memory name, address owner, uint duration, bytes32 secret, address resolver, address addr) public payable",
    "function minCommitmentAge() public view returns(uint)",
  ];
  // const durationToRegister = 31556952;

  function yearsToSeconds(years) {
    const secondsInAYear = 31556952; // Number of seconds in a year
    return years * secondsInAYear;
  }

  useEffect(() => {
    const getWallet = async () => {
      const address = await getAccount();
      setAccount(address);
    };
    getWallet();
  });

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    } else {
      // Truncate the text and add "..." to indicate truncation
      return text.substring(0, maxLength - 3) + "...";
    }
  }

  const [accountDetails, setAccountDetails] = useState("");
  const [wallet, setWallet] = useState("");
  // console.log("user profile", accountDetails);

  useEffect(() => {
    const filterForTutor = async () => {
      try {
        const address = await getAccount();
        setWallet(address);
        const q = query(collection(db, "users"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let profiles = [];
          querySnapshot.forEach((doc) => {
            profiles.push({ ...doc.data(), id: doc.id });
          });
          const tutorAccount = profiles?.filter(
            (item) => item.address === wallet
          );
          // Extract the usernames from the filtered profiles
          const usernames = tutorAccount.map((item) => item.id);
          console.log("Usernames:", usernames);
          setAccountDetails(usernames);
        });
        return () => unsubscribe();
      } catch (error) {
        console.log(error);
      }
    };

    filterForTutor();
  }, [wallet]);

  const { data: username } = useEnsName({
    address: wallet,
    chainId: 5,
  });

  const handUpdate = async () => {
    try {
      const data = await accountDetails[0];
      const washingtonRef = doc(db, "users", data);
      await updateDoc(washingtonRef, {
        userName: username,
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const register = async (name, owner, durationToRegister) => {
    try {
      setIsLoading(true); // Start loading
      setModalVisible(true);
      const contract = await connectWithEnsContract(
        "0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5",
        ABI
      );
      const isNameAvailable = await contract?.available(ens_normalize(name));
      if (!isNameAvailable) {
        return Alert.alert(`${name}.eth is not available`);
      }

      const randomBytes = Crypto.getRandomBytes(32);
      const secretHex =
        "0x" +
        randomBytes.reduce(
          (acc, byte) => acc + byte.toString(16).padStart(2, "0"),
          ""
        );
      console.log(`your secret is: ${secretHex}`);

      // Make a commitment
      const commitment = await contract?.makeCommitmentWithConfig(
        name,
        owner,
        randomBytes,
        resolver,
        owner
      );
      const commit = await contract?.commit(commitment);
      setStatusMessage(
        `Commitment pending: https://goerli.etherscan.io/tx/${commit.hash}`
      );
      console.log(
        `Commitment pending: https://goerli.etherscan.io/tx/${commit.hash}`
      );
      await commit.wait();

      // Wait for commitment to be confirmed
      const minCommitmentAge = Number(await contract?.minCommitmentAge());
      setStatusMessage(
        `Commitment successful, waiting ${minCommitmentAge} seconds....`
      );
      console.log(
        `Commitment successful, waiting ${minCommitmentAge} seconds....`
      );

      // Get the price per name

      const priceWei = Number(
        await contract?.rentPrice(name, durationToRegister)
      );

      // Add 10% to the priceWei
      const priceWeiWithBuffer = Math.ceil(priceWei * 1.1);

      const priceInEth =
        priceWeiWithBuffer / Number(ethers.constants.WeiPerEther);

      // ...
      const gasLimit = 1000000;

      // Register a name with a specified gas limit
      const register = await contract?.registerWithConfig(
        name,
        owner,
        durationToRegister,
        randomBytes,
        resolver,
        owner,
        {
          value: priceWeiWithBuffer, // Use the adjusted priceWei
          gasLimit: gasLimit, // Set the gas limit here
        }
      );
      setStatusMessage(
        `submitting transaction - https://goerli.etherscan.io/tx/${register.hash}`
      );
      console.log(
        `submitting transaction - https://goerli.etherscan.io/tx/${register.hash}`
      );
      await register.wait();
      setStatusMessage(
        `${name}.eth registered successfully for ${priceInEth.toFixed(
          4
        )} Eth (not including gas)`
      );
      console.log(`
        ${name}.eth registered successfully for ${priceInEth.toFixed(
        4
      )} Eth (not including gas)`);
    } catch (error) {
      setStatusMessage(error.message);
      console.log(error.message);
    } finally {
      setIsLoading(false); // Stop loading, whether success or failure
      setModalVisible(true); // Show modal
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View className="mx-[24px] pt-[26px]">
        <Pressable className="flex-row items-center space-x-9">
          <ChevronLeftIcon size={25} color="#fff" />
          <Text className="text-[#fff] font-bold text-[20px]">
            Mint UserName
          </Text>
        </Pressable>
        <View className="space-y-[9px] mt-[60px] items-start">
          <Text className="text-[34px] pb-4 font-bold text-[#fff] leading-normal">
            Mint An Ens Name
          </Text>
          <Text className="text-[16px] w-[342px] h-[69px] font-normal text-[#AAAAAAAA]">
            To tailor your experience and help you connect with fellow learners,
            set up your profile today. Let's get started on your learning
            journey!
          </Text>
        </View>
        <View className="mt-[30px] space-y-[24px]">
          <View>
            <Text className="text-[16px] font-bold text-[#ffff] leading-normal">
              Username
            </Text>
            <TextInput
              value={name}
              placeholder="Enter a unique name"
              onChangeText={(text) => setName(text)}
              placeholderTextColor="#fff"
              className="w-full border h-[56px] placeholder:text-[#ccccccaa] px-[24px] py-[16px] items-center justify-center rounded-[8px]  border-[#aaa]"
            />
          </View>
          <View>
            <Text className="text-[16px] font-bold text-[#ffff] leading-normal">
              Duration
            </Text>
            <TextInput
              value={duration}
              onChangeText={(text) => setDuration(text)}
              placeholderTextColor="#fff"
              placeholder="Enter a duration E.G 1, 2"
              className="w-full border h-[56px] placeholder:text-[#ccccccaa] px-[24px] py-[16px] items-center justify-center rounded-[8px]  border-[#aaa]"
            />
          </View>
        </View>
        <Pressable
          style={{
            width: wp(90),
          }}
          onPress={() => {
            register(name, account, yearsToSeconds(duration));
          }}
          className="bg-[#F70] mt-[90px] mb-[24px] w-full py-[16px] rounded-[8px] items-center justify-center"
        >
          <Text className="text-[16px] text-white  font-bold leading-normal">
            Mint Name
          </Text>
        </Pressable>
        <Pressable
          style={{
            width: wp(90),
          }}
          onPress={handUpdate}
          className="bg-[#F70] mb-[24px] w-full py-[16px] rounded-[8px] items-center justify-center"
        >
          <Text className="text-[16px] text-white  font-bold leading-normal">
            Set As Username
          </Text>
        </Pressable>
      </View>
      {/* Loading Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: wp(80),
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Status</Text>
              <Text
                style={{ marginVertical: 10 }}
                className="truncate text-red-600"
              >
                {truncateText(statusMessage, 150)}
              </Text>
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                style={{
                  marginTop: 10,
                  backgroundColor: "#F70",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: "white" }}>Close</Text>
              </Pressable>
            </>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default mintProfile;
