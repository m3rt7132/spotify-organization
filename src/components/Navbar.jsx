import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // CSS dosyasını import edin
import ProfilePhoto from "./ProfilePhoto";

const Navbar = () => {
   return (
      <nav className="navbar">
         <div className="nav-links">
            <Link to="/">Anasayfa</Link>
            <Link to="/playlists">Playlistlerim</Link>
            <Link to="/search">Şarkı Ara</Link>
         </div>
         <div className="profile-info">
            <ProfilePhoto />
         </div>
      </nav>
   );
};

export default Navbar;
