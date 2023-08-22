import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  BackHandler,
} from "react-native";
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
import { Provider, useAuth } from "../context/auth";
import { SafeAreaView } from "react-native-safe-area-context";

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
      </View>
      {/* Seed Phrase Modal */}
      <Modal
        visible={isAuthenticated}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal} // This allows the user to close the modal by pressing the back button
      >
        <View style={styles.modalContainer}>
          {/* Blur Background */}
          <View style={styles.blurBackground}>
            {/* Your modal content */}
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Seed Phrase</Text>
              <View style={styles.seedPhraseContainer}>
                {seedPhrase.map((item, index) => (
                  <Text key={index} style={styles.seedPhraseItem}>
                    {item}
                  </Text>
                ))}
              </View>
              {/* Close button */}
              <Pressable onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
