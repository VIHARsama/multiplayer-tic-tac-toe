import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
   const navigate = useNavigate();

   const returnToHomePage = () => {
      navigate("/");
   };

   return (
      <div className="page-not-found">
         <h1>404</h1>
         <h3>Page Not Found</h3>
         <div>
            <button onClick={returnToHomePage} className="page-not-found-button">
               Return to home page
            </button>
         </div>
      </div>
   );
};

export default PageNotFound;
