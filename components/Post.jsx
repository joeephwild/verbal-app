import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  getAccountPhrase,
  RlyMumbaiNetwork,
  getAccount,
} from "@rly-network/mobile-sdk";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import * as LocalAuthentication from "expo-local-authentication";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import { Provider } from "../context/auth";

const Post = () => {
  const [seedPhrase, setSeedPhrase] = useState([]);
  const [isBiometric, setIsBiometric] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { provider } = useWalletConnectModal()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(isBiometric);

  useEffect(() => {
    const getRallyDetails = async () => {
      const mnemonic = await getAccountPhrase();
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
  return (
    <View className="bg-[#000] flex-1">
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
      </View>
      <Pressable
        style={{
          width: wp(86),
        }}
        className="border-[#ccca] border-2 w-full mt-5 py-[16px] rounded-[8px] items-center justify-center"
      >
        <Text className="text-[16px] text-white  font-bold leading-normal">
          Logout
        </Text>
      </Pressable>
      <Modal visible={isAuthenticated} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seed Phrase</Text>
            <View style={styles.seedPhraseContainer}>
              {seedPhrase.map((item, index) => (
                <Text key={index} style={styles.seedPhraseItem}>
                  {item}
                </Text>
              ))}
            </View>
            {/* <Text style={styles.currentTime}>
              Current Time: {currentTime.toLocaleTimeString()}
            </Text> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (your existing styles)

  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
