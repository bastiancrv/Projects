import { View, Text, Image, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import "../services/apiCall";
import { App } from "../components/login";

export default function LoginPage() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#7A6F9B" : "#A095C0";

  return (
    <View
      style={{ backgroundColor }}
      className="flex-1 justify-center items-center px-6"
    >
      <Image
        source={require("@/assets/images/bbdino.png")}
        className="absolute top-16 w-48 h-48"
        resizeMode="contain"
      />

      <Text className="text-6xl text-white font-[Karantina]">
        Welcome to{" "}
        <Text className="text-green-300 dark:text-green-500">
          Trellosaurus!
        </Text>
      </Text>
      <Text className="text-md mb-10 text-gray-200 mt-2 font-[PoppinsItalic]">
        The best way to organize your tasks.
      </Text>

      <App />
    </View>
  );
}
