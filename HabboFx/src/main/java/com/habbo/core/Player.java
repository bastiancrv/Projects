package com.habbo.core;

import com.habbo.entities.Furniture;
import com.habbo.utils.Coordinates;
import javafx.scene.image.Image;

public class Player {
    private final Inventory inventory;
    private Coordinates position;
    private Image sprite;

    public Player() {
        this.inventory = new Inventory();
        this.position = new Coordinates(0, 0);
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
        this.position = new Coordinates(position.getX() + deltaX, position.getY() + deltaY);
    }
}
