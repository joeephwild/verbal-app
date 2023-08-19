import React, { createContext, useContext, useState } from "react";
import { getUserDetails, updateUserProfile } from "../lib/services/userService";
import { supabase } from "../lib/supabase";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [id, setId] = React.useState(null);
  const [accountLoading, setAccountLoading] = useState(false);

  React.useEffect(() => {
    const checkUserProfile = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setId(null);
      } else {
        setId(data.user.id);
      }
    };
    getUserAndProfile();
    checkUserProfile();
  }, [id]);

  async function getUserAndProfile() {
    try {
      setAccountLoading(true);
      const userDetails = await getUserDetails(id);

      if (!userDetails) {
        return null;
      }
      console.log(userDetails);
      setUser(userDetails);
      setAccountLoading(false);
      return userDetails;
    } catch (error) {
      console.error("Error getting user details:", error.message);
      return null;
    }
  }

  async function updateUserAndProfile(updatedProfileData) {
    try {
      const updatedProfile = await updateUserProfile(id, updatedProfileData);

      if (!updatedProfile) {
        console.error("User profile not updated.");
        return null;
      }

      return updatedProfile;
    } catch (error) {
      console.error("Error updating user profile:", error.message);
      return null;
    }
  }

  return (
    <AccountContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  return useContext(AccountContext);
};
