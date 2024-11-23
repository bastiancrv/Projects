package com.habbo.store;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.habbo.utils.APIClient;
import com.habbo.utils.JsonUtils;

import java.util.Collections;
import java.util.List;

public class FurnitureService {
    public List<JsonObject> getFurnitureByCategory(String category) throws Exception {
    System.out.println("Récupération des items pour la catégorie : " + category); // Log pour vérifier l'entrée
    JsonObject response = APIClient.sendGET("/furniture?category=" + category);
    if (response.has("data")) {
        JsonArray items = response.getAsJsonArray("data");
        return JsonUtils.extractItems(items); // Assurez-vous que cette méthode gère les erreurs correctement
    } else {
        System.err.println("Pas de données trouvées pour la catégorie " + category);
        return Collections.emptyList();
    }
}
}
