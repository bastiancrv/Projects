<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styleloginpage.css">
    <title>Document</title>
</head>

<body>
    <?php session_start();
    include 'include/connexion bdd/database.php';
    global $db;
    $query2 = $db->prepare("SELECT nom FROM entreprises");
    $query2->execute();
    $results2 = $query2->fetchAll(PDO::FETCH_ASSOC);
    ?>



    <div class="container">
        <h1>Apply for a Job</h1>
        <form method="POST">
            <input type="text" name="id_annonces" id="id_annonces" placeholder="id_annonces" hidden required><br />


            <div class="info-container">

                <input type="text" name="prenom" id="prenom" value="<?php echo $_SESSION['prenom']; ?>" required
                    readonly><br />
                <input type="text" name="nom" id="nom" value="<?php echo $_SESSION['nom']; ?>" required readonly><br />

            </div>

            <input type="email" name="email" id="email" value="<?php echo $_SESSION['email']; ?>" required
                readonly><br />



            <textarea name="message" id="message" placeholder="Let us a message" maxlength="300" required></textarea>
            <script>
                const textarea = document.getElementById('message');

                textarea.addEventListener('input', function () {
                    this.style.height = 'auto';
                    this.style.height = this.scrollHeight + 'px';
                });
            </script>


            <form action="index.php" method="post" onsubmit="return redirectToIndex();">
                <input type="submit" name="send" id="send" value="Apply">
            </form>






            <!-- Popup -->



            <?php include 'include/connexion/login.php'; ?>

            <script src="popup.js"></script>

    </div>

    <?php include 'include/candidature/applydone.php'; ?>



</body>

</html>