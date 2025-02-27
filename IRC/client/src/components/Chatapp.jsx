import { useContext, useState, useEffect, useRef } from "react";
import moment from "moment";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { UserIcon } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useFetchRecipientUser } from "../hooks/useFetchRecipient";

function Chatapp() {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isChatOpened, setIsChatOpened] = useState(false); // Nouveau state pour détecter l'ouverture d'un chat

  const emojiButtonRef = useRef(null);
  const emojiPickerRef = useRef(null);

  // Ref pour scroller automatiquement
  const messagesEndRef = useRef(null);

  const handleEmojiClick = (emojiData) => {
    setTextMessage((prev) => prev + emojiData.emoji);
  };

  // Ferme l'Emoji Picker si l'utilisateur clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        !emojiButtonRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmojiButtonClick = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  // Scroller automatiquement vers le dernier message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: isChatOpened ? "auto" : "smooth", // Instantané à l'ouverture du chat
      });
    }
  }, [messages, isChatOpened]);

  // Réinitialise l'état à chaque changement de chat
  useEffect(() => {
    setIsChatOpened(true);
    const timer = setTimeout(() => setIsChatOpened(false), 100); // Retour au scroll "smooth" après 100ms
    return () => clearTimeout(timer);
  }, [currentChat]);

  if (!recipientUser) {
    return (
      <div className="flex items-center justify-center h-full text-lg text-gray-600">
        No conversation selected yet...
      </div>
    );
  }

  if (isMessagesLoading) {
    return (
      <div className="flex items-center justify-center h-full text-lg text-gray-600">
        Loading Chat...
      </div>
    );
  }
  const getEmojiPickerPosition = () => {
    if (emojiButtonRef.current) {
      const buttonRect = emojiButtonRef.current.getBoundingClientRect();
      return {
        top: buttonRect.top + window.scrollY - 350, // Ajuste la position pour qu'il s'affiche juste au-dessus
        left: buttonRect.left + window.scrollX,
      };
    }
    return { top: 0, left: 0 }; // Valeurs par défaut si le bouton n'est pas trouvé
  };

  return (
    <div className="flex flex-col p-4 h-[77vh] -mt-4 shadow-lg bg-[#2c2f3f] border border-[#44475a] rounded-xl w-full">
      {/* Destinataire */}
      <div className="flex items-center gap-2 p-4 bg-transparent border-b-2 rounded-xl border-[#6272a4] rounded-t-xl shadow-2xl justify-center">
        <UserIcon className="w-6 h-6 text-slate-200" />
        <span className="text-lg font-semibold text-slate-200">
          {recipientUser?.name}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto my-4 space-y-4">
        {messages &&
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message?.senderId === user?._id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] p-4 rounded-lg overflow-x-auto break-words shadow-lg word-break ${
                  message?.senderId === user?._id
                    ? "bg-green-300 text-stone-800"
                    : "bg-slate-200 text-stone-800"
                }`}
              >
                <div className="text-base">{message.text}</div>
                <div className="text-xs flex justify-end text-gray-800/60 mt-4">
                  {moment(message.createdAt).format("h:mm A")}
                </div>
              </div>
            </div>
          ))}
        {/* Référence pour scroller vers le dernier message */}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Form */}
      <div className="flex items-center gap-3 p-2 bg-transparent shadow-2xl border-b-2 border-t-2 border-[#6272a4] rounded-xl">
        <button
          ref={emojiButtonRef}
          type="button"
          onClick={handleEmojiButtonClick}
          className="text-white hover:text-[#6272a4] transition duration-300 hover:scale-110 focus:outline-none"
        >
          <FaSmile className="w-6 h-6" />
        </button>
        <input
          type="text"
          placeholder="Type your message..."
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (textMessage.trim()) {
                sendTextMessage(textMessage, user, currentChat._id);
                setTextMessage("");
              }
            }
          }}
          className="flex-1 bg-transparent text-white text-sm px-3 py-2 rounded-md placeholder-slate-400 outline-none transition-all border-b-2 border-transparent focus:border-[#6272a4] w-full"
        />

        <button
          onClick={() => {
            if (textMessage.trim()) {
              sendTextMessage(textMessage, user, currentChat._id);
              setTextMessage("");
            }
          }}
          className="w-12 h-12 flex items-center justify-center bg-slate-600 text-white rounded-full shadow-lg hover:bg-slate-500 transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-400 border-2 border-[#6272a4]"
        >
          <FaPaperPlane className="w-6 h-6 -translate-x-0.5" />
        </button>
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div
          ref={emojiPickerRef}
          className="absolute z-10"
          style={{
            top: `${getEmojiPickerPosition().top}px`,
            left: `${getEmojiPickerPosition().left}px`,
          }}
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            theme="dark"
            height={350}
            width={300}
          />
        </div>
      )}
    </div>
  );
}

export default Chatapp;
