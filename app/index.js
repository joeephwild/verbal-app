import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";
import { Link, Stack, useRouter } from "expo-router";

export default function Page() {
  const router = useRouter()
  return (
    <View className="flex-1  bg-[#010F15]">
      <StatusBar style="light" />
      <View className="bg-[#F70] h-[311.416px] rounded-b-[110px]">
        <SafeAreaView>
          <Text className="text-white">joseph web3 dev</Text>
        </SafeAreaView>
      </View>
    </View>
  );
}
