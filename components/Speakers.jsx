import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { ScrollView } from "react-native";
import { Mentors } from "../utils";
import { useAuth } from "../context/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";

var { width, height } = Dimensions.get("window");

const Speakers = () => {
  const [data, setData] = useState(Mentors);
  const [profileDetails, setProfileDeatils] = useState([]);

  const { account } = useAuth();
  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let profiles = [];
      querySnapshot.forEach((doc) => {
        profiles.push({ ...doc.data(), id: doc.id });
      });
      console.log("profile", profiles);
      setProfileDeatils(profiles);
    });
    return () => unsubscribe();
  }, [account]);
  return (
    <View className="">
      <View className="flex-row items-center justify-between">
        <Text className="text-white text-xl mb-5">Mentors</Text>
        <Text className="text-[12px] font-normal text-[#989797]">See all</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
      >
        {profileDetails.map((item, index) => (
          <Pressable
          key={index}
            onPress={() => router.push(`/tutor/${item.id}`)}
            className=" bg-white rounded-[8px] px-4 py-3.5 w-[250px] min-h-[48px]"
          >
            <View className="flex-row items-start space-x-2">
              <Image
                source={{
                  uri: item.profile_img,
                }}
                className="w-[60px] h-[60px] rounded-full object-cover"
              />
              <View className="items-start">
                <Text className="text-[20px] font-bold text-[#000]">
                  {item.full_name}
                </Text>
                <View className="items-start">
                  <Text className="text-[16px] space font-normal text-[#000]">
                    {item.tutor_lang}  {item.account}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Speakers;
