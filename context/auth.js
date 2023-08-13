// import { router, useSegments } from "expo-router";
// import React from "react";
// import { supabase } from "../lib/supabase";

// const AuthContext = React.createContext(null);

// // This hook can be used to access the user info.
// export function useAuth() {
//   return React.useContext(AuthContext);
// }

// // This hook will protect the route access based on user authentication.
// function useProtectedRoute(session) {
//   const segments = useSegments();

//   React.useEffect(() => {
//     const inAuthGroup = segments[0] === "(auth)";

//     if (
//       // If the user is not signed in and the initial segment is not anything in the auth group.
//       !session &&
//       !inAuthGroup
//     ) {
//       // Redirect to the sign-in page.
//       router.replace("/(auth)");
//     } else if (session && inAuthGroup) {
//       // Redirect away from the sign-in page.
//       router.replace("/(tabs)/(home)");
//     }
//   }, [session, segments]);
// }

// export function Provider(props) {
//   const [session, setSession] = React.useState(null);

//   // Fetch the user session from Supabase
//   React.useEffect(() => {
//     const session = supabase.auth.getSession();
//     setSession(session);

//     // Listen for auth changes
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (event, newSession) => {
//         if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
//           setSession(newSession);
//         }
//       }
//     );

//     return () => {
//       listener.unsubscribe();
//     };
//   }, []);

//   useProtectedRoute(session);

//   return (
//     <AuthContext.Provider
//       value={{
//         signIn: async (email, password) => {
//           const { error } = await supabase.auth.signInWithPassword({
//             email,
//             password,
//           });
//           if (error) {
//             console.error("Error signing in:", error.message);
//           } else {
//             router.replace("/(tabs)/(home)");
//           }
//         },
//         signOut: async () => {
//           const { error } = await supabase.auth.signOut();
//           if (error) {
//             console.error("Error signing out:", error.message);
//           }
//         },
//         signUp: async (email, password) => {
//           const { error } = await supabase.auth.signUp({
//             email,
//             password,
//           });
//           if (error) {
//             console.error("Error signing out:", error.message);
//           } else {
//             router.replace("/(tabs)/(home)");
//           }
//         },
//         session,
//       }}
//     >
//       {props.children}
//     </AuthContext.Provider>
//   );
// }
import { supabase } from "../lib/supabase";
import { router, useNavigation, useSegments } from "expo-router";
import React from "react";
import { RlyMumbaiNetwork, Network, getAccount } from "@rly-network/mobile-sdk";
import { Alert } from "react-native";
import {
  getUserDetails,
  getAllCommunities,
  createCommunity,
} from "../lib/supabaseService.js/index.js";

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
    const userProfile = getUserDetails(id);
    const allCommunities = getAllCommunities();
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
