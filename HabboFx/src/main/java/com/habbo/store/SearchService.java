package com.habbo.store;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.habbo.utils.APIClient;
import com.habbo.utils.JsonUtils;

import java.util.List;

public class SearchService {
    public List<JsonObject> searchFurniture(String keyword) throws Exception {
        JsonObject response = APIClient.sendGET("/furniture?search=" + keyword);
        JsonArray items = response.getAsJsonArray("data");
        return JsonUtils.extractItems(items);
    }
}
