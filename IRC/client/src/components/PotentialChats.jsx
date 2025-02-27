import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
      {potentialChats.map((u, index) => {
        const isOnline = onlineUsers?.some(
          (onlineUser) => onlineUser?.userId === u?._id
        );

        return (
          <div
            key={index}
            onClick={() => createChat(user._id, u._id)}
            className={`relative flex-shrink-0 px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-800 cursor-pointer transition duration-200 shadow-sm ${
              isOnline ? "hover:bg-green-200" : "hover:bg-red-200"
            }`}
          >
            {u.name}

            {/* Bulle de statut : verte si en ligne, rouge sinon */}
            <span
              className={`absolute top-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                isOnline ? "bg-green-600" : "bg-red-600"
              }`}
            ></span>
          </div>
        );
      })}
    </div>
  );
};

export default PotentialChats;
