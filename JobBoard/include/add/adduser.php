<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $prenom = $_POST['prenom'];
    $nom = $_POST['nom'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $fonction = $_POST['fonction'];

    if ($prenom && $nom && $email && $fonction) {
        $q = $db->prepare("INSERT INTO users VALUES (NULL,:email,:password,:prenom,:nom,:fonction)");
        $q->execute([
            'email' => $email,
            'password' => $password,
            'prenom' => $prenom,
            'nom' => $nom,
            'fonction' => $fonction
        ]);

        header("Location: " . $_SERVER['PHP_SELF']);
        exit();
    } else {
        $errorMessage = 'Erreur : Veuillez remplir tous les champs.';
    }

}