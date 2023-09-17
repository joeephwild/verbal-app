import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Details from "./Details";
import Post from "./Post";
import { SetupPreference } from "./authsteps";

const Overview = ({ isNotProfile }) => {
  const [isSwitched, setIsSwitched] = useState("details");
  const tabs = ["Details", "Post", "Edit Profile"];
  return (
    <View>
      {isNotProfile ? (
        <Details />
      ) : (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Pressable
              onPress={() => setIsSwitched("details")}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 20,
                backgroundColor:
                  isSwitched === "details" ? "#FF770066" : "transparent",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Details
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setIsSwitched("post")}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 20,
                backgroundColor:
                  isSwitched === "post" ? "#FF770066" : "transparent",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Settings
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setIsSwitched("profile")}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 20,
                backgroundColor:
                  isSwitched === "profile" ? "#FF770066" : "transparent",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Edit Profile
              </Text>
            </Pressable>
          </View>
          <ScrollView>
            <View>
              {isSwitched === "details" && <Details isNotProfile={isNotProfile} />}
              {isSwitched === "post" && <Post />}
              {isSwitched === "profile" && (
                <View style={{ paddingBottom: 20 }}>
                  <SetupPreference />
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Overview;
