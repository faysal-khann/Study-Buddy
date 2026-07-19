import { getGreetingForHour } from "@/lib/utils";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppContext } from "@/contexts/AppProvider";
import { COLORS } from "@/lib/theme";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import type { Channel } from "stream-chat";
import { ChannelList } from "stream-chat-react-native-core";

const ChatScreen = () => {
  const { setChannel } = useAppContext();
  const router = useRouter();
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const filter = {};

  console.log(search);

  const channelRenderFilterFn = (channels: Channel[]) => {
    if (!search.trim()) return channels;

    const q = search.toLowerCase();

    return channels.filter((channel) => {
      const name =
        (channel.data?.name as string | undefined)?.toLowerCase() ?? "";
      const cid = channel.cid.toLowerCase();
      return name.includes(q) || cid.includes(q);
    });
  };

  return (
    <SafeAreaView className="flex-1  bg-background">
      <View className="px-5 pt-3 pb-2 ">
        <Text className="text-sm font-bold text-foreground px-4 py-2">
          {getGreetingForHour()}, {user?.firstName || "there"}
        </Text>
      </View>

      {/* search bar */}
      <View className="mx-5 mb-3 flex-row items-center gap-2.5 px-3.5 py-1 bg-surface border-b border-border rounded-2xl">
        <Ionicons name="search" size={18} color={COLORS.textMuted} />
        <TextInput
          className="flex-1 text-[15px] text-foreground"
          placeholder="Search study rooms..."
          placeholderTextColor={COLORS.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View className="flex-row mx-5 mb-3 gap-2.5 px-3.5 py-1 ">
        <Ionicons name="chatbubble" size={13} color={COLORS.primaryLight} />
        <Text className="text-[13px] text-primary-light">
          Chat with your study buddies in real-time!
        </Text>
      </View>

      {/* ChannelList */}
      <ChannelList
        // filters={filter}
        options={{ state: true, watch: true, presence: true }}
        sort={{ last_message_at: -1 }}
        channelRenderFilterFn={channelRenderFilterFn}
        onSelect={(channel) => {
          setChannel(channel);
          // router.push("/(tabs)/chat/[id]", { params: { id: channel.id } });
        }}
        additionalFlatListProps={{
          contentContainerStyle: { flexGrow: 1 },
        }}

       
        // EmptyStateIndicator={() => <Text className="flex-1 text-white">Hey start chatting</Text>}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
