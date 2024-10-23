<?php
$connexion = False;
if (isset($_POST['login'])) {
    extract($_POST);

    if (!empty($lemail) && !empty($lpass)) {
        $q = $db->prepare("SELECT * FROM users WHERE email = :email");
        $q->execute(['email' => $lemail]);
        $result = $q->fetch();

        if ($result == true) {
            $hashpass = $result['password'];
            if (password_verify($lpass, $hashpass)) {
                $connexion = true;

                session_start();
                $_SESSION['prenom'] = $result['prenom'];
                $_SESSION['email'] = $result['email'];
                $_SESSION['nom'] = $result['nom'];


            } else {
                echo "Le mot de passe n'est pas correct";
            }


        } else {
            echo "Le compte portant l'email " . $lemail . " n'existe pas";
        }

    } else {
        echo "Veuillez compléter l'ensemble des champs";
    }
}

if ($connexion == true && $result['fonction'] == 'utilisateur') {
    header("Location: ../apply.php");
    exit;
} else if ($connexion == true && $result['fonction'] == 'recruteur') {
    header("Location: ../recrucreate.php");
    exit;
} else if ($connexion == true && $result['fonction'] == 'admin') {
    header("Location: ../admin/admin.php");
    exit;
}