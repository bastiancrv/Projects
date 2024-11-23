package com.habbo.ui;

import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import javafx.geometry.Insets;
import javafx.geometry.Pos;

public class PopupManager {

    private Runnable onCloseCallback; // Callback pour exécuter une action après la fermeture

    // Crée une fenêtre contextuelle sous forme de StackPane
    public StackPane createPopupContent(String title, String messageText) {
        StackPane layout = new StackPane();
        layout.setStyle("-fx-background-color: rgba(0, 0, 0, 0.8); -fx-border-color: white; -fx-border-width: 2px;");

        layout.setPrefSize(400, 200);

        // Titre du popup
        Label titleLabel = new Label(title);
        titleLabel.setStyle("-fx-text-fill: white; -fx-font-size: 20px; -fx-font-weight: bold;");

        // Message affiché dans la fenêtre
        Label messageLabel = new Label(messageText);
        messageLabel.setStyle("-fx-text-fill: white; -fx-font-size: 16px;");

        Button closeButton = new Button("Close");
        closeButton.setStyle("-fx-background-color: #404040; -fx-text-fill: white; -fx-font-size: 14px;");

        closeButton.setOnAction(e -> {
            layout.setVisible(false);
            if (onCloseCallback != null) {
                onCloseCallback.run();
            }
        });

        // Contenu de la fenêtre (titre, message et bouton)
        VBox content = new VBox(15, titleLabel, messageLabel, closeButton);
        content.setPadding(new Insets(20));
        content.setAlignment(Pos.CENTER);

        layout.getChildren().add(content);
        return layout;
    }

    // Permet de définir une action après la fermeture du popup
    public void setOnCloseCallback(Runnable onCloseCallback) {
        this.onCloseCallback = onCloseCallback;
    }
}
