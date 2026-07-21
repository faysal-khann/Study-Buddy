import { View, Text } from 'react-native'
import React from 'react'
import { useAppContext } from '@/contexts/AppProvider';
import { useHeaderHeight } from '@react-navigation/elements';
import { FullScreenLoader } from '@/components/FullScreenLoader';
import { Channel, MessageInput, MessageList, Thread, useChatContext } from "stream-chat-expo";
import {SafeAreaView} from 'react-native-safe-area-context';
import { EmptyState } from '@/components/EmptyState';
const ThreadScreen = () => {

  const { channel, thread, setThread } = useAppContext();
  const headerHeight = useHeaderHeight();

  if (channel === null) {
    return <FullScreenLoader message="Channel not found" />;
  }



  return (
    <SafeAreaView className='flex-1 bg-surface'>
       <Channel
              channel={channel}
              keyboardVerticalOffset={headerHeight}
              thread={thread}
              threadList
              EmptyStateIndicator={() => (
                <EmptyState
                  icon="chatbubbles-outline"
                  title="No messages yet"
                  subtitle="Start the conversation by sending a message."
                />
              )}
            >

              <View className="flex-1 justify-start">
                <Thread 
                  onThreadDismount={() => setThread(null)}
                />
              </View>

            </Channel>
    </SafeAreaView>
  )
}

export default ThreadScreen