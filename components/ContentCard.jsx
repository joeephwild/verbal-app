import { View, Text, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  HeartIcon,
  ShareIcon,
  ChatBubbleBottomCenterIcon,
} from "react-native-heroicons/solid";

const ContentCard = ({ item }) => {
  const formatTime = (inputTimestamp) => {
    // Parse the input timestamp
    const parsedTimestamp = new Date(inputTimestamp);

    // Calculate time difference in milliseconds
    const currentTime = new Date();
    const timeDifferenceMs = currentTime - parsedTimestamp;

    // Convert time difference to human-readable format
    let formattedTime;

    if (timeDifferenceMs < 60000) {
      formattedTime = Math.floor(timeDifferenceMs / 1000) + " sec ago";
    } else if (timeDifferenceMs < 3600000) {
      formattedTime = Math.floor(timeDifferenceMs / 60000) + " min ago";
    } else if (timeDifferenceMs < 86400000) {
      formattedTime = Math.floor(timeDifferenceMs / 3600000) + " hr ago";
    } else {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      };
      formattedTime = parsedTimestamp.toLocaleString("en-US", options);
    }

    return formattedTime;
  };
  return (
    <View
      style={{
        width: wp(100),
        maxHeight: hp(90),
      }}
      className="bg-[#fff]  mb-4 p-2"
    >
      <View className="flex-row items-center space-x-2">
        <Image
          source={{
            uri: item.image,
          }}
          className="w-[40px] bg-gray-400 h-[40px] object-cover rounded-full"
        />
        <View>
          <Text className="text-[16px] font-[InterBold] font-semibold leading-normal">
            {item.name}
          </Text>
          <Text className="font-[SpaceMono] text-[14px] font-normal leading-nromal">
            Posted {formatTime(content.created_at)}
          </Text>
        </View>
      </View>
      <Text className="text-[16px] font-normal leading-normal text-[#000] pb-4">
        {item.contents}
      </Text>
      <Image source={{ uri: item.img_url }} style={styles.postImage} />
      <View className="flex-row items-center justify-between px-4 py-2">
        <View className="flex-row items-center space-x-4">
          <View className="flex-row items-center space-x-2">
            <HeartIcon size={19} color="#000" />
            <Text>80</Text>
          </View>
          <View className="flex-row items-center space-x-2">
            <ShareIcon size={19} color="#000" />
            <Text>80</Text>
          </View>
        </View>

        <View className="flex-row items-center space-x-2">
          <ChatBubbleBottomCenterIcon color="#000" />
          <Text>300</Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  cardContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 6,
    backgroundColor: "#fff",
    width: "100%",
    maxHeight: 450,
    marginBottom: 9,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timePosted: {
    fontSize: 12,
    color: "#666",
  },
  postImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    marginBottom: 8,
    borderRadius: 8,
  },
  postContent: {
    color: "#000",
    fontSize: 14,
    fontstyle: "normal",
    fontWeight: 400,
    lineheight: " normal",
  },
};

export default ContentCard;
