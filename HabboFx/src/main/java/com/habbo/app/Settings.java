package com.habbo.app;

/**
 * La classe {@code Settings} gère les options de configuration de l'application,
 * y compris la luminosité, la largeur et la hauteur de la fenêtre.
 */
public class Settings {
    private double brightness;
    private double windowWidth;
    private double windowHeight;

    /**
     * Initialise une nouvelle instance de {@code Settings} avec des valeurs par défaut.
     * La luminosité par défaut est de 1.0, la largeur de la fenêtre est de 1000,
     * et la hauteur de la fenêtre est de 800.
     */
    public Settings() {
        this.brightness = 1.0;
        this.windowWidth = 1000; 
        this.windowHeight = 800; 
    }

    /**
     * Retourne le niveau actuel de luminosité.
     *
     * @return le niveau de luminosité, entre 0.0 et 1.0
     */
    public double getBrightness() {
        return brightness;
    }

    /**
     * Définit le niveau de luminosité. Les valeurs sont limitées entre 0.0 et 1.0.
     *
     * @param brightness le niveau de luminosité
     */
    public void setBrightness(double brightness) {
        this.brightness = Math.max(0, Math.min(brightness, 1.0));
    }

    /**
     * Retourne la largeur actuelle de la fenêtre.
     *
     * @return la largeur de la fenêtre
     */
    public double getWindowWidth() {
        return windowWidth;
    }

    /**
     * Définit la largeur de la fenêtre. La largeur minimale est de 800.
     *
     * @param windowWidth la largeur de la fenêtre
     */
    public void setWindowWidth(double windowWidth) {
        this.windowWidth = Math.max(800, windowWidth);
    }

    /**
     * Retourne la hauteur actuelle de la fenêtre.
     *
     * @return la hauteur de la fenêtre
     */
    public double getWindowHeight() {
        return windowHeight;
    }

    /**
     * Définit la hauteur de la fenêtre. La hauteur minimale est de 600.
     *
     * @param windowHeight la hauteur de la fenêtre
     */
    public void setWindowHeight(double windowHeight) {
        this.windowHeight = Math.max(600, windowHeight); 
    }
}
