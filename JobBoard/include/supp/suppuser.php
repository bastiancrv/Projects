<?php
session_start();
include '../connexion bdd/database.php';
global $db;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id_users'])) {
    $userId = intval($_POST['id_users']);


    $query = $db->prepare("DELETE FROM users WHERE id_users = :id");
    $query->bindParam(':id', $userId, PDO::PARAM_INT);

    if ($query->execute()) {

        header("Location: ../../admin/admin.php");
        exit;
    } else {
        echo "Erreur lors de la suppression de l'utilisateur.";
    }
}
