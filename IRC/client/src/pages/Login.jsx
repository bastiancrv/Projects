import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Inputslog from "../components/Inputslog";
import { AuthContext } from "../context/AuthContext";
import LoginImage from "../components/icons/LoginImage";

const Login = () => {
  const { loginUser, loginError, loginInfo, updateLoginInfo, isLoginLoading } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser();
    if (success) {
      const user = JSON.parse(localStorage.getItem("User")); // Récupère l'objet complet
      console.log("User from localStorage:", user); // Debug
      if (user && user.name) {
        localStorage.setItem("username", user.name); // Utilise 'name' comme 'username'
      } else {
        console.error("Name is missing in the User object!");
      }
      navigate("/chat");
    }
  };

  return (
    <div className="w-full h-screen text-white flex items-center justify-center gap-4">
      <div className="border rounded-lg shadow-xl border-slate-500 bg-slate-300 flex w-full max-w-4xl">
        <div className="w-full max-w-md p-4 flex flex-col items-center border-r-2 rounded-lg">
          <div className=" pt-10 pb-10">
            <h1 className="text-center text-5xl font-semibold text-white">
              Login
            </h1>
          </div>

          <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <Inputslog
                name="Email"
                type="email"
                id="email"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, email: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <Inputslog
                name="Password"
                type="password"
                id="password"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, password: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-400/80 text-white py-2 rounded-lg hover:bg-slate-400 transition-all duration-300 shadow-md mb-4"
            >
              {isLoginLoading ? "Getting you in..." : "Login"}
            </button>
            {loginError?.error && (
              <div className="text-red-500 text-sm mt-2">
                <p>{loginError?.message}</p>
              </div>
            )}
          </form>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-slate-400 hover:underline">
              Sign up
            </a>
          </div>
        </div>
        <div className="border-l-2 w-full rounded-lg flex items-center justify-center"><LoginImage width={"90%"}/></div>
      </div>
    </div>
  );

  //   return (
  //     <div className="w-full h-screen text-white flex items-center justify-center p-4">
  //       <div className="w-full max-w-sm bg-stone-700 text-stone-300 p-6 rounded-2xl shadow-lg flex flex-col gap-4">
  //         <h1 className="text-center text-2xl font-semibold text-white">Login</h1>
  //         <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
  //           <div className="flex flex-col">
  //             <Inputslog
  //               name="Email"
  //               type="email"
  //               id="email"
  //               placeholder="Enter your email"
  //               onChange={(e) =>
  //                 updateLoginInfo({ ...loginInfo, email: e.target.value })
  //               }
  //             />
  //           </div>
  //           <div className="flex flex-col">
  //             <Inputslog
  //               name="Password"
  //               type="password"
  //               id="password"
  //               placeholder="Enter your password"
  //               onChange={(e) =>
  //                 updateLoginInfo({ ...loginInfo, password: e.target.value })
  //               }
  //             />
  //           </div>
  //           <button
  //             type="submit"
  //             className="w-full bg-stone-500 text-white py-2 rounded-lg hover:bg-stone-400 transition duration-200 shadow-md"
  //           >
  //             {isLoginLoading ? "Getting you in..." : "Login"}
  //           </button>
  //           {loginError?.error && (
  //             <div className="text-red-500 text-sm mt-2">
  //               <p>{loginError?.message}</p>
  //             </div>
  //           )}
  //         </form>
  //         <div className="text-center text-sm">
  //           Don't have an account?{" "}
  //           <a href="/register" className="text-stone-400 hover:underline">
  //             Sign up
  //           </a>
  //         </div>
  //         <div className="flex items-center justify-center">
  //           <button
  //             onClick={() => navigate("/chat")}
  //             className="bg-stone-500 text-white py-2 rounded-lg hover:bg-stone-400 transition duration-200 shadow-md w-fit px-2"
  //           >
  //             Continue as Guest
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
};

export default Login;
