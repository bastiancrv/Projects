<?php
session_start();
include '../../include/connexion bdd/database.php';
global $db;

include '../../include/supp/suppcandid.php';

$query = $db->prepare("SELECT * FROM candidatures");
$query->execute();
$results = $query->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../css/stylelogin.css">
    <title>Affichage des Données</title>
</head>

<body>
    <div class="container">
        <h1>Candidatures</h1>
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>ID user</th>
                    <th>ID annonce</th>
                    <th>Date</th>
                    <th>Message</th>
                </tr>
            </thead>
            <tbody>
                <?php
                foreach ($results as $row): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($row['id_candidature']); ?></td>
                        <td><?php echo htmlspecialchars($row['id_users']); ?></td>
                        <td><?php echo htmlspecialchars($row['id_annonces']); ?></td>
                        <td><?php echo htmlspecialchars($row['date']); ?></td>
                        <td><?php echo htmlspecialchars($row['message']); ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <div class="container2">
        <div class="modif">
            <h1>Supprimer</h1>
            <form method="POST">
                <input type="text" name="id_candidature" id="id_candidature" placeholder="id_candidature"
                    required><br />
                <input type="submit" name="send" id="send" value="Supprimer">
            </form>
            <?php if (isset($errorMessage)): ?>
                <div class="message"><?php echo htmlspecialchars($errorMessage); ?></div>
            <?php endif; ?>
        </div>
    </div>
</body>

</html>