import { Routes, Route, Navigate } from "react-router-dom";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ChatContextProvider } from "./context/ChatContext";

function App() {
  const { user, loading, logoutUser } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    // Si l'utilisateur navigue vers /login ou /register, on le déconnecte
    if (location.pathname === "/login" || location.pathname === "/register") {
      logoutUser(); // Appel à la fonction de déconnexion
    }
  }, [location, logoutUser]);

  // Ajouter une condition pour afficher les routes uniquement lorsque l'utilisateur est chargé
  if (loading) {
    return <div>Loading...</div>; // Ou un loader si tu préfères
  }

  return (
    <>
      <div className="bg-slate-600">
        <ChatContextProvider user={user}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/chat"
              element={user ? <Chat /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </ChatContextProvider>
      </div>
    </>
  );
}

export default App;
