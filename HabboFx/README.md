## Table of Contents

1. [General Info](#general-info)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Collaboration](#collaboration)
7. [FAQs](#faqs)

---

### General Info

Le projet **HabboFX** est un jeu d'aménagement de pièces inspiré par _Habbo Hotel_, développé pour le **Campus Epitech Marseille**. Le joueur peut interagir avec des meubles, personnaliser des salles et explorer différentes fonctionnalités de gestion, telles que l'inventaire, l'achat d'objets, et le système de crédits.

**Statut du projet** : En développement avec des fonctionnalités déjà implémentées, et des évolutions prévues, telles que l'intégration de missions et d'interactions plus poussées.

---

### Features

Les principales fonctionnalités du jeu sont :

- **Système de crédits** : Un bouton cliquable permet de générer des crédits avec un effet sonore satisfaisant. Ces crédits servent à acheter des objets dans le shop.
- **Aménagement de salles** : Achat de meubles et placement dans différentes pièces.
- **Gestion de l'inventaire** : Ajout d'items achetés dans un inventaire et possibilité de les placer dans la salle.
- **Déplacement entre les pièces** : Changement de salle par téléportation.
- **Déplacement et zoom de la salle** : Drag and drop pour déplacer la vue et molette de la souris pour zoomer.
- **Réinitialisation de la vue** : Bouton reset pour recentrer la salle.
- **Personnage fixe** : Déplacement par téléportation entre les tuiles et les pièces.

---

### Technologies

Le projet utilise les technologies suivantes :

- [Java](https://www.oracle.com/java/) : Version 17 pour la logique du jeu.
- [JavaFX](https://openjfx.io/) : Interface graphique.
- [Google Gson](https://github.com/google/gson) : Pour gérer les données JSON.
- [JUnit](https://junit.org/junit5/) : Tests unitaires.
- [Maven](https://maven.apache.org/) : Gestion des dépendances et automatisation.

---

### Installation

Pour installer le projet localement :

#### 1. Installer Java 17 ou supérieur

Téléchargez et installez Java depuis [Oracle](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html).

#### 2. Installer Maven

Si Maven n'est pas encore installé sur votre machine, voici comment procéder :

- Téléchargez Maven [ici](https://maven.apache.org/download.cgi).
- Décompressez l'archive dans un répertoire de votre choix.
- Ajoutez Maven à votre variable d'environnement `PATH` :
  - Sur **Windows** : Ajoutez `C:\chemin\vers\maven\bin` à la variable `PATH` dans les paramètres système.
  - Sur **macOS/Linux** : Ajoutez la ligne suivante dans votre fichier `~/.bash_profile`, `~/.zshrc`, ou `~/.bashrc` :
    ```bash
    export PATH=/chemin/vers/maven/bin:$PATH
    ```
    Remplacez `/chemin/vers/maven` par le répertoire où vous avez décompressé Maven.
- Vérifiez l'installation de Maven en exécutant la commande suivante dans votre terminal :
  ```bash
  mvn -v
  ```

#### 3. Cloner le dépôt

Clonez le projet en utilisant la commande suivante :

```bash
git clone git@github.com:EpitechMscProPromo2027/T-JAV-501-MAR_1.git
```

Accéder au répertoire du projet :

```bash
cd /T-JAV-501-MAR_1
```

Compiler et installer les dépendances :

```bash
mvn clean install
```

Lancer le jeu

```bash
mvn javafx:run
```

## Usage

---

Une fois le jeu lancé, voici quelques informations sur l'utilisation des principales fonctionnalités :

- **Générer des crédits** : Cliquez sur le bouton dédié pour ajouter des crédits avec un son satisfaisant.
- **Acheter des items** : Utilisez la boutique pour acheter des meubles avec vos crédits.
- **Aménagement de salle** : Allez dans le menu "Inventaire", sélectionnez un meuble et placez-le dans la salle.
- **Zoom et déplacement** : Utilisez la molette de la souris pour zoomer et déplacez la salle en cliquant et en glissant avec la souris.
- **Téléportation du personnage** : Cliquez sur une porte pour changer de salle et téléporter votre personnage.
- **Réinitialisation de la salle** : Appuyez sur le bouton "Reset" pour recentrer la salle à sa position initiale.

### Collaboration

---

Si vous souhaitez contribuer au projet, voici comment vous pouvez collaborer :

1. Forkez le projet en utilisant l'option "Fork" sur GitHub.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature-name`).
3. Faites vos modifications et validez-les (`git commit -am 'Add new feature'`).
4. Poussez votre branche (`git push feature-name`).
5. Ouvrez une pull request pour intégrer vos modifications.

> "Les bonnes pratiques de collaboration permettent de garantir la qualité du code tout en intégrant de nouvelles idées."

### FAQs

---

Voici une liste des questions fréquemment posées avec leurs réponses :

1. **Comment obtenir des crédits ?**
   Cliquez sur le bouton "Crédits" pour en générer avec un effet sonore.

2. **Comment acheter un meuble ?**
   L'achat de meubles se fait directement depuis le magasin du jeu. Vous pouvez sélectionner un meuble, l'ajouter à votre inventaire puis à votre espace.

3. **Puis-je déplacer des meubles après les avoir placés ?**
   Non, pour le moment, le placement est définitif, mais la fonctionalité sera effective dans le futur.

4. **Le personnage est-il personnalisable ?**
   Actuellement, le personnage est ne peut pas être personnalisé. Cependant, les fonctionnalités relatives à la personnalisation du personnage peuvent être ajoutées dans le futur.

5. **Est-il possible de changer de salle ?**
   Oui, vous pouvez changer de salle en utilisant le bouton de navigation.

|         Fonctionnalité         |                       Description                       |    Statut     |
| :----------------------------: | :-----------------------------------------------------: | :-----------: |
|       Système de crédits       |  Permet de générer des crédits pour acheter des items   | ✅ Implémenté |
|         Achat d'objets         |       Permet d'acheter des meubles pour la pièce        | ✅ Implémenté |
|       Placement d'objets       |       Permet de placer les meubles dans la salle        | ✅ Implémenté |
|  Téléportation du personnage   | Le personnage se téléporte entre les différentes pièces | ✅ Implémenté |
| Personnalisation du personnage |               Personnaliser le personnage               |  ❌ À venir   |
