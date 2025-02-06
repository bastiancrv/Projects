import ReactSvg from "./_components/_icons/ReactSvg";
import TailwindSvg from "./_components/_icons/TailwindSvg";
import JsSvg from "./_components/_icons/JsSvg";
import JavaSvg from "./_components/_icons/JavaSvg";
import HtmlSvg from "./_components/_icons/HtmlSvg";
import CssSvg from "./_components/_icons/CssSvg";
import PhpSvg from "./_components/_icons/PhpSvg";
import EpitechPng from "./_components/_icons/EpitechPng";
import LyceePng from "./_components/_icons/LyceePng";
import OrtecPng from "./_components/_icons/OrtecPng";
import MySqlSvg from "./_components/_icons/MySqlSvg";
import NodeSvg from "./_components/_icons/NodeSvg";
import ExpressSvg from "./_components/_icons/ExpressSvg";
import MongoSvg from "./_components/_icons/MongoSvg";
import SocketSvg from "./_components/_icons/SocketSvg";
import About from "./_components/About";
import NavBar from "./_components/NavBar";
import Card from "./_components/Cards/Card";
import SectionCard from "./_components/Cards/SectionCard";
import ContactMe from "./_components/ContactMe";
import PortfolioPng from "./assets/portfolio.png";
import Habbo1 from "./assets/habbo1.png";
import Habbo2 from "./assets/habbo2.png";
import irc1 from "./assets/irc1.png";
import irc2 from "./assets/irc2.png";
import Jobboard from "./assets/jobboard.png";

