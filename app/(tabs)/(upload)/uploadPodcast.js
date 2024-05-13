import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeftIcon,
  ChevronUpDownIcon,
  PhotoIcon,
} from "react-native-heroicons/solid";
import { CheckBox } from "react-native-elements";
import { Link, router } from "expo-router";
import { pickImage, uploadJson } from "../../../lib/services/userService";
import { uploadAPodcast } from "../../../hooks/useContract";
import { SelectList } from "react-native-dropdown-select-list";
import * as DocumentPicker from "expo-document-picker";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { getAccount } from "@rly-network/mobile-sdk";
import * as WebBrowser from "expo-web-browser";
import { handleUpload } from "../../../lib/services/userService";

const uploadPodcast = () => {
  const [image, setImage] = useState(""); // State for the image
  const [podcastTitle, setPodcastTitle] = useState(""); // State for the Podcast Title
  const [podcastUrl, setPodcastUrl] = useState(""); // State for the Podcast URL
  const [price, setPrice] = useState(); // State for the Thumbnail
  const [podcast, setPodcast] = useState(""); // State for the Podcast
  const [category, setCategory] = useState(""); // State for the Category
  const [hashurl, setHashUrl] = useState("");
  const [wallet, setWallet] = useState("");
  const [audioFileUrl, setAudioFileUrl] = useState("");
  const [result, setResult] = useState(null);
  console.log(wallet);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(hashurl);
    setResult(result);
  };

  const accountType = [
    { key: "1", value: "Music" },
    { key: "2", value: "Podcast" },
    { key: "3", value: "Talkshow" },
    { key: "4", value: "Language Class" },
    // { key: "5", value: "Chinese" },
    // { key: "6", value: "Yoruba" },
    // { key: "6", value: "Englis" },
  ];

  const handleImageUpload = async () => {
    try {
      Alert.alert("Wait for success alert");
      const result = await pickImage();
      let url = `https://gateway.pinata.cloud/ipfs/${result}`;
      console.log(url);
      if (url) {
        Alert.alert("Image upload successful");
        setImage(url);
      }
    } catch (error) {
      // Handle any upload errors here
      console.error("Upload failed:", error);
    }
  };

  const handleAudioFileUpload = async () => {
    try {
      Alert.alert("Wait for success alert");
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*", // Specify the MIME type for audio files
      });
      let file = result.assets[0].uri;
      const ipfsHash = await handleUpload(file);
      if (result.canceled === false && ipfsHash) {
        let url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
        // console.log(url);
        setAudioFileUrl(url);
        // console.log(result.assets[0].uri);
        Alert.alert("Upload successful");
      } else if (result.canceled === true && !ipfsHash) {
        // The user canceled the document picker
        Alert.alert("Upload Cancelled");
      }
    } catch (error) {
      console.error("Error picking audio file:", error);
    }
  };

  useEffect(() => {
    const getWallet = async () => {
      const address = await getAccount();
      setWallet(address);
    };
    getWallet();
  }, []);

  const handleUploadPodcast = async () => {
    if (
      !image ||
      !image.includes("https://") ||
      !podcastTitle ||
      !audioFileUrl ||
      !price
    )
      return Alert.alert("Fill up required fields");
    const user = auth.currentUser;
    const object = {
      podcast_img: image,
      podcast_Title: podcastTitle,
      podcast_audio_url: audioFileUrl, // Include the audio file URL
      podcast_price: price,
      podcast_cate: category,
      created_at: serverTimestamp(),
      created_by: user.displayName,
    };

    try {
      const hash = await uploadJson(object);
      if (hash) {
        const result = await uploadAPodcast(hash, price);
        setHashUrl(result);
        if (result) {
          Alert.alert("Successful contract call");
          const docRef = await addDoc(collection(db, "podcast"), {
            podcast_img: image,
            podcast_Title: podcastTitle,
            podcast_audio_url: audioFileUrl, // Include the audio file URL
            podcast_price: price,
            podcast_cate: category,
            created_at: serverTimestamp(),
            created_by: user.displayName,
          });
          // Handle success
        } else {
          Alert.alert("Failed contract call");
          // Handle failure
        }
      }
    } catch (error) {
      console.error("Error uploading podcast:", error.message);
      getLocaleDirection.alert("error", error.message);
      // Handle error
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView className="mt-[6px] mx-[24px]">
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center space-x-4 "
        >
          <ChevronLeftIcon color="#fff" size={25} />
          <Text className="text-[20px] font-semibold text-[#fff] leading-normal">
            Upload Podcast
          </Text>
        </Pressable>
        <View className="space-y-[16px] mt-[58px]">
          <Pressable
            onPress={handleImageUpload}
            className="border border-[#ccca] w-full h-[20%] py-[16px] rounded-[8px] items-center justify-center"
          >
            <PhotoIcon size={25} color="#fff" />
            <Text className="text-[16px] text-start font-semibold text-[#fff]">
              Upload A Image
            </Text>
          </Pressable>
          <Pressable
            onPress={handleAudioFileUpload}
            className="border border-[#ccca] w-full h-[20%] py-[16px] rounded-[8px] items-center justify-center"
          >
            <Text className="text-[16px] text-start font-semibold text-[#fff]">
              Upload An Audio File
            </Text>
          </Pressable>

          <View className="space-y-[8px] items-start">
            <Text className="text-[16px] text-start font-semibold text-[#fff]">
              Podcast Title
            </Text>
            <TextInput
              value={podcastTitle}
              onChangeText={(text) => setPodcastTitle(text)}
              placeholder="Korean Alphabets(Hangul)"
              placeholderTextColor="#fff"
              className="bg-[#000] text-[#fff] px-4 border-2 border-[#ccca] w-[358px] h-[48px] rounded-[5px]"
            />
          </View>
          <View className="space-y-[8px] items-start">
            <Text className="text-[16px] text-start font-semibold text-[#fff]">
              Price
            </Text>
            <TextInput
              value={price}
              onChangeText={(text) => setPrice(text)}
              placeholder="Enter price in Ethers e.g 2.0"
              inputMode="decimal"
              placeholderTextColor="#fff"
              className="bg-[#000] text-[#fff] px-4 border-2 border-[#ccca] w-[358px] h-[48px] rounded-[5px]"
            />
          </View>
          <View className="space-y-[8px] items-start">
            <Text className="text-[16px] text-start font-semibold text-[#fff]">
              Category
            </Text>
            <SelectList
              setSelected={(val) => setCategory(val)}
              data={accountType}
              save="value"
              // boxStyles={{
              //   width: "66%",
              // }}
              dropdownItemStyles={{
                borderColor: "#AAAAAAAA",
                backgroundColor: "#000",
                marginTop: 8,
              }}
              search={false}
              arrowicon={<ChevronUpDownIcon size={25} color="#fff" />}
              dropdownTextStyles={{ color: "#fff" }}
              inputStyles={{ color: "#fff" }}
              placeholder="Select a Podcast Category"
            />
          </View>
        </View>
        <Pressable
          onPress={handleUploadPodcast}
          className="bg-[#F70] w-full py-[16px] mt-[15px] rounded-[8px] items-center justify-center"
        >
          <Text className="text-[16px] text-white font-bold leading-normal">
            Get Started
          </Text>
        </Pressable>
        {hashurl && (
          <>
            <Pressable
              onPress={_handlePressButtonAsync}
              className="bg-[#fff] w-full py-[16px] mt-[15px] rounded-[8px] items-center justify-center"
            >
              <Text className="text-[10px] font-normal text-[#0000ff]">
                {hashurl}
              </Text>
            </Pressable>
          </>
        )}

        <View className="flex-row space-X-[8px] justify-center items-center">
          <CheckBox
            checkedColor="#fff"
            className="border-[#fff] border-5 w-[28px] h-[28px] rounded-[5px]"
          />
          <Text className="text-[12px] w-[254px] h-[44px] leading-[22px] tracking-[-0.408px] text-start font-semibold text-[#AAAAAAAA]">
            This Podcast does not contain Explicit contents. You agree to our
            <Text className="text-[#fff]"> Terms</Text> and
            <Text className="text-[#fff]">Conditions</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default uploadPodcast;
