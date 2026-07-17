import useSocialAuth from "@/hooks/useSocialAuth";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
const AuthScreen = () => {
  const { handleSocialAuth, loading } = useSocialAuth();

  const isLoading = loading !== null;

 
  return (
    <View className="flex-1  bg-background">
      <View className="absolute inset-0">
        <LinearGradient
          colors={["#0F0E17", "#1A1A2E", "#2D1B69", "#1A1A2E", "#0F0E17"]}
          locations={[0, 0.25, 0.5, 0.75, 1]}
          style={{ width: "100%", height: "100%" }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </View>
      <SafeAreaView className="flex-1 justify-between">
        {/* Top section */}
        <View>
          <View className=" items-center  pt-10 pb-2">
            <View className="w-16 h-16 rounded-[20px] bg-primary/15 items-center justify-center border border-primary/20">
              <Ionicons name="school" size={30} color="#A29BFE" />
            </View>
            <Text className="text-3xl font-bold text-foreground pt-2">
              StudyApp
            </Text>
            <Text className="text-sm text-foreground/70">
              Learn together, grow together.
            </Text>
          </View>
          <View className="items-center px-6 mt-4">
            <Image
              source={require("@/assets/images/auth.png")}
              style={{ width: 320, height: 350 }}
            />
          </View>

          <View className="flex-row justify-center gap-3 px-6 mt-5">
            {[
              {
                icon: "videocam" as const,
                label: "Video Calls",
                color: "#A29BFE",
                bg: "bg-primary/12 border-primary/20",
              },
              {
                icon: "chatbubbles" as const,
                label: "Study Rooms",
                color: "#FF6B6B",
                bg: "bg-accent/12 border-accent/20",
              },
              {
                icon: "people" as const,
                label: "Find Partners",
                color: "#00B894",
                bg: "bg-accent-secondary/12 border-accent-secondary/20",
              },
            ].map((chip) => (
              <View
                key={chip.label}
                className={`flex-row items-center gap-1.5 px-3.5 py-2 rounded-full border ${chip.bg}`}
              >
                <Ionicons name={chip.icon} size={14} color={chip.color} />
                <Text className="text-foreground-muted text-xs font-semibold tracking-wide">
                  {chip.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="px-8 pb-4">
          <View className="flex-row items-center gap-3 mb-6">
            <View className="flex-1 h-px bg-border" />
            <Text className="text-foreground-subtle text-xs font-medium tracking-widest uppercase">
              Continue with
            </Text>
            <View className="flex-1 h-px bg-border" />
          </View>

          <View className="flex-row items-center justify-center mb-4 gap-4">
            <Pressable
              className="size-12 rounded-2xl bg-white items-center justify-center active:scale-95 shadow-lg shadow-white/10"
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
              disabled={isLoading}

              accessibilityRole="button"
              accessibilityLabel="Sign in with Google"
              onPress={() => handleSocialAuth("oauth_google")}
            >
              {isLoading && loading === "oauth_google" ? (
                <ActivityIndicator size="small" color="#6C5CE7" />
              ) : (
                <Image
                  source={require("@/assets/images/google.png")}
                  style={{ width: 30, height: 30 }}
                />
              )}
            </Pressable>

            <Pressable
              className="size-12 rounded-2xl bg-white items-center justify-center active:scale-95 shadow-lg shadow-white/10"
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel="Sign in with Facebook"
              onPress={() => handleSocialAuth("oauth_facebook")}
            >
              {isLoading && loading === "oauth_facebook" ? (
                <ActivityIndicator size="small" color="#6C5CE7" />
              ) : (
                <Ionicons name="logo-facebook" size={30} color="#0984E3" />
              )}
            </Pressable>

            <Pressable
              className="size-12 rounded-2xl bg-white items-center justify-center active:scale-95 shadow-lg shadow-white/10"
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel="Sign in with GitHub"
              onPress={() => handleSocialAuth("oauth_github")}
            >
              {isLoading && loading === "oauth_github" ? (
                <ActivityIndicator size="small" color="#6C5CE7" />
              ) : (
                <Ionicons name="logo-github" size={30} color="#000" />
              )}
            </Pressable>
          </View>
          <Text className="text-foreground-subtle text-[11px] text-center leading-4">
            By continuing, you agree to our{" "}
            <Text className="text-primary-light">Terms of Service</Text> and{" "}
            <Text className="text-primary-light">Privacy Policy</Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AuthScreen;
