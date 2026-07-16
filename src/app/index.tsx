import { Text, View, StyleSheet } from "react-native";
import { Link, Redirect } from "expo-router";
import {Image} from "expo-image";
import "../../global.css"
import { useAuth } from "@clerk/clerk-expo";
export default function Index() {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
     return <Redirect href="/(auth)/index" />;
  }

  return (
    <View style={styles.container}>
      <Text className="text-red-500 text-4xl">Edit src/app/index.tsx to edit this screen 123.</Text>
      <Link href="/about">About screen link</Link>
      <Image source={require("../../assets/images/icon.png")} style={{ width: 50, height: 50 }} />
      <Image source={"https://images.unsplash.com/photo-1783962211635-ef0af72c7759?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"} style={{ width: "100%", height: "50%" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
