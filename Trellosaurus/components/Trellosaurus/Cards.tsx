import { router } from "expo-router";
import React from "react";
import {
  Text,
  TouchableOpacity,
  useColorScheme,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";
import tw from "twrnc";

interface CardsProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  name: string;
  boardName: string;
  listName: string;
}

const Cards = ({
  name,
  boardName,
  listName,
  onPress,
  style,
  textStyle,
}: CardsProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() =>
        router.push(
          `/cardScreen?name=${encodeURIComponent(
            name
          )}&listName=${encodeURIComponent(
            listName
          )}&boardName=${encodeURIComponent(boardName)}`
        )
      }
      style={[
        tw`rounded-lg px-3 py-2 mb-2`,
        {
          backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
          borderColor: isDark ? "#374151" : "#E5E7EB",
          borderWidth: 1,
          shadowColor: isDark ? "#000" : "#999",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
          elevation: 4,
        },
        style,
      ]}
    >
      <Text
        style={[
          tw`text-base`,
          { color: isDark ? "#FFFFFF" : "#000000" },
          textStyle,
        ]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default Cards;
