import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  Button,
  ActivityIndicator,
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
import {
  addUserToCommunityWithValidation,
  checkUserInCommunity,
  leaveACommunity,
} from "../../../../lib/services/communityService";
import { handleSubmission, pickImage, pickVideo } from "../../../../lib/services/userService";
import {
  createPost,
  getPostsInCommunity,
} from "../../../../lib/services/contentService";
import { sendFileToIPFS } from "../../../../utils/pinata";

const CommunityDetails = () => {
  const { communityId } = useLocalSearchParams();
  const [communities, setCommunity] = useState([]);
  const { community, loading, error, id } = useAuth();
  const [image, setImage] = useState(null);
  const [posts, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMember, setIsMember] = useState(false); // State to track membership status
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const userIsMember = await checkUserInCommunity(id, communityId);
      setIsMember(userIsMember);
    };
    fetchData();
  }, [id, communityId]);

  const handleImageUpload = async () => {
    const result = await pickImage();
    if (result) {
      const uri = await handleSubmission(result);
      console.log(uri);
    }
  };

  const handleVideoUpload = async () => {
    const result = await pickVideo();
    setImage(result);
  };

  const handleLeave = async () => {
    leaveACommunity(id, communityId);

    alert("Left sucessfully");
    setIsMember(false);
  };

  const handleJoin = async () => {
    addUserToCommunityWithValidation(id, communityId);

    alert("Joined sucessfully");
    setIsMember(true);
  };

  const handlCreatePost = () => {
    createPost(id, communityId, "content", title, image);
    alert("Post Created successfully");
  };

  useEffect(() => {
    const filterForCommunity = async () => {
      setIsLoading(true);
      try {
        const comunityDetails = community?.filter(
          (item) => item.id === communityId
        );
        setCommunity(comunityDetails);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    const getPost = () => {
      const result = getPostsInCommunity(communityId);
      setPost(result);
      console.log(post);
    };
    getPost();
    filterForCommunity();
  }, [communityId]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center space-x-[12px]"
        >
          <ChevronLeftIcon size={25} color="#fff" />
          <Text className="text-[#fff] text-[20px] font-normal">Community</Text>
        </Pressable>
        <ScrollView
          contentContainerStyle={{}}
          refreshControl
          showsVerticalScrollIndicator={false}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#f70" />
          ) : (
            <View>
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
                      {isMember ? (
                        <Pressable
                          style={{
                            width: wp(45),
                          }}
                          onPress={handleLeave}
                          className="mt-[16px] bg-[#F70] py-[16px] rounded-[8px] items-center justify-center"
                        >
                          <Text className="text-[16px] text-white font-bold leading-normal">
                            Leave Group
                          </Text>
                        </Pressable>
                      ) : (
                        <Pressable
                          style={{
                            width: wp(45),
                          }}
                          onPress={handleJoin}
                          className="mt-[16px] bg-[#F70] py-[16px] rounded-[8px] items-center justify-center"
                        >
                          <Text className="text-[16px] text-white font-bold leading-normal">
                            Join Group
                          </Text>
                        </Pressable>
                      )}
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
                          value={title}
                          onChangeText={(text) => setTitle(text)}
                          placeholder="Whats on your Mind..."
                          multiline
                          className="bg-[#ECE8E8] h-[68px] text-[12px] mr-9 border-none outline-noe px-4 py-2.5"
                        />
                      </View>
                    </View>
                    <View className="flex-row justify-between items-center px-4 bg-[#fff]">
                      <View className="flex-row items-center space-x-6">
                        <PhotoIcon size={25} onPress={handleImageUpload} />
                        <VideoCameraIcon
                          size={25}
                          onPress={handleVideoUpload}
                        />
                      </View>
                      <Pressable
                        style={{
                          width: wp(35),
                        }}
                        onPress={handlCreatePost}
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
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CommunityDetails;
