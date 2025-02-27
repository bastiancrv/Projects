import { useState } from "react";
import { FiSearch, FiSend } from "react-icons/fi";

function Console({ onAddMessage, onUsernameChange }) {
  const [message, setMessage] = useState("");
  const [channels, setChannels] = useState([]); // État pour stocker les channels

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim()) {
      if (!message.trim().startsWith("/")) {
        alert(
          "Veuillez saisir une commande.\n /list pour connaître l'ensemble des channels disponibles."
        );
        setMessage("");
        return;
      }

      // Commandes reconnues
      const mpCommand = /^\/msg\s*(.+)?$/;
      const channelsCommand = /^\/create\s*(.+)?$/;
      const listChannels = /^\/list$/;
      const nickName = /^\/nick\s*(.+)?$/;

      // Vérification des correspondances
      const mpMatch = message.trim().match(mpCommand);
      const channelsMatch = message.trim().match(channelsCommand);
      const listMatch = message.trim().match(listChannels);
      const nickMatch = message.trim().match(nickName);

      if (mpMatch) {
        if (mpMatch[1]) {
          const newTitle = "Conversation avec " + mpMatch[1];
          onAddMessage(newTitle, "mp");
          setMessage("");
        } else {
          alert("Veuillez saisir du texte après la commande /msg.");
        }
      } else if (channelsMatch) {
        if (channelsMatch[1]) {
          const newChannel = channelsMatch[1];
          if (!channels.includes(newChannel)) {
            setChannels((prev) => [...prev, newChannel]); // Ajouter le channel à la liste
            alert(`Channel "${newChannel}" créé avec succès !`);
          } else {
            alert(`Le channel "${newChannel}" existe déjà.`);
          }
          onAddMessage(newChannel, "channels");
          setMessage("");
        } else {
          alert("Veuillez saisir un nom de channel après la commande /create.");
        }
      } else if (listMatch) {
        if (channels.length > 0) {
          alert("Voici la liste des channels :\n" + channels.join("\n"));
        } else {
          alert("Aucun channel n'a été créé pour le moment.");
        }
        setMessage("");
      } else if (nickMatch) {
        if (nickMatch[1]) {
          const newUsername = nickMatch[1];
          setMessage("");
          onUsernameChange(newUsername);
        }
      } else {
        alert("Cette commande n'existe pas !");
        setMessage("");
      }
    } else {
      alert("Veuillez saisir une commande avant d'envoyer.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="gap-2 p-2 shadow-lg mb-4 flex items-center bg-[#2c2f3f] border border-[#44475a] rounded-xl px-4 py-2 transition-all focus-within:border-[#6272a4] w-full">
      <FiSend className="text-gray-400 text-lg" />

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a command..."
          className="bg-transparent outline-none border-none text-white text-sm px-3 w-full placeholder-slate-400"
        />
      </div>

    </form>
  );
}

export default Console;
