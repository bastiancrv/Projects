<?php
session_start();
include '../../include/connexion bdd/database.php';
global $db;

include '../../include/supp/suppentrep.php';

$query = $db->prepare("SELECT * FROM entreprises");
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
        <h1>Entreprises</h1>
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
                foreach ($results as $row): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($row['id_entrep']); ?></td>
                        <td><?php echo htmlspecialchars($row['nom']); ?></td>
                        <td style="max-width: 300px"><?php echo htmlspecialchars($row['description']); ?></td>
                        <td><?php echo htmlspecialchars($row['lieu']); ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <div class="container2">
        <div class="modif">
            <h1>Supprimer</h1>
            <form method="POST">
                <input type="text" name="id" id="id" placeholder="id" required><br />
                <input type="submit" name="send" id="send" value="Supprimer">
            </form>
            <?php if (isset($errorMessage)): ?>
                <div class="message"><?php echo htmlspecialchars($errorMessage); ?></div>
            <?php endif; ?>
        </div>
    </div>
</body>

</html>