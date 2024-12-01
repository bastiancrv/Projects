package com.habbo.app;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class SettingsTest {

    @Test
    void testDefaultSettings() {
        Settings settings = new Settings();
        assertEquals(1.0, settings.getBrightness());
        assertEquals(1000, settings.getWindowWidth());
        assertEquals(800, settings.getWindowHeight());
    }

    @Test
    void testSetBrightness() {
        Settings settings = new Settings();
        settings.setBrightness(0.5);
        assertEquals(0.5, settings.getBrightness());
        settings.setBrightness(1.5);
        assertEquals(1.0, settings.getBrightness());
    }

    @Test
    void testWindowSize() {
        Settings settings = new Settings();
        settings.setWindowWidth(1200);
        settings.setWindowHeight(900);
        assertEquals(1200, settings.getWindowWidth());
        assertEquals(900, settings.getWindowHeight());
    }
}
