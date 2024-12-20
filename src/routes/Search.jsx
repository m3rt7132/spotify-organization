import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Search.css"; // CSS dosyasını import edin

const Search = () => {
   const [query, setQuery] = useState("");
   const [results, setResults] = useState([]);
   const accessToken = Cookies.get("login");

   const handleSearch = async (e) => {
      e.preventDefault();
      if (query && accessToken) {
         try {
            const response = await axios.get(
               `https://api.spotify.com/v1/search`,
               {
                  headers: {
                     Authorization: `Bearer ${accessToken}`,
                  },
                  params: {
                     q: query,
                     type: "track",
                  },
               }
            );
            setResults(response.data.tracks.items);
         } catch (error) {
            console.error("Arama hatası:", error);
         }
      }
   };

   return (
      <div className="search-container">
         <h2>Şarkı Ara</h2>
         <form onSubmit={handleSearch}>
            <input
               type="text"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="Şarkı adı veya sanatçı..."
               className="search-input"
            />
            <button type="submit" className="search-button">
               Ara
            </button>
         </form>
         <div className="search-results">
            {results.length > 0 ? (
               results.map((track) => (
                  <div className="track-card" key={track.id}>
                     <img
                        src={track.album.images[0].url}
                        alt={track.name}
                        className="track-cover"
                     />
                     <h3 className="track-name">{track.name}</h3>
                     <p className="track-artist">
                        {track.artists.map((artist) => artist.name).join(", ")}
                     </p>
                  </div>
               ))
            ) : (
               <p>Sonuç bulunamadı.</p>
            )}
         </div>
      </div>
   );
};

export default Search;
