import { supabase } from "../supabase";
export async function createPost(user_id, community_id, content, media_url) {
  // Check if the user is a member of the specified community
  const { data: existingEntry, error } = await supabase
    .from("user_community")
    .select("*")
    .eq("user_id", user_id)
    .eq("community_id", community_id);

  if (error) {
    console.error("Error checking user's community membership:", error.message);
    return { error };
  }

  if (!existingEntry || existingEntry.length === 0) {
    console.log("User is not a member of this community.");
    return { error: "User is not a member of this community." };
  }

  // If the user is a member of the community, create the post
  const { data: postData, error: insertError } = await supabase
    .from("posts")
    .insert([{ user_id, community_id, content, media_url }])
    .single();

  if (insertError) {
    console.error("Error creating post:", insertError.message);
    return { error: insertError.message };
  }

  if (postData) {
    console.log("Post created successfully:", postData);
    return  postData ;
  }
}

export async function updatePost(user_id, postId, updatedData) {
  // Check if the user owns the post
  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .eq("user_id", user_id)
    .single();

  if (postError) {
    console.error("Error fetching post:", postError.message);
    return;
  }

  if (!post) {
    console.error("User does not own the post or post not found.");
    return;
  }

  // Update the post with updatedData
  const { data: updatedPostData, error: updateError } = await supabase
    .from("posts")
    .update(updatedData)
    .eq("id", postId);

  if (updateError) {
    console.error("Error updating post:", updateError.message);
    return;
  }

  if (updatedPostData) {
    console.log("Post updated successfully:", updatedPostData);
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

export async function getSinglePost(postId) {
  const { data, error } = await supabase
    .from("posts")
    .eq("id", postId)
    .single();

  if (error) {
    console.error("Error fetching posts in post:", error.message);
    return;
  }

  if (data && data.length > 0) {
    console.log("Posts in the community:", data);
    return data;
  } else {
    console.log("No posts found with this Id.");
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

export async function createPodCast(user_id, title, content, media_url) {
  // create the podcast
  const { data: postData, insertError } = await supabase
    .from("podcasts")
    .insert([{ user_id, title, content, media_url }]);

  if (insertError) {
    console.error("Error creating post:", insertError.message);
    return;
  }

  if (postData) {
    console.log("Podcasts created successfully:", postData);
  }
}

export async function getSinglePodcast(podcastId) {
  const { data, error } = await supabase
    .from("podcasts")
    .eq("id", podcastId)
    .single();

  if (error) {
    console.error("Error fetching posts in podcast:", error.message);
    return;
  }

  if (data && data.length > 0) {
    console.log("podcast:", data);
    return data;
  } else {
    console.log("No podcast found with this Id.");
  }
}

export async function updatePodCast(user_id, updatedData) {
  // create the podcast
  const { data: postData, insertError } = await supabase
    .from("podcasts")
    .eq("user_id", user_id)
    .insert(updatedData);

  if (insertError) {
    console.error("Error updating podcast:", insertError.message);
    return;
  }

  if (postData) {
    console.log("Podcasts updated successfully:", postData);
  }
}
export async function deletePodCast(user_id, podcastId) {
  // Check if the podcast belongs to the user
  const { data: podcast, error: postError } = await supabase
    .from("podcasts")
    .select("user_id")
    .eq("id", podcastId)
    .single();

  if (postError) {
    console.error("Error fetching podcast:", postError.message);
    return;
  }

  if (!podcast) {
    console.log("podcast not found.");
    return;
  }

  if (podcast.user_id !== user_id) {
    console.log("You are not authorized to delete this podcast.");
    return;
  }

  const { data: deleteData, error: deleteError } = await supabase
    .from("podcasts")
    .delete()
    .eq("id", podcastId);

  if (deleteError) {
    console.error("Error deleting podcast:", deleteError.message);
    return;
  }

  if (deleteData) {
    console.log("podcast deleted successfully.");
  }
}
