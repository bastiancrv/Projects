import {
  View,
  Text,
  Image,
  useColorScheme,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState, useEffect, useRef } from "react";
import BoardsCard from "../components/Trellosaurus/BoardsCard";
import { BlurView } from "expo-blur";
import AddButton from "../components/Trellosaurus/AddButton";
import * as apiCall from "../services/apiCall";
import TemplateSelector from "../components/TemplateSelector";

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#7A6F9B" : "#A095C0";

  const [workspaces, setWorkspaces] = useState<
    { name: string; selected: boolean }[]
  >([]);
  const [workspacesName, setWorkspacesName] = useState("");
  const [showTextField, setShowTextField] = useState(false);
  const [keyworkspaceHeight, setKeyworkspaceHeight] = useState(0);
  const [animatedMarginBottom] = useState(new Animated.Value(0));

  const textInputRef = useRef<TextInput>(null);

  const [tempateSelectorVisible, setTemplateSelectorVisible] =
    useState<boolean>(false);

  const openTemplateSelector = () => {
    if (workspacesName.trim()) {
      setTemplateSelectorVisible(true);
    }
  };

  const closeTemplateSelector = () => {
    setTemplateSelectorVisible(false);
    setWorkspacesName("");
  };

  const addBoard = async (template: string) => {
    try {
      switch (template) {
        case "Kanban":
          await apiCall.createBoard(
            workspacesName,
            undefined,
            "5e6005043fbdb55d9781821e"
          );
          break;
        case "Tableau Agile":
          await apiCall.createBoard(
            workspacesName,
            undefined,
            "591ca6422428d5f5b2794aee"
          );
          break;
        case "Tableau de bord d'équipe":
          await apiCall.createBoard(
            workspacesName,
            undefined,
            "5c4efa2bdcbd2f60958b4b8a"
          );
          break;
        case "Conduite de projet":
          await apiCall.createBoard(
            workspacesName,
            undefined,
            "5c4efa1d25a9692173830e7f"
          );
          break;
        default:
          await apiCall.createBoard(workspacesName);
      }
      setWorkspaces([...workspaces, { name: workspacesName, selected: false }]);
    } catch (error) {
      console.error("Erreur lors de la création du workspace:", error);
    }
  };

  const getWorkspaces = async () => {
    try {
      const response = await apiCall.getAllBoards();
      const workspacesData = response.data as { id: string; name: string }[];

      const formattedWorkspaces = workspacesData.map((workspace) => ({
        name: workspace.name,
        selected: false,
      }));

      setWorkspaces(formattedWorkspaces);
    } catch (error) {
      console.error("Erreur lors de la récupération des workspaces:", error);
    }
  };

  const handleDeleteSelectedWorkspaces = () => {
    const workspacesToDelete = workspaces.filter(
      (workspace) => workspace.selected
    );
    if (workspacesToDelete.length > 0) {
      workspacesToDelete.forEach(async (workspace) => {
        try {
          await apiCall.deleteBoardByName(workspace.name);
          setWorkspaces((prevWorkspaces) =>
            prevWorkspaces.filter((b) => b.name !== workspace.name)
          );
        } catch (error) {
          console.error("Erreur lors de la suppression du workspace:", error);
        }
      });
    }
  };

  const handleToggleBoardSelection = (workspaceName: string) => {
    setWorkspaces((prevWorkspaces) =>
      prevWorkspaces.map((workspace) =>
        workspace.name === workspaceName
          ? { ...workspace, selected: !workspace.selected }
          : workspace
      )
    );
  };

  const handleUpdateBoard = (oldName: string, newName: string) => {
    setWorkspaces((prevWorkspaces) =>
      prevWorkspaces.map((workspace) =>
        workspace.name === oldName ? { ...workspace, name: newName } : workspace
      )
    );
  };

  useEffect(() => {
    getWorkspaces();
  }, []);

  useEffect(() => {
    const keyworkspaceDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyworkspaceHeight(e.endCoordinates.height);
        Animated.timing(animatedMarginBottom, {
          toValue: 20,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    );
    const keyworkspaceDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyworkspaceHeight(0);
        Animated.timing(animatedMarginBottom, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyworkspaceDidHideListener.remove();
      keyworkspaceDidShowListener.remove();
    };
  }, []);

  const thintDeg = colorScheme === "dark" ? "default" : "light";

  const handleBlur = () => {
    if (!workspacesName.trim()) {
      setShowTextField(false);
    }
  };

  return (
    <View style={{ backgroundColor }} className="p-6 flex-1 pt-10 gap-4 pb-20">
      <Image
        source={require("@/assets/images/bbdino.png")}
        className="absolute w-60 h-60 left-1/2 top-1/2 -translate-x-24 -translate-y-20"
        resizeMode="contain"
      />

      <View className="flex-row items-center justify-center gap-2">
        <Text className="text-5xl text-white text-center italic underline mb-2 font-[Karantina]">
          Your workspaces
        </Text>

        {workspaces.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              if (workspaces.some((workspace) => workspace.selected)) {
                Alert.alert(
                  "Delete",
                  "Are you sure you want to delete the selected workspaces?",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Delete",
                      onPress: () => handleDeleteSelectedWorkspaces(),
                      style: "destructive",
                    },
                  ]
                );
              }
            }}
            disabled={!workspaces.some((workspace) => workspace.selected)}
            className="absolute right-0 w-8 h-8 justify-center items-center"
          >
            <Image
              source={require("../assets/images/trash.png")}
              className="w-8 h-10"
              style={{
                tintColor: workspaces.some((workspace) => workspace.selected)
                  ? "red"
                  : "gray",
                opacity: workspaces.some((workspace) => workspace.selected)
                  ? 1
                  : 0.5,
              }}
            />
          </TouchableOpacity>
        )}

        <TemplateSelector
          visible={tempateSelectorVisible}
          onClose={closeTemplateSelector}
          onSelect={(template: string) => addBoard(template)}
        />
      </View>

      <ScrollView contentContainerStyle={{ gap: 16 }}>
        {workspaces.map((workspace, index) => (
          <BoardsCard
            key={index}
            name={workspace.name}
            onDeleteBoard={() => handleDeleteSelectedWorkspaces()}
            onToggleSelection={handleToggleBoardSelection}
            onUpdateBoard={handleUpdateBoard}
            isSelected={workspace.selected}
          />
        ))}
      </ScrollView>

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
              text="Add a Workspace"
              add
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
                placeholder="Workspace name"
                className="overflow-hidden rounded-lg border border-white/60 dark:border-black transition-all p-4 px-3 text-zinc-900 dark:text-white font-[Poppins]"
                value={workspacesName}
                onChangeText={(text) => setWorkspacesName(text)}
                onSubmitEditing={() => {
                  openTemplateSelector();
                  setShowTextField(false);
                }}
                onBlur={handleBlur}
                returnKeyType="send"
              />
            </View>
          )}
        </Animated.View>
      </KeyboardAvoidingView>
      <View className="mt-4">
        <AddButton
          text="Se déconnecter"
          delete
          onPress={async () => {
            await AsyncStorage.removeItem("authToken");
            router.replace("/login");
          }}
        />
      </View>
    </View>
  );
}
