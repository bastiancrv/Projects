package com.habbo.app;

import com.google.gson.JsonObject;
import com.habbo.store.CategoryService;
import com.habbo.store.FurnitureService;
import com.habbo.store.SearchService;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        try {
            CategoryService categoryService = new CategoryService();
            FurnitureService furnitureService = new FurnitureService();
            SearchService searchService = new SearchService();

            // Récupérer les catégories
            List<String> categories = categoryService.getCategories();
            System.out.println("Catégories disponibles : " + categories);

            // Récupérer les meubles d'une catégorie
            String category = "chair";
            List<JsonObject> furniture = furnitureService.getFurnitureByCategory(category);
            System.out.println("Meubles dans la catégorie " + category + ": " + furniture);

            // Rechercher un meuble
            String keyword = "chaise";
            List<JsonObject> searchResults = searchService.searchFurniture(keyword);
            System.out.println("Résultats de recherche pour '" + keyword + "': " + searchResults);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
