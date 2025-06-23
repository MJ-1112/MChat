import React from 'react'
import { handleSuccess } from '../utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer} from "react-toastify";

function Homebar() {
    const navigate = useNavigate();
const handleClick = async () => {
   const response= await axios.post("http://localhost:5001/api/auth/logout", {}, {
  withCredentials: true,
});
    const { message, success } = response.data;
    if (success) {
      handleSuccess(message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }
};


  return (
    
        <nav className=' h-15 flex gap-200 items-center p-4 font-sans text-xl shadow '>
            

            <span className='font-semibold text-2xl' >MChat</span>
            <ul className='flex gap-10 '>
                <li className='cursor-pointer'>Home</li>
                <li className='cursor-pointer'>Settings</li>
                <li className='cursor-pointer'>Profile</li>
                <li className='cursor-pointer' onClick={handleClick}>Logout</li>
            </ul>
            <ToastContainer/>
            
        </nav>
    
  )
}

export default Homebar