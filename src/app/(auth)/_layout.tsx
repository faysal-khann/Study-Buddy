import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();
 console.log({
    isLoaded,
    isSignedIn,
  });
  if (!isLoaded) return null;

  if (isSignedIn) {
    return <Redirect href={"/(tabs)"} />;
  }
  

  return <Stack screenOptions={{ headerShown: false }} />;
}