<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/styleloginpage.css">
    <title>Login</title>
</head>

<body>
    <div class="container">

        <?php
        include '../include/connexion bdd/database.php';
        global $db;
        ?>

        <img src="../logo/TIGRE 1.png" alt="">
        <h1>Créer un compte</h1>
        <form method="POST">
            <input type="email" name="email" id="email" placeholder="Email" required><br />

            <div class="password-container">

                <input type="password" name="pass" id="pass" placeholder="Mot de passe" required><br />
                <input type="password" name="cpass" id="cpass" placeholder="Confirmer mot de passe" required><br />

            </div>

            <div class="info-container">

                <input type="prenom" name="prenom" id="prenom" placeholder="Prénom" required><br />
                <input type="nom" name="nom" id="nom" placeholder="Nom de famille" required><br />

            </div>

            <input type="submit" name="send" id="send" value="Créer">

            <div class="dejacompte">
                <p>Déjà un compte ?</p>
                <button onclick="window.location.href='connectlogin.php';">
                    Connexion
                </button>
            </div>
        </form>
    </div>


    <?php include '../include/connexion/signinrecrute.php'; ?>


</body>

</html>