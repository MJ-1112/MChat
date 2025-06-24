import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Homebar from './Homebar';
import ChatList from './ChatList';
import DemoMessage from './DemoMessage';

function Homepage() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="h-screen flex flex-col">
      <Homebar />
      <ToastContainer />

      {/* Main Chat Section */}
      <div className="flex flex-grow">
        {/* Left: Chat List */}
        <ChatList onSelectUser={setSelectedUser} />

        {/* Right: Chat Box or Demo */}
        <div className="flex-grow  overflow-y-auto">
          {selectedUser ? (
            <ChatBox recipient={selectedUser} />
          ) : (
            <DemoMessage />
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
