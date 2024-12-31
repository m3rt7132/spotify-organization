import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // CSS dosyasını import edin
import ProfilePhoto from "./ProfilePhoto";

const Navbar = () => {
   return (
      <nav className="h-24 flex items-center justify-between px-5 bg-black w-full">
         <div className="flex gap-6 text-lg font-medium">
            <Link
               to="/"
               className="text-white hover:text-green-500 transition-colors"
            >
               Anasayfa
            </Link>
            <Link
               to="/playlists"
               className="text-white hover:text-green-500 transition-colors"
            >
               Playlistlerim
            </Link>
            <Link
               to="/search"
               className="text-white hover:text-green-500 transition-colors"
            >
               Şarkı Ara
            </Link>
         </div>
         <ProfilePhoto />
      </nav>
   );
};

export default Navbar;
