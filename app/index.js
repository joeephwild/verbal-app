import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import React, { useEffect, Component } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import Account from "./components/Account";

export default function Page() {
  const [session, setSession] = React.useState(0);

  console.log(session);

  useEffect(() => {
    // setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed", event, session);

      if (session && session.user) {
        setSession(session);
      }
    });
  }, []);
  return (
    <View>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </View>
  );
}
