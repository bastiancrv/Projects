import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function LogoutBtn() {
  const { logoutUser } = useContext(AuthContext);
  return (
    <button
      onClick={() => (logoutUser(), (window.location.href = "/login"))}
      className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:invert"
    >
      <img className="w-8" src="./exit.png" alt="" />
    </button>
  );
}

export default LogoutBtn;
