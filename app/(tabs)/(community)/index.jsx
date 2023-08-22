import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
import { useAuth } from "../../../context/auth";
import { router } from "expo-router";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase";

const CommunityCard = ({ item }) => {
  return (
    <Pressable className="mx-[20px] items-center justify-center">
      <Pressable
        onPress={() => router.push(`/community/${item.id}`)}
        style={{
          width: wp(90),
        }}
        className="bg-[#fff] mb-[16px] px-[5px]  py-[16px] mx-[24px] h-[90px] rounded-[5px]"
      >
        <View className="flex-row space-x-8 items-center">
          <Image
            source={{
              uri: item.img_url,
            }}
            className="w-[50px] h-[50px] rounded-full"
          />
          <View>
            <Text
              style={{
                fontFamily: "InterBold",
              }}
              className="text-[16px] font-semibold leading-normal text-[#000]"
            >
              {item.name}
            </Text>
            <Text
              style={{
                fontFamily: "SpaceMono",
              }}
              className="text-[14px] font-normal leading-normal text-[#000]"
            >
              28k Members
            </Text>
          </View>
        </View>
      </Pressable>
    </Pressable>
  );
};

const index = () => {
  const [allCommunities, setAllCommunity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchCommunity = async () => {
      setIsLoading(true);
      const q = query(collection(db, "community"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let communities = [];
        querySnapshot.forEach((doc) => {
          communities.push({ ...doc.data(), id: doc.id });
        });
        setAllCommunity(communities);
        setIsLoading(false);
      });
      return () => unsubscribe();
    };
    fetchCommunity();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator color="#f70" size="large" />
      ) : (
        <ScrollView>
          <View className="mt-[16px] mx-[24px]">
            <Pressable
              onPress={() => router.back()}
              className="flex-row items-center space-x-[12px]"
            >
              <ChevronLeftIcon size={25} color="#fff" />
              <Text
                style={{
                  fontFamily: "SpaceMono",
                }}
                className="text-[#fff] text-[20px] font-normal"
              >
                Community
              </Text>
            </Pressable>
            <TextInput
              placeholder="Search"
              style={{
                width: wp(90),
              }}
              className="bg-[#fff] mt-[16px] h-[48px] px-[8px] rounded-[8px]"
            />
            <View className="mt-[24px]">
              <Text
                style={{
                  fontFamily: "InterBold",
                }}
                className="text-[#fff] mb-3 font-semibold text-[20px]"
              >
                Top Community
              </Text>
              {allCommunities.map((item) => {
                return <CommunityCard key={item.id} item={item} />;
              })}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default index;
