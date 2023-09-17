import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Provider } from "../context/auth";
import { AccountProvider } from "../context/account";
import { WalletConnectModal } from "@walletconnect/modal-react-native";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { avalanche, bsc, lineaTestnet, linea, goerli, avalancheFuji, arbitrumGoerli } from "wagmi/chains";
import { PortalProvider } from "@gorhom/portal";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, avalanche, bsc, lineaTestnet, linea, goerli, avalancheFuji, arbitrumGoerli],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/Inter-VariableFont_slnt.ttf"),
    InterBold: require("../assets/fonts/Inter-Black.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const providerMetadata = {
  name: "Verbal-Dapp",
  description:
    "A web3 space to grow and learn a language, with NFTS and token rewards",
  url: "http://localhost:8081/",
  icons: ["https://your-project-logo.com/"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

function RootLayoutNav() {
  return (
    <PortalProvider>
      <AccountProvider>
        <Provider>
          <WagmiConfig config={config}>
            <WalletConnectModal
              projectId={process.env.EXPO_PUBLIC_WALLETCONNECT_PROJECTID}
              providerMetadata={providerMetadata}
            />
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: "#000000",
                },
              }}
            >
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="PodcastPlayer"
                options={{
                  presentation: "modal",
                }}
              />
              <Stack.Screen
                name="mintProfile"
                options={{
                  presentation: "modal",
                }}
              />
            </Stack>
          </WagmiConfig>
        </Provider>
      </AccountProvider>
    </PortalProvider>
  );
}
