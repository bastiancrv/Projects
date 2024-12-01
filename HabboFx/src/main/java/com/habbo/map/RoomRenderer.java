package com.habbo.map;

import com.habbo.entities.RoomConfiguration;
import javafx.scene.Group;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.paint.Color;
import javafx.scene.shape.Polygon;
import javafx.scene.text.Font;
import javafx.scene.text.Text;
import javafx.scene.control.Label;


public class RoomRenderer {

    private static final int TILE_SIZE = RoomConfiguration.TILE_SIZE;
    private static final int WALL_HEIGHT = TILE_SIZE * 2; // Hauteur des murs
    private ImageView characterView;

    public void renderRoom(Group root, double startX, double startY, RoomConfiguration roomConfig, Label tileInfoLabel) {
        int gridWidth = roomConfig.getWidth();   // Nombre de colonnes
        int gridHeight = roomConfig.getHeight(); // Nombre de rangées
        Color floorColor = Color.web(roomConfig.getColor());
        Color wallColor = Color.web("#C0C0C0"); // Couleur des murs

        root.getChildren().clear(); // Effacer le contenu précédent

        // Créer des groupes pour gérer l'ordre de rendu
        Group wallGroup = new Group();
        Group floorGroup = new Group();
        root.getChildren().addAll(wallGroup, floorGroup);

        for (int row = 0; row < gridHeight; row++) {
            for (int col = 0; col < gridWidth; col++) {

                double x = startX + (col - row) * TILE_SIZE / 2;
                double y = startY + (col + row) * TILE_SIZE / 4;

                // Créer le sol
                Polygon tile = createTile(floorGroup, x, y, TILE_SIZE / 2, floorColor);

                // Ajouter les murs aux bords
                if (row == 0) {
                    // Mur arrière (de A1 à J1)
                    createBackWall(wallGroup, x, y, TILE_SIZE / 2, wallColor);
                }
                if (col == 0) {
                    // Mur gauche
                    createLeftWall(wallGroup, x, y, TILE_SIZE / 2, wallColor);
                }
                if (col == gridWidth - 1) {
                    // Mur droit
                    createRightWall(wallGroup, x, y, TILE_SIZE / 2, wallColor);
                }
                if (row == gridHeight - 1) {
                    // Mur avant (bas)
                    createFrontWall(wallGroup, x, y, TILE_SIZE / 2, wallColor);
                }

                // Ajouter un label pour l'identifiant de la tuile
                String columnLabel = String.valueOf((char) ('A' + col));
                String tileId = columnLabel + (row + 1);

                double textX = x + TILE_SIZE / 2;
                double textY = y;

                Text tileLabel = new Text(textX, textY, tileId);
                tileLabel.setFill(Color.GREY);
                tileLabel.setFont(Font.font(6));
                tileLabel.setTranslateX(-tileLabel.getBoundsInLocal().getWidth() / 2);
                tileLabel.setTranslateY(tileLabel.getBoundsInLocal().getHeight() / 4);
                tileLabel.setMouseTransparent(true);
                floorGroup.getChildren().add(tileLabel);

                // Ajouter les interactions pour chaque tuile
                tile.setOnMouseEntered(event -> {
                    tile.setFill(Color.LIGHTBLUE);
                    tile.setStroke(Color.BLUE);
                    tile.setStrokeWidth(2);
                    tileInfoLabel.setText(String.format("Tuile : (%s)", tileId));
                });

                tile.setOnMouseExited(event -> {
                    tile.setFill(floorColor);
                    tile.setStroke(null);
                    tileInfoLabel.setText("");
                });

                tile.setOnMouseClicked(event -> {
                    moveCharacter(x, y);
                });
            }
        }

        initializeCharacter(root, startX, startY);
    }

    private Polygon createTile(Group group, double x, double y, double size, Color color) {
        Polygon tile = new Polygon(
                x, y,                                    // Point A
                x + size, y - size / 2,                  // Point B
                x + size * 2, y,                         // Point C
                x + size, y + size / 2                   // Point D
        );
        tile.setFill(color);
        group.getChildren().add(tile);
        return tile;
    }

    private void initializeCharacter(Group root, double startX, double startY) {
        // Charger l'image du personnage
        Image characterSprite = new Image(getClass().getResourceAsStream("/images/character/character_east_south.png"));

        // Créer un ImageView pour le sprite
        characterView = new ImageView(characterSprite);

        // Définir la taille du sprite
        characterView.setFitWidth(TILE_SIZE * 0.8);
        characterView.setFitHeight(TILE_SIZE * 1.2);

        // Positionner le sprite à une position par défaut (A1)
        double defaultX = startX;
        double defaultY = startY;
        characterView.setX(defaultX + TILE_SIZE / 2 - characterView.getFitWidth() / 2);
        characterView.setY(defaultY - characterView.getFitHeight());

        // Ajouter le sprite au Group après les tiles pour qu'il soit visible au-dessus
        root.getChildren().add(characterView);
    }

    public void moveCharacter(double tileX, double tileY) {
        if (characterView != null) {
            characterView.setX(tileX + TILE_SIZE / 2 - characterView.getFitWidth() / 2);
            characterView.setY(tileY - characterView.getFitHeight());
        }
    }

    private void createBackWall(Group wallGroup, double x, double y, double size, Color color) {
        // Dessiner le mur arrière
        Polygon wall = new Polygon(
                x + size, y - size / 2,                  // Point B
                x + size * 2, y,                         // Point C
                x + size * 2, y - WALL_HEIGHT,           // Point C' (haut)
                x + size, y - size / 2 - WALL_HEIGHT     // Point B' (haut)
        );
        wall.setFill(color);
        wallGroup.getChildren().add(wall);
    }

    private void createFrontWall(Group wallGroup, double x, double y, double size, Color color) {
        Polygon wall = new Polygon(
                x + size, y + size / 2,                  // Point D
                x + size * 2, y,                         // Point C
                x + size * 2, y - WALL_HEIGHT,           // Point C' (haut)
                x + size, y + size / 2 - WALL_HEIGHT     // Point D' (haut)
        );
        wall.setFill(color);
        wallGroup.getChildren().add(wall);
    }

    private void createLeftWall(Group wallGroup, double x, double y, double size, Color color) {
        Polygon wall = new Polygon(
                x, y,                                    // Point A
                x, y - WALL_HEIGHT,                      // Point A' (haut)
                x + size, y - size / 2 - WALL_HEIGHT,    // Point B' (haut)
                x + size, y - size / 2                   // Point B
        );
        wall.setFill(color);
        wallGroup.getChildren().add(wall);
    }

    private void createRightWall(Group wallGroup, double x, double y, double size, Color color) {
        Polygon wall = new Polygon(
                x + size * 2, y,                         // Point C
                x + size * 2, y - WALL_HEIGHT,           // Point C' (haut)
                x + size, y - size / 2 - WALL_HEIGHT,    // Point B' (haut)
                x + size, y - size / 2                   // Point B
        );
        wall.setFill(color);
        wallGroup.getChildren().add(wall);
    }
}
