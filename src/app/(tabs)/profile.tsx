import { COLORS } from "@/lib/theme";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Sentry from '@sentry/react-native';
const MENU_ITEMS = [
  {
    icon: "notifications-outline",
    label: "Notifications",
    color: COLORS.primary,
  },
  { icon: "bookmark-outline", label: "Saved Resources", color: COLORS.accent },
  {
    icon: "time-outline",
    label: "Study History",
    color: COLORS.accentSecondary,
  },
  { icon: "settings-outline", label: "Settings", color: COLORS.textMuted },
];

const ProfileScreen = () => {
  const { signOut } = useAuth();
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1  bg-background">
      {/* HHeader */}
      <View className="px-5 py-3 ">
        <Text className="text-2xl font-bold text-foreground">Profile</Text>
      </View>

      {/* Profile card */}

      <View className="items-center py-3">
        <View className="mb-3 relative">
          <Image
            source={{ uri: user?.imageUrl }}
            className="w-20 h-20 rounded-full"
          />
          <View className="absolute bottom-[2px] right-[2px] h-[18px] w-[18px] rounded-[9px] bg-accent-secondary border-[3px] border-background" />
        </View>
        <Text className="text-lg font-semibold text-foreground">
          {user?.firstName} {user?.lastName}
        </Text>
        <Text className="text-sm text-foreground/70">
          {user?.primaryEmailAddress?.emailAddress}
        </Text>

        <View className="mt-2 flex-row items-center gap-1.5 rounded-full bg-[#FDCB6E1E] px-3.5 py-1.5">
          <Ionicons name="flame" size={16} color="#FDCB6E" />
          <Text className="text-sm font-semibold text-[#FDCB6E]">
            7 day study streak
          </Text>
        </View>
      </View>

      <View className=" flex-row gap-3 mt-2 px-5 mb-6">
        <View className="flex-1 items-center rounded-2xl border border-border bg-surface  px-4 py-4">
          <Text className="text-sm text-foreground/70">Study Time</Text>
          <Text className="text-lg font-semibold text-foreground">2h 30m</Text>
        </View>
        <View className="flex-1 items-center rounded-2xl border border-border bg-surface  px-4 py-4">
          <Text className="text-sm text-foreground/70">Completed</Text>
          <Text className="text-lg font-semibold text-foreground">15</Text>
        </View>
        <View className="flex-1 items-center rounded-2xl border border-border bg-surface  px-4 py-4">
          <Text className="text-sm text-foreground/70">Completed</Text>
          <Text className="text-lg font-semibold text-foreground">15</Text>
        </View>
      </View>

      {/* <View className="px-5 mb-3 ">

        <View className="flex-row items-center justify-between border border-border rounded-2xl bg-surface px-4 py-3 mb-3">
          <View className=" flex-row gap-4   py-3">
            <Ionicons name="notifications" size={20} color="#8E8E93" />
            <Text className="text-lg font-semibold text-foreground">
              Notifications
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </View>

        <View className="flex-row items-center justify-between border border-border rounded-2xl bg-surface px-4 py-3 mb-3">
          <View className=" flex-row gap-4   py-3">
            <Ionicons name="bookmarks" size={20} color="#8E8E93" />
            <Text className="text-lg font-semibold text-foreground">
              Saved Study Materials
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </View>


        <View className="flex-row items-center justify-between border border-border rounded-2xl bg-surface px-4 py-3 mb-3">
          <View className=" flex-row gap-4   py-3">
            <Ionicons name="time" size={20} color="#8E8E93" />
            <Text className="text-lg font-semibold text-foreground">
              Study History
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </View>

        <View className="flex-row items-center justify-between border border-border rounded-2xl bg-surface px-4 py-3 mb-3">
          <View className=" flex-row gap-4   py-3">
            <Ionicons name="settings" size={20} color="#8E8E93" />
            <Text className="text-lg font-semibold text-foreground">
              Settings
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </View>
      </View>        */}

      <View className="gap-1 px-5">
        {MENU_ITEMS.map((item) => (
          <Pressable
            key={item.label}
            className="mb-1.5 flex-row items-center gap-3.5 rounded-xl border border-border bg-surface px-4 py-4"
          >
            <View
              className="h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${item.color}15` }}
            >
              <Ionicons name={item.icon as any} size={20} color={item.color} />
            </View>
            <Text className="flex-1 text-base font-medium text-foreground">
              {item.label}
            </Text>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={COLORS.textSubtle}
            />
          </Pressable>
        ))}
      </View>

      {/* Sign out button */}
      <Pressable
        className="mt-6 flex-row items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 mx-5"
        onPress={async () => {
          try {
            await signOut();
            Sentry.logger.info('User signed out successfully', {
              userId: user?.id,
              email: user?.primaryEmailAddress?.emailAddress,
            });
          }catch (error) {
              Sentry.logger.error('Error signing out', {
                error: error,
                userId: user?.id, 
              });
            Sentry.captureException(error);
            Alert.alert('Error signing out', 'An error occurred while signing out. Please try again.');
          }
         
        }}
            

      >
        <View className="flex-row items-center justify-center rounded-xl gap-2"
            
        >
          <Ionicons name="log-out-outline" size={20} color={COLORS.accent} />

          <Text className="text-base font-medium text-danger">
            Sign Out
          </Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;
