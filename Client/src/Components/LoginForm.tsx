import React, { useState } from "react";
import {
  UserIcon,
  LockClosedIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const usernameChecks = {
    lengthCheck:
      formData.username.length >= 5 && formData.username.length <= 32,
    spaceCheck: !formData.username.includes(" "),
  };

  const passwordChecks = {
    lengthCheck:
      formData.password.length >= 5 && formData.password.length <= 32,
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof formData
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const shouldDisableForm = () => {
    return (
      !usernameChecks.lengthCheck ||
      !usernameChecks.spaceCheck ||
      !passwordChecks.lengthCheck
    );
  };

  const getInputBorderClass = (isValid: boolean) =>
    isValid ? "border-gray-400" : "border-red-500";

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!shouldDisableForm()) {
      // Proceed with login
    }
  };

  return (
    <div className="flex justify-center items-center h-screen glowing-background font-arimo">
      <motion.div
        className="frosted-glass w-full max-w-xs p-4 shadow-lg relative rounded-lg"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 35}}
      >
        <div className="flex flex-col items-center p-8">
          <div className="logo-container transition-transform text-luni-black mb-1 -mt-4">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <GlobeAltIcon className="w-8 h-8" />
            </motion.div>
          </div>
          <span className="text-sm font-semibold font-arimo">UniSphere</span>
          <h1 className="text-xl font-semibold mt-6 font-montserrat text-luni-black">Welcome back</h1>
          <h1 className="text-m font-semibold -mt-1 font-montserrat text-luni-black">Login to your account</h1>
          <form onSubmit={handleLogin} className="space-y-8 mt-10">
            <div className="relative">
              <UserIcon className="h-5 w-5 text-luni-black absolute left-1 inset-y-0 flex items-center mt-2.5" />
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange(e, "username")}
                className={`py-2 pl-8 block w-full bg-transparent border-0 border-b-2 focus:border-luni-blue outline-none font-montserrat placeholder-luni-grey ${getInputBorderClass(
                  usernameChecks.lengthCheck && usernameChecks.spaceCheck
                )}`}
                placeholder="Username..."
                required
              />
            </div>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 text-luni-black absolute left-1 inset-y-0 flex items-center mt-2.5" />
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => handleInputChange(e, "password")}
                className={`py-2 pl-8 block w-full bg-transparent border-0 border-b-2 focus:border-luni-blue outline-none font-montserrat placeholder-luni-grey ${getInputBorderClass(
                  passwordChecks.lengthCheck
                )}`}
                placeholder="Password..."
                required
              />
            </div>
            <div className="flex flex-col items-center justify-center mt-8">
              <button
                type="submit"
                disabled={shouldDisableForm()}
                className={`bg-luni-blue hover:bg-luni-dark-blue text-white font-bold py-2 px-6 rounded-l focus:outline-none focus:shadow-outline w-40 font-montserrat ${
                  shouldDisableForm() ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Login
              </button>
              <div className="flex items-center justify-center mt-8 -mb-4">
                <Link
                  to="/register"
                  className="hover:text-luni-dark-blue text-luni-blue font-bold text-sm font-montserrat"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
