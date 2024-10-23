<?php
$creation = false;
if (isset($_POST['send'])) {
    extract($_POST);

    // // Préparation de la requête pour obtenir l'ID de l'entreprise
    // $query = $db->prepare("SELECT id_entrep FROM entreprises WHERE nom = :nom");
    // $query->execute(['nom' => $entrep]);

    // // Récupération de l'ID de l'entreprise
    // $entrepres = $query->fetch(PDO::FETCH_ASSOC);

    // // Vérification si l'ID a bien été trouvé
    // if ($entrepres === false) {
    //     echo "Erreur : Aucune entreprise trouvée avec le nom donné.";
    //     exit;
    // }

    // // Si trouvé, accéder à id_entrep
    // $id_entrep = $entrepres['id_entrep'];


    $query2 = $db->prepare("SELECT id_users FROM users WHERE nom = :nom AND prenom = :prenom AND email = :email");
    $query2->execute(['nom' => $nom, 'prenom' => $prenom, 'email' => $email]);

    $userres = $query2->fetch(PDO::FETCH_ASSOC);

    if ($userres === false) {
        echo "Erreur : Aucun utilisateur trouvé avec le nom et prénom donnés.";
        exit;
    }

    $id_users = $userres['id_users'];

    // $query3 = $db->prepare("SELECT id_annonces FROM annonces WHERE titre = :titre AND id_entrep = :id_entrep AND contrat = :contrat");
    // $query3->execute(['titre' => $titre, 'id_entrep' => $id_entrep, 'contrat' => $contrat]);
    // $annoncesres = $query3->fetch(PDO::FETCH_ASSOC);

    // if ($annoncesres === false) {
    //     echo "Erreur : Aucune annonce trouvée avec les critères donnés.";
    //     exit;
    // }

    // $id_annonces = $annoncesres['id_annonces'];


    $q = $db->prepare("INSERT INTO candidatures(id_users, id_annonces, message) VALUES(:iduser, :id_annonces, :message)");
    $q->execute([
        'iduser' => $id_users,
        'id_annonces' => $id_annonces,
        'message' => $message
    ]);


    header("Location: ./index.php");
    exit();
}
