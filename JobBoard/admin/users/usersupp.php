<?php
session_start();
include '../../include/connexion bdd/database.php';
global $db;

include '../../include/supp/suppuser.php';

$query = $db->prepare("SELECT * FROM users");
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
        <h1>Utilisateurs</h1>
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
                        <td class="<?php echo $fonctionClass; ?>"><?php echo htmlspecialchars($row['fonction']); ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <div class="container2">
        <div class="modif">
            <h1>Supprimer</h1>
            <form method="POST">
                <input type="text" name="id_users" id="user_id" placeholder="id_users" required><br />
                <input type="submit" name="send" id="send" value="Supprimer">
            </form>
            <?php if (isset($errorMessage)): ?>
                <div class="message"><?php echo htmlspecialchars($errorMessage); ?></div>
            <?php endif; ?>
        </div>
    </div>
    <script src="../../popup.js"></script>

</body>

</html>