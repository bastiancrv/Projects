import React, { useState } from "react";
import {
  Pressable,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  useColorScheme,
} from "react-native";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import tw from "twrnc";
import * as apiCall from "../../services/apiCall";

function BoardsCard({
  name,
  onToggleSelection,
  isSelected,
  onUpdateBoard,
}: {
  name: string;
  onDeleteBoard: (name: string) => void;
  onToggleSelection: (name: string) => void;
  isSelected: boolean;
  onUpdateBoard: (oldName: string, newName: string) => void;
}) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const thintDeg = colorScheme === "dark" ? "default" : "light";
  const tintimage = colorScheme === "dark" ? "white" : "black";
  const isDarkMode = colorScheme === "dark";

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const handleUpdateBoard = async () => {
    if (editedName.trim() && editedName !== name) {
      try {
        await apiCall.updateBoardByName(name, { name: editedName });

        onUpdateBoard(name, editedName);

        setIsEditing(false);
      } catch (error) {
        console.error("Error updating board name:", error);
      }
    } else {
      setIsEditing(false);
    }
  };

  const renderContent = () => {
    if (isEditing) {
      return (
        <View style={tw`flex-1 flex-row items-center`}>
          <TextInput
            value={editedName}
            onChangeText={setEditedName}
            autoFocus
            style={tw`flex-1 font-bold italic text-md font-[Poppins] ${
              isDarkMode ? "text-white" : "text-zinc-900"
            }`}
            onBlur={handleUpdateBoard}
            onSubmitEditing={handleUpdateBoard}
            returnKeyType="done"
          />
        </View>
      );
    }

    return (
      <>
        <Text
          style={tw`flex-1 font-bold italic text-md font-[Poppins] ${
            isDarkMode ? "text-white" : "text-zinc-900"
          }`}
        >
          {name}
        </Text>
        <Image
          source={require("../../assets/images/arrowtr.png")}
          resizeMode="contain"
          style={[tw`w-4 h-4`, { tintColor: tintimage }]}
        />
      </>
    );
  };

  return (
    <View style={tw`flex-row items-center justify-between gap-2`}>
      <TouchableOpacity
        style={tw`flex-1 overflow-hidden p-4 rounded-lg border ${
          isDarkMode ? "border-black" : "border-white/60"
        }  active:scale-95 transition-all px-4 flex-row items-center justify-between`}
        onPress={() => {
          if (!isEditing) {
            router.push(`/boardScreen?name=${name}` as any);
          }
        }}
        onLongPress={() => setIsEditing(true)}
      >
        <BlurView intensity={50} tint={thintDeg} style={tw`absolute inset-0`} />
        {renderContent()}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onToggleSelection(name)}
        style={tw`w-7 h-7 rounded-full ${
          isSelected ? "bg-red-600" : "bg-gray-400"
        } justify-center items-center`}
      >
        <Text style={tw`text-white`}>{isSelected ? "✖" : null}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default BoardsCard;
