<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_users = $_POST['user_id'];
    $prenom = $_POST['prenom'];
    $nom = $_POST['nom'];
    $email = $_POST['email'];
    $fonction = $_POST['fonction'];

    

    if ($id_users && $prenom && $nom && $email && $fonction) {
        $q = $db->prepare("UPDATE users SET email = :email, prenom = :prenom, nom = :nom, fonction = :fonction WHERE id_users = :iduser");
        $q->execute([
            'iduser' => $id_users,
            'email' => $email,
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