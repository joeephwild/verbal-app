import { supabase } from "../supabase";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

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
    return data;
  } else {
    console.log("User not found.");
  }
}

export async function updateUserProfile(userId, updatedProfileData) {
  console.log({ userId, updatedProfileData });
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
    return data;
  } else {
    console.log("User not found or no changes made.");
  }
}

export const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    let file = result.assets[0].uri;
    const uri = handleUpload(file);
    return uri;
  }
};

export const pickVideo = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.canceled) {
    let file = result.assets[0].uri;
    const uri = handleUpload(file);
    alert("upload successfull");
    return `https://gateway.pinata.cloud/ipfs/${uri}`;
  }
};

export const uploadJson = async (metadata) => {
  try {
    const pinataOptions = {
      cidVersion: 0,
      wrapWithDirectory: false,
    };

    const pinataContent = {
      podcastContent: {
        metadataDetails: metadata,
      },
    };

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      {
        pinataOptions,
        pinataContent,
      },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'pinata_api_key': process.env.EXPO_PUBLIC_PINATA_API_KEY,
          'pinata_secret_api_key': process.env.EXPO_PUBLIC_PINATAAPI_SECRET,
          'Authorization': `Bearer ${process.env.EXPO_PUBLIC_PINATAJWT}`,
        },
      }
    );
    return response.data.IpfsHash;
  } catch (error) {
    console.error('Error uploading image to Pinata:', error.message);
    throw error;
  }
};

export const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", {
    uri: file,
    type: `test/${file.split(".")[1]}`, // Adjust the type based on the actual image type
    name: `test.${file.split(".")[1]}`, // Adjust the name based on your preference
  });

  try {
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          pinata_api_key: process.env.EXPO_PUBLIC_PINATA_API_KEY,
          pinata_secret_api_key: process.env.EXPO_PUBLIC_PINATAAPI_SECRET,
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_PINATAJWT}`,
          accept: "application/json",
        },
      }
    );

    console.log("Image uploaded to Pinata:", response.data.IpfsHash);
    return response.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading image to Pinata:", error);
  }
};
