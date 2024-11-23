package com.habbo.ui;

import com.google.gson.JsonObject;
import com.habbo.entities.RoomConfiguration;
import com.habbo.map.MapManager;
import com.habbo.map.RoomRenderer;
import com.habbo.store.CategoryService;
import com.habbo.store.FurnitureService;
import com.habbo.core.Player;
import com.habbo.utils.Coordinates;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.image.ImageView;
import javafx.scene.control.Button;
import javafx.scene.control.ListView;
import javafx.scene.control.ScrollPane;
import javafx.scene.control.Tooltip;
import javafx.scene.effect.DropShadow;
import javafx.scene.image.Image;
import javafx.scene.layout.*;
import javafx.scene.paint.Color;
import javafx.scene.transform.Scale;
import javafx.animation.KeyFrame;
import javafx.animation.PauseTransition;
import javafx.animation.Timeline;
import javafx.animation.TranslateTransition;
import javafx.geometry.HPos;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Cursor;
import javafx.util.Duration;
import javafx.scene.media.AudioClip;
import javafx.scene.media.Media;
import javafx.scene.media.MediaPlayer;
import java.io.File;
import java.net.URL;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

import javafx.animation.TranslateTransition;
import javafx.scene.effect.DropShadow;
import javafx.scene.input.MouseEvent;
import javafx.scene.paint.Color;
import javafx.util.Duration;
import java.util.Map;

public class GameView {

    private final RoomRenderer roomRenderer;
    private final PopupManager popupManager;
    private Label messageLabel;
    private Label tileInfoLabel;
    private StackPane overlayPane;
    private HBox bottomLeftPanel;
    private HBox bottomRightPanel;
    private Button placeButton;
    private List<JsonObject> playerInventory = new ArrayList<>();
    private MapManager mapManager;
    private Group roomGroup;
    private final Player player;
    private Coordinates playerPosition = new Coordinates(0, 0); // Position par défaut
    private JsonObject selectedItem = null;  // Ajoute cette ligne dans ta classe, avant les méthodes
    private double TILE_HEIGHT = 20;
    private double TILE_WIDTH = 20;
    private double ITEM_HEIGHT = 28.28;
    private double ITEM_WIDTH = 28.28;

    private boolean bonusActivated = false;  // Variable pour suivre l'état du bonus
    private boolean bonusActivated5 = false;
    private boolean bonusActivated50 = false;
    private boolean bonusActivated500 = false;


    private int creditsPerClick = 1;

    private Label creditsLabel;
    private int credits = 0;  // Crédits de départ

    private Map<String, Boolean> buttonStates = new HashMap<>();

    private boolean isCooldownActive = false;  // Indique si le cooldown est actif
private static final long COOLDOWN_TIME_MS = 30; // Temps de cooldown en millisecondes (1 seconde)

    

    
    public GameView() {
        this.roomRenderer = new RoomRenderer();
        this.popupManager = new PopupManager();

        this.messageLabel = new Label("");
        this.messageLabel.setStyle("-fx-text-fill: white; -fx-font-size: 16px;");

        this.tileInfoLabel = new Label("");
        this.tileInfoLabel.setStyle("-fx-text-fill: yellow; -fx-font-size: 14px;");

        this.overlayPane = new StackPane();
        this.overlayPane.setVisible(false);

        this.mapManager = new MapManager();
        this.player = new Player(); // Initialisation du joueur
        this.roomGroup = new Group();

        buttonStates.put("option1", false); // false signifie que le bouton est activé
        buttonStates.put("option3", false);
        buttonStates.put("option5", false);


    }

    public void setRoomGroup(Group roomGroup) {
        this.roomGroup = roomGroup;
    }

    public void addOverlayPane(Pane root) {
        root.getChildren().add(overlayPane);
        overlayPane.toFront();
        overlayPane.layoutXProperty().bind(root.widthProperty().subtract(overlayPane.widthProperty()).divide(2));
        overlayPane.layoutYProperty().bind(root.heightProperty().subtract(overlayPane.heightProperty()).divide(2));
    }

    private HBox createPanel() {
        HBox panel = new HBox(10);
        panel.setStyle("-fx-background-color: rgba(255, 255, 255, 0.6); -fx-border-color: #000; -fx-border-width: 2px; -fx-border-radius: 10px; -fx-background-radius: 10px; -fx-opacity: 0.8;");
        return panel;
    }

    private Button createButton(String iconPath, String tooltipText, javafx.event.EventHandler<javafx.event.ActionEvent> actionHandler) {
        Image image = new Image(getClass().getResourceAsStream(iconPath));
        ImageView imageView = new ImageView(image);
        imageView.setFitWidth(64);
        imageView.setFitHeight(64);

        Button button = new Button("", imageView);
        button.setStyle("-fx-background-color: transparent;");
        button.setTooltip(new Tooltip(tooltipText));
        button.setEffect(new DropShadow(10, Color.BLACK));
        button.setOnAction(actionHandler);

        button.setOnMousePressed(e -> button.setStyle("-fx-background-color: #cccccc;"));
        button.setOnMouseReleased(e -> button.setStyle("-fx-background-color: transparent;"));
        button.setOnMouseEntered(e -> {button.setEffect(new DropShadow(15, Color.GRAY)); button.setCursor(Cursor.HAND);});
        button.setOnMouseExited(e -> {button.setEffect(new DropShadow(10, Color.BLACK)); button.setCursor(Cursor.DEFAULT);});

        
        

        return button;
    }

