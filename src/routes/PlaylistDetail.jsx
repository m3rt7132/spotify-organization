import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import "./PlaylistDetail.css"; // CSS dosyasını import et

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
      <div className="playlist-detail">
         {playlist ? (
            <div>
               <h1>{playlist.name}</h1>
               <img src={playlist.images[0].url} alt={playlist.name} />
               <p>{playlist.description}</p>
               <ol className="track-list">
                  {tracks.map((track) => (
                     <li key={track.track.id}>
                        <img
                           src={track.track.album.images[0].url}
                           alt={track.track.name}
                        />
                        <span>{track.track.name}</span>
                     </li>
                  ))}
               </ol>
            </div>
         ) : (
            <div>Playlist yükleniyor...</div>
         )}
      </div>
   );
};

export default PlaylistDetail;
