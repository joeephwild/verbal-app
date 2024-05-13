import { supabase } from "../lib/supabase";
import { router, useNavigation, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { getAllCommunities } from "../lib/services/communityService";
import { getAccount } from "@rly-network/mobile-sdk";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  User,
  signOut,
  deleteUser,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { Alert } from "react-native";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";

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
      navigate.navigate("(home)");
    }
  }, [session, segments]);
}

export function Provider(props) {
  const [session, setSession] = React.useState("");
  const [id, setId] = useState("");
  const [community, setCommunity] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [account, setAccount] = useState("");
  const [allProfiles, setAllProfiles] = useState([]);
  const navigate = useNavigation();
  console.log(id);

  const signup = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        if (user) {
          sendEmailVerification(user).then(() => {
            Alert.alert("Email Verification sent");
            if (user.emailVerified) {
              console.log(user.uid);
              return user.emailVerified;
            } else {
              Alert.alert("you need to verify your email address");
            }
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };

  const updateUserProfile = ({ name, image }) => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
      coverURL: "",
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };

  const createProfile = async (
  ) => {
    try {
      const user = auth.currentUser;
      const docRef = await addDoc(collection(db, "users/"), {
    
      });
      console.log("Document written with ID: ", docRef.id);
      Alert.alert("Profile Created successfully");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // const createProfiles = async (profileData) => {
  //   try {
  //     const user = auth.currentUser;
  //     const userId = user.uid; // Get the UID of the current user

  //     const docRef = await setDoc(doc(db, "users", userId), profileData); // Set the document with the UID as the ID
  //     console.log("Document written with ID: ", userId);
  //     Alert.alert("Profile Created successfully");
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

  const deleteAccount = () => {
    const user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        // User deleted.
        Alert.alert("Account deleted");
        setSession(null);
        navigate.navigate("(auth)");
      })
      .catch((error) => {
        // An error ocurred
        // ...
        Alert.alert(error.message);
      });
  };

  const getAllProfile = () => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let profiles = [];
      querySnapshot.forEach((doc) => {
        profiles.push({ ...doc.data(), id: doc.id });
      });
      setAllProfiles(profiles);
      return allProfiles;
    });
    return () => unsubscribe();
  };

  const signin = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user.emailVerified) {
          console.log(user);
          setSession(user.getIdToken);
          navigate.navigate("(tabs)");
          return user;
        } else {
          setSession(null);
          Alert.alert("You need to verify your email");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };

  const signout = async () => {
    signOut(auth)
      .then(() => {
        setSession(null);
      })
      .catch((error) => {
        Alert.alert("An error occured", error.message);
      });
  };

  React.useEffect(() => {
    const checkUserSession = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user.emailVerified) {
          const uid = user.uid;
          const token = user.getIdToken;
          setId(uid);
          setSession(token);
        } else {
          setId("");
          setSession(null);
        }
      });
    };

    checkUserSession();
  }, []);

  useEffect(() => {
    const fetchaccount = async () => {
      const address = await getAccount();
      setAccount(address);
    };
    fetchaccount();
    getAllProfile();
  }, []);

  useProtectedRoute(session);

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        community,
        id,
        account,
        signin,
        signup,
        signout,
        deleteAccount,
        updateUserProfile,
        createProfile,
        allProfiles,
        account,
        getAllProfile,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
