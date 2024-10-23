<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">

    <title>Tigerrr</title>

</head>

<body>
    <?php
    session_start();
    include 'include/connexion bdd/database.php';
    global $db;
    if (isset($_GET['reset'])) {
        $titre = '';
        $lieu = '';
    } else {
        if (isset($_GET['titre'])) {
            $titre = $_GET['titre'];
        } else {
            $titre = '';
        }

        if (isset($_GET['lieu'])) {
            $lieu = $_GET['lieu'];
        } else {
            $lieu = '';
        }

    }


    $query = "
    SELECT 
        a.id_annonces,
        a.titre, 
        a.id_entrep, 
        a.contrat, 
        a.offre,
        a.salaire,
        e.nom AS nom_entrep,
        e.description,
        e.lieu
    FROM 
        annonces a
    LEFT JOIN 
        entreprises e ON a.id_entrep = e.id_entrep
    WHERE 
        a.titre LIKE :titre AND
        e.lieu LIKE :lieu
    ORDER BY a.id_annonces ASC
";
    $query3 = $db->prepare($query);
    $query3->execute([
        ':titre' => '%' . $titre . '%',
        ':lieu' => '%' . $lieu . '%'

    ]);
    $results3 = $query3->fetchAll(PDO::FETCH_ASSOC);
    ?>

    <style>
        html body * {
            font-family: 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
        }

        html body .cmiJapan-JobCard * {
            font-family: 'Noto Sans CJK JP', 'Noto Sans', Noto, 'Hiragino Sans', 'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', Roboto, sans-serif !important;
        }

        /* CSS for the expand/collapse functionality */
        .job-post .details {
            display: none;
        }

        .job-post.expanded .details {
            display: block;
        }
    </style>

    <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <section class="container-fluid">
                <a class="navbar-brand" href="index.php"><img src="images/tigre.png" alt="Logo Tigerrr"></a>


                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Basculer la navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item ms-auto">
                            <a class="nav-link text-light" href="index.php">Accueil</a>
                        </li>
                        <li class="nav-item ms-auto">
                            <a class="nav-link text-light" href="about.html">À propos</a>
                        </li>
                        <li class="nav-item ms-auto">
                            <a class="nav-link active text-light" href="#">Offres d'emplois</a>
                        </li>
                        <li class="nav-item ms-auto">
                            <a class="nav-link text-light" href="connexion/connectlogin.php">Connexion</a>
                        </li>
                    </ul>
                </div>
            </section>
        </nav>
        <section id="navbarsearch" class="container-fluid">
            <p>Trouvez votre prochain emploi ici</p>

            <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="GET" class="d-flex">
                <input type="text" name="titre" id="titre"
                    class="form-control border border-primary custom-shadow rounded" placeholder="Titre de l'emploi" ?>
                <input type="text" name="lieu" id="lieu"
                    class="form-control border border-primary custom-shadow rounded" placeholder="Ville" ?>
                <button type="submit" class="btn btn-primary">Rechercher</button>
                <button type="submit" name="reset" class="btn btn-secondary">Retirer les filtres</button>
            </form>
        </section>

    </header>

    <div class="background-image"></div>

    <section id="job-listings" class="container job-listings-section">
        <h2>Toutes les offres</h2>
        <div class="row justify-content-center">
            <?php
            foreach ($results3 as $row):
                ?>
                <article class="job-post col-md-4 d-flex flex-column position-relative">
                    <h3><?php echo htmlspecialchars($row['titre']); ?></h3>
                    <p><strong>Entreprise :</strong> <?php echo htmlspecialchars($row['nom_entrep']); ?></p>
                    <p><strong>Lieu :</strong> <?php echo htmlspecialchars($row['lieu']); ?></p>
                    <p><strong>Description :</strong> <?php echo htmlspecialchars($row['description']); ?></p>
                    <p><strong>Contrat :</strong> <?php echo htmlspecialchars($row['contrat']); ?></p>
                    <div class="details">
                        <p><strong>Description de l'offre :</strong> <?php echo htmlspecialchars($row['offre']); ?></p>
                        <p><strong>Salaire :</strong> <?php echo htmlspecialchars($row['salaire']); ?></p>
                    </div>
                    <a href="#" class="toggle-details toggle-more position-absolute start-0 bottom-0 mb-2 ms-2"
                        onclick="toggleDetails(this);">En savoir plus</a>
                    <button
                        onclick="storeIda(<?php echo htmlspecialchars($row['id_annonces']); ?>); window.location.href='connexion/connectlogin.php'"
                        class="btn btn-primary btn-sm position-absolute end-0 bottom-0 mb-2 me-2">Postuler</button>
                </article>
            <?php
            endforeach;
            ?>

        </div>
    </section>



    <br><br>
    <footer class="container-fluid">
        <p>&copy; 2024 Tigerrr. Tous droits réservés.</p>
        <p class="orangelink">Politique de confidentialité | Conditions d'utilisation</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="main.js"></script>

    <?php include 'include/connexion/login.php'; ?>

    <script src="popup.js"></script>

</body>

</html>