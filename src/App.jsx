import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Playlists from "./routes/Playlists";
import PlaylistDetail from "./routes/PlaylistDetail";
import Search from "./routes/Search";

function App() {
   return (
      <Router>
         <Navbar />
         <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/playlists/:playlistId" element={<PlaylistDetail />} />
            <Route path="/search" element={<Search />} />
         </Routes>
      </Router>
   );
}

export default App;
