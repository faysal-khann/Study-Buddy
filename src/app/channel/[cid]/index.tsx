import { EmptyState } from "@/components/EmptyState";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { useAppContext } from "@/contexts/AppProvider";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect } from "react";
import { Touchable, TouchableOpacity, View ,Text} from "react-native";
import { COLORS } from "@/lib/theme";
import { Channel, MessageInput, MessageList, useChatContext } from "stream-chat-expo";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
const ChannelScreen = () => {
  const { channel, setThread } = useAppContext();
  const { client } = useChatContext();

  const router = useRouter();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  let displayName = "";
  let avatarUrl = "";
  if (channel) {
    const members = Object.values(channel.state.members);
    const otherMembers = members.filter(
      (member) => member.user?.id !== client.userID,
    );

    displayName = otherMembers[0]?.user?.name!;
    avatarUrl = otherMembers[0].user?.image!;
  }

  if (!channel) {
    return <FullScreenLoader message="Channel not found" />;
  }
  useLayoutEffect(() => {
    navigation.setOptions({
  
      headerShown: true,
      headerStyle: {
        backgroundColor: COLORS.surface,
        shadowColor: "transparent",
      },
     
      headerTintColor: COLORS.text,
      // headerLeft: () => (
      //   // <TouchableOpacity>
      //   //   <Ionicons
      //   //     name="arrow-back"
      //   //     size={24}
      //   //   />
      //   // </TouchableOpacity>
      // )

      headerTitle: () => (
        <View className="flex-row items-center">
          {avatarUrl ? (
            <Image
              source={avatarUrl}
              style={{ width: 32, height: 32, borderRadius: 16, marginRight: 10 }}
            />
          ) : (
            <View
              className="mr-2.5 h-8 w-8 items-center justify-center rounded-full"
              style={{ backgroundColor: COLORS.primary }}
            >
              <Text className="text-base font-semibold text-foreground">
                {displayName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <Text className="font-semibold text-foreground">{displayName}</Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
           
          }}
        >
          <Ionicons name="videocam-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      ),

    })
  }, [navigation, displayName, avatarUrl, channel?.cid, channel?.id, router]);
  return (
    <View className="flex-1 bg-border">
      <Channel
        channel={channel}
        keyboardVerticalOffset={headerHeight}
        EmptyStateIndicator={() => (
          <EmptyState
            icon="chatbubbles-outline"
            title="No messages yet"
            subtitle="Start the conversation by sending a message."
          />
        )}
      >
        <MessageList 
            onThreadSelect={(thread) => {
              setThread(thread);
               router.push(`/channel/${channel.cid}/thread/${thread?.cid}`);
            }}
            
        />

        <View className=" pb-5 bg-surface">
          <MessageInput 
            audioRecordingEnabled
          />
        </View>
      </Channel>
    </View>
  );
}
 
 

export default ChannelScreen;
