import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { SetStateAction, useEffect, useState } from "react";
import AddButton from "@/components/Trellosaurus/AddButton";
import * as apiCall from "../services/apiCall";

export default function CardScreen() {
  const { name, listName, boardName } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const backgroundColor = isDark ? "#7A6F9B" : "#A095C0";

  const [description, setDescription] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [memberName, setMemberName] = useState("");
  const [cardMembers, setCardMembers] = useState<any[]>([]);

  useEffect(() => {
    const fetchCardDescription = async () => {
      try {
        const card = await apiCall.getCardByName(
          name as string,
          typeof listName === "string" ? listName : listName?.[0] || "",
          typeof boardName === "string" ? boardName : boardName?.[0] || ""
        );
        setDescription(card.desc || "");
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la description :",
          error
        );
      }
    };

    fetchCardDescription();
  }, [name, listName, boardName]);

  const fetchBoardMembers = async () => {
    try {
      const members = await apiCall.getBoardMembersByBoardName(
        typeof boardName === "string" ? boardName : boardName?.[0] || ""
      );
      setBoardMembers(members);
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des membres du board :",
        err
      );
    }
  };

  useEffect(() => {
    fetchBoardMembers();
  }, [boardName]);

  const fetchCardMembers = async () => {
    try {
      const members = await apiCall.getCardMembersByName(
        name as string,
        typeof listName === "string" ? listName : listName?.[0] || "",
        typeof boardName === "string" ? boardName : boardName?.[0] || ""
      );
      setCardMembers(members);
    } catch (err) {
      console.error("Erreur lors de la récupération des membres :", err);
    }
  };

  useEffect(() => {
    fetchCardMembers();
  }, [name, listName, boardName]);

  const [isEditing, setIsEditing] = useState(false);

  const handleDescriptionChange = (text: SetStateAction<string>) => {
    setDescription(text);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    try {
      const card = await apiCall.getCardByName(
        name as string,
        typeof listName === "string" ? listName : listName?.[0] || "",
        typeof boardName === "string" ? boardName : boardName?.[0] || ""
      );

      await apiCall.updateCard(card.id, { desc: description });

      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la description :", error);
    }
  };
  const [boardMembers, setBoardMembers] = useState<any[]>([]);

  const isDarkMode = colorScheme === "dark";

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(name as string);

  useEffect(() => {
    setEditedName(name as string);
  }, [name]);

  return (
    <View
      style={[tw`flex-1 px-4 py-6`, { backgroundColor: backgroundColor }]}
    >
      <View className="flex flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() =>
            router.replace({
              pathname: "/boardScreen",
              params: {
                name: boardName,
                refresh: Date.now().toString(),
              },
            })
          }
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <View style={[tw`flex-row items-center gap-2`, { maxWidth: "75%" }]}>
          {isEditingName ? (
            <TextInput
              value={editedName}
              onChangeText={setEditedName}
              onBlur={() => setIsEditingName(false)}
              blurOnSubmit={true}
              autoFocus
              multiline
              onSubmitEditing={async () => {
                try {
                  const card = await apiCall.getCardByName(
                    name as string,
                    typeof listName === "string"
                      ? listName
                      : listName?.[0] || "",
                    typeof boardName === "string"
                      ? boardName
                      : boardName?.[0] || ""
                  );
                  await apiCall.updateCard(card.id, { name: editedName });
                  setIsEditingName(false);
                  setEditedName(editedName);
                } catch (err) {
                  console.error("Erreur lors de la mise à jour du nom :", err);
                }
              }}
              style={[
                tw`text-3xl mt-2 text-white border-b-2`,
                {
                  fontFamily: "Karantina",
                  borderColor: "white",
                  maxWidth: 290,
                },
              ]}
            />
          ) : (
            <TouchableOpacity
              onLongPress={() => setIsEditingName(true)}
              style={{ maxWidth: 290 }}
            >
              <Text
                ellipsizeMode="tail"
                style={[
                  tw`text-3xl mt-2 border-b-2 border-white text-white`,
                  { fontFamily: "Karantina", maxWidth: "100%" },
                ]}
              >
                {editedName}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[
            tw`p-2 rounded-full`,
            {
              backgroundColor: isDark ? "#5B4E76" : "#7A6F9B",
            },
          ]}
          onPress={async () => {
            Alert.alert(
              "Delete",
              "Are you sure you want to delete this card?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: async () => {
                    try {
                      await apiCall.deleteCardByName(
                        name as string,
                        typeof listName === "string"
                          ? listName
                          : listName?.[0] || "",
                        typeof boardName === "string"
                          ? boardName
                          : boardName?.[0] || ""
                      );

                      router.replace({
                        pathname: "/boardScreen",
                        params: {
                          name: boardName,
                          refresh: Date.now().toString(),
                        },
                      });
                    } catch (error) {
                      console.error(
                        "Erreur lors de la suppression de la carte :",
                        error
                      );
                    }
                  },
                },
              ]
            );
          }}
        >
          <Ionicons name="trash" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={tw`mt-6 gap-4`}>
        {!isEditing ? (
          <TouchableOpacity style={tw`mt-4`} onPress={() => setIsEditing(true)}>
            <Ionicons
              name="menu"
              size={18}
              style={[
                tw`mr-2 absolute top-4 left-2 z-1000`,
                { color: isDarkMode ? "white" : "black" },
              ]}
            />
            <Text
              style={[
                tw`flex-row items-center justify-center p-4 pl-8 rounded-lg shadow-md border border-transparent ${
                  isDark ? "bg-gray-900 text-white" : "bg-white"
                }`,
              ]}
            >
              {description || "Ajouter une description..."}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
              handleBlur();
            }}
          >
            <View style={tw`gap-4`}>
              <TextInput
                value={description}
                onChangeText={handleDescriptionChange}
                onBlur={handleBlur}
                onSubmitEditing={(e) => e.preventDefault()}
                multiline
                autoFocus
                style={[
                  tw`flex-row mt-4 items-center p-4 pl-2 rounded-lg shadow-md justify-center border border-transparent ${
                    isDarkMode ? "bg-gray-900" : "bg-white"
                  }`,
                  { color: isDarkMode ? "white" : "black" },
                ]}
              />
              <AddButton text="Valider" validate onPress={handleSubmit} />
            </View>
          </TouchableWithoutFeedback>
        )}
        <View style={tw`mt-6`}>
          <Text
            style={[
              tw`text-lg mb-2`,
              { color: isDark ? "white" : "black", fontWeight: "bold" },
            ]}
          >
            Membres du board :
          </Text>
          {boardMembers.map((member) => {
            const isMemberAssigned = cardMembers.some(
              (m) => m.id === member.id
            );

            const handleToggleMember = async () => {
              try {
                if (isMemberAssigned) {
                  await apiCall.removeMemberFromCardByName(
                    name as string,
                    typeof listName === "string"
                      ? listName
                      : listName?.[0] || "",
                    typeof boardName === "string"
                      ? boardName
                      : boardName?.[0] || "",
                    member.fullName
                  );
                } else {
                  await apiCall.addMemberToCardByName(
                    name as string,
                    typeof listName === "string"
                      ? listName
                      : listName?.[0] || "",
                    typeof boardName === "string"
                      ? boardName
                      : boardName?.[0] || "",
                    member.fullName
                  );
                }
                fetchCardMembers();
              } catch (err) {
                console.error("Erreur lors du toggle du membre :", err);
              }
            };

            return (
              <View
                key={member.id}
                style={[
                  tw`flex-row justify-between items-center p-4 mb-2 rounded-lg shadow-md border`,
                  {
                    backgroundColor: isDark
                      ? isMemberAssigned
                        ? "#2a2a2a"
                        : "#1c1c1c"
                      : isMemberAssigned
                      ? "#e0ffe8"
                      : "#fff",
                    borderColor: isMemberAssigned
                      ? isDark
                        ? "#48c78e"
                        : "#48c78e"
                      : "transparent",
                  },
                ]}
              >
                <View style={tw`flex-row items-center gap-2`}>
                  {isMemberAssigned && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={isDark ? "#48c78e" : "#2ecc71"}
                    />
                  )}
                  <Text
                    style={{
                      color: isDark ? "white" : "black",
                      fontWeight: isMemberAssigned ? "600" : "400",
                    }}
                  >
                    {member.fullName}
                  </Text>
                </View>

                <AddButton
                  text={isMemberAssigned ? "Retirer" : "Ajouter"}
                  members
                  onPress={handleToggleMember}
                  {...(isMemberAssigned
                    ? { delete: true }
                    : { add: true, validate: true })}
                />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
