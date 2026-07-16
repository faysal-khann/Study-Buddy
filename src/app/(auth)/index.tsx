import { View, Text } from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context"
import useSocialAuth from '@/hooks/useSocialAuth';
import { LinearGradient } from 'expo-linear-gradient';
const AuthScreen = () => {

  const {handleSocialAuth, loading} = useSocialAuth();
  const isLoading = loading !== null;
  return (
    <View className="flex-1  bg-background text-foreground">
      <View className='absolute inset-0'>
        <LinearGradient
          colors={['#FF6B6B', '#4ECDC4']}
          style={{ flex: 1 }}
        />
      </View>
      
    </View>
  )
}

export default AuthScreen