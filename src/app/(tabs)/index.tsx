import { View, Text } from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import * as Sentry from "@sentry/react-native";
import { Button } from 'react-native';
const ChatScreen = () => {
  return (
    <SafeAreaView    >
      <Text>ChatScreen</Text>
      <Button title='Try!' onPress={ () => { Sentry.captureException(new Error('First error')) }}/>
    </SafeAreaView >
  )
}

export default ChatScreen