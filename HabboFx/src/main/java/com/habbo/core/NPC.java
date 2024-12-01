package com.habbo.core;

import com.habbo.utils.Coordinates;

public class NPC extends Player {
    private final String name;
    private String dialogue;
    private boolean isHostile;

    public NPC(String name, String dialogue, boolean isHostile) {
        super();
        this.name = name;
        this.dialogue = dialogue;
        this.isHostile = isHostile;
    }

    public String getName() {
        return name;
    }

    public String getDialogue() {
        return dialogue;
    }

    public void setDialogue(String dialogue) {
        this.dialogue = dialogue;
    }

    public boolean isHostile() {
        return isHostile;
    }

    public void setHostile(boolean hostile) {
        isHostile = hostile;
    }

    public void speak() {
        System.out.println(name + ": " + dialogue);
    }

    public void followPlayer(Coordinates playerPosition) {
        System.out.println(name + " is moving toward the player.");
        setPosition(playerPosition);
    }

    public void interact() {
        if (isHostile) {
            System.out.println(name + " attacks!");
        } else {
            speak();
        }
    }
}
