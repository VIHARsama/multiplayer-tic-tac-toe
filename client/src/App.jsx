import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useAsyncError } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/authContext.jsx";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Game from "./pages/Game";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import WaitingRoom from "./components/WaitingRoom.jsx";
import "./new.css";

const App = () => {
   const { authUser, checkAuth } = useAuthContext();

   useEffect(() => {
      checkAuth();
   }, []);

   console.log(authUser);

   return (
      <div className="app">
         <Routes>
            <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
            <Route path="/register" element={!authUser ? <Register /> : <Navigate to="/" />} />
            <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
            <Route path="/game/:roomId" element={authUser ? <Game /> : <Navigate to="/login" />} />
            <Route path="/wait" element={<WaitingRoom />} />
            <Route path="*" element={<PageNotFound />} />
         </Routes>

         <Toaster />
      </div>
   );
};

export default App;
