<?php
session_start();
include '../../include/connexion bdd/database.php';
global $db;

include '../../include/update/updateentrep.php';

$query = $db->prepare("SELECT * FROM entreprises");
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
                        <td>
                            <i class='bx bxs-edit' onclick="storeIde(
                                            <?php echo htmlspecialchars($row['id_entrep']); ?>, 
                                            '<?php echo htmlspecialchars($row['nom']); ?>', 
                                            '<?php echo htmlspecialchars($row['description']); ?>', 
                                            '<?php echo htmlspecialchars($row['lieu']); ?>'
                                        ); 
                                        window.location.href='entrepmodif.php'">
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
                <input type="text" name="entrep_id" id="entrep_id" placeholder="entrep_id" readonly required><br />
                <input type="text" name="nom" id="nom" placeholder="nom" required><br />
                <textarea name="description" id="description" placeholder="Description" maxlength="300"></textarea>

                <script>
                    const textarea = document.getElementById('description');

                    textarea.addEventListener('input', function () {
                        this.style.height = 'auto';
                        this.style.height = this.scrollHeight + 'px';
                    });
                </script>

                <input type="text" name="lieu" id="lieu" placeholder="lieu" required><br />
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