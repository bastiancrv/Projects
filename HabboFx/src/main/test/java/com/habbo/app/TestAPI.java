package com.habbo.tests;

import com.habbo.store.CategoryService;
import com.habbo.store.FurnitureService;
import com.habbo.store.SearchService;

public class TestAPI {
    public static void main(String[] args) {
        try {
            CategoryService categoryService = new CategoryService();
            FurnitureService furnitureService = new FurnitureService();
            SearchService searchService = new SearchService();

            // Tester les catégories
            System.out.println("Catégories disponibles:");
            categoryService.getAllCategories().forEach(System.out::println);

            // Tester les meubles par catégorie
            System.out.println("\nMeubles dans la catégorie 'chair':");
            furnitureService.getFurnitureByCategory("chair")
                    .forEach(item -> System.out.println(item.get("hotelData").getAsJsonObject().get("name").getAsString()));

            // Tester la recherche
            System.out.println("\nRecherche d'items avec 'voiture':");
            searchService.searchFurniture("voiture")
                    .forEach(item -> System.out.println(item.get("hotelData").getAsJsonObject().get("name").getAsString()));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
