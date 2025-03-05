import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axiosInstance.js";
import { useAuthContext } from "../context/authContext.jsx";

const Login = ({ showForm }) => {
   const { setAuthUser } = useAuthContext();

   const [loginData, setLoginData] = useState({
      username: "",
      password: "",
   });

   const validateForm = () => {
      if (!loginData.username.trim()) {
         return toast.error("Username is required");
      }
      if (!loginData.password) {
         return toast.error("Password is required");
      }

      return true;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const success = validateForm();
      if (success === true) {
         loginUser();
      }
   };

   const loginUser = async () => {
      try {
         const res = await axiosInstance.post("/auth/login", {
            username: loginData.username,
            password: loginData.password,
         });
         setAuthUser(res.data);

         toast.success("Logged in successfully");
      } catch (error) {
         toast.error(error.response.data.message);
      }
   };

   return (
      <div className="form-box">
         <div className="container" id="login-form">
            <form onSubmit={handleSubmit}>
               <h2 className="form-box-heading">Login</h2>
               {/* username */}
               <input
                  className="authentication-input"
                  id="login-username"
                  type="text"
                  placeholder="Username"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
               />
               {/* password */}
               <input
                  className="authentication-input"
                  id="login-password"
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
               />

               <button className="authentication-button" type="submit">
                  Sign in
               </button>
            </form>
            <p className="authentication-p">
               Don't have an account?{" "}
               <Link className="authentication-link" to="/register">
                  Register
               </Link>
            </p>
         </div>
      </div>
   );
};

export default Login;
