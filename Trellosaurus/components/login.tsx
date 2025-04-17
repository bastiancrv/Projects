import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import AddButton from "../components/Trellosaurus/AddButton";

const TRELLO_API_KEY = process.env.EXPO_PUBLIC_TRELLO_API_KEY;
const APP_NAME = "Trellosaurus";

export function App() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const router = useRouter();

  const login = async () => {
    const redirectUri = Linking.createURL("/auth");
    const authUrl = `https://trello.com/1/authorize?expiration=never&name=${APP_NAME}&scope=read,write&response_type=token&key=${TRELLO_API_KEY}&callback_method=fragment&return_url=${redirectUri}`;

    const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);

    if (result.type === "success" && result.url) {
      const token = result.url.split("token=")[1];
      setAuthToken(token);
      await AsyncStorage.setItem("authToken", token);
      router.replace("/");
    } else {
      console.error("Erreur d'authentification:", result);
    }
  };

  return <AddButton text="Connexion with Trello" login onPress={login} />;
}
