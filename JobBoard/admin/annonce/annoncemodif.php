<?php
session_start();
include '../../include/connexion bdd/database.php';
global $db;

include '../../include/update/updateannonce.php';

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
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

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
                        <td>
                            <i class='bx bxs-edit' onclick="storeIda(
                                            <?php echo htmlspecialchars($row['id_annonces']); ?>, 
                                            '<?php echo htmlspecialchars($row['titre']); ?>', 
                                            '<?php echo htmlspecialchars($row['id_entrep']); ?>', 
                                            '<?php echo htmlspecialchars($row['contrat']); ?>', 
                                            '<?php echo htmlspecialchars($row['offre']); ?>',
                                            '<?php echo htmlspecialchars($row['salaire']); ?>'
                                        ); 
                                        window.location.href='annoncemodif.php'">
                            </i>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <div class="container">
        <div class="modif">
            <h1>Modifier</h1>
            <form method="POST">
                <input type="text" name="id_annonces" id="id_annonces" placeholder="id_annonces" readonly
                    required><br />
                <input type="text" name="titre" id="titre" placeholder="titre" required><br />
                <input type="text" name="id_entrep" id="id_entrep" placeholder="id_entrep" required><br />
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
                <input type="submit" name="send" id="send" value="Modifier">
            </form>
            <center><button onclick="window.location.href='../admin.php';">Retour</button></center>

            <?php if (isset($errorMessage)): ?>
                <div class="message"><?php echo htmlspecialchars($errorMessage); ?></div>
            <?php endif; ?>
        </div>
    </div>
    <script src="../../popup.js"></script>

</body>

</html>