import { useEffect } from "react";
import React, { Component } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import mindDb from "../lib/mindDb";

const ChatBox = ({ session }) => {
  const [text, setText] = React.useState("");
  const [user, setUser] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState("");

  useEffect(() => {
    if (session) {
      setUser(session?.user?.email);
    }
  }, [session]);

  const queryAi = async () => {
    try {
      //   setLoading(true);
      if (!session?.user) {
        throw new Error("No user on the session!");
      }

      const response = await mindDb(user, text);
      if (response) {
        console.log(response);
        setResponse(response);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="email" value={user} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="ask me any Question"
          value={text || ""}
          onChangeText={(text) => setText(text)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Text> {response}</Text>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? "Loading ..." : "Send"}
          onPress={() => queryAi()}
          disabled={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
export default ChatBox;
