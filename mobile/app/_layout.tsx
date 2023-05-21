import blurbg from "../src/assets/bg-blur.png";
import Stripes from "../src/assets/stripes.svg";
import NlwLogo from "../src/assets/nlw-spacetome-logo.svg";
import * as SecureStore from "expo-secure-store";
import { ImageBackground } from "react-native";
import { styled } from "nativewind";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
const StyledStripes = styled(Stripes);
export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    null | boolean
  >(null);

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });
  useEffect(() => {
    SecureStore.getItemAsync("token").then((token) => {
      // converte token (strin) para boolean
      setIsUserAuthenticated(!!token);
    });
  }, []);
  if (!hasLoadedFonts) {
    return <SplashScreen />;
  }

  return (
    <ImageBackground
      source={blurbg}
      className="bg-gray-900  flex-1 relative "
      imageStyle={{ position: "absolute", left: "-100%" }}
    >
      <StyledStripes className="absolute left-2" />
      <StatusBar style="light" translucent />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated}/>
        <Stack.Screen name="newMemory" />
        <Stack.Screen name="memories" />
      </Stack>
    </ImageBackground>
  );
}
