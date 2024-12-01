package com.habbo.entities;

public class Furniture {
    private final int id;
    private final String itemName;
    private final String publicName;
    private final String type;
    private final int width;
    private final int length;
    private final double stackHeight;
    private final boolean canStack;
    private final boolean canSit;
    private final boolean isWalkable;
    private final String swfPath;

    // Constructor
    public Furniture(int id, String itemName, String publicName, String type, int width, int length, double stackHeight, 
                     boolean canStack, boolean canSit, boolean isWalkable, String swfPath) {
        this.id = id;
        this.itemName = itemName;
        this.publicName = publicName;
        this.type = type;
        this.width = width;
        this.length = length;
        this.stackHeight = stackHeight;
        this.canStack = canStack;
        this.canSit = canSit;
        this.isWalkable = isWalkable;
        this.swfPath = swfPath;
    }

    // Getters
    public int getId() {
        return id;
    }

    public String getItemName() {
        return itemName;
    }

    public String getPublicName() {
        return publicName;
    }

    public String getType() {
        return type;
    }

    public int getWidth() {
        return width;
    }

    public int getLength() {
        return length;
    }

    public double getStackHeight() {
        return stackHeight;
    }

    public boolean isCanStack() {
        return canStack;
    }

    public boolean isCanSit() {
        return canSit;
    }

    public boolean isWalkable() {
        return isWalkable;
    }

    public String getSwfPath() {
        return swfPath;
    }
}
