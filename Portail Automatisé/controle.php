<!DOCTYPE html>
<html lang="fr"><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="controle.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia">
    <title>Interface de Commande</title>

<!--

    <script type="text/javascript">
    function affiche_contenu() {
      var cible = document.getElementById('cible');
      if(cible.style.display != '') {
        cible.style.display = '';
      } else {
        cible.style.display = 'none';
      }
    }
    </script>
-->

<script>
        // Définition de la fonction `toggleLED`
function toggleLED() {
    
    // Création d'un nouvel objet XMLHttpRequest pour faire une requête HTTP
    var xhr = new XMLHttpRequest();

    // Initialisation de la requête HTTP en mode POST vers le fichier "execute_python.php"
    xhr.open("POST", "execute_python.php", true);

    // Définition de l'en-tête HTTP pour spécifier que les données envoyées sont de type "application/x-www-form-urlencoded"
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Définition d'une fonction de rappel (callback) qui sera appelée à chaque changement d'état de la requête (readyState)
    xhr.onreadystatechange = function() {
        // Vérification que la requête est terminée (readyState === 4) et que la réponse du serveur est OK (status === 200)
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Parse la réponse JSON du serveur
            var jsonResponse = JSON.parse(xhr.responseText);
            // Mise à jour de l'élément avec l'ID "output" avec le texte de la réponse du serveur
            document.getElementById("output").innerText = jsonResponse.output;
        }
    };

    // Envoi de la requête HTTP au serveur
    xhr.send();
}

</script>
</head>

<body>
    <div class="content">
        <div class="titre">
            <h1>Lycée Saint Éloi</h1>
        </div>
        <div class="cam">
            <iframe scrolling='no' src="http://192.168.10.83:9081" frameborder="0"></iframe>
        </div>
        <div class="commande">
            <h1>
                <?php
                    try{
                        $connexion = new PDO('mysql:host=localhost;dbname=projetportail', 'root', 'hrb123');
                        if($connexion){ 
                            $afficher="SELECT plaque FROM Plaque WHERE plaque='AA-000-AA'";
                            $result=$connexion->query($afficher);
                            $result = $result -> fetch(PDO::FETCH_ASSOC);
                            echo $result['plaque'];
                        }
                    }
                        
                    catch (PDOException $event){
                        die('Erreur :'.$event->getMessage());
                    }
                    
                ?>
            </h1>
           <!-- <div onclick="affiche_contenu()">-->
            <input type="submit" onclick="toggleLED()" value="Ouverture Manuelle">
            <pre id="output"></pre>

            <!--<div class="affichage">
                <div id="cible" style="display:none;">
                    <p>Portail Ouvert</p>
                </div> 
            </div>
            -->
        </div>

        <div class="quit">
            <a class="deco" href="index.html"><input type="submit" value="Déconnexion"></a>
        </div>
</body>
</html>