import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";
import axios from "axios";

const Home = () => {
   const [loggedIn, setLoggedIn] = useState(false);
   const token = Cookies.get("login");
   const [tracks, setTracks] = useState([]);

   useEffect(() => {
      if (token) {
         setLoggedIn(true);
      } else {
         setLoggedIn(false);
      }
   }, [Cookies.get("login")]);

   async function olustur() {
      let response = await axios.get("https://api.spotify.com/v1/me/tracks", {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         params: {
            limit: 50,
            offset: 0,
         },
      });
      setTracks(response.data.items);
   }

   return (
      <div className="flex flex-col gap-10 items-center justify-center w-screen h-screen">
         <h1 className="text-6xl font-bold">Spotify</h1>
         <div className="flex flex-row gap-8">
            {loggedIn ? (
               <button
                  disabled
                  className="bg-green-700 p-3 italic font-bold rounded-full hover:bg-green-900 transition"
               >
                  Zaten giriş yaptınız!
               </button>
            ) : (
               <>
                  <button
                     className="bg-green-700 p-4 italic font-bold rounded-full hover:bg-green-900 transition cursor-pointer"
                     onClick={() =>
                        (window.location.href = "http://localhost:3000/login")
                     }
                  >
                     Giriş yap!
                  </button>
               </>
            )}
            {loggedIn ? (
               <button
                  className="bg-orange-600 p-4 rounded-full font-bold italic hover:bg-orange-800 transition"
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
                  className="bg-red-600 p-4 rounded-full font-bold italic hover:bg-red-800 transition"
                  onClick={() =>
                     (window.location.href = "http://localhost:3000/logout")
                  }
               >
                  Çıkış Yap
               </button>
            ) : (
               <></>
            )}

            {loggedIn && (
               <button
                  className="bg-red-700 rounded-full p-4 font-bold italic"
                  onClick={olustur}
               >
                  getir oluştur
               </button>
            )}
         </div>
         {tracks.length ? (
            <div className="flex flex-col flex-wrap">
               {tracks.map((x) => (
                  <p>{x.track.name}</p>
               ))}
            </div>
         ) : (
            <></>
         )}
      </div>
   );
};

export default Home;
