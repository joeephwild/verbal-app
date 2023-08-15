import { supabase } from "../supabase";

export async function getUserDetails(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId);

  if (error) {
    console.error("Error fetching user account details:", error.message);
    return;
  }
  if (data && data.length > 0) {
    const userAccountDetails = data[0];
    console.log("User Account Details:", userAccountDetails);
    return userAccountDetails;
  } else {
    console.log("User not found.");
  }
}

export async function updateUserProfile(userId, updatedProfileData) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updatedProfileData)
    .eq("id", userId);

  if (error) {
    console.error("Error updating user profile:", error.message);
    return;
  }

  if (data) {
    console.log("User profile updated successfully:", data);
  } else {
    console.log("User not found or no changes made.");
  }
}
