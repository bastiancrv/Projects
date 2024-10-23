<?php
session_start();
include '../connexion bdd/database.php';
global $db;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id_annonces'])) {
    $annonceId = intval($_POST['id_annonces']);


    $query = $db->prepare("DELETE FROM annonces WHERE id_annonces = :id");
    $query->bindParam(':id', $annonceId, PDO::PARAM_INT);

    if ($query->execute()) {

        header("Location: ../../admin/admin.php");
        exit;
    } else {
        echo "Erreur lors de la suppression de la candidature.";
    }
}
