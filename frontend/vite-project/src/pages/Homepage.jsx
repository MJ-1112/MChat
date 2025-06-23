import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Homebar from './Homebar';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

function Homepage() {
  
 

  return (
    <div>
      <Homebar />
      <ToastContainer />
      <div className="text-center mt-4 text-xl">Welcome to the protected Homepage!</div>
    </div>
  );
}

export default Homepage;
