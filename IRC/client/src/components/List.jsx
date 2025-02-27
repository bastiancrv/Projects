import UserChat from "./chat/UserChat";

function Liste({ updateCurrentChat, userChats, user, isUserChatsLoading }) {
  return (
    <div className="text-white p-4 shadow-lg h-[73vh] flex-col flex  bg-[#2c2f3f] border border-[#44475a] rounded-xl px-4 py-2 transition-all focus-within:border-[#6272a4] w-full">
      <h2 className="text-xl font-light italic mt-3 mb-4 text-center">Privates Messages</h2>
      <ul className="space-y-2 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {isUserChatsLoading && <p>Loading chats...</p>}
        {userChats?.map((chat, index) => (
          <li
            key={index}
            onClick={() => updateCurrentChat(chat)}
            className="p-4 hover:bg-[#4a5267] duration-200 cursor-pointer bg-[#2c2f3f] border border-[#44475a] rounded-xl px-4 py-2 transition-all focus-within:border-[#6272a4] hover:-translate-y-1"
          >
            <UserChat chat={chat} user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
}

import PropTypes from "prop-types";

Liste.propTypes = {
  updateCurrentChat: PropTypes.func,
  userChats: PropTypes.array,
  user: PropTypes.object,
  isUserChatsLoading: PropTypes.bool,
};

export default Liste;
