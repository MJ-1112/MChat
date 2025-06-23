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

  try {
    // 1. Call Login API
    const response = await axios.post(
      "http://localhost:5001/api/auth/login",
      loginDetails,
      {
        withCredentials: true, // ✅ So cookie is set
      }
    );

    const { success, message } = response.data;

    if (success) {
      handleSuccess(message);

      // 2. Check if cookie works (optional but reliable)
      const verify = await axios.get("http://localhost:5001/api/auth/check", {
        withCredentials: true, // ✅ Check cookie
      });

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }
  } catch (error) {
    handleError(error.response?.data?.message || "Login failed");
  }
};

const [showPassword, setShowPassword] = useState(false);



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
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        className="rounded bg-gray-200 h-10 p-2 pr-16 outline-none w-full"
                        onChange={handleChange}
                        value={loginDetails.password}
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
