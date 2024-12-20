import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./ProfilePhoto.css";

const ProfilePhoto = () => {
   const [profileImage, setProfileImage] = useState(null);
   const accessToken = Cookies.get("login");

   useEffect(() => {
      if (accessToken) {
         try {
            async function getProfileImage() {
               const response = await axios.get(
                  "https://api.spotify.com/v1/me",
                  {
                     headers: {
                        Authorization: `Bearer ${accessToken}`,
                     },
                  }
               );
               setProfileImage(response.data);
            }
            getProfileImage();
         } catch (error) {
            console.error("Profil fotoğrafı alınırken hata:", error);
         }
      }
   }, []);

   return (
      <div className="profile-photo">
         {profileImage ? (
            <>
               <p className="profile-name">{profileImage.display_name}</p>
               <img
                  src={profileImage.images[0].url}
                  alt="Profil"
                  className="profile-image"
               />
            </>
         ) : (
            <></>
         )}
      </div>
   );
};

export default ProfilePhoto;
