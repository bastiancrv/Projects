<?php
session_start();
include '../../include/connexion bdd/database.php';
global $db;

include '../../include/update/updatecandid.php';

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
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
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
                        <td>
                            <i class='bx bxs-edit' onclick="storeIdc(
                                            <?php echo htmlspecialchars($row['id_candidature']); ?>, 
                                            '<?php echo htmlspecialchars($row['id_users']); ?>', 
                                            '<?php echo htmlspecialchars($row['id_annonces']); ?>', 
                                            '<?php echo htmlspecialchars($row['message']); ?>'

                                        ); 
                                        window.location.href='candidmodif.php'">
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
                <input type="text" name="id_candidature" id="idc" placeholder="id_candidature" readonly required><br />
                <input type="text" name="id_users" id="idu" placeholder="id_users" readonly required><br />
                <input type="text" name="id_annonces" id="ida" placeholder="id_annonces" readonly required><br />
                <textarea name="message" id="msg" placeholder="Message" maxlength="300"></textarea>
                <script>
                    const textarea = document.getElementById('message');

                    textarea.addEventListener('input', function () {
                        this.style.height = 'auto';
                        this.style.height = this.scrollHeight + 'px';
                    });
                </script>
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