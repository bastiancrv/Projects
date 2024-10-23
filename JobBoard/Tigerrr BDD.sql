-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : sam. 19 oct. 2024 à 07:53
-- Version du serveur : 8.0.35
-- Version de PHP : 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `Tigerrr`
--

-- --------------------------------------------------------

--
-- Structure de la table `annonces`
--

CREATE TABLE `annonces` (
  `id_annonces` int NOT NULL,
  `titre` varchar(45) NOT NULL,
  `id_entrep` int NOT NULL,
  `contrat` enum('CDD','CDI','Stage','Alternance') NOT NULL,
  `offre` varchar(600) NOT NULL,
  `salaire` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `annonces`
--

INSERT INTO `annonces` (`id_annonces`, `titre`, `id_entrep`, `contrat`, `offre`, `salaire`) VALUES
(51, 'Ingenieur Dev. Micro electronique', 3, 'CDI', 'Participez a la conception et au developpement de solutions micro electroniques', '52000€/an'),
(52, 'Ingenieur Systemes de Defense', 50, 'CDI', 'Concevez des systemes electroniques de defense chez Thales', '58000€/an'),
(53, 'Ingenieur Aeronautique', 85, 'CDI', 'Rejoignez Airbus pour developper les avions du futur', '45000€/an'),
(54, 'Chef de Projet Automobile', 86, 'CDI', 'Pilotez les projets de conception des nouveaux modeles chez Renault', '55000€/an'),
(55, 'Assistant Marketing Luxe', 87, 'Stage', 'Assistez l equipe marketing dans la promotion des produits LVMH', '1500€/mois'),
(56, 'Technicien Telecom', 88, 'CDD', 'Maintenez et developpez les infrastructures telecoms chez Orange', '30000€/an'),
(57, 'Analyste Energie', 89, 'CDI', 'Analysez les tendances du marche energetique chez TotalEnergies', '48000€/an'),
(58, 'Assistant Recherche et Developpement', 90, 'Alternance', 'Contribuez a la recherche et developpement chez Danone', '1200€/mois'),
(59, 'Manager Rayon', 91, 'CDI', 'Gerez et optimisez un rayon dans un hypermarche Carrefour', '32000€/an'),
(60, 'Agent Commercial Transport', 92, 'CDD', 'Gerez les ventes de billets et services de la SNCF', '27000€/an'),
(61, 'Chef de Chantier BTP', 93, 'CDI', 'Supervisez les grands chantiers chez Vinci Construction', '40000€/an'),
(62, 'Charge d Affaires Assurance', 94, 'CDI', 'Developpez le portefeuille client de AXA', '50000€/an'),
(63, 'Ingenieur Aeronautique Militaire', 95, 'CDI', 'Concevez les nouveaux avions militaires chez Dassault Aviation', '60000€/an'),
(64, 'Consultant IT', 96, 'CDI', 'Accompagnez les clients dans leur transformation digitale chez Capgemini', '45000€/an'),
(65, 'Charge de Mission Telecom', 98, 'CDI', 'Gerez les projets telecoms chez Bouygues', '47000€/an'),
(66, 'Ingenieur Traitement des Dechets', 100, 'CDI', 'Participez a la gestion des dechets chez Suez', '38000€/an'),
(67, 'Ingenieur Materiaux', 101, 'CDI', 'Developpez de nouveaux materiaux pour Saint-Gobain', '49000€/an'),
(68, 'Technicien Reseau Electrique', 102, 'Alternance', 'Assistez dans la maintenance des reseaux chez EDF', '1200€/mois'),
(69, 'Analyste Financier', 103, 'CDI', 'Participez aux analyses financieres chez Societe Generale', '55000€/an');

-- --------------------------------------------------------

--
-- Structure de la table `candidatures`
--

CREATE TABLE `candidatures` (
  `id_candidature` int NOT NULL,
  `id_users` int NOT NULL,
  `id_annonces` int NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `candidatures`
--

INSERT INTO `candidatures` (`id_candidature`, `id_users`, `id_annonces`, `date`, `message`) VALUES
(26, 1, 19, '2024-10-11 13:29:44', 'Je veux intégrer votre entreprise !'),
(28, 1, 19, '2024-10-11 15:20:10', 'Je souhaite venir chez vous.'),
(31, 1, 23, '2024-10-14 10:15:52', 'Allez svp');

-- --------------------------------------------------------

--
-- Structure de la table `entreprises`
--

CREATE TABLE `entreprises` (
  `id_entrep` int NOT NULL,
  `nom` varchar(45) NOT NULL,
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lieu` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `entreprises`
--

INSERT INTO `entreprises` (`id_entrep`, `nom`, `description`, `lieu`) VALUES
(3, 'STMicroelectronics', 'STMicroelectronics est une multinationale franco-italienne de droit néerlandais qui conçoit fabrique et commercialise des puces électroniques', 'Rousset'),
(50, 'Thales', 'Thales est un groupe français spécialisé dans l aérospatial la défense la sécurité et le transport terrestre', 'Marseille'),
(81, 'CEA Cadarache', 'Nucléaire', 'Cadarache'),
(85, 'Airbus', 'Constructeur aéronautique et spatial', 'Toulouse'),
(86, 'Renault', 'Constructeur automobile français', 'Boulogne-Billancourt'),
(87, 'LVMH', 'Leader mondial du luxe', 'Paris'),
(88, 'Orange', 'Opérateur de télécommunications', 'Paris'),
(89, 'TotalEnergies', 'Entreprise multi-énergies', 'Courbevoie'),
(90, 'Danone', 'Leader mondial dans les produits laitiers', 'Paris'),
(91, 'Carrefour', 'Groupe de distribution multinational', 'Massy'),
(92, 'SNCF', 'Société nationale des chemins de fer français', 'Paris'),
(93, 'Vinci', 'Entreprise de construction et de concessions', 'Rueil-Malmaison'),
(94, 'AXA', 'Assurance et gestion d\'actifs', 'Paris'),
(95, 'Dassault Aviation', 'Constructeur aéronautique et militaire', 'Saint-Cloud'),
(96, 'Capgemini', 'Services en technologie de l\'information', 'Paris'),
(98, 'Bouygues', 'Conglomérat industriel dans la construction et les télécoms', 'Paris'),
(100, 'Suez', 'Gestion de l\'eau et des déchets', 'Paris'),
(101, 'Saint-Gobain', 'Production et distribution de matériaux', 'Courbevoie'),
(102, 'EDF', 'Fournisseur d\'énergie', 'Paris'),
(103, 'Société Générale', 'Banque et services financiers', 'Paris');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_users` int NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(80) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `fonction` enum('recruteur','utilisateur','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'utilisateur'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_users`, `email`, `password`, `prenom`, `nom`, `fonction`) VALUES
(1, 'b.cruvellier@icloud.com', '$2y$12$tHSN6lHAE46E./kTv4v2feXZF6l.im.PUPl5wZ95nEpDWOtJ01v2W', 'Bastian', 'Cruvellier', 'utilisateur'),
(2, 'travail.p@gmail.com', '$2y$12$m13KEE4s2lh3842f42Ketul6NyXU1w0cJ9iWj8fIpsl4LapMRYeNu', 'Philippe', 'Travail', 'recruteur'),
(14, 'trystan.badanian@gmail.com', '$2y$12$SR6tXtCKSIWJ7O14OVZR8uclZl/uUetfDHH1PhFpX5uiru7fbm2PC', 'Tristan', 'Badanian', 'utilisateur'),
(15, 'redbullbasement@gmail.com', '$2y$12$TXHOiJYdEqUyMIchtu5vn.y7Wv3o3IvL9bXP/PCPRG5pykHAiEgIm', 'Red', 'Bull', 'utilisateur'),
(17, 'recruteur@gmail.com', '$2y$12$d4tIHDMJ.sfvE19Gsfg6VuxYJk7kK8zMKjW/PDe.hr8iv3oXA6R6G', 'recruteur', 'recruteur', 'recruteur'),
(21, 'monitoring@gmail.com', '$2y$12$oETfjkeMHmoEzNe8cub7u.mmAm0qoMOacZGmhRtAEUGjtVcn3Hz1K', 'Moni', 'Toring', 'utilisateur'),
(22, 'toringmoni@gmail.com', '$2y$12$llQoZMhktm7KEUCAyxkb2e/ztN5T/O1jDb67I4NMzFeeu7S/SI7Ym', 'Toring', 'Moni', 'recruteur'),
(25, 'c.admin@monitoring.com', '$2y$12$4blMtz2XefG65CWMmERbH.RhYOHuYP/EaiVjv8i/7rrdhAsrQXWwW', 'Bastian', 'Cruvellier', 'admin'),
(26, 'recruteur@test.com', '$2y$12$Y3AeWUVkRtm3mQ03MWy6AuHBcNpsMiFNHIdFWe3C5j9w0BexHnOpW', 'Recrute', 'Test', 'recruteur'),
(30, 'bob@gmail.com', '$2y$12$1CZnLzuNoc2m4mpgAL.u7eXwvQmnpH7mwBVcYnIABzRJopz6jXTX.', 'Bob', 'Bob', 'utilisateur');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `annonces`
--
ALTER TABLE `annonces`
  ADD PRIMARY KEY (`id_annonces`),
  ADD KEY `id_entrep` (`id_entrep`),
  ADD KEY `id_contrat` (`contrat`);

--
-- Index pour la table `candidatures`
--
ALTER TABLE `candidatures`
  ADD PRIMARY KEY (`id_candidature`),
  ADD KEY `id_candidat` (`id_users`),
  ADD KEY `id_entrep` (`id_annonces`);

--
-- Index pour la table `entreprises`
--
ALTER TABLE `entreprises`
  ADD PRIMARY KEY (`id_entrep`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_users`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `annonces`
--
ALTER TABLE `annonces`
  MODIFY `id_annonces` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT pour la table `candidatures`
--
ALTER TABLE `candidatures`
  MODIFY `id_candidature` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT pour la table `entreprises`
--
ALTER TABLE `entreprises`
  MODIFY `id_entrep` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_users` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
