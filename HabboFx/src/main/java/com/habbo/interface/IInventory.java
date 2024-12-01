package com.habbo.core;

import com.habbo.entities.Furniture;
import java.util.List;

public interface IInventory {
    void addItem(Furniture item);
    List<Furniture> getItems();
}
