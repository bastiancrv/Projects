import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  Keyboard,
  ScrollView,
  Modal,
} from "react-native";
import { useColorScheme } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Lists from "../components/Trellosaurus/Lists";
import { Ionicons } from "@expo/vector-icons";
import AddButton from "../components/Trellosaurus/AddButton";
import { BlurView } from "expo-blur";
import * as apiCall from "../services/apiCall";
import tw from "twrnc";

export default function BoardScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#7A6F9B" : "#A095C0";

  const { name, refresh } = useLocalSearchParams();

  const boardName = Array.isArray(name)
    ? name[0].toLowerCase().trim()
    : name?.toLowerCase().trim();

  useEffect(() => {
    const fetchBoardData = async () => {
      let boardId: string | null = null;
      if (boardName) {
        boardId = await apiCall.getBoardIdByName(boardName);
      }
      if (boardId) {
        const getLists = apiCall.getAllListFromBoard();
        const response = await getLists(boardId);
        const lists = response.data;
      }
    };

    fetchBoardData();
  }, [boardName]);

  const [lists, setLists] = useState<string[]>([]);
  const [newListName, setNewListName] = useState<string>("");
  const [boards, setBoards] = useState<
    { name: string; selected: boolean; lists: string[] }[]
  >([]);
  const [showTextField, setShowTextField] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [animatedMarginBottom] = useState(new Animated.Value(0));
  const textInputRef = useRef<TextInput>(null);

  const addNewList = async () => {
    try {
      if (typeof name !== "string") return;

      const boardId = await apiCall.getBoardIdByName(name);
      if (!boardId) {
        console.error(`Aucun board trouvé avec le nom : ${name}`);
        return;
      }

      if (newListName.trim()) {
        await apiCall.createList(newListName, boardId);

        setLists([...lists, newListName]);
        setNewListName("");
        setShowTextField(false);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la nouvelle liste :", error);
    }
  };

  useEffect(() => {
    const fetchLists = async () => {
      if (typeof name !== "string") return;

      try {
        const boardId = await apiCall.getBoardIdByName(name);
        if (!boardId) {
          console.error(`Aucun board trouvé avec le nom : ${name}`);
          return;
        }

        const getLists = apiCall.getAllListFromBoard();
        const response = await getLists(boardId);
        const listsData = response.data as { id: string; name: string }[];

        setLists(listsData.map((list) => list.name));
      } catch (error) {
        console.error("Erreur lors de la récupération des listes :", error);
      }
    };

    fetchLists();
  }, [name, refresh]);

  const handleDeleteList = async (listName: string) => {
    try {
      await apiCall.archiveListByName(listName, boardName);

      setLists((prevLists) => prevLists.filter((list) => list !== listName));
    } catch (error) {
      console.error("Erreur lors de la suppression de la liste :", error);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        Animated.timing(animatedMarginBottom, {
          toValue: 20,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
        Animated.timing(animatedMarginBottom, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const thintDeg = colorScheme === "dark" ? "default" : "light";

  const handleBlur = () => {
    if (!newListName.trim()) {
      setShowTextField(false);
    }
  };

  const handleUpdateList = async (listName: string, newName: string) => {
    try {
      await apiCall.updateListByName(listName, boardName, { name: newName });
      setLists((prevLists) =>
        prevLists.map((list) => (list === listName ? newName : list))
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la liste :", error);
    }
  };

  const isDark = colorScheme === "dark";

  const inputBorderColor = isDark ? "#2F2F2F" : "#F9F9F9";

  const [memberEmail, setMemberEmail] = useState("");
  const [showAddMemberField, setShowAddMemberField] = useState(false);
  const [isAddMemberModalVisible, setIsAddMemberModalVisible] = useState(false);

  const handleAddMemberToBoard = async () => {
    if (!memberEmail.trim()) {
      Alert.alert("Erreur", "Veuillez entrer une adresse email.");
      return;
    }

    try {
      await apiCall.addMemberToBoardByName(boardName, memberEmail.trim());
      Alert.alert("Succès", `${memberEmail} a été invité sur le board.`);
      setMemberEmail("");
    } catch (error) {
      console.error("Erreur lors de l'ajout du membre :", error);
      Alert.alert("Erreur", "Impossible d’ajouter ce membre. Vérifie l’email.");
    }
  };

  const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    },
  });

  return (
    <View
      className="flex-1 flex-col gap-10 px-10 pt-10 pb-20"
      style={{ backgroundColor }}
    >
      <View className="flex flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() =>
            router.replace({
              pathname: "/homeScreen",
              params: {
                refresh: Date.now().toString(),
              },
            })
          }
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-5xl text-white text-center italic underline mb-2 font-[Karantina]">
          {name}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setMemberEmail("");
            setIsAddMemberModalVisible(true);
          }}
          style={[
            tw`p-3 rounded-full`,
            {
              backgroundColor: isDark ? "#5B4E76" : "#7A6F9B",
            },
          ]}
        >
          <Ionicons name="person-add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ gap: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {lists.map((listName, index) => (
          <Lists
            key={index}
            name={listName}
            boardName={boardName}
            handleDeleteList={handleDeleteList}
            handleUpdateList={handleUpdateList}
            refreshKey={refresh?.toString()}
          />
        ))}
        <KeyboardAvoidingView
          className="w-full"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Animated.View
            className="w-full"
            style={{
              marginBottom: animatedMarginBottom,
            }}
          >
            {!showTextField ? (
              <AddButton
                text="Add a list"
                onPress={() => {
                  setShowTextField(true);
                  setTimeout(() => {
                    textInputRef.current?.focus();
                  });
                }}
              />
            ) : (
              <View className="overflow-hidden rounded-lg">
                <BlurView
                  intensity={80}
                  tint={thintDeg}
                  style={{ ...StyleSheet.absoluteFillObject }}
                />
                <TextInput
                  ref={textInputRef}
                  placeholder="List name"
                  className="overflow-hidden rounded-lg border border-white/60 dark:border-black transition-all p-4 px-3 text-zinc-900 dark:text-white font-[Poppins]"
                  value={newListName}
                  onChangeText={(text) => setNewListName(text)}
                  onSubmitEditing={() => {
                    addNewList();
                  }}
                  onBlur={handleBlur}
                  returnKeyType="send"
                />
              </View>
            )}
            {showAddMemberField && (
              <TextInput
                placeholder="Adresse email"
                placeholderTextColor={colorScheme === "dark" ? "#aaa" : "#555"}
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  padding: 12,
                  borderRadius: 8,
                  color: colorScheme === "dark" ? "white" : "black",
                  backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
                  marginTop: 16,
                }}
                value={memberEmail}
                onChangeText={setMemberEmail}
              />
            )}
          </Animated.View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Modal
        visible={isAddMemberModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddMemberModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: isDark ? "#333" : "#fff" },
            ]}
          >
            <TextInput
              style={[
                tw`border-2 p-4 rounded-md w-full`,
                {
                  borderColor: inputBorderColor,
                  color: isDark ? "white" : "black",
                  backgroundColor: isDark ? "#222" : "#fff",
                },
              ]}
              value={memberEmail}
              onChangeText={setMemberEmail}
              placeholder="Adresse email"
              placeholderTextColor={isDark ? "#888" : "#aaa"}
              autoFocus
            />
            <View style={tw`flex-row justify-between gap-4 mt-4`}>
              <AddButton
                delete
                text="Annuler"
                onPress={() => setIsAddMemberModalVisible(false)}
              />
              <AddButton
                add
                validate
                text="Ajouter"
                onPress={() => {
                  handleAddMemberToBoard();
                  setIsAddMemberModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
