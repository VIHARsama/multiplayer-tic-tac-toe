import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axiosInstance.js";
import { useAuthContext } from "../context/authContext.jsx";

const Register = () => {
   const { setAuthUser } = useAuthContext();

   const [registerData, setRegisterData] = useState({
      username: "",
      password: "",
      confirmPassword: "",
   });

   const validateForm = () => {
      if (!registerData.username.trim()) {
         return toast.error("Username is required");
      }
      if (!registerData.password) {
         return toast.error("Password is required");
      }
      if (!registerData.confirmPassword) {
         return toast.error("Confirm Password is required");
      }
      if (registerData.password.length < 6) {
         return toast.error("Password must be at least 5 characters");
      }
      if (registerData.password != registerData.confirmPassword) {
         return toast.error("Passwords do not match");
      }

      return true;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const success = validateForm();
      if (success === true) {
         registerUser();
      }
   };

   const registerUser = async () => {
      try {
         const res = await axiosInstance.post("/auth/register", {
            username: registerData.username,
            password: registerData.password,
            confirmPassword: registerData.confirmPassword,
         });
         setAuthUser(res.data);

         toast.success("Account created successfully");
      } catch (error) {
         toast.error(error.response.data.message);
      }
   };

   return (
      <div className="form-box">
         <div className="container" id="register-form">
            <form onSubmit={handleSubmit}>
               <h2 className="form-box-heading">Register</h2>
               {/* username */}
               <input
                  className="authentication-input"
                  type="text"
                  placeholder="Username"
                  value={registerData.username}
                  onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
               />
               {/* password */}
               <input
                  className="authentication-input"
                  type="password"
                  placeholder="Password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
               />
               {/* confirm password */}
               <input
                  className="authentication-input"
                  type="password"
                  placeholder="Confirm Password"
                  value={registerData.confirmPassword}
                  onChange={(e) =>
                     setRegisterData({ ...registerData, confirmPassword: e.target.value })
                  }
               />

               <button className="authentication-button" type="submit">
                  Create Account
               </button>
            </form>
            <p className="authentication-p">
               Already have an account?{" "}
               <Link className="authentication-link" to="/login">
                  Login
               </Link>
            </p>
         </div>
      </div>
   );
};

export default Register;
