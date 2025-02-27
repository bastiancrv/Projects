import Inputslog from "../components/Inputslog";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoginImage from "../components/icons/LoginImage";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
  } = useContext(AuthContext);

  return (
    <div className="w-full h-screen text-white flex items-center justify-center gap-4">
      <div className="border rounded-lg shadow-xl border-slate-500 bg-slate-300 flex w-full max-w-4xl">
        <div className="w-full max-w-md p-4 flex flex-col items-center border-r-2 rounded-lg">
          <div className=" pt-10 pb-10">
            <h1 className="text-center text-5xl font-semibold text-white">
              Register
            </h1>
          </div>

          <form className="flex flex-col gap-4" onSubmit={registerUser}>
            <div className="flex flex-col">
              <Inputslog
                name={"Username"}
                type={"text"}
                id={"username"}
                placeholder={"Enter your username"}
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <Inputslog
                name={"Email"}
                type={"email"}
                id={"email"}
                placeholder={"Enter your email"}
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, email: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <Inputslog
                name={"Password"}
                type={"password"}
                id={"password"}
                placeholder={"Enter your password"}
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col">
              <Inputslog
                name={"Confirm password"}
                type={"password"}
                id={"confirmpassword"}
                placeholder={"Confirm your password"}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-400/80 text-white py-2 rounded-lg hover:bg-slate-400 transition-all duration-300 shadow-md"
            >
              {isRegisterLoading ? "Creating your account" : "Register"}
            </button>
            {registerError?.error && (
              <alert>
                <p>{registerError?.message}</p>
              </alert>
            )}
          </form>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-slate-400 hover:underline">
              Login
            </a>
          </div>
        </div>
        <div className="border-l-2 w-full rounded-lg flex items-center justify-center">
          <LoginImage width={"90%"} />
        </div>
      </div>
    </div>
  );
};

export default Register;
