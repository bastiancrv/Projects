<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['entrep_id'];
    $nom = $_POST['nom'];
    $description = $_POST['description'];
    $lieu = $_POST['lieu'];

    if ($id && $nom && $description && $lieu) {
        $q = $db->prepare("UPDATE entreprises SET nom = :nom, description = :description, lieu = :lieu WHERE id_entrep = :id");
        $q->execute([
            'id' => $id,
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