import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChatBubbleBottomCenterTextIcon,
  HeartIcon,
  EllipsisHorizontalIcon,
} from "react-native-heroicons/outline";
import Overview from "../../../components/Overview";
import { ScrollView } from "react-native-gesture-handler";
import { Portal } from "@gorhom/portal";
import { Modalize } from "react-native-modalize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  FaceSmileIcon,
  PhotoIcon,
  Square2StackIcon,
  UserCircleIcon,
} from "react-native-heroicons/solid";
import {
  getUserDetails,
  pickImage,
  updateUserProfile,
} from "../../../lib/services/userService";
import { useAuth } from "../../../context/auth";
import { db } from "../../../firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { getAccount } from "@rly-network/mobile-sdk";

const Profile = () => {
  const [isSwitched, setIsSwitched] = useState("overview");
  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const modalizeRef = useRef(null);
  const ProfileRef = useRef(null);
  const [wallet, setWallet] = useState("");

  const [accountDetails, setAccountDetails] = useState([]); // State to store the account details

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
            (item) => item.address === address
          );
          setAccountDetails(tutorAccount);
          console.log("tutor", tutorAccount);
        });
        return () => unsubscribe();
      } catch (error) {
        console.log(error);
      }
    };

    filterForTutor();
  }, [wallet]);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const open = () => {
    ProfileRef.current?.open();
  };
  const handleProfileImage = async () => {
    try {
      const result = await pickImage();
      let url = `https://gateway.pinata.cloud/ipfs/${result}`;
      setImage(url); // Assuming you have a state variable called 'setImage' to store the image URL.

      if (image) {
        // Assuming you have 'id' available from somewhere.
        const userObj = {
          avatar_url: image, // Use the IPFS URL here.
        };

        // Assuming you have a function 'updateUserProfile' to update the user's profile.
        await updateUserProfile(id, userObj);

        alert("Image upload and profile update successful");
      }

      alert("Image upload successful");
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle the error, e.g., show an error message to the user.
    }
  };

  const handleCoverImage = async () => {
    const result = await pickImage();
    let url = `https://gateway.pinata.cloud/ipfs/${result}`;
    setCoverImage(url);
    alert("image upload sucessful");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {accountDetails.map((item, index) => (
          <View key={index}>
            <View className="">
              <TouchableWithoutFeedback onPress={onOpen}>
                <Image
                  source={{
                    uri: item.cover_image,
                  }}
                  className="bg-[#D9D9D9] h-[160px] object-cover relative"
                />
              </TouchableWithoutFeedback>
              <Pressable
                onPress={open}
                className="bg-[#D9D9D9] absolute top-[50%] rounded-full left-[24px] border-4  ring-[#010F15]  "
              >
                <Image
                  source={{
                    uri: item.profile_img,
                  }}
                  className="w-[120px] h-[120px] rounded-full "
                />
              </Pressable>

              <View className="flex-row justify-end space-x-[16px] py-5 items-end">
                <TouchableOpacity className="border-[#2D3440] border p-[8px] rounded-[12px] gap-[4px]">
                  <ChatBubbleBottomCenterTextIcon size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity className="border-[#2D3440] border p-[8px] rounded-[12px] gap-[4px]">
                  <HeartIcon size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity className="border-[#2D3440] border p-[8px] rounded-[12px] gap-[4px]">
                  <EllipsisHorizontalIcon size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="mx-[24px] mt-[16px]">
              <View>
                <Text className="text-[#fff] text-[28px] font-bold leading-normal tracking-normal">
                  {item.full_name}
                </Text>
                <Text className="text-[#AAAAAAAA] text-[16px] font-semibold">
                  Pro {item.tutor_lang}
                </Text>
              </View>
              <View className="flex-row space-x-[16px] items-center justify-around mt-[20px] ">
                <Pressable
                  onPress={() => setIsSwitched("overview")}
                  className={`${
                    isSwitched === "overview"
                      ? "border-b-[5px] w-[180px] py-4 border-[#f70]"
                      : "border-b-[5px] border-gray-500 w-[170px] py-4 text-center"
                  } `}
                >
                  <Text className="text-[#fff] text-center text-[16px] leading-normal font-semibold">
                    Overview
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setIsSwitched("session")}
                  className={`${
                    isSwitched === "session"
                      ? "border-b-[5px] w-[180px] py-4 border-[#f70]"
                      : "border-b-[5px] border-gray-500 w-[170px] py-4 text-center"
                  } `}
                >
                  <Text className="text-[#fff] text-center text-[16px] leading-normal font-semibold">
                    Session
                  </Text>
                </Pressable>
              </View>
              {isSwitched === "session" && (
                <View className="items-center mt-[30px] justify-center">
                  <Image
                    source={require("../../../assets/images/nosession.png")}
                    className="w-[160px] h-[160px] object-cover"
                  />
                  <Text className="text-[#AAAAAAAA] text-[16px] font-semibold">
                    No upcoming session
                  </Text>
                  <View className="items-start mt-[60px] ">
                    <Text
                      className={`text-[#fff] text-[16px] leading-normal font-semibold`}
                    >
                      Next Available
                    </Text>
                    <Text
                      className={`text-[#676767] text-[12px] leading-normal font-semibold`}
                    >
                      11 Aug 2023, 3:00pm
                    </Text>
                  </View>
                </View>
              )}

              {isSwitched === "overview" && <Overview />}
            </View>

            <Portal>
              {/** cover image modal */}
              <Modalize
                modalStyle={{
                  width: wp(100),
                  height: hp(50),
                }}
                modalHeight={200}
                // adjustToContentHeight={true}
                ref={modalizeRef}
              >
                <View className="px-[24px] space-y-9 py-4">
                  <Pressable className="flex-row space-x-8 items-center">
                    <UserCircleIcon size={30} color="#000" />
                    <Text className="text-[15px] font-bold leading-normal">
                      See Cover Image
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={handleCoverImage}
                    className="flex-row space-x-8 items-center"
                  >
                    <PhotoIcon size={30} color="#000" />
                    <Text className="text-[15px] font-bold leading-normal">
                      Select Cover Image
                    </Text>
                  </Pressable>
                  <Pressable className="flex-row space-x-8 items-center">
                    <Square2StackIcon size={30} color="#000" />
                    <Text className="text-[15px] font-bold leading-normal">
                      Create Nft Collage
                    </Text>
                  </Pressable>
                </View>
              </Modalize>
              {/** Profile image modal */}
              <Modalize
                modalStyle={{
                  width: wp(100),
                  height: hp(50),
                }}
                modalHeight={200}
                // adjustToContentHeight={true}
                ref={ProfileRef}
              >
                <View className="px-[24px] space-y-9 py-4">
                  <Pressable className="flex-row space-x-8 items-center">
                    <UserCircleIcon size={30} color="#000" />
                    <Text className="text-[15px] font-bold leading-normal">
                      See Profile Image
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={handleProfileImage}
                    className="flex-row space-x-8 items-center"
                  >
                    <PhotoIcon size={30} color="#000" />
                    <Text className="text-[15px] font-bold leading-normal">
                      Select Profile Image
                    </Text>
                  </Pressable>
                  <Pressable className="flex-row space-x-8 items-center">
                    <FaceSmileIcon size={30} color="#000" />
                    <Text className="text-[15px] font-bold leading-normal">
                      Create Ens Avatar
                    </Text>
                  </Pressable>
                </View>
              </Modalize>
            </Portal>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
