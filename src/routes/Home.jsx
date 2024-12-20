import React from "react";
import { useState, useEffect } from "react";
// import "../App.css";
import "./Home.css";
import Cookies from "js-cookie";

const Home = () => {
   const [loggedIn, setLoggedIn] = useState(false);
   const token = Cookies.get("login");

   useEffect(() => {
      if (token) {
         setLoggedIn(true);
      } else {
         setLoggedIn(false);
      }
   }, [Cookies.get("login")]);

   return (
      <>
         <h1>Spotify</h1>
         <div className="card">
            {loggedIn ? (
               <button disabled>Zaten giriş yaptınız!</button>
            ) : (
               <>
                  <button
                     onClick={() =>
                        (window.location.href = "http://localhost:3000/login")
                     }
                  >
                     Login
                  </button>
               </>
            )}
            {loggedIn ? (
               <button
                  onClick={() =>
                     (window.location.href = "http://localhost:3000/refresh")
                  }
               >
                  Refresh Access Token
               </button>
            ) : (
               <></>
            )}
            {loggedIn ? (
               <button
                  onClick={() =>
                     (window.location.href = "http://localhost:3000/logout")
                  }
               >
                  Çıkış Yap
               </button>
            ) : (
               <></>
            )}
         </div>
      </>
   );
};

export default Home;