    public HBox createBottomLeftPanel(Pane root) {
        bottomLeftPanel = createPanel();
    
        // Boutons existants
        Button inventoryButton = createButton("/images/inventory.png", "Inventory", e -> showInventoryPopup());
        Button storeButton = createButton("/images/shop.png", "Store", e -> showStore());
        Button navigationButton = createButton("/images/nav.png", "Navigation", e -> showRoomSelector(mapManager, roomGroup, root));
    
        Button resetButton = createButton("/images/reset.png", "Reset Room", e -> {
            // Désactiver le zoom et réinitialiser la position de la pièce
            disableZoom(roomGroup);
        
            // Réinitialiser la position de la pièce au centre avec les coordonnées d'origine
            roomGroup.setLayoutX(0);
            roomGroup.setLayoutY(0);
        
            // Placer la pièce dans la position d'origine sans réinitialiser les items placés
            // Par exemple, réinitialiser la position en utilisant les coordonnées initiales
            double currentRoomStartX = 0.0; // Coordonnée initiale X
            double currentRoomStartY = 0.0; // Coordonnée initiale Y
            roomGroup.setLayoutX(currentRoomStartX);
            roomGroup.setLayoutY(currentRoomStartY);
        
            // Ne pas toucher aux items placés dans roomGroup
            // Si vous avez un mécanisme qui gère les objets placés, vous pouvez le laisser intact ici
        });
        Button cashButton = createButton("/images/cash.png", "Cash", e -> showGameWindow(mapManager, roomGroup, root));

        
        
    
        // Ajouter les boutons au panneau
        bottomLeftPanel.getChildren().addAll(inventoryButton, storeButton, navigationButton, resetButton, cashButton);
    
        // Positionner le panneau en bas à gauche
        bottomLeftPanel.layoutXProperty().bind(root.widthProperty().multiply(0.01));
        bottomLeftPanel.layoutYProperty().bind(root.heightProperty().subtract(bottomLeftPanel.heightProperty()).subtract(20));
    
        return bottomLeftPanel;
    }

    private void disableZoom(Group roomGroup) {
        // Chercher la transformation Scale et réinitialiser ses valeurs
        for (int i = 0; i < roomGroup.getTransforms().size(); i++) {
            if (roomGroup.getTransforms().get(i) instanceof Scale) {
                Scale scale = (Scale) roomGroup.getTransforms().get(i);
                scale.setX(1); // Réinitialiser l'échelle X à 1 (pas de zoom)
                scale.setY(1); // Réinitialiser l'échelle Y à 1 (pas de zoom)
                break; // Terminer dès qu'on a trouvé et réinitialisé la transformation Scale
            }
        }
        
        // Optionnel : remettre la position de la pièce à son état initial
        roomGroup.setLayoutX(0);
        roomGroup.setLayoutY(0);
    }
    
    
    
    

    public HBox createBottomRightPanel(Pane root) {
        bottomRightPanel = createPanel();

        Button quitButton = createButton("/images/exit.png", "Quit", e -> quitGame());
        bottomRightPanel.getChildren().add(quitButton);

        bottomRightPanel.layoutXProperty().bind(root.widthProperty().subtract(bottomRightPanel.widthProperty()).subtract(10));
        bottomRightPanel.layoutYProperty().bind(root.heightProperty().subtract(bottomRightPanel.heightProperty()).subtract(20));

        return bottomRightPanel;
    }

    public void initializeRoom(Group root, double startX, double startY, RoomConfiguration roomConfig) {
        roomRenderer.renderRoom(root, startX, startY, roomConfig, tileInfoLabel);
    
        double tileX = startX + (playerPosition.getX() - playerPosition.getY()) * RoomConfiguration.TILE_SIZE;
        double tileY = startY + (playerPosition.getX() + playerPosition.getY()) * RoomConfiguration.TILE_SIZE / 2;
    
        roomRenderer.moveCharacter(tileX, tileY);
    }
    

    public void movePlayer(int deltaX, int deltaY, double startX, double startY, RoomConfiguration roomConfig) {
        playerPosition.setX(playerPosition.getX() + deltaX);
        playerPosition.setY(playerPosition.getY() + deltaY);
    
        double tileX = startX + (playerPosition.getX() - playerPosition.getY()) * RoomConfiguration.TILE_SIZE;
        double tileY = startY + (playerPosition.getX() + playerPosition.getY()) * RoomConfiguration.TILE_SIZE / 2;
    
        roomRenderer.moveCharacter(tileX, tileY);
    }
    

    public Label getMessageLabel() {
        return messageLabel;
    }

    public Label getTileInfoLabel() {
        return tileInfoLabel;
    }

    private void selectItem(Image selectedItem) {
        System.out.println("Objet sélectionné pour le placement !");
        placeButton.setVisible(true);
    }

