package com.habbo.utils;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.List;

public class JsonUtils {
    public static List<String> extractNames(JsonArray jsonArray) {
        List<String> names = new ArrayList<>();
        jsonArray.forEach(element -> {
            // Vérifiez si l'élément est un objet JSON
            if (element.isJsonObject()) {
                JsonObject jsonObject = element.getAsJsonObject();
                if (jsonObject.has("name")) {
                    names.add(jsonObject.get("name").getAsString());
                }
            } else if (element.isJsonPrimitive() && element.getAsJsonPrimitive().isString()) {
                // Si l'élément est une chaîne de caractères primitive, l'ajouter directement
                names.add(element.getAsString());
            }
        });
        return names;
    }

    public static List<JsonObject> extractItems(JsonArray jsonArray) {
        List<JsonObject> items = new ArrayList<>();
        jsonArray.forEach(item -> items.add(item.getAsJsonObject()));
        return items;
    }
}
