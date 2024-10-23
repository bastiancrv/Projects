<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = $_POST['nom'];
    $description = $_POST['description'];
    $lieu = $_POST['lieu'];

    if ($nom && $description && $lieu) {
        $q = $db->prepare("INSERT INTO entreprises VALUES (NULL,:nom, :description, :lieu)");
        $q->execute([
            'nom' => $nom,
            'description' => $description,
            'lieu' => $lieu
        ]);

        header("Location: " . $_SERVER['PHP_SELF']);
        exit();
    } else {
        $errorMessage = 'Erreur : Veuillez remplir tous les champs.';
    }

}

