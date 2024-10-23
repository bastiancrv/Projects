<?php
session_start();
include '../include/connexion bdd/database.php';
global $db;


$query = $db->prepare("SELECT * FROM users");
$query->execute();
$results = $query->fetchAll(PDO::FETCH_ASSOC);

$query2 = $db->prepare("SELECT * FROM entreprises");
$query2->execute();
$results2 = $query2->fetchAll(PDO::FETCH_ASSOC);

$query3 = $db->prepare("SELECT * FROM annonces");
$query3->execute();
$results3 = $query3->fetchAll(PDO::FETCH_ASSOC);

$query4 = $db->prepare("SELECT * FROM candidatures");
$query4->execute();
$results4 = $query4->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/stylelogin.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <title>Affichage des Données</title>
</head>

<body>
    <div class="admin">
        <div class="affichage">
            <div class="container">
                <h2>Liste des Utilisateurs</h2><br>
                <div class="btns">
                    <button onclick="window.location.href='users/useradd.php';">Ajouter</button>
                </div>
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Fonction</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $fonctionClass = '';
                        foreach ($results as $row):
                            if ($row['fonction'] === 'recruteur') {
                                $fonctionClass = 'red';
                            } else if ($row['fonction'] === 'admin') {
                                $fonctionClass = 'blue';
                            } else {
                                $fonctionClass = '';
                            } ?>
                            <tr>
                                <td><?php echo htmlspecialchars($row['id_users']); ?></td>
                                <td><?php echo htmlspecialchars($row['nom']); ?></td>

                                <td><?php echo htmlspecialchars($row['prenom']); ?></td>
                                <td><?php echo htmlspecialchars($row['email']); ?></td>
                                <td class="<?php echo $fonctionClass; ?>"><?php echo htmlspecialchars($row['fonction']); ?>
                                </td>
                                <td>
                                    <form action="../include/supp/suppuser.php" method="POST" style="display:inline;">
                                        <input type="hidden" name="id_users"
                                            value="<?php echo htmlspecialchars($row['id_users']); ?>">
                                        <button type="submit"
                                            onclick="return confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');"><i
                                                class='bx bxs-message-alt-x bx-rotate-90'></i></button>
                                    </form>
                                    <button>
                                        <i class='bx bxs-edit' onclick="storeIdu(
                                            <?php echo htmlspecialchars($row['id_users']); ?>, 
                                            '<?php echo htmlspecialchars($row['prenom']); ?>', 
                                            '<?php echo htmlspecialchars($row['nom']); ?>', 
                                            '<?php echo htmlspecialchars($row['email']); ?>', 
                                            '<?php echo htmlspecialchars($row['fonction']); ?>'
                                        ); 
                                        window.location.href='users/usermodif.php'">
                                        </i>
                                    </button>

                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>



                </table>

            </div>


            <div class="container">
                <h2>Liste des Entreprises</h2><br>
                <div class="btns">
                    <button onclick="window.location.href='entrep/entrepadd.php';">Ajouter</button>
                </div>
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Lieu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        foreach ($results2 as $row):
                            ?>
                            <tr>
                                <td><?php echo htmlspecialchars($row['id_entrep']); ?></td>
                                <td><?php echo htmlspecialchars($row['nom']); ?></td>
                                <td><?php echo htmlspecialchars($row['description']); ?></td>
                                <td><?php echo htmlspecialchars($row['lieu']); ?></td>
                                <td>
                                    <form action="../include/supp/suppentrep.php" method="POST" style="display:inline;">
                                        <input type="hidden" name="id_entrep"
                                            value="<?php echo htmlspecialchars($row['id_entrep']); ?>">
                                        <button type="submit"
                                            onclick="return confirm('Êtes-vous sûr de vouloir supprimer cet entreprise ?');"><i
                                                type="submit" class='bx bxs-message-alt-x bx-rotate-90'></i></button>
                                    </form>
                                    <button>
                                        <i class='bx bxs-edit' onclick="storeIde(
                                            <?php echo htmlspecialchars($row['id_entrep']); ?>, 
                                            '<?php echo htmlspecialchars($row['nom']); ?>', 
                                            '<?php echo htmlspecialchars($row['description']); ?>', 
                                            '<?php echo htmlspecialchars($row['lieu']); ?>'
                                        ); 
                                        window.location.href='entrep/entrepmodif.php'">
                                        </i>
                                    </button>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>

            </div>

            <div class="container">
                <h2>Liste des Annonces</h2><br>
                <div class="btns">
                    <button onclick="window.location.href='annonce/annonceadd.php';">Ajouter</button>
                </div>
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Titre</th>
                            <th>ID Entrep</th>
                            <th>Contrat</th>
                            <th>Offre</th>
                            <th>Salaire</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        foreach ($results3 as $row):
                            ?>
                            <tr>
                                <td><?php echo htmlspecialchars($row['id_annonces']); ?></td>
                                <td><?php echo htmlspecialchars($row['titre']); ?></td>
                                <td><?php echo htmlspecialchars($row['id_entrep']); ?></td>
                                <td><?php echo htmlspecialchars($row['contrat']); ?></td>
                                <td><?php echo htmlspecialchars($row['offre']); ?></td>
                                <td><?php echo htmlspecialchars($row['salaire']); ?></td>
                                <td>
                                    <form action="../include/supp/suppannonce.php" method="POST" style="display:inline;">
                                        <input type="hidden" name="id_annonces"
                                            value="<?php echo htmlspecialchars($row['id_annonces']); ?>">
                                        <button type="submit"
                                            onclick="return confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?');"><i
                                                class='bx bxs-message-alt-x bx-rotate-90'></i></button>
                                    </form>
                                    <button>
                                        <i class='bx bxs-edit' onclick="storeIda(
                                            <?php echo htmlspecialchars($row['id_annonces']); ?>, 
                                            '<?php echo htmlspecialchars($row['titre']); ?>', 
                                            '<?php echo htmlspecialchars($row['id_entrep']); ?>', 
                                            '<?php echo htmlspecialchars($row['contrat']); ?>', 
                                            '<?php echo htmlspecialchars($row['offre']); ?>', 
                                            '<?php echo htmlspecialchars($row['salaire']); ?>'
                                        ); 
                                        window.location.href='annonce/annoncemodif.php'">
                                        </i>
                                    </button>

                                </td>
                            </tr>

                        <?php endforeach; ?>
                    </tbody>
                </table>


            </div>

            <div class="container">
                <h2>Liste des Candidatures</h2><br>
                <div class="btns">
                    <button onclick="window.location.href='candidatures/candidadd.php';">Ajouter</button>
                </div>
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ID User</th>
                            <th>ID Annonce</th>
                            <th>Date</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        foreach ($results4 as $row):
                            ?>
                            <tr>
                                <td><?php echo htmlspecialchars($row['id_candidature']); ?></td>
                                <td><?php echo htmlspecialchars($row['id_users']); ?></td>
                                <td><?php echo htmlspecialchars($row['id_annonces']); ?></td>
                                <td><?php echo htmlspecialchars($row['date']); ?></td>
                                <td><?php echo htmlspecialchars($row['message']); ?></td>
                                <td>
                                    <form action="../include/supp/suppcandid.php" method="POST" style="display:inline;">
                                        <input type="hidden" name="id_candidature"
                                            value="<?php echo htmlspecialchars($row['id_candidature']); ?>">
                                        <button type="submit"
                                            onclick="return confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?');"><i
                                                class='bx bxs-message-alt-x bx-rotate-90'></i></button>
                                    </form>
                                    <button>
                                        <i class='bx bxs-edit' onclick="storeIdc(
                                            <?php echo htmlspecialchars($row['id_candidature']); ?>, 
                                            '<?php echo htmlspecialchars($row['id_users']); ?>', 
                                            '<?php echo htmlspecialchars($row['id_annonces']); ?>', 
                                            '<?php echo htmlspecialchars($row['message']); ?>'
                                        ); 
                                        window.location.href='candidatures/candidmodif.php'">
                                        </i>
                                    </button>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>

            </div>
        </div>

    </div>

    <script src="../popup.js"></script>

</body>

</html>