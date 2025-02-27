import HomeBtn from "./HomeBtn";
import MessageBtn from "./MessageBtn";
import GroupeBtn from "./GroupeBtn";
import LogoutBtn from "./LogoutBtn";

function Iconlist({ onShowPrivateMessages, onShowGroups, onShowHome }) {
  return (
    <div className="flex flex-col items-end justify-between space-y-4 h-full">
      {/* Other buttons here */}

      {/* Push LogoutBtn to the bottom */}
      <div className="flex-grow" />
      <LogoutBtn />
    </div>
  );
}

export default Iconlist;
