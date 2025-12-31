import { useAuth } from "@/auth/AuthProvider";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginCred, setLoginCred] = useState({ userName: "", password: "" });
  console.log(loginCred, "loginCred");

  const { login } = useAuth();

  const temUser = "adilbhai";
  const tempPassword = "adilbhai@123";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginCred.userName == temUser && loginCred.password == tempPassword) {
      setLoginCred({ userName: "", password: "" });
      login("1234567890");
      navigate("/home");
    } else {
      alert("Wrong User name or Password.");
      //   setLoginCred({ userName: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-1">
            Please login to your account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User Name
            </label>
            <input
              type="text"
              value={loginCred.userName}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) =>
                setLoginCred({ ...loginCred, userName: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={loginCred.password}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) =>
                setLoginCred({ ...loginCred, password: e.target.value })
              }
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="rounded border-gray-300" />
              Remember me
            </label>
            {/* <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a> */}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        {/* <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
