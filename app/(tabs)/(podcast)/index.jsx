import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/solid";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { Link, useNavigation } from "expo-router"; // Assuming "router" is not used

const Index = () => {
  const [podcast, setPodcast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    "Trending",
    "Latest",
    "Old",
    "Korean",
    "German",
    "Spanish",
    "English",
  ];

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const podcastRef = useRef(null);
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  const navigation = useNavigation();

  const onOpen = (item) => {
    navigation.navigate("PodcastPlayer", { podcast: item });
  };

  const onClose = () => {
    setSelectedPodcast(null);
    podcastRef.current?.close();
  };

  useEffect(() => {
    const filterForTutor = async () => {
      try {
        setIsLoading(true);
        const q = query(collection(db, "podcast"), orderBy("created_at"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let post = [];
          querySnapshot.forEach((doc) => {
            post.push({ ...doc.data(), id: doc.id });
          });
          console.log("podcast post", post);
          setPodcast(post);
          setIsLoading(false);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error(error);
      }
    };

    filterForTutor();
  }, []);

  return (
    <SafeAreaView>
      <View style={{ marginHorizontal: wp(7) }}>
        <Text style={{ fontSize: 26, fontWeight: "bold", color: "#fff", marginLeft: wp(2) }}>Podcast</Text>
        <View style={{ marginTop: hp(2), backgroundColor: "#252836", flexDirection: "row", alignItems: "center", height: hp(7), paddingHorizontal: wp(3), paddingVertical: hp(1) }}>
          <TextInput
            placeholderTextColor="#fff"
            placeholder="Search"
            style={{
              width: wp(70),
              color: "#fff",
              fontSize: 16,
            }}
          />
          <MagnifyingGlassIcon size={24} color="#fff" />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 6, marginTop: hp(2) }}
        >
          {tabs.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "#2F3142",
                paddingHorizontal: wp(4),
                paddingVertical: hp(1),
                borderRadius: 999,
                marginRight: wp(2),
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "normal", color: "#fff" }}>
                {item}
              </Text>
            </View>
          ))}
        </ScrollView>

        <FlatList
          data={podcast}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 5, paddingTop: hp(2) }}>
              <Link
              href="PodcastPlayer"
                params={{
                  image: item.podcast_img,
                  title: item.podcast_Title,
                  audio: item.podcast_audio_url,
                  name: item.created_by,
                }}
                asChild
              >
                <Pressable onPress={() => onOpen(item)}>
                  <Image
                    source={{ uri: item.podcast_img }}
                    style={{ width: wp(40), height: wp(40), resizeMode: "cover" }}
                  />
                  <View style={{ width: wp(40), marginTop: hp(1.5) }}>
                    <Text style={{ fontSize: 13, fontWeight: "bold", color: "#fff" }}>{item.podcast_Title}</Text>
                    <Text style={{ fontSize: 10, fontWeight: "medium", color: "#CCCCCC" }}>{item.created_by}</Text>
                  </View>
                </Pressable>
              </Link>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Index;
