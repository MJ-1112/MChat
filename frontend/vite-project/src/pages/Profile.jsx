import React, { useEffect, useState } from "react";
import Homebar from "./Homebar";
import { Avatar } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);

  // Fetch profile data on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/auth/profile", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  // Handle image selection and upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !user?._id) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;

      try {
        const response = await axios.put(
          "http://localhost:5001/api/auth/update-profile",
          {
            userId: user._id,
            profilePic: base64,
          },
          {
            withCredentials: true,
          }
        );
        console.log("✅ Updated user:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("❌ Error updating profile picture:", error.response || error);
      }
    };

    reader.readAsDataURL(file); // Always call this
  };

  return (
    <div>
      <Homebar />
      <div className="flex p-5 mt-5 shadow-xl w-200 h-120 ml-30">
        <h1 className="font-Kanit text-4xl">Profile</h1>

        {/* Avatar with camera upload */}
        <div
          className="ml-50 mt-10 w-24 h-24"
          style={{ position: "relative", width: 96, height: 96 }}
        >
          <Avatar
            src={user?.profilePic}
            sx={{ width: "100%", height: "100%" }}
          />
          <label
            htmlFor="profilepic-upload"
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              borderRadius: "50%",
              background: "#e0e0e0",
              width: 30,
              height: 30,
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: 4,
            }}
          >
            <CameraAltIcon sx={{ width: 22, height: 22 }} />
            <input
              id="profilepic-upload"
              type="file"
              name="profilepic"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Profile Details */}
        {user && (
          <div>
            <div className="bg-blue-100 h-15 w-100 rounded-xl p-5 flex items-center absolute top-65 left-80">
              {user.FullName}
            </div>
            <div className="bg-blue-100 h-15 w-100 rounded-xl p-5 flex items-center absolute top-88 left-80">
              {user.email}
            </div>
          </div>
        )}

        {/* Status */}
        <div className="absolute top-110 left-110">
          <span>
            Status: <span>🟢 Active</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
