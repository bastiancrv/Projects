package com.habbo.utils;

public class Coordinates {
    private int x; // Coordonnée X sur la grille
    private int y; // Coordonnée Y sur la grille

    public Coordinates(int x, int y) {
        this.x = x;
        this.y = y;
    }

    // Getters et Setters
    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    // Méthode pour vérifier si deux coordonnées sont égales
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        Coordinates that = (Coordinates) obj;

        return x == that.x && y == that.y;
    }

    // Méthode pour obtenir une représentation en chaîne
    @Override
    public String toString() {
        return "Coordinates{" +
                "x=" + x +
                ", y=" + y +
                '}';
    }
}
