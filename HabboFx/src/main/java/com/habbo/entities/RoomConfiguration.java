package com.habbo.entities;

import java.util.List;

public class RoomConfiguration {
    public static final int TILE_SIZE = 20;

    private String id;
    private String name;
    private int width;
    private int height;
    private String color;
    private List<Wall> walls;
    private List<Door> doors;

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }

    public String getColor() {
        return color;
    }

    public List<Wall> getWalls() {
        return walls;
    }

    public List<Door> getDoors() {
        return doors;
    }
}
