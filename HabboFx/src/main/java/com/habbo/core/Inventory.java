package com.habbo.core;

import com.habbo.entities.Furniture;
import java.util.ArrayList;
import java.util.List;

public class Inventory implements IInventory {
    private final List<Furniture> items;

    public Inventory() {
        this.items = new ArrayList<>();
    }

    @Override
    public void addItem(Furniture item) {
        items.add(item);
    }

    @Override
    public List<Furniture> getItems() {
        return new ArrayList<>(items);
    }
}