function App() {
  return (
    <>
      <main className="bg-neutral-800 h-full p-6 font-poppins text-neutral-300">
        <div className="w-fit mx-auto flex flex-col gap-40 max-sm:gap-20">
          <nav>
            <NavBar />
          </nav>
          <header className="w-fit">
            <About />
          </header>
          <div className="flex flex-row gap-4 justify-center max-md:flex-col">
            <div>
              <Card title={"Projets"}>
                <SectionCard
                  title={"Portfolio"}
                  image={PortfolioPng}
                  ShowProject={true}
                  linkgithub={
                    "https://github.com/bastiancrv/Projects/tree/main/Portfolio"
                  }
                  technologies={[
                    {
                      name: "React",
                      icon: (
                        <ReactSvg
                          style={{ animation: "spin 5s linear infinite" }}
                        />
                      ),
                    },
                    {
                      name: "Tailwind",
                      icon: <TailwindSvg className="animate-pulse" />,
                    },
                  ]}
                >
                  Le portfolio sur lequel vous vous trouvez à été réalisé au
                  cours d&apos;un projet à Epitech, je le maintient
                  régulièrement à jour afin d&apos;y ajouter mes nouveaux
                  projets.
                </SectionCard>
                <SectionCard
                  title={"HabboFx"}
                  SecondImage={true}
                  image={Habbo1}
                  image2={Habbo2}
                  ShowProject={true}
                  linkgithub={
                    "https://github.com/bastiancrv/Projects/tree/main/HabboFx"
                  }
                  technologies={[{ name: "Java", icon: <JavaSvg /> }]}
                >
                  Projet de création d&apos;un jeu vidéo,{" "}
                  <span className="underline italic">HabboFx</span>, inspiré du
                  célèbre jeu <span className="font-bold">Habbo Hotel,</span>{" "}
                  développé avec le framework JavaFx, est un jeu vidéo
                  d&apos;aménagement d&apos;espaces avec Coin Cliqueur.
                  <br /> <br />
                  <ul className="list-disc list-inside text-left">
                    <h1 className="text-center font-extralight italic underline">
                      Fonctionalités présentes :
                    </h1>
                    <li>Placement d&apos;objets dans une salle ✅</li>
                    <li>Navigation entre les salles ✅</li>
                    <li>Drag&Drop de la salle ✅</li>
                    <li>Bouton pour recentrer la salle ✅</li>
                    <li>Curseur pour changer l&apos;opacité du font ✅</li>
                    <li>Redimensionnement de la fenêtre de jeu ✅</li>
                    <li>Zoom dans la pièce ✅</li>
                    <li>Système de crédits ✅</li>
                    <li>Coin Cliqueur ✅</li>
                    <li>Boutique d&apos;objets ✅</li>
                    <li>Inventaire ✅</li>
                    <li>Musique d&apos;ambiance ✅</li>
                  </ul> <br />

                  <ul className="list-disc list-inside text-left">
                    <h1 className="text-center font-extralight italic underline">
                      Fonctionalités à venir :
                    </h1>
                    <li>Pathfining du personnage ❌</li>
                    <li>PNJ avec système de quêtes ❌</li>
                    <li>Sauvegarde des objets dans les pièces ❌</li>
                    <li>Colision avec les objets ❌</li>
                    <li>Système de portes pour changer de salle ❌</li>
                  </ul>
                </SectionCard>
                <SectionCard
                  title={"Tigerrr"}
                  image={Jobboard}
                  ShowProject={true}
                  linkgithub={
                    "https://github.com/bastiancrv/Projects/tree/main/JobBoard"
                  }
                  technologies={[
                    { name: "Html", icon: <HtmlSvg /> },
                    { name: "Css", icon: <CssSvg /> },
                    { name: "Javascript", icon: <JsSvg /> },
                    { name: "Php", icon: <PhpSvg /> },
                    { name: "Mysql", icon: <MySqlSvg /> },
                  ]}
                >
                  Projet de création d&apos;un site{" "}
                  <span className="font-bold">
                    d&apos;annonce d&apos;emploi.
                  </span>{" "}
                  <br /> <br />
                  <ul className="list-disc list-inside text-left">
                    <h1 className="text-center font-extralight italic underline">
                      Fonctionalités présentes :
                    </h1>
                    <li>
                      Connexion{" "}
                      <span className="font-semibold">
                        avec hachage du mot de passe
                      </span>{" "}
                      ✅
                    </li>
                    <li>Création d&apos;identité entreprise ✅</li>
                    <li>Création d&apos;offres d&apos;emploi ✅</li>
                    <li>Barre de recherche ✅</li>
                    <li>
                      <span className="font-semibold">
                        Dashboard Administrateur
                      </span>{" "}
                      ✅
                    </li>
                    <li>
                      Possibilité de{" "}
                      <span className="font-semibold">
                        postuler à une offre
                      </span>
                    </li>
                  </ul>{" "}
                  <br />
                  <ul className="list-disc list-inside text-left">
                    <h1 className="text-center font-extralight italic underline">
                      Fonctionalités à venir :
                    </h1>
                    <li>Cvthèque ❌</li>
                    <li>Partager des fichiers pour candidater ❌</li>
                    <li>Modification de compte ❌</li>
                  </ul>{" "}
                </SectionCard>
                <SectionCard
                  title={"Bavardage"}
                  SecondImage={true}
                  image={irc1}
                  image2={irc2}
                  ShowProject={true}
                  linkgithub={
                    "https://github.com/bastiancrv/Projects/tree/main/HabboFx"
                  }
                  technologies={[
                    {
                      name: "React",
                      icon: (
                        <ReactSvg
                          style={{ animation: "spin 5s linear infinite" }}
                        />
                      ),
                    },
                    { name: "Tailwind", icon: <TailwindSvg /> },
                    { name: "Node.Js", icon: <NodeSvg /> },
                    { name: "Express.Js", icon: <ExpressSvg /> },
                    { name: "Socket.io", icon: <SocketSvg /> },
                    { name: "MongoDb", icon: <MongoSvg /> },
                  ]}
                >
                  Projet de création d&apos;un site de{" "}
                  <span className="font-bold">messagerie instantanée</span>.{" "}
                  <br /> <br />
                  <ul className="list-disc list-inside text-left">
                    <h1 className="text-center font-extralight italic underline">
                      Fonctionalités présentes :
                    </h1>
                    <li>
                      Connexion{" "}
                      <span className="font-semibold">
                        avec hachage du mot de passe
                      </span>{" "}
                      ✅
                    </li>
                    <li>Création de chats privés ✅</li>
                    <li>Envoi de message en temps réel ✅</li>
                    <li>Affichage des utilisateurs connectés ✅</li>
                  </ul>{" "}
                  <br />
                  <ul className="list-disc list-inside text-left">
                    <h1 className="text-center font-extralight italic underline">
                      Fonctionalités à venir :
                    </h1>
                    <li>Création de channels publiques ❌</li>
                    <li>Envoi de fichiers ❌</li>
                    <li>Notifications ❌</li>
                  </ul>{" "}
                  <br />
                  Système de commandes pour toutes les fonctionnalités{" "}
                  <span className="font-semibold">
                    (/list, /create, /join, /leave, /delete, /msg, /nick)
                  </span>
                </SectionCard>
              </Card>
            </div>
            <div className="flex flex-col gap-4">
              <Card title={"Formations"}>
                <SectionCard
                  title={"BTS SN IR"}
                  subtitle={"2022-2024"}
                  technologies={[
                    { name: "Lycée Saint Éloi", icon: <LyceePng /> },
                  ]}
                >
                  Après avoir obtenu mon Baccalauréat Général en spécialité NSI
                  et SI j&apos;ai décidé de m&apos;orienter vers un BTS Systèmes
                  Numérique option Informatique et Réseaux, ce qui m&apos;a
                  permis de développer mes compétences en développement et
                  d&apos;apprendre de nouveaux languages.
                </SectionCard>
                <SectionCard
                  title={"Master of Science"}
                  subtitle={"2024-aujourd'hui"}
                  technologies={[
                    { name: "Epitech Marseille", icon: <EpitechPng /> },
                  ]}
                >
                  Actuellement en Master of Science (Architecte Systèmes
                  d&apos;Information) à Épitech Marseille. <br />
                  Je développe de grandes compétences dans différents languages
                  de programation. <br /> <br />
                  <div className="flex justify-between">
                    <div>
                      <u>Technologies :</u> <br />
                      <ul className="list-disc list-inside">
                        <li>Algorithmie</li>
                        <li>Web</li>
                        <li>Java</li>
                        <li>Réseaux</li>
                        <li>Docker</li>
                        <li>MERN</li>
                        <li>Php Symfony</li>
                        <li>Devops</li>
                      </ul>{" "}
                    </div>
                    <div>
                      <u>Spécialités :</u> <br />
                      <ul className="list-disc list-inside">
                        <li>IA</li>
                        <li>Cybersécurité</li>
                        <li>Cloud</li>
                        <li>Data</li>
                        <li>IOT</li>
                        <li>VR</li>
                      </ul>
                    </div>
                  </div>
                </SectionCard>
              </Card>
              <Card title={"Expériences Pro"}>
                <SectionCard
                  title={"Admin Systèmes et Réseaux"}
                  subtitle={"2022"}
                  technologies={[{ name: "Ortec Group", icon: <OrtecPng /> }]}
                >
                  Stage de fin d&apos;année de BTS en Administration Systèmes et
                  Réseaux <br /> <br />
                  Déploiement d&apos;ordinateurs portables | Configuration BIOS
                  UEFI, Boot Windows 10/11, Enrôlement Ortec, Installation
                  Logiciel <br /> <br />
                  Administration Système avec Active Directory | Attribution de
                  licences et permissions <br /> <br />
                  Assistance et dépannage de pannes | Support niveau 1
                </SectionCard>
              </Card>
            </div>
          </div>
          <div id="contact">
            <ContactMe />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
