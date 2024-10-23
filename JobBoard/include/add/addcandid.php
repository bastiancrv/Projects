<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_users = $_POST['id_users'];
    $prenom = $_POST['prenom'];
    $nom = $_POST['nom'];
    $email = $_POST['email'];
    $id_annonces = $_POST['id_annonces'];
    $titre = $_POST['titre'];
    $contrat = $_POST['contrat'];
    $message = $_POST['message'];

    $query2 = $db->prepare("SELECT id_users FROM users WHERE nom = :nom AND prenom = :prenom AND email = :email");
    $query2->execute(['nom' => $nom, 'prenom' => $prenom, 'email' => $email]);

    $userres = $query2->fetch(PDO::FETCH_ASSOC);

    if ($userres === false) {
        echo "Erreur : Aucun utilisateur trouvé avec le nom et prénom donnés.";
        exit;
    }

    $id_users = $userres['id_users'];

    $query3 = $db->prepare("SELECT id_annonces FROM annonces WHERE titre = :titre AND contrat = :contrat");
    $query3->execute(['titre' => $titre, 'contrat' => $contrat]);
    $annoncesres = $query3->fetch(PDO::FETCH_ASSOC);

    if ($annoncesres === false) {
        echo "Erreur : Aucune annonce trouvée avec les critères donnés.";
        exit;
    }

    $id_annonces = $annoncesres['id_annonces'];

    if ($id_users && $id_annonces && $message) {
        $q = $db->prepare("INSERT INTO candidatures (id_users, id_annonces, message) VALUES (:id_users,:id_annonces,:message)");
        $q->execute([
            'id_users' => $id_users,
            'id_annonces' => $id_annonces,
            'message' => $message
        ]);

        header("Location: " . $_SERVER['PHP_SELF']);
        exit();
    } else {
        $errorMessage = 'Erreur : Veuillez remplir tous les champs.';
    }

}