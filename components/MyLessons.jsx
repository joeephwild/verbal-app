import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, useNavigation, router } from "expo-router";
import { MyLesson } from "../utils";
import { useEnsName, useEnsAvatar } from "wagmi";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../firebase";

const MyLessons = () => {
  const navigate = useNavigation();
  const { data: name } = useEnsName({
    address: "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
  });
  const { data: avatar } = useEnsAvatar({
    name: "jxo.eth",
  });

  useEffect(() => {
    const fetchChat = async () => {
      const user = auth.currentUser;
      const q = query(collection(db, "session"), orderBy("created_at"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let chat = [];
        querySnapshot.forEach((doc) => {
          chat.push({ ...doc.data(), id: doc.id });
        });
        console.log(chat);
      });

      return () => {
        unsubscribe();
      };
    };
    fetchChat();
  }, []);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 20, alignContent: "center" }}
    >
      {MyLesson.map((item, i) => (
        <Pressable
          className="mx-[28px] mt-[20px] bg-[#fff]  px-6 py-2.5 w-[342px] h-[157px] rounded-[5px]"
          key={i}
          onPress={() => router.push(`/mylesson/${item.course}`)}
        >
          {/* <View> */}
          <View className="flex-row items-center justify-between">
            <Text className="text-[16px] font-bod text-[#000]">My Lesson</Text>
            <Text className="text-[16px] font-bod text-[#015834]">
              Upcoming
            </Text>
          </View>

          <View className="flex-row mt-[27px] items-center  space-x-4">
            <Image
              source={{
                uri: "https://images.pexels.com/photos/15509057/pexels-photo-15509057/free-photo-of-fashion-man-love-people.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
              }}
              className="w-[60px] h-[60px] rounded-full"
            />
            <View className="items-start space-y-2">
              <Text className="text-[20px] font-semibold text-[#000]">
                {item.course}
              </Text>
              <Text className="text-[16px] font-normal text-[#000]">
                With {name}
              </Text>
              <Text className="text-[#015834] text-[16px] font-normals">
                Scheduled for {item.period}
              </Text>
            </View>
          </View>
          {/* </View> */}
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default MyLessons;