    private void placeObject() {
        System.out.println("Objet placé dans la pièce !");
        overlayPane.setVisible(false);
    }


public void showInventoryPopup() {
    overlayPane.setVisible(true);

    HBox inventoryLayout = new HBox(10);
    inventoryLayout.setPadding(new Insets(15));
    inventoryLayout.setStyle("-fx-background-color: rgba(255, 255, 255, 0.9); -fx-border-color: black; -fx-border-width: 2px;");

    // Colonne gauche : Grille des items dans l'inventaire
    VBox inventoryColumn = new VBox(10);
    inventoryColumn.setPadding(new Insets(10));
    inventoryColumn.setStyle("-fx-background-color: #f5f5f5; -fx-border-color: #ddd; -fx-border-width: 1px;");
    inventoryColumn.setPrefWidth(300);

    Label inventoryLabel = new Label("Votre inventaire");
    inventoryLabel.setStyle("-fx-font-size: 18px; -fx-font-weight: bold;");

    ScrollPane inventoryScrollPane = new ScrollPane();
    inventoryScrollPane.setPrefHeight(400);
    inventoryScrollPane.setFitToWidth(true);

    GridPane inventoryGrid = new GridPane();
    inventoryGrid.setHgap(5);
    inventoryGrid.setVgap(5);
    inventoryScrollPane.setContent(inventoryGrid);

    inventoryColumn.getChildren().addAll(inventoryLabel, inventoryScrollPane);

    // Colonne droite : Aperçu des items (organisé verticalement)
    VBox previewBox = new VBox(10);
    previewBox.setPadding(new Insets(10));
    previewBox.setStyle("-fx-background-color: #f9f9f9; -fx-border-color: gray; -fx-border-width: 1px;");
    previewBox.setVisible(false);

    // Image de l'aperçu
    ImageView previewImage = new ImageView();
    previewImage.setFitWidth(96); // Taille augmentée pour une meilleure visibilité
    previewImage.setFitHeight(96);
    previewImage.setPreserveRatio(true);

    // Détails de l'aperçu
    Label previewName = new Label("Nom de l'item");
    previewName.setStyle("-fx-font-size: 16px; -fx-font-weight: bold; -fx-text-fill: black;");

    Label previewDescription = new Label("Description de l'item");
    previewDescription.setStyle("-fx-font-size: 14px; -fx-text-fill: gray;");
    previewDescription.setWrapText(true);

    // Bouton d'action pour l'item
    Button useItemButton = new Button("Placer dans la pièce");
    useItemButton.setStyle("-fx-font-size: 14px; -fx-background-color: #5cb85c; -fx-text-fill: white;");
    useItemButton.setOnAction(e -> {
        if (selectedItem != null) {
            // Fermer l'inventaire
            overlayPane.setVisible(false);
            
            // Commencer à écouter les clics dans la pièce pour placer l'item
            setupTileClickForItemPlacement();
        }
    });

    useItemButton.setEffect(new DropShadow(10, Color.BLACK));
    useItemButton.setOnMousePressed(e -> useItemButton.setStyle("-fx-background-color: #cccccc;"));
    useItemButton.setOnMouseReleased(e -> useItemButton.setStyle("-fx-font-size: 14px; -fx-background-color: #5cb85c; -fx-text-fill: white;"));
    useItemButton.setOnMouseEntered(e -> {useItemButton.setEffect(new DropShadow(15, Color.GRAY)); useItemButton.setCursor(Cursor.HAND);});
    useItemButton.setOnMouseExited(e -> {useItemButton.setEffect(new DropShadow(10, Color.BLACK)); useItemButton.setCursor(Cursor.DEFAULT);});

    // Ajout des éléments dans l'aperçu vertical
    previewBox.getChildren().addAll(previewImage, previewName, previewDescription, useItemButton);

    // Remplir la grille avec les items de l'inventaire
    for (int i = 0; i < playerInventory.size(); i++) {
        JsonObject item = playerInventory.get(i);

        VBox itemView = createGridItemView(item);

        // Ajouter un écouteur pour afficher l'aperçu
        itemView.setOnMouseClicked(e -> {
            selectedItem = item;  // Item sélectionné pour placement
            previewBox.setVisible(true);
            previewName.setText(item.getAsJsonObject("hotelData").get("name").getAsString());
            previewDescription.setText(item.getAsJsonObject("hotelData").get("description").getAsString());
            previewImage.setImage(new Image(item.getAsJsonObject("hotelData").getAsJsonObject("icon").get("url").getAsString()));
        });

        inventoryGrid.add(itemView, i % 8, i / 8); // 8 colonnes par ligne
    }

    // Bouton pour fermer l'inventaire
    Button closeButton = new Button("Fermer");
    closeButton.setStyle("-fx-font-size: 14px; -fx-background-color: #d9534f; -fx-text-fill: white;");
    closeButton.setOnAction(e -> overlayPane.setVisible(false));

    closeButton.setEffect(new DropShadow(10, Color.BLACK));
    closeButton.setOnMousePressed(e -> closeButton.setStyle("-fx-background-color: #cccccc;"));
    closeButton.setOnMouseReleased(e -> closeButton.setStyle("-fx-font-size: 14px; -fx-background-color: #d9534f; -fx-text-fill: white;"));
    closeButton.setOnMouseEntered(e -> {closeButton.setEffect(new DropShadow(15, Color.GRAY)); closeButton.setCursor(Cursor.HAND);});
    closeButton.setOnMouseExited(e -> {closeButton.setEffect(new DropShadow(10, Color.BLACK)); closeButton.setCursor(Cursor.DEFAULT);});

    // Colonne droite contenant l'aperçu et le bouton de fermeture
    VBox rightColumn = new VBox(20, previewBox, closeButton);
    rightColumn.setPadding(new Insets(10));
    rightColumn.setAlignment(Pos.TOP_CENTER);

    inventoryLayout.getChildren().addAll(inventoryColumn, rightColumn);

    overlayPane.getChildren().clear();
    overlayPane.getChildren().add(inventoryLayout);
}
// Méthode pour configurer le placement de l'item et afficher la prévisualisation
private void setupTileClickForItemPlacement() {
    // Créer un ImageView pour la prévisualisation de l'item qui suit le curseur
    ImageView previewItem = new ImageView();
    previewItem.setImage(new Image(selectedItem.getAsJsonObject("hotelData").getAsJsonObject("icon").get("url").getAsString()));
    previewItem.setFitWidth(28.28);
    previewItem.setFitHeight(28.28);
    previewItem.setPreserveRatio(true);
    previewItem.setVisible(false); // On la cache au début

    // Ajouter la prévisualisation au groupe de la pièce (roomGroup)
    roomGroup.getChildren().add(previewItem);

    // Mettre à jour la position de la prévisualisation en fonction du curseur
    roomGroup.setOnMouseMoved(e -> {
        if (selectedItem != null) {
            previewItem.setVisible(true);
            double mouseX = e.getSceneX();
            double mouseY = e.getSceneY();

            // Calculer les coordonnées pour centrer l'item sur la tuile, en s'assurant que l'item se place uniquement sur les multiples de la taille des tuiles
            double centeredX = Math.floor(mouseX / TILE_WIDTH) * TILE_WIDTH + (TILE_WIDTH - ITEM_WIDTH) / 2;
            double centeredY = Math.floor(mouseY / TILE_HEIGHT) * TILE_HEIGHT + (TILE_HEIGHT - ITEM_HEIGHT) / 2;

            // Mettre à jour la position de l'item de prévisualisation
            previewItem.setLayoutX(centeredX);
            previewItem.setLayoutY(centeredY);
        }
    });

    // Écoute le clic de souris pour placer l'item
    roomGroup.setOnMouseClicked(e -> {
        if (selectedItem != null) {
            double mouseX = e.getSceneX();
            double mouseY = e.getSceneY();

            // Placer l'item sur la tuile, en ajustant les coordonnées pour qu'il soit centré sur une tuile
            placeItemOnTile(mouseX, mouseY);

            // Supprimer l'item de l'inventaire
            removeItemFromInventory(selectedItem);

            // Masquer la prévisualisation après placement
            previewItem.setVisible(false);

            // Réinitialiser l'item sélectionné
            selectedItem = null;
        }
    });
}

// Méthode pour placer l'item sur la tuile spécifique
private void placeItemOnTile(double x, double y) {
    if (selectedItem != null) {
        // Créer une nouvelle ImageView pour l'item à placer
        ImageView placedItemImage = new ImageView();
        placedItemImage.setImage(new Image(selectedItem.getAsJsonObject("hotelData").getAsJsonObject("icon").get("url").getAsString()));
        placedItemImage.setFitWidth(28.28);
        placedItemImage.setFitHeight(28.28);
        placedItemImage.setPreserveRatio(true);

        // Calculer les coordonnées pour centrer l'item sur la tuile, en s'assurant qu'il soit positionné correctement sur une tuile
        double centeredX = Math.floor(x / TILE_WIDTH) * TILE_WIDTH + (TILE_WIDTH - ITEM_WIDTH) / 2;
        double centeredY = Math.floor(y / TILE_HEIGHT) * TILE_HEIGHT + (TILE_HEIGHT - ITEM_HEIGHT) / 2;

        // Placer l'image de l'item sur la tuile, centrée
        placedItemImage.setLayoutX(centeredX);
        placedItemImage.setLayoutY(centeredY);

        // Ajouter l'image de l'item dans le groupe de la pièce
        roomGroup.getChildren().add(placedItemImage);
    }
}

// Méthode pour supprimer l'item de l'inventaire
private void removeItemFromInventory(JsonObject item) {
    // Retirer l'item de la liste de l'inventaire
    playerInventory.remove(item);
}




    
    

