import { useEffect } from "react";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { StatusBar } from "expo-status-bar";
import { api } from "../src/lib/api";
import { styled } from "nativewind";
import * as SecureStore from "expo-secure-store";
import { ImageBackground, TouchableOpacity, Text, View } from "react-native";
import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";
import blurbg from "../src/assets/bg-blur.png";
import Stripes from "../src/assets/stripes.svg";
import NlwLogo from "../src/assets/nlw-spacetome-logo.svg";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { useRouter } from "expo-router";
const StyledStripes = styled(Stripes);

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/78a68c6984e48d9101e8",
};
export default function App() {
  const router = useRouter();
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: "78a68c6984e48d9101e8",
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "myspacetime",
      }),
    },
    discovery
  );
  async function handleGithubAuto(code: string) {
    const response = await api.post("/register", { code });
    const { token } = response.data

    await SecureStore.setItemAsync('token',token )
   
    
    router.push('/memories')
    
  }
  useEffect(() => {
    // console.log(
    //     'response',
    //     makeRedirectUri({
    //       scheme: 'nlwspacetime',
    //     }),
    //   )
    if (response?.type === "success") {
        
      const { code } = response.params;
      
      handleGithubAuto(code);
      
    }else{'deu erro'}
  }, [response]);

  if (!hasLoadedFonts) {
    return null;
  }

  return (
    <ImageBackground
      source={blurbg}
      className="bg-gray-900 px-8 py-10 flex-1 relative items-center"
      imageStyle={{ position: "absolute", left: "-100%" }}
    >
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6  ">
        <NlwLogo />
        <View className="space-y-2 ">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>
        <TouchableOpacity
          onPress={()=>{signInWithGithub()}}
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-3"
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar Lembrança
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center font-body text-sm leading-relaxed text-gray-100">
        Feito com 💜 no NLW da Rocketseat
      </Text>
      <StatusBar style="light" translucent />
    </ImageBackground>
  );
}


