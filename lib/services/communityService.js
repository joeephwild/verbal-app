import { supabase } from "../supabase";
export async function leaveACommunity(userId, communityId) {
  const { data, error } = await supabase
    .from("user_community")
    .delete()
    .eq("user_id", userId)
    .eq("community_id", communityId);

  if (error) {
    alert("Error leaving community:", error.message);
    return;
  }

  if (data) {
    alert("User left the community successfully.");
  }
}

export async function getAllCommunities() {
  const { data, error } = await supabase.from("community").select("*");

  if (error) {
    console.error("Error fetching communities:", error.message);
    return;
  }

  if (data && data.length > 0) {
    return data;
  } else {
    console.log("No communities found.");
  }
}

export async function createCommunity(name, description, img_url) {
  const { data, error } = await supabase
    .from("community")
    .insert([{ name, description, img_url }]);

  if (error) {
    console.error("Error inserting community:", error.message);
    return;
  }

  if (data) {
    console.log("Community inserted successfully:", data);
  }
}

export async function updateCommunity(communityId, updatedData) {
  const { data, error } = await supabase
    .from("community")
    .update(updatedData)
    .eq("id", communityId);

  if (error) {
    console.error("Error updating community:", error.message);
    return;
  }

  if (data) {
    console.log("Community updated successfully:", data);
  }
}

export async function deleteCommunity(communityId) {
  const { data, error } = await supabase
    .from("community")
    .delete()
    .eq("id", communityId);

  if (error) {
    console.error("Error deleting community:", error.message);
    return;
  }

  if (data) {
    console.log("Community deleted successfully:", data);
  }
}

export async function getCommunityParticipant(communityId) {
  const { data: existingEntry, error } = await supabase
    .from("user_community")
    .select("*")
    .eq("community_id", communityId);

  if (error) {
    console.error("Error checking existing entry:", error.message);
    return;
  }

  if (existingEntry && existingEntry.length > 0) {
    console.log("number of participant", existingEntry.length);
    return;
  }
}

export async function addUserToCommunityWithValidation(userId, communityId) {
  // Check if the user is already a member of the community
  const { data: existingEntry, error } = await supabase
    .from("user_community")
    .select("*")
    .eq("user_id", userId)
    .eq("community_id", communityId);

  if (error) {
    console.error("Error checking existing entry:", error.message);
    return;
  }

  if (existingEntry && existingEntry.length > 0) {
    console.log("User is already a member of this community.");
    return;
  }

  // If no existing entry found, add the user to the community
  const { data, insertError } = await supabase
    .from("user_community")
    .insert([{ user_id: userId, community_id: communityId }]);

  if (insertError) {
    console.error("Error adding user to community:", insertError.message);
    return;
  }

  if (data) {
    console.log("User added to community successfully:", data);
  }
}

export async function checkUserInCommunity(userId, communityId) {
  // Check if the user is already a member of the community
  const { data: existingEntry, error } = await supabase
    .from("user_community")
    .select("*")
    .eq("user_id", userId)
    .eq("community_id", communityId);

  if (error) {
    console.error("Error checking existing entry:", error.message);
    return;
  }

  if (existingEntry && existingEntry.length > 0) {
    console.log("User is already a member of this community.");
    return true;
  } else {
    console.log("User is not a member of this community.");
    return false;
  }
}
