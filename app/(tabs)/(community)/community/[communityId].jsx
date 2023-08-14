import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  PhotoIcon,
  VideoCameraIcon,
} from "react-native-heroicons/solid";
import { post } from "../../../../utils";
import { router, useLocalSearchParams } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "../../../../context/auth";
import ContentCard from "../../../../components/ContentCard";
import { Input } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

const CommunityDetails = () => {
  const { communityId } = useLocalSearchParams();
  const [communities, setCommunity] = useState([]);
  const { community, loading, error } = useAuth();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickVideo = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  console.log(communities);
  useEffect(() => {
    const filterForTutor = async () => {
      try {
        const comunityDetails = community?.filter(
          (item) => item.name === communityId
        );

        setCommunity(comunityDetails);
      } catch (error) {
        console.log(error);
      }
    };

    filterForTutor();
  }, [communityId]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View className="flex-row py-[16px] items-center space-x-[28px]">
          <ChevronLeftIcon
            onPress={() => router.back()}
            size={25}
            color="#fff"
          />
          <Text className="text-[#fff] text-[20px] font-normal">Community</Text>
        </View>
        <ScrollView
          contentContainerStyle={{}}
          refreshControl
          showsVerticalScrollIndicator={false}
        >
          {communities.map((item) => {
            return (
              <View key={item.id}>
                <Image
                  source={{
                    uri: item.img_url,
                  }}
                  style={{
                    width: wp(100),
                    height: hp(30),
                  }}
                  className="object-cover bg-white"
                />
                <Text className="text-3xl font-bold text-[#fff]">
                  {item.name}
                </Text>
                <Text className="text-[16px] font-semibold text-[#ccc]">
                  8.7k Members
                </Text>
                <View className="flex-row space-x-[6px] items-center mx-[24px]">
                  <Pressable
                    style={{
                      width: wp(45),
                    }}
                    className="mt-[16px] bg-[#F70] py-[16px] rounded-[8px] items-center justify-center"
                  >
                    <Text className="text-[16px] text-white  font-bold leading-normal">
                      Join Group
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      width: wp(45),
                    }}
                    className="mt-[16px] border-2 border-[#F70] px-[24px]  py-[16px] rounded-[8px] items-center justify-center"
                  >
                    <Text className="text-[16px] text-white  font-bold leading-normal">
                      Invite Friends
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    width: wp(100),
                    height: hp(10),
                  }}
                  className="mt-[16px] bg-[#fff] rounded-[5px] items-start  px-4 py-2.5 "
                >
                  <View className=" space-x-2 flex-row ">
                    <Image
                      source={{
                        uri: item.img_url,
                      }}
                      className="w-[50px] h-[50px] border-2 rounded-full"
                    />
                    <Input
                      placeholder="Whats on your Mind..."
                      multiline
                      className="bg-[#ECE8E8] h-[68px] text-[12px] mr-9 border-none outline-noe px-4 py-2.5"
                    />
                  </View>
                </View>
                <View className="flex-row justify-between items-center px-4 bg-[#fff]">
                  <View className="flex-row items-center space-x-6">
                    <PhotoIcon size={25} onPress={pickImage} />
                    <VideoCameraIcon size={25} onPress={pickVideo} />
                  </View>
                  <Pressable
                    style={{
                      width: wp(35),
                    }}
                    className="bg-[#F70] px-[24px] py-[9px] mb-2 rounded-[8px] items-center justify-center"
                  >
                    <Text className="text-[16px] text-white  font-bold leading-normal">
                      Submit
                    </Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
          {post.map((item) => {
            return (
              <View
                style={{
                  marginBottom: 8,
                  borderBottomColor: "#cccc",
                  marginTop: 8,
                }}
              >
                {/* ContentCard is used to display the post details */}
                <ContentCard content={item} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CommunityDetails;
