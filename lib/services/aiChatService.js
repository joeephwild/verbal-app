import { supabase } from "../supabase";

export async function createUserChatHistory(userId, message) {
  const { data: userProfile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", userId)
    .single();

  if (profileError) {
    console.error("Error fetching user profile:", profileError.message);
    return;
  }

  const { data: chatData, error: chatError } = await supabase
    .from("chatbot_input")
    .insert([
      {
        author_id: userId,
        author_name: userProfile.full_name,
        message: message,
      },
    ]);

  if (chatError) {
    console.error("Error inserting chat history:", chatError.message);
    return;
  }

  if (chatData) {
    console.log("Chat history inserted successfully:", chatData);
  }
}

export async function createBotChatHistory(userId, message) {
  console.log({ userId, message });
  const { data: chatData, error: chatError } = await supabase
    .from("chatbot_output")
    .insert([
      {
        author_id: userId,
        author_name: "mindDb_bot",
        message,
      },
    ]);

  if (chatError) {
    console.error("Error inserting chat history:", chatError.message);
    return;
  }

  if (chatData) {
    console.log("Chat history inserted successfully:", chatData);
  }
}

export async function getUserChatHistory(userId) {
  const { data: userChatData, error: chatError } = await supabase
    .from("chatbot_input")
    .select("*")
    .eq("author_id", userId);

  if (chatError) {
    console.error("Error deleting history:", chatError.message);
    return;
  }

  if (userChatData) {
    return userChatData;
  }
}

export async function getChatBotHistory(userId) {
  const { data: botChatData, error: chatError } = await supabase
    .from("chatbot_output")
    .select("*")
    .eq("author_id", userId);

  if (chatError) {
    console.error("Error deleting history:", chatError.message);
    return;
  }

  if (botChatData) {
    return botChatData;
  }
}
