import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

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
      <div className="flex items-center gap-5">
         {profileImage ? (
            <>
               <p className="text-xl font-bold hover:text-green-600 transition">
                  {profileImage.display_name}
               </p>
               <img
                  src={profileImage.images[0].url}
                  alt="Profil"
                  className="w-20 rounded-full border-4 border-green-600"
               />
            </>
         ) : (
            <></>
         )}
      </div>
   );
};

export default ProfilePhoto;
