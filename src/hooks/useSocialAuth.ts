import { useSSO } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";
const useSocialAuth = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();
  const handleSocialAuth = async (
    strategy: "oauth_google" | "oauth_facebook" | "oauth_github",
  ) => {
    if (loading) return;
    setLoading(strategy);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });

      if (!createdSessionId || !setActive) {
        const providerName =
          strategy === "oauth_google"
            ? "Google"
            : strategy === "oauth_facebook"
              ? "Facebook"
              : "GitHub";
        Alert.alert(
          "Authentication Error",
          `Failed to create a session with ${providerName}. Please try again.`,
        );
        return;
      }
      await setActive({ session: createdSessionId });
    } catch (error) {
      console.log("Error during social authentication:", error);
      const providerName =
        strategy === "oauth_google"
          ? "Google"
          : strategy === "oauth_facebook"
            ? "Facebook"
            : "GitHub";
      Alert.alert(
        "Authentication Error",
        `An error occurred while authenticating with ${providerName}. Please try again.`,
      );
    } finally {
      setLoading(null);
    }
  };
  return {handleSocialAuth, loading};
};

export default useSocialAuth;
