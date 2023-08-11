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
//       router.replace("/(tabs)/(home)");
//     } else if (session && inAuthGroup) {
//       // Redirect away from the sign-in page.
//       router.replace("/(auth)");
//     }
//   }, [session, segments]);
// }

// export function Provider(props) {
//   const [session, setSession] = React.useState(null);

//   // Fetch the user session from Supabase
//   React.useEffect(() => {
//     const session = supabase.auth.getUser();
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
import { router, useSegments } from "expo-router";
import React from "react";

const AuthContext = React.createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
  const segments = useSegments();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/(auth)");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/(tabs)/(home)");
    }
  }, [user, segments]);
}

export function Provider(props) {
  const [user, setAuth] = React.useState(null);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => setAuth({}),
        signOut: () => setAuth(null),
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
