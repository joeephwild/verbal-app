export async function getUserDetails(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId);

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
    .eq("user_id", userId);

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

export async function createCommunity(name, description) {
  const { data, error } = await supabase
    .from("community")
    .insert([{ name, description }]);

  if (error) {
    console.error("Error inserting community:", error.message);
    return;
  }

  if (data) {
    console.log("Community inserted successfully:", data);
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

export async function createPost(userId, communityId, title, content) {
  // Check if the user is a member of the specified community
  const { data: existingEntry, error } = await supabase
    .from("user_community")
    .select("*")
    .eq("user_id", userId)
    .eq("community_id", communityId);

  if (error) {
    console.error("Error checking user's community membership:", error.message);
    return;
  }

  if (!existingEntry || existingEntry.length === 0) {
    console.log("User is not a member of this community.");
    return;
  }

  // If user is a member of the community, create the post
  const { data: postData, insertError } = await supabase
    .from("posts")
    .insert([{ user_id: userId, community_id: communityId, title, content }]);

  if (insertError) {
    console.error("Error creating post:", insertError.message);
    return;
  }

  if (postData) {
    console.log("Post created successfully:", postData);
  }
}

export async function getPostsInCommunity(communityId) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("community_id", communityId);

  if (error) {
    console.error("Error fetching posts in community:", error.message);
    return;
  }

  if (data && data.length > 0) {
    console.log("Posts in the community:", data);
    return data;
  } else {
    console.log("No posts found in the community.");
  }
}

export async function deletePost(userId, postId) {
  // Check if the post belongs to the user
  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("user_id")
    .eq("id", postId)
    .single();

  if (postError) {
    console.error("Error fetching post:", postError.message);
    return;
  }

  if (!post) {
    console.log("Post not found.");
    return;
  }

  if (post.user_id !== userId) {
    console.log("You are not authorized to delete this post.");
    return;
  }

  // If the post belongs to the user, proceed with deletion
  const { data: deleteData, error: deleteError } = await supabase
    .from("post")
    .delete()
    .eq("id", postId);

  if (deleteError) {
    console.error("Error deleting post:", deleteError.message);
    return;
  }

  if (deleteData) {
    console.log("Post deleted successfully.");
  }
}

export async function leaveACommunity(userId, communityId) {
  const { data, error } = await supabase
    .from("user_community")
    .delete()
    .eq("user_id", userId)
    .eq("community_id", communityId);

  if (error) {
    console.error("Error leaving community:", error.message);
    return;
  }

  if (data) {
    console.log("User left the community successfully.");
  }
}
