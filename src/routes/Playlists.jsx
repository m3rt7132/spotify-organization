import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Playlists = () => {
   const [playlists, setPlaylists] = useState([]);
   const accessToken = Cookies.get("login");

   useEffect(() => {
      if (accessToken) {
         try {
            async function getPlaylists() {
               const response = await axios.get(
                  "https://api.spotify.com/v1/me/playlists",
                  {
                     headers: {
                        Authorization: `Bearer ${accessToken}`,
                     },
                  }
               );

               if (response.status == 200) setPlaylists(response.data.items);
               console.log(response.data.items);
            }
            getPlaylists();
         } catch (error) {
            console.error(error);
         }
      } else {
         console.log("No login");
         window.location.href = "http://localhost:5173";
      }
   }, []);
   Cookies.get("userid");

   return (
      <div className="flex flex-row gap-6 w-full h-screen flex-wrap m-8">
         {playlists
            .filter((x) => x.owner.id == Cookies.get("userid"))
            .map((playlist) => (
               <div
                  className="flex flex-col w-52 h-3/3 bg-green-950 rounded-3xl"
                  key={playlist.id}
               >
                  <Link
                     to={`/playlists/${playlist.id}`}
                     className="flex flex-col items-center gap-4"
                  >
                     <img
                        src={playlist.images[0].url}
                        alt={playlist.name}
                        className="w-max h-max rounded-t-xl rounded-r-xl object-cover"
                     />
                     <h3 className="text-base ">{playlist.name}</h3>
                  </Link>
               </div>
            ))}
      </div>
   );
};

export default Playlists;
