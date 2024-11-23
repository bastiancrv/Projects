package com.habbo.app;

import javafx.application.Application;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.input.ScrollEvent;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.stage.Stage;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import com.habbo.map.MapManager;
import com.habbo.entities.RoomConfiguration;
import com.habbo.ui.GameView;
import com.habbo.map.RoomRenderer;
import javafx.scene.transform.Scale;
import javafx.scene.control.Button;
import javafx.scene.media.AudioClip;
import java.net.URL;

public class GameLauncher extends Application {

    private MapManager mapManager;
    private double currentRoomStartX = 470.0; // Coordonnées initiales par défaut
    private double currentRoomStartY = 250.0;

    URL urla = getClass().getResource("/sounds/Cozy Lofi Beat Memories.mp3");
    AudioClip backgroundMusic = new AudioClip(urla.toExternalForm());

    

    public void start(Stage stage) {
        mapManager = new MapManager();

        backgroundMusic.setCycleCount(AudioClip.INDEFINITE);  // Faire en sorte que la musique se répète indéfiniment
        backgroundMusic.play();  // Démarrer la musique
        // Exemple de salle initiale (ici, on prend la salle "Réfectoire")
        RoomConfiguration initialRoom = mapManager.getCurrentRoom();
        if (initialRoom == null) {
            System.err.println("Aucune salle n'a été trouvée dans rooms.json !");
            return;
        }

        Group roomGroup = new Group(); // Initialisation de roomGroup

    
        GameView gameView = new GameView();
        gameView.setRoomGroup(roomGroup);
        gameView.setMapManager(mapManager); // Passer mapManager à GameView
        gameView.initializeRoom(roomGroup, currentRoomStartX, currentRoomStartY, initialRoom);

        // Création de la scène
        Pane root = new Pane();
        root.setPrefSize(1000, 800); // Taille de la fenêtre
        root.setStyle("-fx-background-color: black;");

        // Ajouter l'image de fond
        Image backgroundImage = new Image(getClass().getResource("/images/bg.jpg").toExternalForm());
        ImageView backgroundView = new ImageView(backgroundImage);
        backgroundView.setFitWidth(1000);  // Adapter la largeur de l'image à celle de la scène
        backgroundView.setFitHeight(800);  // Adapter la hauteur de l'image à celle de la scène
        root.getChildren().add(backgroundView);  // Ajouter l'image en premier

        root.getChildren().add(roomGroup);  // Ajouter le groupe de la salle au-dessus du fond


        // Ajouter les autres éléments comme les barres de menu
        root.getChildren().add(gameView.createBottomLeftPanel(root));
        root.getChildren().add(gameView.createBottomRightPanel(root));
        root.getChildren().add(gameView.getMessageLabel());
        gameView.getMessageLabel().setLayoutX(300);
        gameView.getMessageLabel().setLayoutY(650);
        gameView.addOverlayPane(root);

        // Création de la scène
        Scene scene = new Scene(root, 1000, 800, Color.BLACK); // Taille de la scène
        stage.setTitle("Habbo Hotel Like Room");
        stage.setScene(scene);

        // Désactiver la possibilité de redimensionner la fenêtre
        stage.setResizable(false);

        // Activer le déplacement de la room via la souris
        enableRoomDragging(roomGroup, root);

        // Ajouter l'événement de zoom centré sur la souris
        enableZoom(scene, root, roomGroup);

        stage.show();
    }

    
    





    private void enableRoomDragging(Group roomGroup, Pane root) {
        // Utiliser un tableau mutable pour stocker les coordonnées initiales
        final double[] initialPosition = new double[2]; // [0] = initialX, [1] = initialY

        // Lors du pressage de la souris, on capture la position initiale de la room et de la souris
        roomGroup.setOnMousePressed(event -> {
            initialPosition[0] = event.getSceneX() - roomGroup.getLayoutX(); // Distance entre la souris et la room
            initialPosition[1] = event.getSceneY() - roomGroup.getLayoutY(); // Distance entre la souris et la room
        });

        // Lors du mouvement de la souris, on déplace la room en fonction de la nouvelle position de la souris
        roomGroup.setOnMouseDragged(event -> {
            double deltaX = event.getSceneX() - initialPosition[0]; // Calculer la nouvelle position X
            double deltaY = event.getSceneY() - initialPosition[1]; // Calculer la nouvelle position Y

            // Appliquer le nouveau décalage
            roomGroup.setLayoutX(deltaX);
            roomGroup.setLayoutY(deltaY);
        });
    }

    private void enableZoom(Scene scene, Pane root, Group roomGroup) {
        // Créer un objet Scale pour effectuer le zoom, appliqué uniquement sur roomGroup
        Scale scale = new Scale();
        roomGroup.getTransforms().add(scale); // Appliquer l'échelle sur roomGroup
    
        // Écouter l'événement de la molette pour zoomer
        scene.addEventFilter(ScrollEvent.SCROLL, event -> {
            double delta = event.getDeltaY();
            double scaleFactor = 1.015; // Facteur de zoom
            double oldScaleX = scale.getX();
            double oldScaleY = scale.getY();
    
            // Récupérer la position de la souris par rapport à la scène
            double mouseX = event.getSceneX();
            double mouseY = event.getSceneY();
    
            // Calculer le facteur de mise à l'échelle
            if (delta > 0) {
                // Zoom avant
                scale.setX(scale.getX() * scaleFactor);
                scale.setY(scale.getY() * scaleFactor);
            } else if (delta < 0) {
                // Zoom arrière
                scale.setX(scale.getX() / scaleFactor);
                scale.setY(scale.getY() / scaleFactor);
            }
    
            // Limiter l'échelle à 1 pour éviter le dézoom excessif
            if (scale.getX() < 1) {
                scale.setX(1);
                scale.setY(1);
            }
    
            // Calculer l'écart de déplacement de la scène en fonction du changement d'échelle
            double offsetX = mouseX - roomGroup.getLayoutX();
            double offsetY = mouseY - roomGroup.getLayoutY();
    
            // Calculer la nouvelle position pour que la souris reste au même endroit
            double deltaX = (offsetX * (scale.getX() - oldScaleX)) / oldScaleX;
            double deltaY = (offsetY * (scale.getY() - oldScaleY)) / oldScaleY;
    
            // Appliquer les translations pour décaler roomGroup, mais garder root fixe
            roomGroup.setLayoutX(roomGroup.getLayoutX() - deltaX);
            roomGroup.setLayoutY(roomGroup.getLayoutY() - deltaY);
    
            event.consume(); // Consommer l'événement pour éviter le défilement
        });
    }

    public static void main(String[] args) {
        launch();
    }
}
