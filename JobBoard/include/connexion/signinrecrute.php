<?php
$creation = false;
if (isset($_POST['send'])) {
    extract($_POST);

    if (!empty($email) && !empty($pass) && !empty($cpass) && !empty($prenom) && !empty($nom)) {
        if ($pass == $cpass) {

            $option = [
                'cost' => 12,
            ];

            $hashpass = password_hash($pass, PASSWORD_BCRYPT, $option);
        } else {
            echo "Les mots de passe ne sont pas identiques";
            exit;
        }
    }

    $c = $db->prepare("SELECT email FROM users WHERE email = :email");
    $c->execute([
        'email' => $email
    ]);

    $result = $c->rowCount();

    if ($result == 0) {
        $q = $db->prepare("INSERT INTO users(email, password, prenom, nom, fonction) VALUES(:email, :password, :prenom, :nom, 'recruteur')");
        $q->execute([
            'email' => $email,
            'password' => $hashpass,
            'prenom' => $prenom,
            'nom' => $nom
        ]);
        echo 'Le compte a bien été crée';
        $creation = true;
    } else {
        echo "Un compte avec l'email " . $email . " existe déjà";
    }
}
if ($creation == true) {
    header("Location : ../connexion/connectlogin.php");
    exit;
}