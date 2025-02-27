import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import PropTypes from "prop-types";

import avatar from "../../assets/avatar.svg";

function UserChat({ chat, user }) {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers } = useContext(ChatContext);

  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 relative">
          <img
            className="h-8 w-8 rounded-full -translate-y-1"
            src={avatar}
            alt="Avatar"
          />
          <div className="text-sm font-medium">
            {recipientUser?.name || "Loading..."}
          </div>
          {/* Bulle de statut (verte si en ligne, rouge sinon) */}
          <span
            className={`absolute bottom-4 -right-2 h-2.5 w-2.5 rounded-full border-2 border-white ${
              isOnline ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
        </div>

      </div>
    </div>
  );
}

UserChat.propTypes = {
  chat: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserChat;
