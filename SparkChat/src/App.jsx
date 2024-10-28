import { Navigate, Route, Routes } from "react-router-dom";

import AuthPage from "./pages/AuthPage";

import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import { useAppStore } from "./store/store";

import { useEffect, useState } from "react";
import { api, GET_USER } from "./constants/api";
import logo from "./assets/download.png";
import About from "./pages/About";

function App() {
  // console.log(import.meta.env);

  const [loadind, setLoading] = useState(true);

  const { userInfo, setUserInfo } = useAppStore();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1500);

    const getUserData = async () => {
      try {
        const res = await api.get(GET_USER);
        setUserInfo(res.data.user);
      } catch (error) {
        console.log({ error });
      }
    };

    if (!userInfo) {
      getUserData();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [userInfo, setUserInfo]);

  const PrivateRoutes = ({ children }) => {
    const { userInfo } = useAppStore();

    const isAuthenticated = userInfo;

    return isAuthenticated ? children : <Navigate to="/auth" />;
  };

  const AuthRoutes = ({ children }) => {
    const { userInfo } = useAppStore();

    const isAuthenticated = !!userInfo;

    return isAuthenticated ? <Navigate to="/chat" /> : children;
  };

  return (
    <>
    
      {loadind && (
        <div className="flex  flex-col justify-center items-center h-screen text-white bg-black">
          <img src={logo} height={60} width={70} className="md:h-40 md:w-40" />
          <p className="poppins-light text-2xl text-center">
            Ignite Conversations, <br />{" "}
            <span className="text-blue-500">Spark Connections.</span>{" "}
          </p>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            // <AuthRoutes>
            <AuthPage />
            // </AuthRoutes>
          }
        />
        <Route
          path="/auth"
          element={
            // <AuthRoutes>
            <AuthPage />
            // </AuthRoutes>
          }
        />
        <Route
          path="/profile-setup"
          element={
            // <PrivateRoutes>
            <ProfilePage />
            // </PrivateRoutes>
          }
        />
        <Route
          path="/chat"
          element={
            // <PrivateRoutes>
            <ChatPage />
            // </PrivateRoutes>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
