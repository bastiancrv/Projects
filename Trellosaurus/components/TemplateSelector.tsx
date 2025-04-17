import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  useColorScheme,
} from "react-native";
import AddButton from "./Trellosaurus/AddButton";

interface TemplateSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (template: string) => void;
}

const templates = [
  "Tableau simple",
  "Kanban",
  "Tableau Agile",
  "Tableau de bord d'équipe",
  "Conduite de projet",
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={[
          styles.modalContainer,
          { backgroundColor: isDarkMode ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.5)" },
        ]}
      >
        <View
          style={[
            styles.modalContent,
            { backgroundColor: isDarkMode ? "#333" : "#fff" },
          ]}
        >
          <Text
            style={[
              styles.title,
              { color: isDarkMode ? "#fff" : "#000" },
            ]}
          >
            Choisir un modèle
          </Text>

          <FlatList
            data={templates}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.option,
                  { backgroundColor: isDarkMode ? "#444" : "#f9f9f9", marginBottom: 10 },
                ]}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: isDarkMode ? "#fff" : "#333" },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />

          <AddButton text="Annuler" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default TemplateSelector;
