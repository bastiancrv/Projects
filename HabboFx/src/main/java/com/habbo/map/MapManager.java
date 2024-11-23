package com.habbo.map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.habbo.entities.RoomConfiguration;

import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.util.List;

public class MapManager {
    private List<RoomConfiguration> roomConfigurations;
    private int currentRoomIndex;

    public MapManager() {
        this.roomConfigurations = loadRoomConfigurations();
        this.currentRoomIndex = 0;
    }

    public RoomConfiguration getCurrentRoom() {
        if (roomConfigurations != null && !roomConfigurations.isEmpty()) {
            return roomConfigurations.get(currentRoomIndex);
        }
        return null;
    }

    // Charger les salles depuis rooms.json
    private List<RoomConfiguration> loadRoomConfigurations() {
        try {
            Gson gson = new Gson();
            InputStreamReader reader = new InputStreamReader(getClass().getClassLoader().getResourceAsStream("config/rooms.json"));
            Type listType = new TypeToken<List<RoomConfiguration>>() {}.getType();
            return gson.fromJson(reader, listType);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    // Passer à la salle suivante (si nécessaire dans le futur)
    // public RoomConfiguration moveToNextRoom() {
    //     if (roomConfigurations != null && currentRoomIndex < roomConfigurations.size() - 1) {
    //         currentRoomIndex++;
    //         return getCurrentRoom();
    //     }
    //     return null; // Plus de salles disponibles
    // }

    public List<RoomConfiguration> getRoomConfigurations() {
        return roomConfigurations;
    }
    
    public void setCurrentRoomIndex(int index) {
        if (index >= 0 && index < roomConfigurations.size()) {
            currentRoomIndex = index;
        }
    }
    
}