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
        <h1>Connexion</h1>
        <form action="connectlogin.php" method="POST">
            <input type="email" name="lemail" id="lemail" placeholder="Email" required><br />
            <input type="password" name="lpass" id="lpass" placeholder="Mot de passe" required><br />
            <input type="submit" name="login" id="login" value="Connexion"><br>
            <div class="dejacompte">
                <p>Vous avez déjà un compte ?</p>
                <button onclick="window.location.href='choice.html';">
                    Créer un compte
                </button>
            </div>
        </form>
    </div>


    <?php include '../include/connexion/login.php'; ?>




</body>

</html>