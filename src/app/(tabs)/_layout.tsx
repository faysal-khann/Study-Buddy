import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  console.log({
    isLoaded,
    isSignedIn,
  });
  if (!isLoaded) {
    return null;
  }
  if (!isSignedIn) {
    return <Redirect href={"/(auth)"} />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#6C5CE7",
        tabBarInactiveTintColor: "#8E8E93",

        tabBarShowLabel: true,

        tabBarStyle: {
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 20,

          height: 70,

          backgroundColor: "#FFFFFF",

          borderRadius: 35,

          borderTopWidth: 0,

          elevation: 12,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.15,
          shadowRadius: 10,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Chats",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-ellipses" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
