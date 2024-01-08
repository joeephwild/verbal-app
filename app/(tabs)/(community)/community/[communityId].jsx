import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  Button,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  PhotoIcon,
  VideoCameraIcon,
} from "react-native-heroicons/solid";
// import { post } from "../../../../utils";
import { router, useLocalSearchParams } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "../../../../context/auth";
import ContentCard from "../../../../components/ContentCard";
import { Input } from "react-native-elements";
import { leaveACommunity } from "../../../../lib/services/communityService";
import { pickImage, pickVideo } from "../../../../lib/services/userService";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../../../firebase";
// import { sendFileToIPFS } from "../../../../utils/pinata";

const CommunityDetail = () => {
  const { communityId } = useLocalSearchParams();
  const [communities, setCommunity] = useState([]);
  const { community, loading, error, id } = useAuth();
  const [image, setImage] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMember, setIsMember] = useState(false); // State to track membership status
  const [content, setContent] = useState("");

  useEffect(() => {
    // const fetchData = async () => {
    //   const userIsMember = await checkUserInCommunity(id, communityId);
    //   setIsMember(userIsMember);
    // };
    // fetchData();
  }, [id, communityId]);

  const handleImageUpload = async () => {
    const result = await pickImage();
    let url = `https://gateway.pinata.cloud/ipfs/${result}`;
    setImage(url);
    alert("image upload sucessful");
  };

  const handleVideoUpload = () => {
    const result = pickVideo();
    setImage(result);
  };

  const handleLeave = async () => {
    leaveACommunity(id, communityId);
    setIsMember(false);
    setModalVisible(false);
  };
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(true);
  };

  const handleJoin = async () => {
    const user = auth.currentUser;
    let userId = user.uid;
    const communityRef = query(collection(db, "communities"));
  };

  const handlCreatePost = async () => {
    try {
      const user = auth.currentUser;
      const docRef = await addDoc(collection(db, "post"), {
        community_id: communityId,
        contents: content,
        img_url: image,
        video_url: "",
        image: user.photoURL,
        user_id: user.uid,
        name: user.displayName,
        created_at: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    const filterForCommunity = async () => {
      try {
        setIsLoading(true);
        const q = query(collection(db, "community"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let communities = [];
          querySnapshot.forEach((doc) => {
            communities.push({ ...doc.data(), id: doc.id });
          });

          const comunityDetails = communities?.filter(
            (item) => item.id === communityId
          );
          console.log("tutor", comunityDetails);
          setCommunity(comunityDetails);
          setIsLoading(false);
        });
        return () => unsubscribe();
      } catch (error) {
        console.log(error);
      }
    };
    const getPost = async () => {
      const q = query(
        collection(db, "post"),
        where("community_id", "==", communityId),
        orderBy("created_at")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let post = [];
        querySnapshot.forEach((doc) => {
          post.push({ ...doc.data(), id: doc.id });
        });
        console.log("community post", post);
        setPosts(post);
        setIsLoading(false);
      });
      return () => unsubscribe();
    };
    getPost();
    filterForCommunity();
  }, [communityId]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center py-6 space-x-[12px]"
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
                    <View className="items-start ml-9 mt-4">
                      <Text
                        style={{
                          fontFamily: "InterBold",
                        }}
                        className="text-3xl text-start font-bold text-[#fff]"
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "SpaceMono",
                        }}
                        className="text-[16px] font-semibold text-[#ccc]"
                      >
                        8.7k Members
                      </Text>
                    </View>

                    <View className="flex-row space-x-[6px] items-center mx-[22px]">
                      {isMember ? (
                        <Pressable
                          style={{
                            width: wp(45),
                          }}
                          onPress={toggleModal}
                          className="mt-[16px] bg-[#F70] py-[16px] rounded-[8px] items-center justify-center"
                        >
                          <Text
                            style={{
                              fontFamily: "InterBold",
                            }}
                            className="text-[16px] text-white font-bold leading-normal"
                          >
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
                          <Text
                            style={{
                              fontFamily: "InterBold",
                            }}
                            className="text-[16px] text-white font-bold leading-normal"
                          >
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
                        <Text
                          style={{
                            fontFamily: "InterBold",
                          }}
                          className="text-[16px] text-white  font-bold leading-normal"
                        >
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
                          value={content}
                          onChangeText={(text) => setContent(text)}
                          placeholder="Whats on your Mind..."
                          multiline
                          className="bg-transparent h-[68px] text-[16px] mr-9 border-none outline-noe px-4 py-2.5"
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
                        disabled={!image && !content}
                        onPress={handlCreatePost}
                        className="bg-[#F70] px-[24px] py-[9px] mb-2 rounded-[8px] items-center justify-center"
                      >
                        <Text className="text-[16px] font-[InterBold] text-white  font-bold leading-normal">
                          Submit
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
          {posts && posts.length > 0 ? (
            <View className="mb-12 mt-4">
              {posts.map((item, i) => (
                <View className="">
                  <ContentCard key={i} item={item} />
                </View>
              ))}
            </View>
          ) : (
            <View>
              <Text className="text-[#fff] font-[InterBold] text-center text-[20px]">
                No post in community
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 items-center justify-center bg-black/60">
          <View className="w-[342px] space-y-[8px] h-[200px] bg-[#13161B] p-[24px]">
            <View className="">
              <Text className="text-[#fff] text-[20px] font-semibold">
                Leave Group
              </Text>
            </View>
            <Text className="text-[#C3D0E580] font-nromal tet-[14px]">
              Others will continue after you leave. You can join the session
              again.
            </Text>
            <View className="flex-row justify-center space-x-[16px] pt-[36px]">
              <Pressable
                className="border border-[#6B7D99] min-w-[136px] py-[16px] mb-2 rounded-[9px] items-center justify-center"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-[16px] text-white  font-bold leading-normal">
                  Don’t Leave
                </Text>
              </Pressable>
              <Pressable
                className="bg-[#F70] px-[29px] min-w-[136px] mb-2 rounded-[9px] items-center justify-center"
                onPress={handleLeave}
              >
                <Text className="text-[16px] text-white  font-bold leading-normal">
                  Leave
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CommunityDetail;
