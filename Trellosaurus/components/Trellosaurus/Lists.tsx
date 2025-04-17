import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import Cards from "./Cards";
import { BlurView } from "expo-blur";
import { useColorScheme } from "react-native";
import * as apiCall from "../../services/apiCall";

interface ListsProps {
  name: string;
  boardName: string;
  handleDeleteList: (name: string) => void;
  handleUpdateList: (listNamme: string, newName: string) => void;
  refreshKey?: string;
}

function Lists({
  name,
  boardName,
  handleDeleteList,
  handleUpdateList,
  refreshKey,
}: ListsProps) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const isDarkMode = colorScheme === "dark";

  const [cards, setCards] = useState<string[]>([]);
  const [newCardName, setNewCardName] = useState<string>("");
  const [showTextField, setShowTextField] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const textInputRef = useRef<TextInput>(null);
  const thintDeg = isDarkMode ? "default" : "light";
  const [editableName, setEditableName] = useState(name);
  useEffect(() => {
    setEditableName(name);
  }, [name]);
  const [isEditing, setIsEditing] = useState(false);

  const handleBlur = () => {
    if (editableName !== name) {
      handleUpdateList(name, editableName);
    }
    setIsEditing(false);
  };

  const addCard = async () => {
    if (newCardName.trim()) {
      await apiCall.createCardInList(newCardName, name, boardName);

      setCards([...cards, newCardName.trim()]);
      setNewCardName("");
      setShowTextField(false);
    }
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cardsData = await apiCall.getCardsByListName(name, boardName);
        setCards(cardsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des cartes :", error);
      }
    };

    fetchCards();
  }, [name, boardName, refreshKey]);

  return (
    <View
      style={[
        tw`rounded-lg px-4 py-3 shadow-md w-full`,
        {
          backgroundColor: isDarkMode ? "#111827" : "#ffffff",
        },
      ]}
    >
      <View style={tw`flex-row justify-between items-center mb-2`}>
        {isEditing ? (
          <TextInput
            ref={textInputRef}
            value={editableName}
            onChangeText={setEditableName}
            onBlur={handleBlur}
            autoFocus
            clearTextOnFocus={true}
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              color: textColor,
              borderBottomWidth: 1,
              borderColor: "#fff",
              padding: 5,
            }}
          />
        ) : (
          <Text style={[tw`text-lg font-semibold`, { color: textColor }]}>
            {name}
          </Text>
        )}
        <TouchableOpacity onPress={() => setShowOptionsModal(true)}>
          <Ionicons name="ellipsis-horizontal" size={20} color={textColor} />
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={showOptionsModal}
        animationType="fade"
        onRequestClose={() => setShowOptionsModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowOptionsModal(false)}>
          <View style={styles.modalBackground}>
            <View
              style={[
                styles.modalContent,
                { backgroundColor: isDarkMode ? "#333" : "#fff" },
              ]}
            >
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setIsEditing(true);
                  setShowOptionsModal(false);
                }}
              >
                <Text style={{ color: textColor }}>Modifier</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  handleDeleteList(name);
                  setShowOptionsModal(false);
                }}
              >
                <Text style={{ color: textColor }}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {error && <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>}

      <ScrollView
        style={{ maxHeight: 195 }}
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {cards.map((cardName, index) => (
          <Cards
            key={index}
            name={cardName}
            listName={name}
            boardName={boardName}
          />
        ))}

        {!showTextField ? (
          <TouchableOpacity
            onPress={() => {
              setShowTextField(true);
              setTimeout(() => {
                textInputRef.current?.focus();
              });
            }}
            style={tw`flex-row items-center mt-2`}
          >
            <Ionicons name="add" size={18} color={textColor} />
            <Text style={[tw`ml-2 text-sm`, { color: textColor }]}>
              Add a card
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="overflow-hidden rounded-lg mt-2">
            <BlurView
              intensity={80}
              tint={thintDeg}
              style={StyleSheet.absoluteFillObject}
            />
            <TextInput
              ref={textInputRef}
              placeholder="Card name"
              className="overflow-hidden rounded-lg border border-white/60 dark:border-black transition-all p-3 px-3 text-zinc-900 dark:text-white font-[Poppins]"
              value={newCardName}
              onChangeText={(text) => setNewCardName(text)}
              onSubmitEditing={addCard}
              onBlur={handleBlur}
              returnKeyType="send"
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 250,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
  },
});

export default Lists;
