<?php
session_start();
include '../../include/connexion bdd/database.php';
global $db;

include '../../include/update/updateuser.php';

$query = $db->prepare("SELECT * FROM users");
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
                        <td>
                            <i class='bx bxs-edit' onclick="storeIdu(
                                            <?php echo htmlspecialchars($row['id_users']); ?>, 
                                            '<?php echo htmlspecialchars($row['prenom']); ?>', 
                                            '<?php echo htmlspecialchars($row['nom']); ?>', 
                                            '<?php echo htmlspecialchars($row['email']); ?>', 
                                            '<?php echo htmlspecialchars($row['fonction']); ?>'
                                        ); 
                                        window.location.href='usermodif.php'">
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
                <input type="text" name="user_id" id="user_id" placeholder="id_users" readonly required><br />
                <div class="info-container">
                    <input type="text" name="prenom" id="prenom" placeholder="Prénom" required><br />
                    <input type="text" name="nom" id="nom" placeholder="Nom" required><br />
                </div>
                <input type="email" name="email" id="email" placeholder="Email" required><br />
                <select name="fonction" id="fonction">
                    <option value="---">---</option>
                    <option value="utilisateur">utilisateur</option>
                    <option value="recruteur">recruteur</option>
                    <option value="admin">admin</option>
                </select>
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