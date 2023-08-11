import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

const ExpoSecureStoreAdapter = {
  getItem: (key) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key, value) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key) => {
    SecureStore.deleteItemAsync(key);
  },
};

// const supabaseUrl = process.env.BASE_URL;

const supabaseUrl = "https://ubkmitudjbhloxyfqvjx.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVia21pdHVkamJobG94eWZxdmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA2NjU0MDcsImV4cCI6MjAwNjI0MTQwN30.8UDdJ-_OHCEJY-vogvjJSEKAm0SXeQmfCrpfy5pg-A4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
