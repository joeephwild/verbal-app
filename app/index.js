import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import React, { useEffect, Component } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";

export default function Page() {
  const [session, setSession] = React.useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("sessions", event, session, session && session.user);
      if (session && session.user) {
        console.log("fetching");
        const { data, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", session.user.id);
        console.log(data, error);
      }
    });
  }, []);
  return (
    <View>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </View>
  );
}
