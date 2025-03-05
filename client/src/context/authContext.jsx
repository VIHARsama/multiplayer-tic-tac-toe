import React, { createContext, useState, useContext, useEffect } from "react";
import { axiosInstance } from "../lib/axiosInstance.js";

export const AuthContext = createContext();

export const useAuthContext = () => {
   return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
   const [authUser, setAuthUser] = useState(null);

   const checkAuth = async () => {
      try {
         const res = await axiosInstance.get("/auth/check-auth");
         setAuthUser(res.data);
      } catch (err) {
         console.log("error in checkAuth", err);
         setAuthUser(null);
      }
   };

   return (
      <AuthContext.Provider
         value={{
            authUser,
            setAuthUser,
            checkAuth,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
