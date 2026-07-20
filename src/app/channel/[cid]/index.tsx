import { View, Text } from 'react-native'
import React from 'react'
import { useAppContext } from '@/contexts/AppProvider'
import { useChatContext } from 'stream-chat-expo'
import { useNavigation, useRouter } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'
import { FullScreenLoader } from '@/components/FullScreenLoader'

const ChannelScreen = () => {
  const {channel,setThread} = useAppContext()
  const {client} = useChatContext()

  const router = useRouter()
  const navigation =useNavigation()
  const headerHeight =useHeaderHeight()
  let displayName ="";
  let avaterUrl = "";
  if(channel){
    const members = Object.values(channel.state.members)
    const otherMembers = members.filter((member) => member.user?.id !== client.userID)

      displayName = otherMembers[0]?.user?.name!
      avaterUrl = otherMembers[0].user?.image!

  }

  if(!channel){
    return <FullScreenLoader message="Channel not found" />
  }
  return (
    <View className="flex-1 bg-border">
      
    </View>
  )
}

export default ChannelScreen