import { View, Text, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ContentCard = ({ content }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <Image
          source={{ uri: content.author.image }}
          style={styles.authorImage}
        />
        <View>
          <Text style={styles.authorName}>{content.author.name}</Text>
          <Text style={styles.timePosted}>Posted {content.time_posted}</Text>
        </View>
      </View>
      <Text  style={styles.postContent}>{content.content}</Text>
      {content.image && <Image source={{ uri: content.image }} style={styles.postImage} />}
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
    lineheight:" normal",
  },
};

export default ContentCard;
