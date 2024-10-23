<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_annonce = $_POST['id_annonces'];
    $titre = $_POST['titre'];
    $id_entrep = $_POST['id_entrep'];
    $contrat = $_POST['contrat'];
    $offre = $_POST['offre'];
    $salaire = $_POST['salaire'];


    if ($id_annonce && $titre && $id_entrep && $contrat && $offre && $salaire) {
        $q = $db->prepare("UPDATE annonces SET titre = :titre, id_entrep = :id_entrep, contrat = :contrat, offre = :offre, salaire = :salaire WHERE id_annonces = :id_annonce");
        $q->execute([
            'id_annonce' => $id_annonce,
            'titre' => $titre,
            'id_entrep' => $id_entrep,
            'contrat' => $contrat,
            'offre' => $offre,
            'salaire' => $salaire
        ]);

        header("Location: " . $_SERVER['PHP_SELF']); 
        exit(); 
    } else {
        $errorMessage = 'Erreur : Veuillez remplir tous les champs.';
    }

}