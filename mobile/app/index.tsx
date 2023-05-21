import { useEffect } from "react";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { api } from "../src/lib/api";
import { styled } from "nativewind";
import * as SecureStore from "expo-secure-store";
import { TouchableOpacity, Text, View } from "react-native";
import { useRouter } from "expo-router";
import Stripes from "../src/assets/stripes.svg";
import NlwLogo from "../src/assets/nlw-spacetome-logo.svg";
const StyledStripes = styled(Stripes);

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/78a68c6984e48d9101e8",
};
export default function App() {
  const router = useRouter();

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
    try {
      const response = await api.post("/register", { code })
      const { token } = response.data
      await SecureStore.setItemAsync("token", token)
      router.push("/memories");
    }catch(error){
    console.log(error);
    }
   
  }
  useEffect(() => {
    // retorna o http para ser usado no callback do github para autenticação!
    // console.log(
    //     'response',
    //     makeRedirectUri({
    //       scheme: 'nlwspacetime',
    //     }),
    //   )
    if (response?.type === "success") {
      const { code } = response.params;

    handleGithubAuto(code) 

      
    } 
  }, [response]);

  return (
    <View className="px-8 py-10 flex-1 relative items-center">
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
          onPress={() => {
            signInWithGithub();
          }}
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
    </View>
  );
}
