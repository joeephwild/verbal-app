import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChatBubbleBottomCenterTextIcon,
  HeartIcon,
  EllipsisHorizontalIcon,
} from "react-native-heroicons/outline";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Mentors } from "../../../../utils/index";

const TutorDetails = () => {
  const { id } = useLocalSearchParams();
  const [tutor, setTutor] = useState([]);
  console.log(id);
  useEffect(() => {
    const filterForTutor = async () => {
      try {
        const tutorAccount = Mentors?.filter((item) => item.name === id);
        console.log(tutorAccount);
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
        <View key={i}>
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
            <View className="flex-row space-x-[16px] mt-[20px] ">
              <Text
                className={`border-b-4  ring-[#fff] text-[#fff] text-[16px] leading-normal font-semibold`}
              >
                Overview
              </Text>
              <Text
                className={`border-b-2 border-[#fff] text-[#fff] text-[16px] leading-normal font-semibold`}
              >
                Session
              </Text>
            </View>
            <View className="items-center mt-[30px] justify-center">
              <Image
                source={require("../../../../assets/images/nosession.png")}
                className="w-[160px] h-[160px] object-cover"
              />
              <Text className="text-[#AAAAAAAA] text-[16px] font-semibold">
                No upcoming session
              </Text>
            </View>
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
            <Pressable
              onPress={() => router.push("/availablityform")}
              className="bg-[#F70] w-full py-[16px] mt-[9px] rounded-[8px] items-center justify-center"
            >
              <Text className="text-[16px] text-white font-bold leading-normal">
                Check availability
              </Text>
            </Pressable>
          </View>
        </View>
      ))}
    </SafeAreaView>
  );
};

export default TutorDetails;
