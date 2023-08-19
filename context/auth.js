import { supabase } from "../lib/supabase";
import { router, useNavigation, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { getAllCommunities } from "../lib/services/communityService";
import { getAccount } from "@rly-network/mobile-sdk";

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
  const [community, setCommunity] = React.useState([]);

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
  }, [id]);

  if (id) {
  }

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const result = await getAllCommunities();
        setCommunity(result);
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching communities.");
        setLoading(false);
      }
    };
    fetchCommunity();
  }, []);

  useEffect(() => {
    const handleWalletConnect = async () => {
      const account = await getAccount();
      setAccount(account);
    };
    handleWalletConnect();
  }, [account]);

  useProtectedRoute(session);

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        community,
        error,
        id,
        account,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
