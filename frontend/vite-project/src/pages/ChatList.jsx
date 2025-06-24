import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar } from "@mui/material";

function ChatList({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await axios.get("http://localhost:5001/api/auth/profile", {
          withCredentials: true,
        });
        setLoggedInUser(profileRes.data);

        const usersRes = await axios.get("http://localhost:5001/api/message/users", {
          withCredentials: true,
        });
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchData();
  }, []);

  const renderAvatar = (user) => (
    <Avatar
      src={user.profilePic || undefined}
      sx={{ width: 40, height: 40, fontSize: "1rem" }}
    >
      {user.FullName?.[0]?.toUpperCase() || "U"}
    </Avatar>
  );

  return (
    <div className="w-1/3 bg-base-200 border-r p-4 h-screen overflow-y-auto">
      {/* Logged In User Info */}
      {loggedInUser && (
        <div className="mb-6 text-center">
          <Avatar
            src={loggedInUser.profilepic || undefined}
            sx={{ width: 64, height: 64, fontSize: 28, margin: "0 auto" }}
          >
            {loggedInUser.FullName?.[0]?.toUpperCase() || "U"}
          </Avatar>
          <h2 className="font-bold mt-2">{loggedInUser.FullName}</h2>
        </div>
      )}

      {/* Chat Users List */}
      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => onSelectUser(user)}
            className="flex items-center gap-3 p-2 cursor-pointer hover:bg-base-300 rounded"
          >
            {renderAvatar(user)}
            <div>
              <p className="font-medium">{user.FullName}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatList;
