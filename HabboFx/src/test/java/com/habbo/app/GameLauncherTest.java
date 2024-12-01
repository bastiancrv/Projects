package com.habbo.app;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class GameLauncherTest {

    @Test
    void testGameLauncherInitialization() {
        GameLauncher launcher = new GameLauncher();
        assertNotNull(launcher);
    }
}
