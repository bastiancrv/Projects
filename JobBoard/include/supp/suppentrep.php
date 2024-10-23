<?php
session_start();
include '../connexion bdd/database.php';
global $db;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id_entrep'])) {
    $entrepId = intval($_POST['id_entrep']);


    $query = $db->prepare("DELETE FROM entreprises WHERE id_entrep = :id");
    $query->bindParam(':id', $entrepId, PDO::PARAM_INT);

    if ($query->execute()) {

        header("Location: ../../admin/admin.php");
        exit;
    } else {
        echo "Erreur lors de la suppression de l'entreprise.";
    }
}
