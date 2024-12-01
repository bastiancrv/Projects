package com.habbo.core;

import com.habbo.entities.Furniture;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

class InventoryTest {

    @Test
    void testAddItem() {
        Inventory inventory = new Inventory();
        Furniture chair = new Furniture(1, "Chair", "Wooden Chair", "seating", 2, 2, 1.0, true, true, false, "chair.swf");
        inventory.addItem(chair);
        List<Furniture> items = inventory.getItems();
        assertEquals(1, items.size());
        assertEquals(chair, items.get(0));
    }

    @Test
    void testEmptyInventory() {
        Inventory inventory = new Inventory();
        assertTrue(inventory.getItems().isEmpty());
    }
}
