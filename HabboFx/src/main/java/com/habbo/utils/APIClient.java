package com.habbo.utils;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class APIClient {
    private static final String BASE_URL = "https://habbofurni.com/api/v1";
    private static final String API_TOKEN = "6|9miLBjpboQlj69cV0Z3vjpCY1DZWmyMLE4mns8Vneb2c16ad";
    private static final String HOTEL_ID = "5"; // ID de l'hôtel en français

    public static JsonObject sendGET(String endpoint) throws Exception {
        URL url = new URL(BASE_URL + endpoint);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");

        // Configurer les en-têtes
        conn.setRequestProperty("Authorization", "Bearer " + API_TOKEN);
        conn.setRequestProperty("X-Hotel-ID", HOTEL_ID);
        conn.setRequestProperty("Accept", "application/json");

        int responseCode = conn.getResponseCode();
        if (responseCode != 200) {
            throw new RuntimeException("HTTP GET Request Failed with Error Code : " + responseCode);
        }

        // Lire la réponse
        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        StringBuilder response = new StringBuilder();
        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        return JsonParser.parseString(response.toString()).getAsJsonObject();
    }
}
