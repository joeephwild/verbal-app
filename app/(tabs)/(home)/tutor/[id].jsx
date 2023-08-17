import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChatBubbleBottomCenterTextIcon,
  HeartIcon,
  EllipsisHorizontalIcon,
} from "react-native-heroicons/outline";
import { router, useLocalSearchParams } from "expo-router";
import Session from "../../../../components/Session";
import { useState } from "react";
import { Mentors } from "../../../../utils/index";
import Overview from "../../../../components/Overview";

const TutorDetails = () => {
  const { id } = useLocalSearchParams();
  const [tutor, setTutor] = useState([]);
  const [isSwitched, setIsSwitched] = useState("overview");

  useEffect(() => {
    const filterForTutor = async () => {
      try {
        const tutorAccount = Mentors?.filter((item) => item.name === id);
        setTutor(tutorAccount);
      } catch (error) {
        console.log(error);
      }
    };

    filterForTutor();
  }, [id]);
  return (
    <SafeAreaView>
      {tutor.map((item, i) => (
        <ScrollView key={i}>
          <View className="">
            <View className="bg-[#D9D9D9] h-[160px] object-cover relative" />
            <Image
              source={{
                uri: item.profileImage,
              }}
              className="bg-[#D9D9D9] border-4  ring-[#010F15] w-[120px] h-[120px] rounded-full absolute top-[50%] left-[24px]"
            />
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
          <View className="mx-[24px] ">
            <View>
              <Text className="text-[#fff] text-[28px] font-bold leading-normal tracking-normal">
                {item.name}
              </Text>
              <Text className="text-[#AAAAAAAA] text-[16px] font-semibold">
                Pro {item.languages[0]}
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
            {isSwitched === "session" && <Session />}

            {isSwitched === "overview" && <Overview isNotProfile />}
          </View>
        </ScrollView>
      ))}
    </SafeAreaView>
  );
};

export default TutorDetails;
