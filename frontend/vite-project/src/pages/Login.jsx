import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { handleError, handleSuccess } from "../utils";
import axios from "axios";
import { ToastContainer } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLogin = { ...loginDetails };
    copyLogin[name] = value;
    setLoginDetails(copyLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginDetails;
    if (!email || !password) {
      handleError("Fill all the fields");
      return;
    }
    const response = await axios.post(
      "http://localhost:5001/api/auth/login",
      loginDetails
    );

    console.log(response.data);
    const { message, success, error } = response.data;
    if (success) {
      handleSuccess(message);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
      return;
    } else if (!success) {
       toast.error(message,
              {position:"top-right"}
          )
    } else if (error) {
      const details = error?.details.message;
      handleError(details);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center flex-col mt-10 font-sans">
        <h1 className="text-4xl font-bold font-sans">Welcome to MChat</h1>
        <form className="flex  flex-col mt-10 gap-2  w-130 h-80 p-5" onSubmit={handleSubmit}>
       
          <label className="font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter you email"
            className="rounded bg-gray-200 h-10 p-2 outline-none"
            onChange={handleChange}
            value={loginDetails.email}
          />
          <label className="font-medium">Password</label>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="rounded bg-gray-200 h-10 p-2 pr-16 outline-none w-full"
              onChange={handleChange}
              value={loginDetails.password}
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 font-medium cursor-pointer">
              Show
            </span>
          </div>
          <button
            type="submit "
            className="mt-5 rounded-3xl bg-blue-400 font-medium p-2"
          >
            Log in
          </button>
          <span className="ml-33">
            Don't have an account?
            <Link to="/signup" className="text-purple-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
