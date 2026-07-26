import ChatWrapper from "@/components/ChatWrapper";
import VideoProvider from "@/components/VideoProvider";
import { AppProvider } from "@/contexts/AppProvider";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import * as Sentry from "@sentry/react-native";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../../global.css";

Sentry.init({
  dsn: "https://bb86ece0e9923d4b8361647551453c1e@o4511740524429312.ingest.us.sentry.io/4511751633502208",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration({
      maskAllImages: false,
      maskAllVectors: false,

      maskAllText: false,
    }),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});
export default function RootLayout() {
  return (
    <ClerkProvider 
    publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    tokenCache={tokenCache}>
      <GestureHandlerRootView className="flex-1">
        <ChatWrapper>
          <VideoProvider>
            <AppProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
              </Stack>
            </AppProvider>
          </VideoProvider>
        </ChatWrapper>
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}
