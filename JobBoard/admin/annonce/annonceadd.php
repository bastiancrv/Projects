<?php
session_start();
include '../../include/connexion bdd/database.php';
global $db;

include '../../include/add/addannonce.php';

$query = $db->prepare("SELECT * FROM annonces");
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
        <h1>Annonces</h1>
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Titre</th>
                    <th>ID_entrep</th>
                    <th>Contrat</th>
                    <th>Offre</th>
                    <th>Salaire</th>
                </tr>
            </thead>
            <tbody>
                <?php
                foreach ($results as $row): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($row['id_annonces']); ?></td>
                        <td><?php echo htmlspecialchars($row['titre']); ?></td>
                        <td><?php echo htmlspecialchars($row['id_entrep']); ?></td>
                        <td><?php echo htmlspecialchars($row['contrat']); ?></td>
                        <td><?php echo htmlspecialchars($row['offre']); ?></td>
                        <td><?php echo htmlspecialchars($row['salaire']); ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <div class="container">
        <div class="modif">
            <h1>Ajouter</h1>
            <form method="POST">
                <input type="text" name="titre" id="titre" placeholder="titre" required><br />
                <input type="text" name="nom" id="nom" placeholder="Nom de l'entreprise" required><br />
                <select name="contrat" id="contrat">
                    <option value="---">---</option>
                    <option value="CDD">CDD</option>
                    <option value="CDI">CDI</option>
                    <option value="Stage">Stage</option>
                    <option value="Alternance">Alternance</option>
                </select>
                <textarea name="offre" id="offre" placeholder="Offre" maxlength="500"></textarea>
                <script>
                    const textarea = document.getElementById('offre');

                    textarea.addEventListener('input', function () {
                        this.style.height = 'auto';
                        this.style.height = this.scrollHeight + 'px';
                    });
                </script>
                <input type="text" name="salaire" id="salaire" placeholder="salaire" required><br />
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