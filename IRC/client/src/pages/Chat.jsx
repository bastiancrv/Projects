import { useState, useEffect, useContext } from "react";
import Console from "../components/Console";
import Chatapp from "../components/Chatapp";
import Iconlist from "../components/ButtonsNav/Iconlist";
import List from "../components/List";
import Searchbar from "../components/Searchbar";
import PotentialChats from "../components/PotentialChats";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { baseUrl, getRequest } from "../utils/services";
import { fetchChatsWithRecipients } from "../hooks/useFetchRecipient";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [listTitle, setListTitle] = useState("Messages | Channels");
  const [username, setUsername] = useState("");
  const [chatsWithRecipients, setChatsWithRecipients] = useState([]); // Précharge les données des destinataires
  const { userChats, isUserChatsLoading, updateCurrentChat } =
    useContext(ChatContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username"); // Récupère 'username'
    if (savedUsername) {
      setUsername(savedUsername); // Mets à jour le state avec la valeur récupérée
    } else {
      console.warn("No username found in localStorage");
    }
  }, []);

  const addMessage = (newTitle, type) => {
    const newMessage = { id: Date.now(), type, title: newTitle };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleUsernameChange = (newUsername) => {
    if (newUsername.trim()) {
      setUsername(newUsername);
    }
  };

  // Précharger les données des destinataires pour chaque chat
  useEffect(() => {
    // Utilise le service pour récupérer les chats avec les destinataires
    const fetchChats = async () => {
      const chats = await fetchChatsWithRecipients(userChats, user);
      setChatsWithRecipients(chats);
    };

    fetchChats();
  }, [userChats, user]);

  // Filtrer les chats en fonction de la recherche
  const filteredChats = searchQuery
    ? chatsWithRecipients.filter((chat) =>
        chat.recipientName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chatsWithRecipients;

  return (
    <>
      <main className="h-screen flex items-center justify-center bg-slate-600">
        <div className="p-12 text-white h-[90vh] w-[90vw] max-w-screen max-h-screen bg-slate-300 rounded-xl shadow-2xl grid grid-cols-[50px_300px_1fr] gap-10 max-md:grid-cols-[1fr] max-md:grid-rows-[auto_1fr_auto] max-md:flex-col max-md:h-auto">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Iconlist />
          </div>
          <div className="flex flex-col gap-4">
            <Searchbar onSearch={setSearchQuery} />
            <PotentialChats />
            <List
              listTitle={listTitle}
              updateCurrentChat={updateCurrentChat}
              user={user}
              userChats={filteredChats} // Utilisation des chats filtrés
              isUserChatsLoading={isUserChatsLoading}
            />
          </div>
          <div className="flex flex-col gap-8">
            <Console
              onAddMessage={addMessage}
              onUsernameChange={handleUsernameChange}
            />
            <Chatapp username={username} setUsername={setUsername} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Chat;
