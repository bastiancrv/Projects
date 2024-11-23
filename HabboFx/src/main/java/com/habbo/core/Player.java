package com.habbo.core;

import com.habbo.entities.Furniture;
import com.habbo.utils.Coordinates;
import javafx.scene.image.Image;

public class Player {
    private final Inventory inventory;
    private Coordinates position; // Position actuelle sur la grille
    private Image sprite; // Sprite du joueur

    public Player() {
        this.inventory = new Inventory();
        this.position = new Coordinates(0, 0); // Position par défaut (coin supérieur gauche)
        this.sprite = new Image(getClass().getResourceAsStream("/images/character/character_east_south.png")); // Sprite par défaut
    }

    public Inventory getInventory() {
        return inventory;
    }

    public void addItemToInventory(Furniture item) {
        inventory.addItem(item);
    }

    public Coordinates getPosition() {
        return position;
    }

    public void setPosition(Coordinates newPosition) {
        this.position = newPosition;
    }

    public Image getSprite() {
        return sprite;
    }

    public void setSprite(String spritePath) {
        this.sprite = new Image(getClass().getResourceAsStream(spritePath));
    }

    public void move(int deltaX, int deltaY) {
        // Mise à jour de la position en fonction des déplacements
        this.position = new Coordinates(position.getX() + deltaX, position.getY() + deltaY);
    }
}
