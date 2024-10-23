<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/styleloginpage.css">
    <title>Document</title>
</head>

<body>
    <?php
    session_start();
    include 'include/connexion bdd/database.php';
    global $db;
    ?>


    <div class="container">
        <h1>Créer Entreprise</h1>
        <form method="POST">

            <input type="text" name="nom" id="nom" placeholder="Nom de l'Entreprise"><br />
            <textarea name="description" id="description" placeholder="Description" maxlength="300"></textarea>
            <script>
                const textarea = document.getElementById('description');

                textarea.addEventListener('input', function () {
                    this.style.height = 'auto';
                    this.style.height = this.scrollHeight + 'px';
                });
            </script>
            <input type="text" name="lieu" id="lieu" placeholder="Lieu"><br />
            <input type="submit" name="send" id="send" value="Créer">

            <?php include 'include/add/addentreprecruteur.php'; ?>


            <!-- Popup -->

            <div id="loginPopup" class="popup">
                <div class="popup-content">
                    <h3>Entreprise créée avec succès</h3>
                    <button onclick="closeLoginPopup()">OK</button>
                </div>
            </div>
    </div>
    <div class="retour">
        <a href="index.php">Retourner sur le site</a>
    </div>



    <div class="container">
        <h1>Créer Annonce</h1>
        <form method="POST">

            <input type="text" name="titre" id="titre" placeholder="Nom de l'annonce"><br />
            <input type="text" name="entrep" id="entrep" placeholder="Nom de l'Entreprise"><br />

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
            <input type="text" name="salaire" id="salaire" placeholder="Salaire"><br />
            <input type="submit" name="send" id="send" value="Créer">


            <?php include 'include/add/addannoncerecruteur.php'; ?>

            <!-- Popup -->

            <div id="loginPopup2" class="popup">
                <div class="popup-content">
                    <h3>Annonce créée avec succès</h3>
                    <button onclick="closeLoginPopup2()">OK</button>

                </div>
            </div>
    </div>

    <script src="popup.js"></script>
</body>

</html>