import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  BackHandler,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  getAccountPhrase,
  RlyMumbaiNetwork,
  getAccount,
  permanentlyDeleteAccount,
} from "@rly-network/mobile-sdk";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import * as LocalAuthentication from "expo-local-authentication";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import { useAuth } from "../context/auth";
import SeedPhraseModal from "./SeedPhraseModal";

const Post = () => {
  const [seedPhrase, setSeedPhrase] = useState([]);
  const [isBiometric, setIsBiometric] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { provider } = useWalletConnectModal();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { signout, deleteAccount } = useAuth();
  console.log(isBiometric);

  useEffect(() => {
    const getRallyDetails = async () => {
      const mnemonic = await getAccountPhrase();
      console.log(mnemonic)
      const wordArray = mnemonic.split(" "); // Provide a space as the delimiter
      setSeedPhrase(wordArray);
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometric(compatible);
    };
    getRallyDetails();
  }, []);

  const handleAuth = () => {
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage:
        "Verbal Needs your Facial recognition to access your seed phrase",
      fallbackLabel: "Enter Password",
    });
    auth.then((result) => {
      setIsAuthenticated(result.success);
    });
    auth.catch((result) => {
      alert(result.error);
    });
  };

  const handleBackButton = () => {
    // Prevent the user from going back when the modal is open
    return true;
  };

  const closeModal = () => {
    setIsAuthenticated(false);
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
  };
  return (
    <View className="bg-[#000] flex-1">
      <View>
        <View className="mt-9">
          <View className="flex-row items-center border-[#ccca] border-2 w-full mt-5 py-[16px] rounded-[8px] justify-between px-8">
            <Text className="text-[#fff] text-[16px] font-semibold font-[SpaceMono]">
              Seed phrase
            </Text>
            <Pressable>
              {isAuthenticated ? (
                <EyeIcon color="#fff" />
              ) : (
                <EyeSlashIcon onPress={handleAuth} color="#fff" />
              )}
            </Pressable>
          </View>
          <Pressable
            style={{
              width: wp(86),
            }}
            className="border-[#ccca] flex-row border-2 w-full mt-5 py-[16px] rounded-[8px] items-center justify-between px-4 "
          >
            <Text className="text-[16px] font-[SpaceMono] text-[#fff]  font-bold leading-normal">
              Switch Network
            </Text>
            <Image
              source={require("../assets/images/eth.png")}
              className="w-6 h-8"
            />
          </Pressable>
        </View>
        <Pressable
          style={{
            width: wp(86),
          }}
          onPress={signout}
          className="border-[#ccca] border-2 w-full mt-5 py-[16px] rounded-[8px] items-center justify-center"
        >
          <Text className="text-[16px] text-red-700  font-bold leading-normal">
            Logout
          </Text>
        </Pressable>
        <Pressable
          style={{
            width: wp(86),
          }}
          onPress={deleteAccount}
          className="border-[#ccca] border-2 w-full mt-5 py-[16px] rounded-[8px] items-center justify-center"
        >
          <Text className="text-[16px] text-red-700  font-bold leading-normal">
            Delete Account
          </Text>
        </Pressable>
        <Pressable
          style={{
            width: wp(86),
          }}
          onPress={() => permanentlyDeleteAccount()}
          className="border-[#ccca] border-2 w-full mt-5 py-[16px] rounded-[8px] items-center justify-center"
        >
          <Text className="text-[16px] text-red-700  font-bold leading-normal">
            Delete Wallet
          </Text>
        </Pressable>
      </View>
      {/* Seed Phrase Modal */}
      <SeedPhraseModal
        closeModal={closeModal}
        isAuthenticated={isAuthenticated}
        seedPhrase={seedPhrase}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (your existing styles)
  closeButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  blurBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
  },
  modalContent: {
    width: 342,
    padding: 24,
    backgroundColor: "#13161B",
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  seedPhraseContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  seedPhraseItem: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  currentTime: {
    marginTop: 16,
    color: "#fff",
    fontSize: 16,
  },
});

export default Post;
