import React, { useEffect, useState } from "react";
import "./Playlists.css"; // CSS dosyasını import edin
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
      }
   }, []);
   Cookies.get("userid");

   return (
      <div className="playlists-container">
         {playlists
            .filter((x) => x.owner.id == Cookies.get("userid"))
            .map((playlist) => (
               <div className="playlist-card" key={playlist.id}>
                  <Link to={`/playlists/${playlist.id}`}>
                     <img
                        src={playlist.images[0].url}
                        alt={playlist.name}
                        className="playlist-cover"
                     />
                     <h3 className="playlist-name">{playlist.name}</h3>
                  </Link>
               </div>
            ))}
      </div>
   );
};

export default Playlists;
