<?php
session_start();
include '../../include/connexion bdd/database.php';
global $db;

include '../../include/add/addcandid.php';

$query = $db->prepare("SELECT * FROM candidatures");
$query->execute();
$results = $query->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../css/styleadmin.css">
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

    <div class="container">
        <div class="modif">
            <h1>Ajouter</h1>
            <form method="POST">
                <input type="text" name="prenom" id="prenom" placeholder="Prénom" required><br />
                <input type="text" name="nom" id="nom" placeholder="Nom" required><br />
                <input type="email" name="email" id="email" placeholder="Email" required><br />
                <input type="text" name="titre" id="titre" placeholder="Titre de l'annonce" required><br />
                <select name="contrat" id="contrat">
                    <option value="---">---</option>
                    <option value="CDD">CDD</option>
                    <option value="CDI">CDI</option>
                    <option value="Stage">Stage</option>
                    <option value="Alternance">Alternance</option>
                </select>
                <textarea name="message" id="msg" placeholder="Message" maxlength="300"></textarea>
                <script>
                    const textarea = document.getElementById('message');

                    textarea.addEventListener('input', function () {
                        this.style.height = 'auto';
                        this.style.height = this.scrollHeight + 'px';
                    });
                </script>
                <input type="submit" name="send" id="send" value="Ajouter">
            </form>
            <center><button onclick="window.location.href='../admin.php';">Retour</button></center>

            <?php if (isset($errorMessage)): ?>
                <div class="message"><?php echo htmlspecialchars($errorMessage); ?></div>
            <?php endif; ?>
        </div>
    </div>
</body>

</html>