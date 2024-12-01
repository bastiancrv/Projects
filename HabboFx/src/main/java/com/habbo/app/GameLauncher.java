package com.habbo.app;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Cursor;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.input.ScrollEvent;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Pane;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.stage.Stage;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import com.habbo.map.MapManager;
import com.habbo.entities.RoomConfiguration;
import com.habbo.ui.GameView;
import javafx.scene.transform.Scale;
import javafx.scene.control.Slider;
import javafx.scene.effect.DropShadow;
import javafx.scene.control.Button;
import javafx.scene.media.AudioClip;
import java.net.URL;

/**
 * La classe {@code GameLauncher} initialise et lance le jeu.
 * Elle configure la scène, charge les paramètres, et permet de personnaliser
 * des options comme la luminosité ou la taille de la fenêtre.
 */
public class GameLauncher extends Application {

    private MapManager mapManager;
    private double currentRoomStartX = 470.0;
    private double currentRoomStartY = 250.0;
    private Settings settings;

    URL urla = getClass().getResource("/sounds/Cozy Lofi Beat Memories.mp3");
    AudioClip backgroundMusic = new AudioClip(urla.toExternalForm());

    /**
     * Point d'entrée de l'application JavaFX.
     *
     * @param stage la fenêtre principale
     */
    public void start(Stage stage) {
        settings = new Settings();
        mapManager = new MapManager();

        backgroundMusic.setCycleCount(AudioClip.INDEFINITE);
        backgroundMusic.play();
        RoomConfiguration initialRoom = mapManager.getCurrentRoom();
        if (initialRoom == null) {
            System.err.println("Aucune salle n'a été trouvée dans rooms.json !");
            return;
        }

        Group roomGroup = new Group();

        GameView gameView = new GameView();
        gameView.setRoomGroup(roomGroup);
        gameView.setMapManager(mapManager);
        gameView.initializeRoom(roomGroup, currentRoomStartX, currentRoomStartY, initialRoom);

        Pane root = new Pane();
        root.setPrefSize(settings.getWindowWidth(), settings.getWindowHeight());
        root.setStyle("-fx-background-color: black;");

        Image backgroundImage = new Image(getClass().getResource("/images/bg.jpg").toExternalForm());
        ImageView backgroundView = new ImageView(backgroundImage);
        backgroundView.setFitWidth(settings.getWindowWidth());
        backgroundView.setFitHeight(settings.getWindowHeight());
        root.getChildren().add(backgroundView);

        root.getChildren().add(roomGroup);

        root.getChildren().add(gameView.createBottomLeftPanel(root));
        root.getChildren().add(gameView.createBottomRightPanel(root));
        root.getChildren().add(gameView.getMessageLabel());
        gameView.getMessageLabel().setLayoutX(300);
        gameView.getMessageLabel().setLayoutY(650);
        gameView.addOverlayPane(root);

        addSettingsUI(root, backgroundView, stage);

        Scene scene = new Scene(root, settings.getWindowWidth(), settings.getWindowHeight(), Color.BLACK);
        stage.setTitle("Habbo Hotel Like Room");
        stage.setScene(scene);

        stage.setResizable(false);

        enableRoomDragging(roomGroup, root);

        enableZoom(scene, root, roomGroup);

        stage.show();
    }

    private void addSettingsUI(Pane root, ImageView backgroundView, Stage stage) {
        // Curseur de luminosité
        Slider brightnessSlider = new Slider(0.0, 1.0, settings.getBrightness());
        brightnessSlider.setPrefWidth(300);
        brightnessSlider.setStyle(
            "-fx-control-inner-background: #eeeeee; " +
            "-fx-track-color: #ffca28; " + // Couleur dorée pour la piste
            "-fx-thumb-color: #f57c00; " + // Couleur orange vif pour le bouton
            "-fx-background-radius: 10; " +
            "-fx-pref-height: 10px;"
        );
        brightnessSlider.valueProperty().addListener((obs, oldValue, newValue) -> {
            settings.setBrightness(newValue.doubleValue());
            backgroundView.setOpacity(settings.getBrightness());
        });

        // Bouton pour agrandir la fenêtre
        Button increaseSizeButton = new Button("Agrandir");
        styleButtonWithClickEffect(increaseSizeButton);
        increaseSizeButton.setOnAction(event -> {
            settings.setWindowWidth(settings.getWindowWidth() + 100);
            settings.setWindowHeight(settings.getWindowHeight() + 100);
            updateWindowSize(stage, root.getScene(), root, backgroundView);
        });

        // Bouton pour réduire la fenêtre
        Button decreaseSizeButton = new Button("Réduire");
        styleButtonWithClickEffect(decreaseSizeButton);
        decreaseSizeButton.setOnAction(event -> {
            settings.setWindowWidth(settings.getWindowWidth() - 100);
            settings.setWindowHeight(settings.getWindowHeight() - 100);
            updateWindowSize(stage, root.getScene(), root, backgroundView);
        });

        // Conteneur horizontal pour les boutons "Agrandir" et "Réduire"
        HBox buttonBox = new HBox(20); // Espacement horizontal entre les boutons
        buttonBox.getChildren().addAll(decreaseSizeButton, increaseSizeButton);
        buttonBox.setAlignment(Pos.CENTER); // Centrer les boutons horizontalement

        // Conteneur vertical pour tout centrer en haut
        VBox settingsBox = new VBox(20); // Espacement vertical entre le curseur et les boutons
        settingsBox.getChildren().addAll(brightnessSlider, buttonBox);
        settingsBox.setAlignment(Pos.CENTER); // Centrer verticalement tout le contenu du VBox
        settingsBox.setLayoutX((settings.getWindowWidth() - 300) / 2); // Centrage horizontal initial
        settingsBox.setLayoutY(20); // Positionner en haut de la fenêtre

        // Écouteur pour redimensionner dynamiquement
        root.widthProperty().addListener((obs, oldVal, newVal) -> {
            settingsBox.setLayoutX((newVal.doubleValue() - 300) / 2);
        });

        // Ajouter le conteneur principal au root
        root.getChildren().add(settingsBox);
    }



