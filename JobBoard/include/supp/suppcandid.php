<?php
session_start();
include '../connexion bdd/database.php';
global $db;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id_candidature'])) {
    $candidId = intval($_POST['id_candidature']);


    $query = $db->prepare("DELETE FROM candidatures WHERE id_candidature = :id");
    $query->bindParam(':id', $candidId, PDO::PARAM_INT);

    if ($query->execute()) {

        header("Location: ../../admin/admin.php");
        exit;
    } else {
        echo "Erreur lors de la suppression de la candidature.";
    }
}
