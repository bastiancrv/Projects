<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_candidature = $_POST['id_candidature'];
    $id_annonces = $_POST['id_annonces'];
    $id_users = $_POST['id_users'];
    $message = $_POST['message'];

    if ($id_candidature && $id_annonces && $id_users && $message) {
        $q = $db->prepare("UPDATE candidatures SET id_users = :id_users, id_annonces = :id_annonces, message = :message WHERE id_candidature = :id_candidature");
        $q->execute([
            'id_candidature' => $id_candidature,
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