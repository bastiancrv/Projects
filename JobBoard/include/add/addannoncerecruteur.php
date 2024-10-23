<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titre = $_POST['titre'];
    $entrep = $_POST['entrep'];
    $contrat = $_POST['contrat'];
    $offre = $_POST['offre'];
    $salaire = $_POST['salaire'];


    $query = $db->prepare("SELECT id_entrep FROM entreprises WHERE nom = :nom");
    $query->execute(['nom' => $entrep]);

    $entrepres = $query->fetch(PDO::FETCH_ASSOC);



    if ($titre && $entrep && $contrat && $offre && $salaire) {
        $q = $db->prepare("INSERT INTO annonces VALUES (NULL,:titre, :entrep, :contrat, :offre, :salaire)");
        $q->execute([
            'titre' => $titre,
            'entrep' => $entrepres['id_entrep'],
            'contrat' => $contrat,
            'offre' => $offre,
            'salaire' => $salaire


        ]);

        echo '<script>
    window.onload = function() {
        openLoginPopup2();
    };
  </script>';

    } else {
        $errorMessage = 'Erreur : Veuillez remplir tous les champs.';
    }

}