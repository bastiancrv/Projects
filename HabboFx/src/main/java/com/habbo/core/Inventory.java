package com.habbo.core;

import com.habbo.entities.Furniture;
import java.util.ArrayList;
import java.util.List;

public class Inventory {
    private final List<Furniture> items;

    public Inventory() {
        this.items = new ArrayList<>();
    }

    public void addItem(Furniture item) {
        items.add(item);
    }

    public List<Furniture> getItems() {
        return new ArrayList<>(items);
    }
}
