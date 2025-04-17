import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, Text, useColorScheme } from "react-native";
import tw from "twrnc";

interface AddListsButtonProps {
  text: string;
  onPress?: () => void;
  delete?: boolean;
  login?: boolean;
  add?: boolean;
  validate?: boolean;
  members?: boolean;
}

function AddListsButton({
  text,
  onPress,
  delete: isDelete,
  login: isLogin,
  add: isAddBtn,
  validate: isValidate,
  members: isMembers,
}: AddListsButtonProps) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`flex-row items-center p-4 pl-2 rounded-lg shadow-md justify-center border border-transparent ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      } ${isDelete ? "border border-red-500 bg-red-100" : ""} ${
        isDelete && isDarkMode ? "bg-red-800/20" : ""
      } ${
        isLogin ? (isDarkMode ? "bg-green-500/70" : "bg-green-300") : ""
      } ${isValidate ? "bg-green-100 border border-green-500" : ""} ${
        isValidate && isDarkMode ? "bg-green-800/20" : ""
      } ${isMembers ? "p-1" : ""}`}
    >
      {isAddBtn ? (
        <Ionicons
          name="add"
          size={18}
          color={
            isDelete && isDarkMode
              ? "white"
              : isDelete
              ? "red"
              : isDarkMode
              ? "white"
              : "black"
          }
        />
      ) : isMembers ? (
        <Ionicons
          name="close"
          size={18}
          color={
            isDelete && isDarkMode
              ? "white"
              : isDelete
              ? "red"
              : isDarkMode
              ? "white"
              : "black"
          }
        />
      ) : null}

      <Text
        style={[
          tw`ml-2 text-sm ${isDarkMode ? "text-white" : "text-black"} ${
            isDelete ? "text-red-500" : ""
          }${isDelete && isDarkMode ? "text-white" : ""} ${
            isLogin ? "text-3xl text-white" : ""
          }`,
          isLogin && { fontFamily: "Karantina" }, 
          isValidate && tw`text-green-500`,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

export default AddListsButton;
