import * as SecureStore from "expo-secure-store";

// Function to get the token from the headers
export const getTokenFromHeaders = (headers) => {
  const setCookieHeader = headers["set-cookie"];
  if (
    setCookieHeader &&
    Array.isArray(setCookieHeader) &&
    setCookieHeader.length > 0
  ) {
    // Assuming the token is in the first cookie
    const cookieString = setCookieHeader[0];
    const startIndex = cookieString.indexOf("session=") + "session=".length;
    const endIndex = cookieString.indexOf(";", startIndex);
    const sessionToken = cookieString.substring(startIndex, endIndex);
    return sessionToken;
  }
  return null; // Token not found
};

// Storing the token
export const storeSessionToken = async (sessionToken) => {
  try {
    await SecureStore.setItemAsync("sessionToken", sessionToken);
  } catch (error) {
    console.error("Error storing session token:", error);
  }
};

// Getting the token
export const getSessionToken = async () => {
  try {
    const sessionToken = await SecureStore.getItemAsync("sessionToken");
    return sessionToken;
  } catch (error) {
    console.error("Error retrieving session token:", error);
    return null;
  }
};

// Usage example
storeSessionToken("your_session_token_here");
// Later, when you need to access the token
getSessionToken().then((token) => {});
