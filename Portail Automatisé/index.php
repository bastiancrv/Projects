<?php


$user = $_GET["Utilisateur"];
$mdp = $_GET["mdp"];



// Nom d'utilisateur et mot de passe à sécuriser
$username = "admin";
$password = "admin";

// Hachage du nom d'utilisateur et du mot de passe
$hashed_username = hash('sha256', $username); // Utilisation d'un hachage sécurisé (SHA-256 ici)
$hashed_password = password_hash($password, PASSWORD_DEFAULT); // Utilisation de password_hash pour le mot de passe

// Stockage sécurisé des données hachées
$secure_storage = [
    'username' => $hashed_username,
    'password' => $hashed_password
];

setcookie("password", $hashed_password, time() + 3600, "/"); // Expire dans une heure


// Comparaison avec les données stockées
if (hash('sha256', $user) === $secure_storage['username'] && password_verify($mdp, $secure_storage['password'])) {
    // Authentification réussie, redirection avec les valeurs hachées
    header("Location: controle.php?username=" . urlencode($secure_storage['username']) . "&password=" . urlencode($secure_storage['password']));



} else {
    // Identifiants incorrects
    header("Location: erreur.php");
}


?>



<?php
// Connexion à la base de données
$servername = "localhost";
$username = "votre_utilisateur";
$password = "votre_mot_de_passe";
$dbname = "votre_base_de_donnees";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connexion échouée: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération des données du formulaire
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Hachage du mot de passe
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insertion des données dans la base de données
    $sql = "INSERT INTO users (username, password) VALUES ('$username', '$hashed_password')";

    if ($conn->query($sql) === TRUE) {
        echo "Nouvel enregistrement créé avec succès";
    } else {
        echo "Erreur: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Inscription</title>
</head>
<body>
    <form method="post" action="">
        Nom d'utilisateur: <input type="text" name="username" required><br>
        Mot de passe: <input type="password" name="password" required><br>
        <input type="submit" value="S'inscrire">
    </form>
</body>
</html>
