import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  TouchableNativeFeedback,
  ActivityIndicator,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { Community, MyLessons, Speakers } from "../../../components";
import { Link, router } from "expo-router";
import { useEnsName, useEnsAvatar } from "wagmi";
import { useAuth } from "../../../context/auth";
import { useAccount } from "../../../context/account";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase";

const Home = () => {
  const { data: name } = useEnsName({
    address: "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
  });
  const { data: avatar } = useEnsAvatar({
    name: "jxom.eth",
  });
  const { loading, community, error, allProfiles } = useAuth();
  const { user } = useAccount();
  console.log(user);
  const [allCommunities, setAllCommunity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCommunity = async () => {
      setIsLoading(true);
      const q = query(collection(db, "community") );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let communities = [];
        querySnapshot.forEach((doc) => {
          communities.push({ ...doc.data(), id: doc.id });
        });
        // console.log("tutor", communities);
        setAllCommunity(communities);
        setIsLoading(false)
      });
      return () => unsubscribe();
    };
    fetchCommunity();
  }, []);
  return (
    <ScrollView
      centerContent={true}
      contentContainerStyle={{ flex: 1, gap: 9 }}
      className="flex-1"
    >
      <StatusBar style="light" />
      <SafeAreaView className="bg-[#F70] w-full h-[311px] rounded-b-[50px]">
        <View contentContainerStyle={{ flex: 1 }}>
          <View className="flex-row items-center py-[20px] justify-between px-[24px] w-full">
            <View className="flex-row space-x-4 items-center">
              <Pressable onPress={() => router.push("/Profile")}>
                <Image
                  source={{
                    uri: "https://images.pexels.com/photos/15509057/pexels-photo-15509057/free-photo-of-fashion-man-love-people.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
                  }}
                  className="w-[50px] bg-gray-500/75 h-[50px] rounded-full"
                />
              </Pressable>

              <Text
                style={{
                  fontFamily: "SpaceMono",
                }}
                className="text-[24px] font-bold leading-normal text-[#fff]"
              >
                Hi
                <Text className="text-[#000]"> {name}</Text>
              </Text>
            </View>
            <Link href="/(auth)/CreateAccount" asChild>
              <TouchableNativeFeedback className="items-center">
                <BellIcon size={25} color="#fff" />
              </TouchableNativeFeedback>
            </Link>
          </View>
          <View className="bg-[#fff] w-[338px] h-[48px] rounded-[5px] border border-[#706C6C] flex-row px-[20px] items-center mx-[28px] justify-center ">
            <MagnifyingGlassIcon size={15} color="#000" />
            <TextInput
              placeholder="Search"
              className="border-none outline-none focus:outline-none bg-transparent w-full"
            />
          </View>

          {/** My Lesson Section */}
          <MyLessons />

          {/** Speakers */}

          <View className="mx-[28px] mt-[27px]">
            <Speakers />
          </View>

          <View className="mx-[28px] mt-[27px]">
            {isLoading ? (
              <ActivityIndicator color="#f70" size="large" />
            ) : (
              <Community item={allCommunities} />
            )}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;
