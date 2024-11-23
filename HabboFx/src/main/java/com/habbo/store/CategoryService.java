package com.habbo.store;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.habbo.utils.APIClient;
import com.habbo.utils.JsonUtils;

import java.util.List;

public class CategoryService {
    public List<String> getCategories() throws Exception {
        JsonObject response = APIClient.sendGET("/furniture/categories");
        JsonArray categories = response.getAsJsonArray("data");
        return JsonUtils.extractNames(categories);
    }
}
