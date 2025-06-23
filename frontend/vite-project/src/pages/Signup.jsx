import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import { handleError, handleSuccess } from "../utils";
import axios from "axios";
import { ToastContainer} from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    FullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignup = { ...formDetails };
    copySignup[name] = value;
    setFormDetails(copySignup);
  };
  const handeSubmit = async (e) => {
    e.preventDefault();
   
    const { FullName, email, password } = formDetails;
    if (!FullName || !email || !password) {
      handleError("All fields must be filled");
    }
    const response = await axios.post(
      "http://localhost:5001/api/auth/signup",
      formDetails
    );
    console.log(response.data);
    const { message, success, error } = response.data;
    if (success) {
      handleSuccess(message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
     }
      else if(!success){
        handleError(message);
      }
      else if(error){
        const details = error?.details.message;
        handleError(details);
      }
    
  };

  return (
    <div>
      <Navbar />
      <div className="Container flex items-center justify-center flex-col mt-7 font-sans ">
        <h1 className="text-4xl font-bold font-sans">Welcome to MChat</h1>
        <h2 className="mt-5 text-3xl font-medium">Get started for free</h2>
        <form
          className="flex flex-col mt-2 gap-4 w-130 h-auto p-5"
          onSubmit={handeSubmit}
        >
          <label className="font-medium">Name</label>
          <input
            type="text"
            name="FullName"
            placeholder="Enter your Full Name"
            className="rounded bg-gray-200 h-10 p-2 outline-none
  "
            onChange={handleChange}
            value={formDetails.FullName}
          />

          <label className="font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="rounded bg-gray-200 h-10 p-2 outline-none"
            onChange={handleChange}
            value={formDetails.email}
          />

          <label className="font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="rounded bg-gray-200 h-10 p-2 pr-16 outline-none w-full"
              onChange={handleChange}
              value={formDetails.password}
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 font-medium cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button
            type="submit"
            className="mt-5 rounded-3xl bg-blue-400 font-medium p-2"
          >
            Sign Up
          </button>
          <span className="text-sm ml-32">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600">
              Login
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