    // Méthode utilitaire pour styliser les boutons avec effet de clic
    private void styleButtonWithClickEffect(Button button) {
        // Style par défaut
        button.setStyle(
            "-fx-font-size: 14px; " +
            "-fx-background-color: #4caf50; " + // Vert clair
            "-fx-text-fill: white; " +
            "-fx-border-radius: 10; " +
            "-fx-background-radius: 10; " +
            "-fx-padding: 8 16;"
        );

        // Effet d'ombre et de survol
        button.setEffect(new DropShadow(5, Color.BLACK));
        button.setOnMouseEntered(e -> {
            button.setStyle(
                "-fx-font-size: 14px; " +
                "-fx-background-color: #66bb6a; " + // Vert légèrement plus clair
                "-fx-text-fill: white; " +
                "-fx-border-radius: 10; " +
                "-fx-background-radius: 10; " +
                "-fx-padding: 8 16;"
            );
            button.setCursor(Cursor.HAND);
            button.setEffect(new DropShadow(10, Color.GRAY));
        });
        button.setOnMouseExited(e -> {
            button.setStyle(
                "-fx-font-size: 14px; " +
                "-fx-background-color: #4caf50; " +
                "-fx-text-fill: white; " +
                "-fx-border-radius: 10; " +
                "-fx-background-radius: 10; " +
                "-fx-padding: 8 16;"
            );
            button.setEffect(new DropShadow(5, Color.BLACK));
            button.setCursor(Cursor.DEFAULT);
        });

        // Effet de clic
        button.setOnMousePressed(e -> button.setOpacity(0.7)); // Réduction temporaire de l'opacité
        button.setOnMouseReleased(e -> button.setOpacity(1.0)); // Retour à la normale
    }





    private void updateWindowSize(Stage stage, Scene scene, Pane root, ImageView backgroundView) {
        stage.setWidth(settings.getWindowWidth());
        stage.setHeight(settings.getWindowHeight());

        backgroundView.setFitWidth(settings.getWindowWidth());
        backgroundView.setFitHeight(settings.getWindowHeight());
        root.setPrefSize(settings.getWindowWidth(), settings.getWindowHeight());
    }


    private void enableRoomDragging(Group roomGroup, Pane root) {
        final double[] initialPosition = new double[2];

        roomGroup.setOnMousePressed(event -> {
            initialPosition[0] = event.getSceneX() - roomGroup.getLayoutX();
            initialPosition[1] = event.getSceneY() - roomGroup.getLayoutY();
        });

        roomGroup.setOnMouseDragged(event -> {
            double deltaX = event.getSceneX() - initialPosition[0];
            double deltaY = event.getSceneY() - initialPosition[1];
            roomGroup.setLayoutX(deltaX);
            roomGroup.setLayoutY(deltaY);
        });
    }

    private void enableZoom(Scene scene, Pane root, Group roomGroup) {
        Scale scale = new Scale(1, 1, 0, 0); // Échelle initiale à 1
        roomGroup.getTransforms().add(scale);

        scene.addEventFilter(ScrollEvent.SCROLL, event -> {
            double delta = event.getDeltaY();
            double scaleFactor = 1.015;

            double mouseX = event.getSceneX();
            double mouseY = event.getSceneY();

            if (delta > 0) {
                // Zoom avant
                scaleFactor = 1.015;
            } else if (delta < 0 && scale.getX() > 1) {
                // Zoom arrière uniquement si l'échelle est supérieure à 1
                scaleFactor = 1 / 1.015;
            } else {
                // Si l'échelle est à 1 ou moins, bloquer le dézoom
                return;
            }

            // Appliquer le facteur de zoom
            double newScaleX = scale.getX() * scaleFactor;
            double newScaleY = scale.getY() * scaleFactor;

            if (newScaleX < 1) {
                newScaleX = 1;
                newScaleY = 1;
            }

            // Calcul des ajustements pour centrer le zoom sur le curseur
            double f = (scaleFactor - 1);

            roomGroup.setLayoutX(roomGroup.getLayoutX() - f * (mouseX - roomGroup.getLayoutX()));
            roomGroup.setLayoutY(roomGroup.getLayoutY() - f * (mouseY - roomGroup.getLayoutY()));

            // Appliquer la nouvelle échelle
            scale.setX(newScaleX);
            scale.setY(newScaleY);

            event.consume();
        });
    }

    public static void main(String[] args) {
        launch();
    }
}