    public void showPopup(String title, String message) {
        StackPane popupContent = popupManager.createPopupContent(title, message);

        popupManager.setOnCloseCallback(() -> {
            overlayPane.setVisible(false);
            overlayPane.getParent().requestFocus();
        });

        overlayPane.getChildren().clear();
        overlayPane.getChildren().add(popupContent);
        overlayPane.setVisible(true);
    }
    

    public void showStore() {
        overlayPane.setVisible(true);
    
        HBox storeLayout = new HBox(10);
        storeLayout.setPadding(new Insets(15));
        storeLayout.setStyle("-fx-background-color: rgba(255, 255, 255, 0.9); -fx-border-color: black; -fx-border-width: 2px;");
    
        // Colonne gauche : Liste des catégories
        VBox categoryColumn = new VBox(10);
        categoryColumn.setPadding(new Insets(10));
        categoryColumn.setStyle("-fx-background-color: #f5f5f5; -fx-border-color: #ddd; -fx-border-width: 1px;");
        categoryColumn.setPrefWidth(200);
    
        Label categoryLabel = new Label("Catégories");
        categoryLabel.setStyle("-fx-font-size: 18px; -fx-font-weight: bold;");
    
        ListView<String> categoryList = new ListView<>();
        categoryList.setPrefHeight(400);
    
        try {
            CategoryService categoryService = new CategoryService();
            List<String> categories = categoryService.getCategories();
            categoryList.getItems().addAll(categories);
        } catch (Exception e) {
            e.printStackTrace();
            categoryList.getItems().add("Erreur de chargement");
        }
    
        categoryColumn.getChildren().addAll(categoryLabel, categoryList);
    
        // Colonne droite : Section des items
        VBox itemColumn = new VBox(10);
        itemColumn.setPadding(new Insets(10));
        itemColumn.setStyle("-fx-background-color: #fff; -fx-border-color: #ddd; -fx-border-width: 1px;");
        itemColumn.setPrefWidth(400);
    
        // Aperçu en haut
        HBox previewBox = new HBox(10);
        previewBox.setPadding(new Insets(10));
        previewBox.setStyle("-fx-background-color: #f9f9f9; -fx-border-color: gray; -fx-border-width: 1px;");
        previewBox.setVisible(false); // Masqué par défaut
    
        // Image de l'aperçu
        ImageView previewImage = new ImageView();
        previewImage.setFitWidth(64);
        previewImage.setFitHeight(64);
        previewImage.setPreserveRatio(true);
    
        // Détails de l'aperçu
        VBox previewDetails = new VBox(5);
        Label previewName = new Label("Nom de l'item");
        previewName.setStyle("-fx-font-size: 14px; -fx-font-weight: bold;");
        Label previewDescription = new Label("Description de l'item");
        previewDescription.setStyle("-fx-font-size: 12px; -fx-text-fill: gray;");
        previewDescription.setWrapText(true);
    

        // Label pour afficher le message de confirmation
        Label confirmationLabel = new Label();
        confirmationLabel.setStyle("-fx-font-size: 14px; -fx-text-fill: green;");
        confirmationLabel.setVisible(false); // Masqué par défaut

        // Ajouter le label à la colonne des items
        itemColumn.getChildren().add(confirmationLabel);


        // Bouton "Ajouter à l'inventaire"
        Button addToInventoryButton = new Button("Ajouter à l'inventaire");
        addToInventoryButton.setStyle("-fx-font-size: 14px; -fx-background-color: #5cb85c; -fx-text-fill: white;");
        addToInventoryButton.setOnAction(e -> {
            JsonObject selectedItem = (JsonObject) addToInventoryButton.getUserData();
            if (selectedItem != null) {
                playerInventory.add(selectedItem);

        confirmationLabel.setText("L'item \"" 
            + selectedItem.getAsJsonObject("hotelData").get("name").getAsString() 
            + "\" a été ajouté à l'inventaire !");
        confirmationLabel.setVisible(true);

        // Masquer automatiquement le label après 3 secondes
        PauseTransition pause = new PauseTransition(Duration.seconds(3));
        pause.setOnFinished(ev -> confirmationLabel.setVisible(false));
        pause.play();

        System.out.println("Ajouté à l'inventaire : " + selectedItem.getAsJsonObject("hotelData").get("name").getAsString());
    } else {
        System.out.println("Aucun item sélectionné.");
    }
});


        addToInventoryButton.setEffect(new DropShadow(10, Color.BLACK));
        addToInventoryButton.setOnMousePressed(e -> addToInventoryButton.setStyle("-fx-background-color: #cccccc;"));
        addToInventoryButton.setOnMouseReleased(e -> addToInventoryButton.setStyle("-fx-font-size: 14px; -fx-background-color: #5cb85c; -fx-text-fill: white;"));
        addToInventoryButton.setOnMouseEntered(e -> {addToInventoryButton.setEffect(new DropShadow(15, Color.GRAY)); addToInventoryButton.setCursor(Cursor.HAND);});
        addToInventoryButton.setOnMouseExited(e -> {addToInventoryButton.setEffect(new DropShadow(10, Color.BLACK)); addToInventoryButton.setCursor(Cursor.DEFAULT);});
    
        previewDetails.getChildren().addAll(previewName, previewDescription, addToInventoryButton);
        previewBox.getChildren().addAll(previewImage, previewDetails);
    
        // Grille des items
        ScrollPane itemScrollPane = new ScrollPane();
        itemScrollPane.setPrefHeight(400);
        itemScrollPane.setFitToWidth(true);
    
        GridPane itemGrid = new GridPane();
        itemGrid.setHgap(5);
        itemGrid.setVgap(5);
        itemScrollPane.setContent(itemGrid);
    
        itemColumn.getChildren().addAll(previewBox, itemScrollPane);
    
        // Ajout d'un écouteur sur les catégories
        categoryList.getSelectionModel().selectedItemProperty().addListener((observable, oldValue, newValue) -> {
            if (newValue != null) {
                try {
                    System.out.println("Catégorie sélectionnée : " + newValue);
    
                    FurnitureService furnitureService = new FurnitureService();
                    List<JsonObject> items = furnitureService.getFurnitureByCategory(newValue);
    
                    System.out.println("Nombre d'items retournés : " + items.size());
    
                    itemGrid.getChildren().clear();
                    for (int i = 0; i < items.size(); i++) {
                        JsonObject item = items.get(i);
                        VBox itemView = createGridItemView(item);
    
                        // Ajouter un écouteur pour afficher l'aperçu
                        itemView.setOnMouseClicked(e -> {
                            previewBox.setVisible(true);
                            previewName.setText(item.getAsJsonObject("hotelData").get("name").getAsString());
                            previewDescription.setText(item.getAsJsonObject("hotelData").get("description").getAsString());
                            previewImage.setImage(new Image(item.getAsJsonObject("hotelData").getAsJsonObject("icon").get("url").getAsString()));
    
                            // Lier l'item actuel au bouton
                            addToInventoryButton.setUserData(item);
                        });
    
                        itemGrid.add(itemView, i % 8, i / 8); // 8 colonnes par ligne
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    itemGrid.getChildren().clear();
                    Label errorLabel = new Label("Erreur de chargement des items");
                    itemGrid.add(errorLabel, 0, 0);
                }
            }
        });
    
        Button closeButton = new Button("Fermer");
        closeButton.setStyle("-fx-font-size: 14px; -fx-background-color: #d9534f; -fx-text-fill: white;");
        closeButton.setOnAction(e -> overlayPane.setVisible(false));

        closeButton.setEffect(new DropShadow(10, Color.BLACK));
        closeButton.setOnMousePressed(e -> closeButton.setStyle("-fx-background-color: #cccccc;"));
        closeButton.setOnMouseReleased(e -> closeButton.setStyle("-fx-font-size: 14px; -fx-background-color: #d9534f; -fx-text-fill: white;"));
        closeButton.setOnMouseEntered(e -> {closeButton.setEffect(new DropShadow(15, Color.GRAY)); closeButton.setCursor(Cursor.HAND);});
        closeButton.setOnMouseExited(e -> {closeButton.setEffect(new DropShadow(10, Color.BLACK)); closeButton.setCursor(Cursor.DEFAULT);});
    
        VBox mainLayout = new VBox(10, storeLayout, closeButton);
        storeLayout.getChildren().addAll(categoryColumn, itemColumn);

        itemColumn.getChildren().add(closeButton);
    
        overlayPane.getChildren().clear();
        overlayPane.getChildren().add(mainLayout);
    }
    
    
    private VBox createGridItemView(JsonObject item) {
        VBox itemBox = new VBox(5);
        itemBox.setStyle("-fx-background-color: white; -fx-border-color: gray; -fx-padding: 5; -fx-border-radius: 5;");
        itemBox.setPrefSize(40, 40);
    
        String imageUrl = (item.has("hotelData") && item.getAsJsonObject("hotelData").getAsJsonObject("icon").has("url"))
                ? item.getAsJsonObject("hotelData").getAsJsonObject("icon").get("url").getAsString()
                : null;
    
        ImageView imageView = new ImageView();
        if (imageUrl != null) {
            imageView.setImage(new Image(imageUrl));
        } else {
            imageView.setImage(new Image("/images/placeholder.png")); // Image par défaut
        }
    
        itemBox.getChildren().add(imageView);
        return itemBox;
    }

    private void quitGame() {
        System.exit(0);
    }










    // Méthode pour initialiser MapManager
    public void setMapManager(MapManager mapManager) {
        this.mapManager = mapManager;
    }

    public void showRoomSelector(MapManager mapManager, Group roomGroup, Pane root) {
        if (mapManager == null) {
            System.err.println("MapManager is null in showRoomSelector!");
            return; // éviter d'exécuter la méthode si mapManager est null
        }
    
        if (roomGroup == null) {
            System.err.println("Le roomGroup est nul dans showRoomSelector !");
            return; // Ne continuez pas si roomGroup est nul
        }
    
        overlayPane.setVisible(true);  // Afficher l'overlay
    
        VBox selectorLayout = new VBox(10);
        selectorLayout.setPadding(new Insets(15));
        selectorLayout.setStyle("-fx-background-color: rgba(255, 255, 255, 0.9); -fx-border-color: black; -fx-border-width: 2px;");
        selectorLayout.setAlignment(Pos.CENTER);
    
        Label selectorLabel = new Label("Choisissez une pièce");
        selectorLabel.setStyle("-fx-font-size: 18px; -fx-font-weight: bold;");
    
        ListView<String> roomList = new ListView<>();
        for (RoomConfiguration roomConfig : mapManager.getRoomConfigurations()) {
            roomList.getItems().add(roomConfig.getName());
        }
    
        Button selectButton = new Button("Sélectionner");
        selectButton.setStyle("-fx-font-size: 14px; -fx-background-color: #5cb85c; -fx-text-fill: white;");
        selectButton.setOnAction(e -> {
            int selectedIndex = roomList.getSelectionModel().getSelectedIndex();
            if (selectedIndex >= 0) {
                // Mettre à jour la salle actuelle dans MapManager
                mapManager.setCurrentRoomIndex(selectedIndex);
    
                // Récupérer la salle sélectionnée
                RoomConfiguration selectedRoom = mapManager.getCurrentRoom();
    
                // Désactiver le zoom avant de changer de pièce
                disableZoom(roomGroup);
    
                // Effacer la salle précédente
                roomGroup.getChildren().clear();
    
                // Réinitialiser la position de la pièce avant de l'initialiser
                roomGroup.setLayoutX(0);
                roomGroup.setLayoutY(0);
    
                // Réinitialiser la salle avec les nouvelles configurations
                initializeRoom(roomGroup, 470.0, 250.0, selectedRoom);
    
                // Masquer l'overlay une fois la salle changée
                overlayPane.setVisible(false);
            }
        });
    
        selectButton.setEffect(new DropShadow(10, Color.BLACK));
        selectButton.setOnMousePressed(e -> selectButton.setStyle("-fx-background-color: #cccccc;"));
        selectButton.setOnMouseReleased(e -> selectButton.setStyle("-fx-font-size: 14px; -fx-background-color: #5cb85c; -fx-text-fill: white;"));
        selectButton.setOnMouseEntered(e -> {selectButton.setEffect(new DropShadow(15, Color.GRAY)); selectButton.setCursor(Cursor.HAND);});
        selectButton.setOnMouseExited(e -> {selectButton.setEffect(new DropShadow(10, Color.BLACK)); selectButton.setCursor(Cursor.DEFAULT);});
    
        Button closeButton = new Button("Fermer");
        closeButton.setStyle("-fx-font-size: 14px; -fx-background-color: #d9534f; -fx-text-fill: white;");
        closeButton.setOnAction(e -> overlayPane.setVisible(false));
    
        closeButton.setEffect(new DropShadow(10, Color.BLACK));
        closeButton.setOnMousePressed(e -> closeButton.setStyle("-fx-background-color: #cccccc;"));
        closeButton.setOnMouseReleased(e -> closeButton.setStyle("-fx-font-size: 14px; -fx-background-color: #d9534f; -fx-text-fill: white;"));
        closeButton.setOnMouseEntered(e -> {closeButton.setEffect(new DropShadow(15, Color.GRAY)); closeButton.setCursor(Cursor.HAND);});
        closeButton.setOnMouseExited(e -> {closeButton.setEffect(new DropShadow(10, Color.BLACK)); closeButton.setCursor(Cursor.DEFAULT);});
    
        selectorLayout.getChildren().addAll(selectorLabel, roomList, selectButton, closeButton);
    
        overlayPane.getChildren().clear();
        overlayPane.getChildren().add(selectorLayout);
    
    
}



public void showGameWindow(MapManager mapManager, Group roomGroup, Pane root) {
    if (mapManager == null) {
        System.err.println("MapManager is null in showGameWindow!");
        return;
    }

    if (roomGroup == null) {
        System.err.println("Le roomGroup est nul dans showGameWindow !");
        return;
    }

    // Afficher l'overlay
    overlayPane.setVisible(true);

    // Créer le grand popup avec une taille flexible
    StackPane popupLayout = new StackPane();
    popupLayout.setPrefSize(600, 400);  // Taille modifiable du popup
    popupLayout.setStyle("-fx-background-color: rgba(255, 255, 255, 0.9); -fx-border-color: black; -fx-border-width: 2px; -fx-background-radius: 10px;");
    popupLayout.setAlignment(Pos.CENTER);

    // Conteneur principal pour les éléments à afficher (Grille de boutons, etc.)
    HBox contentLayout = new HBox(20);  // Utiliser HBox pour diviser en 2 parties
    contentLayout.setPadding(new Insets(20));
    contentLayout.setAlignment(Pos.CENTER);

    // Partie gauche (titre, crédits, boutons)
    VBox leftLayout = new VBox(20);
    leftLayout.setAlignment(Pos.CENTER);  // Centrer tout le contenu de la partie gauche
    leftLayout.setPadding(new Insets(10));

    // Label des crédits (aligné à droite)
    Label creditsLabel = new Label();
    creditsLabel.setText(formatCredits(credits));
    creditsLabel.setStyle("-fx-font-size: 50px; -fx-font-weight: bold;");
    creditsLabel.setAlignment(Pos.CENTER);  // Centrer les crédits

    // Créer un GridPane pour organiser les boutons en grille avec séparation
    GridPane buttonGrid = new GridPane();
    buttonGrid.setVgap(10);  // Espacement vertical entre les lignes
    buttonGrid.setHgap(20);  // Espacement horizontal entre les colonnes
    buttonGrid.setAlignment(Pos.CENTER);  // Centrer les boutons dans le GridPane

    // Définir les contraintes pour les colonnes
    ColumnConstraints col1 = new ColumnConstraints();
    col1.setPrefWidth(150); // Largeur préférée des colonnes gauche
    col1.setHalignment(HPos.CENTER); // Centrage des éléments dans cette colonne

    ColumnConstraints separator = new ColumnConstraints();
    separator.setPrefWidth(10); // Largeur de séparation visuelle entre les colonnes

    ColumnConstraints col2 = new ColumnConstraints();
    col2.setPrefWidth(150); // Largeur préférée des colonnes droite
    col2.setHalignment(HPos.CENTER);

    buttonGrid.getColumnConstraints().addAll(col1, separator, col2);
    Button option1 = new Button("€ +5");
    Button option2 = new Button("Option 2");
    Button option3 = new Button("€ +50");
    Button option4 = new Button("Option 4");
    Button option5 = new Button("€ +500");
    Button option6 = new Button("Option 6");
    option1.setDisable(buttonStates.getOrDefault("option1", false));
    option3.setDisable(buttonStates.getOrDefault("option3", false));
    option5.setDisable(buttonStates.getOrDefault("option5", false));

    

    // Création manuelle des boutons
    option1.setStyle("-fx-font-size: 14px; -fx-background-color: #5cb85c; -fx-text-fill: white;");
    option1.setMaxWidth(Double.MAX_VALUE);
    option1.setOnAction(e -> activateCashBonus5(creditsLabel, option1));
    buttonGrid.add(option1, 0, 0); // Colonne 0, Ligne 0

    option2.setStyle("-fx-font-size: 14px; -fx-background-color: #5cb85c; -fx-text-fill: white;");
    option2.setMaxWidth(Double.MAX_VALUE);
    buttonGrid.add(option2, 2, 0); // Colonne 2, Ligne 0


    option3.setStyle("-fx-font-size: 14px; -fx-background-color: #5cb85c; -fx-text-fill: white;");
    option3.setMaxWidth(Double.MAX_VALUE);
    option3.setOnAction(e -> activateCashBonus50(creditsLabel, option3));
    buttonGrid.add(option3, 0, 1); // Colonne 0, Ligne 1


    option4.setStyle("-fx-font-size: 14px; -fx-background-color: #5cb85c; -fx-text-fill: white;");
    option4.setMaxWidth(Double.MAX_VALUE);
    buttonGrid.add(option4, 2, 1); // Colonne 2, Ligne 1


    option5.setStyle("-fx-font-size: 14px; -fx-background-color: #5cb85c; -fx-text-fill: white;");
    option5.setMaxWidth(Double.MAX_VALUE);
    option5.setOnAction(e -> activateCashBonus500(creditsLabel, option5));
    buttonGrid.add(option5, 0, 2); // Colonne 0, Ligne 2


    option6.setStyle("-fx-font-size: 14px; -fx-background-color: #5cb85c; -fx-text-fill: white;");
    option6.setMaxWidth(Double.MAX_VALUE);
    buttonGrid.add(option6, 2, 2); // Colonne 2, Ligne 2

    option1.setEffect(new DropShadow(10, Color.BLACK));
    option1.setOnMouseEntered(e -> {addHoverEffect(option1, 100);});
    option1.setOnMouseExited(e -> {option1.setEffect(new DropShadow(10, Color.BLACK)); option1.setCursor(Cursor.DEFAULT);});

    option3.setEffect(new DropShadow(10, Color.BLACK));
    option3.setOnMouseEntered(e -> {addHoverEffect(option3, 500);});
    option3.setOnMouseExited(e -> {option3.setEffect(new DropShadow(10, Color.BLACK)); option3.setCursor(Cursor.DEFAULT);});

    option5.setEffect(new DropShadow(10, Color.BLACK));
    option5.setOnMouseEntered(e -> {addHoverEffect(option5, 10000);});
    option5.setOnMouseExited(e -> {option5.setEffect(new DropShadow(10, Color.BLACK)); option5.setCursor(Cursor.DEFAULT);});


    // Ajouter le bouton "Fermer"
    Button closeButton = new Button("Fermer");
    closeButton.setStyle("-fx-font-size: 14px; -fx-background-color: #d9534f; -fx-text-fill: white;");
    closeButton.setOnAction(e -> overlayPane.setVisible(false));

    closeButton.setEffect(new DropShadow(10, Color.BLACK));
    closeButton.setOnMousePressed(e -> closeButton.setStyle("-fx-background-color: #cccccc;"));
    closeButton.setOnMouseReleased(e -> closeButton.setStyle("-fx-font-size: 14px; -fx-background-color: #d9534f; -fx-text-fill: white;"));
    closeButton.setOnMouseEntered(e -> {closeButton.setEffect(new DropShadow(15, Color.GRAY)); closeButton.setCursor(Cursor.HAND);});
    closeButton.setOnMouseExited(e -> {closeButton.setEffect(new DropShadow(10, Color.BLACK)); closeButton.setCursor(Cursor.DEFAULT);});

    // Ajouter tous les éléments à gauche
    leftLayout.getChildren().addAll(creditsLabel, buttonGrid, closeButton);

    // Partie droite (image très grande pour le bouton Cash)
    VBox rightLayout = new VBox(20);
    rightLayout.setAlignment(Pos.CENTER);  // Centrer tout le contenu de la partie droite
    rightLayout.setPadding(new Insets(10));

    // Ajouter le bouton "Cash" en forme d'image avec taille réduite
    Button cashButton = new Button();
    cashButton.setStyle("-fx-background-color: transparent;");
    cashButton.setOnMouseEntered(e -> {cashButton.setCursor(Cursor.HAND);});
    cashButton.setOnMouseExited(e -> {cashButton.setCursor(Cursor.DEFAULT);});
    Image cashImage = new Image("/images/cash.png");  // Assurez-vous de fournir l'image
    ImageView cashImageView = new ImageView(cashImage);
    
    // Redimensionner l'image (très grande)
    cashImageView.setFitWidth(250);  // Largeur de l'image
    cashImageView.setFitHeight(250); // Hauteur de l'image
    
    // Associer l'image au bouton
    cashButton.setGraphic(cashImageView);
    
    // Ajouter un effet de translation lorsque le bouton est cliqué
    cashButton.setOnAction(e -> {
        // Animation de montée et descente
        animateButtonPress(cashButton);

        // Effectuer l'action du bouton Cash
        handleCashClick(creditsLabel);
    });

    // Ajouter le bouton Cash à la partie droite
    rightLayout.getChildren().add(cashButton);

    // Créer une séparation verticale entre les deux parties
    Region separatorVertical = new Region();
    separatorVertical.setStyle("-fx-background-color: #000; -fx-min-width: 2px; -fx-pref-width: 2px; -fx-max-width: 2px;"); // Noir et largeur de 2px

    // Ajouter les deux parties gauche et droite dans le HBox, avec une séparation
    contentLayout.getChildren().addAll(leftLayout, separatorVertical, rightLayout);

    // Ajouter le contentLayout dans le StackPane
    popupLayout.getChildren().add(contentLayout);

    // Ajouter le popup à l'overlay
    overlayPane.getChildren().clear();
    overlayPane.getChildren().add(popupLayout);
}



private void animateButtonPress(Button cashButton) {
    // Vérifier si le cooldown est actif
    if (isCooldownActive) {
        return;  // Si le cooldown est actif, ne pas exécuter l'animation
    }

    // Activer le cooldown
    isCooldownActive = true;

    // Créer une transition de translation vers le haut
    TranslateTransition transitionUp = new TranslateTransition(Duration.millis(50), cashButton);
    transitionUp.setByY(-10);  // Déplacer vers le haut de 10 pixels

    // Créer une transition pour redescendre le bouton à sa position initiale
    TranslateTransition transitionDown = new TranslateTransition(Duration.millis(50), cashButton);
    transitionDown.setByY(10);  // Redescendre de 10 pixels

    // Jouer la transition de montée puis la redescente
    transitionUp.setOnFinished(event -> {
        transitionDown.play();

        // Réactiver le bouton après un délai de cooldown
        new java.util.Timer().schedule(new java.util.TimerTask() {
            @Override
            public void run() {
                isCooldownActive = false;  // Réactiver le bouton après le cooldown
            }
        }, COOLDOWN_TIME_MS);  // Délai de 1 seconde
    });

    transitionUp.play();
}





// Méthode pour formater les crédits
private String formatCredits(long credits) {
    if (credits >= 1_000_000_000) {
        return (credits / 1_000_000_000) + "B" + " €"; // Milliards
    } else if (credits >= 1_000_000) {
        return (credits / 1_000_000) + "M" + " €"; // Millions
    } else if (credits >= 1_000) {
        return (credits / 1_000) + "k" + " €"; // Milliers
    } else {
        return String.valueOf(credits + " €"); // Moins de 1000, affichage normal
    }
}



private void handleCashClick(Label creditsLabel) {
    // Augmenter les crédits et mettre à jour l'affichage
    playClickSound();
    if (bonusActivated5 == true){
        credits += 5;
    }
    else if(bonusActivated50 == true){
        credits += 50;
    }
    else if(bonusActivated500 == true){
        credits += 500;
    }
    else{
        credits += 1;
    }
    creditsLabel.setText(formatCredits(credits)); // Utilisation de formatCredits
}



private void activateCashBonus5(Label creditsLabel, Button option1) {
    if (credits >= 100) {
        credits -= 100;
        bonusActivated5 = true;
        creditsLabel.setText(credits + " €");
        option1.setDisable(true); // Désactiver le bouton Option 1
        buttonStates.put("option1", true); // Enregistrer l'état
        System.out.println("Bonus activé : Chaque clic donne maintenant 5 crédits.");
    } else {
        System.out.println("Pas assez de crédits pour améliorer le Cash à 5 crédits/clic.");
        flashButtonRed(option1); // Ajouter l'effet visuel
    }
}


private void activateCashBonus50(Label creditsLabel, Button option3) {
    if (credits >= 500) {
        credits -= 500;
        bonusActivated5 = false;
        bonusActivated50 = true;
        creditsLabel.setText(credits + " €");
        option3.setDisable(true); // Désactiver le bouton Option 3
        buttonStates.put("option3", true); // Enregistrer l'état
        buttonStates.put("option1", true); // Griser aussi Option 1
        System.out.println("Bonus activé : Chaque clic donne maintenant 50 crédits.");
    } else {
        System.out.println("Pas assez de crédits pour améliorer le Cash à 50 crédits/clic.");
        flashButtonRed(option3); // Ajouter l'effet visuel
    }
}


private void activateCashBonus500(Label creditsLabel, Button option5) {
    if (credits >= 1000) {
        credits -= 10000;
        bonusActivated5 = false;
        bonusActivated50 = false;
        bonusActivated500 = true;
        creditsLabel.setText(credits + " €");
        option5.setDisable(true); // Désactiver le bouton Option 5
        buttonStates.put("option5", true); // Enregistrer l'état
        buttonStates.put("option3", true); // Griser Option 3
        buttonStates.put("option1", true); // Griser Option 1
        System.out.println("Bonus activé : Chaque clic donne maintenant 500 crédits.");
    } else {
        System.out.println("Pas assez de crédits pour améliorer le Cash à 500 crédits/clic.");
        flashButtonRed(option5); // Ajouter l'effet visuel
    }
}


private void flashButtonRed(Button button) {
    // Sauvegarder le style actuel du bouton
    String originalStyle = button.getStyle();
    
    // Changer la couleur du bouton en rouge
    button.setStyle("-fx-font-size: 14px; -fx-background-color: #d9534f; -fx-text-fill: white;");
    
    // Créer une Timeline pour revenir au style original après 500 ms
    Timeline timeline = new Timeline(
        new KeyFrame(Duration.millis(100), e -> button.setStyle(originalStyle))
    );
    timeline.setCycleCount(1);
    timeline.play();
}

private void addHoverEffect(Button button, long cost) {
    // Créer un Label pour afficher le coût, mais ne l'afficher que si les crédits sont insuffisants ou suffisants
    Label costLabel = new Label(cost + " €");
    costLabel.setStyle("-fx-font-size: 14px; -fx-font-weight: bold;");
    costLabel.setAlignment(Pos.CENTER);  // Centrer le texte dans le label
    costLabel.setPrefSize(button.getWidth(), button.getHeight());  // Adapter la taille du Label à celle du bouton

    // Ajouter l'effet de survol
    button.setOnMouseEntered(e -> {
        if (credits < cost) {  // Si les crédits sont insuffisants
            costLabel.setStyle("-fx-font-size: 14px; -fx-text-fill: red; -fx-font-weight: bold;");
            button.setCursor(Cursor.HAND);  // Changer le curseur en main
            button.setEffect(new DropShadow(15, Color.GRAY));
        } else {  // Si les crédits sont suffisants
            costLabel.setStyle("-fx-font-size: 14px; -fx-text-fill: green; -fx-font-weight: bold;");
            button.setCursor(Cursor.HAND);  // Changer le curseur en main
            button.setEffect(new DropShadow(15, Color.GREEN));  // L'effet de survol est vert
        }
        button.setGraphic(costLabel);  // Afficher le coût sur le bouton
    });

    // Supprimer le Label et remettre le curseur par défaut lorsque le survol cesse
    button.setOnMouseExited(e -> {
        button.setGraphic(null);  // Retirer le graphique (le Label) du bouton
        button.setCursor(Cursor.DEFAULT);  // Remettre le curseur par défaut
        button.setEffect(new DropShadow(15, Color.BLACK));  // Effet de survol standard
    });
}







private void playClickSound() {
    // Chemin du fichier audio (vous pouvez aussi utiliser "file:/path/to/your/audio.mp3")
    URL url = getClass().getResource("/sounds/Habbo Sound Catalogue.mp3");

    // Préchargement du son pour réduire la latence
    AudioClip clickSound = new AudioClip(url.toExternalForm());
    
    try {
        // Jouer le son
        clickSound.play();
    } catch (Exception e) {
        e.printStackTrace();  // Affiche une erreur si le fichier n'est pas trouvé
    }
    
}
}
    


