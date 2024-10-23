<?php
    $hashed_password = $_COOKIE['password'];
    echo "Le mot de passe haché est : ".$hashed_password;
        echo "<br>";
?>

<?php
    // Mot de passe haché stocké en base de données
    $mot_de_passe_hache = $hashed_password;

    // Mot de passe fourni par l'utilisateur
    $mot_de_passe_fourni = 'admin';

    // Vérification du mot de passe fourni
    if (password_verify($mot_de_passe_fourni, $mot_de_passe_hache)) {
        echo 'Le password haché est bien identique à celui saisi';
    } else {
        echo 'Le password haché est différent de celui saisi';
    }
?>
