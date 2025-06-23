import React from 'react'
import { handleSuccess } from '../utils';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
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
               <Link to='/home'><li className='cursor-pointer'>Home</li></Link>
                 <Link to='/settings'><li className='cursor-pointer'>Settings</li></Link>
                 <Link to='/profile'><li className='cursor-pointer'>Profile</li></Link>
                 <li className='cursor-pointer' onClick={handleClick}>Logout</li>
            </ul>
            <ToastContainer/>
            {/* No additional code needed here. Remove $PLACEHOLDER$ or leave empty if not required. */}
        </nav>
    
  )
}

export default Homebar