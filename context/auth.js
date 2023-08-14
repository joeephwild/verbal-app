import { supabase } from "../lib/supabase";
import { router, useNavigation, useSegments } from "expo-router";
import React from "react";
import { RlyMumbaiNetwork, Network, getAccount } from "@rly-network/mobile-sdk";
import { Alert } from "react-native";
import {
  getUserDetails,
  getAllCommunities,
  createCommunity,
} from "../lib/services/userService.js/index.js";

const AuthContext = React.createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(session) {
  const segments = useSegments();
  const navigate = useNavigation();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !session &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      navigate.navigate("(auth)");
    } else if (session && inAuthGroup) {
      // Redirect away from the sign-in page.
      navigate.navigate("(tabs)");
    }
  }, [session, segments]);
}

export function Provider(props) {
  const [session, setSession] = React.useState(null);
  const [id, setId] = React.useState(null);
  // console.log(session);

  React.useEffect(() => {
    const checkUserSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setSession(null);
      } else {
        setSession(data.session);
      }
    };
    checkUserSession();
  }, []);

  React.useEffect(() => {
    const checkUserProfile = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setId(null);
      } else {
        setId(data.user.id);
      }
    };
    checkUserProfile();
  }, []);

  if (id) {
  }

  useProtectedRoute(session);

  return (
    <AuthContext.Provider
      value={{
        session,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
