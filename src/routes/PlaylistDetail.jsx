import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const PlaylistDetail = () => {
   const { playlistId } = useParams();
   const [playlist, setPlaylist] = useState(null);
   const [tracks, setTracks] = useState([]);
   const accessToken = Cookies.get("login");

   useEffect(() => {
      if (accessToken) {
         async function getPlaylistDetail() {
            try {
               const response = await axios.get(
                  `https://api.spotify.com/v1/playlists/${playlistId}`,
                  {
                     headers: {
                        Authorization: `Bearer ${accessToken}`,
                     },
                  }
               );
               setPlaylist(response.data);
            } catch (error) {
               console.error(
                  "Playlist detayları alınırken hata:",
                  error.response.data
               );
            }
         }
         getPlaylistDetail();
      } else {
         console.log("No login");
         window.location.href = "http://localhost:5173";
      }
   }, [accessToken, playlistId]);

   useEffect(() => {
      if (playlist) {
         async function getPlaylistTracks() {
            try {
               const response = await axios.get(
                  `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                  {
                     headers: {
                        Authorization: `Bearer ${accessToken}`,
                     },
                  }
               );
               setTracks(response.data.items);
            } catch (error) {
               console.error(
                  "Playlist şarkıları alınırken hata:",
                  error.response.data
               );
            }
         }
         getPlaylistTracks();
      }
   }, [playlist, playlistId]);

   return (
      <div className="flex justify-center items-center w-full h-screen">
         {playlist ? (
            <div className="flex flex-col w-2/3 gap-4 items-center h-full rounded-2xl mt-8 p-5 bg-zinc-800">
               <h1 className="text-3xl font-bold">{playlist.name}</h1>
               <img
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  className="w-56 rounded-2xl"
               />
               <p className="italic text-base">{playlist.description}</p>
               <ol className="flex flex-col w-full justify-start gap-5">
                  {tracks.map((track) => (
                     <li
                        key={track.track.id}
                        className="flex items-center justify-start gap-3"
                     >
                        <img
                           src={track.track.album.images[0].url}
                           alt={track.track.name}
                           className="w-20 rounded-2xl"
                        />
                        <span className="font-semibold">
                           {track.track.name}
                        </span>
                     </li>
                  ))}
               </ol>
            </div>
         ) : (
            <div className="text-5xl font-bold italic">
               Playlist yükleniyor...
            </div>
         )}
      </div>
   );
};

export default PlaylistDetail;
