<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titre = $_POST['titre'];
    $entrep = $_POST['nom'];
    $contrat = $_POST['contrat'];
    $offre = $_POST['offre'];
    $salaire = $_POST['salaire'];

    $query = $db->prepare("SELECT id_entrep FROM entreprises WHERE nom = :nom");
    $query->execute(['nom' => $entrep]);
    $entrepres = $query->fetch(PDO::FETCH_ASSOC);

    if ($entrepres === false) {
        echo "Erreur : Aucune entreprise trouvée avec le nom donné.";
        exit;
    }

    // Si trouvé, accéder à id_entrep
    $id_entrep = $entrepres['id_entrep'];


    if ($titre && $id_entrep && $contrat && $offre && $salaire) {
        $q = $db->prepare("INSERT INTO annonces VALUES (NULL,:titre, :id_entrep, :contrat, :offre, :salaire)");
        $q->execute([
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