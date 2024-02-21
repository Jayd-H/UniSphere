import React, { useState } from "react";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import uniSphereLogo from "../assets/UniSphereLogo.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const usernameChecks = {
    lengthCheck: formData.username.length >= 5 && formData.username.length <= 32,
    spaceCheck: !formData.username.includes(" "),
  };

  const passwordChecks = {
    lengthCheck: formData.password.length >= 5 && formData.password.length <= 32,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof formData) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const shouldDisableForm = () => {
    return !usernameChecks.lengthCheck || !usernameChecks.spaceCheck || !passwordChecks.lengthCheck;
  };

  const getInputBorderClass = (isValid: boolean) => isValid ? "border-gray-300" : "border-red-500";

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!shouldDisableForm()) {
      // Proceed with login
    }
  };

  return (
    <div className="flex justify-center items-center h-screen glowing-background font-arimo">
      <motion.div
        className="frosted-glass w-full max-w-xs p-4 rounded-lg shadow-lg relative"
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
      >
        <div className="flex flex-col items-center p-8">
          <img src={uniSphereLogo} alt="UniSphere Logo" className="h-15 w-48" />
          <h1 className="text-xl font-bold text-luni-grey mb-6">Login</h1>
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="relative">
              <UserIcon className="h-5 w-5 text-luni-grey absolute left-2 inset-y-0 flex items-center mt-2.5" />
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange(e, "username")}
                className={`py-2 pl-10 block w-full bg-transparent border-0 border-b-2 focus:border-luni-blue outline-none font-montserrat placeholder-luni-grey ${getInputBorderClass(
                  usernameChecks.lengthCheck && usernameChecks.spaceCheck
                )}`}
                placeholder="Enter username..."
                required
              />
            </div>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 text-luni-grey absolute left-2 inset-y-0 flex items-center mt-2.5" />
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => handleInputChange(e, "password")}
                className={`py-2 pl-10 block w-full bg-transparent border-0 border-b-2 focus:border-luni-blue outline-none font-montserrat placeholder-luni-grey ${getInputBorderClass(
                  passwordChecks.lengthCheck
                )}`}
                placeholder="Enter password..."
                required
              />
            </div>
            <div className="flex flex-col items-center justify-center mt-8">
              <button
                type="submit"
                disabled={shouldDisableForm()}
                className={`bg-luni-blue hover:bg-luni-dark-blue text-white font-bold py-2 px-6 rounded-xl focus:outline-none focus:shadow-outline w-36 ${
                  shouldDisableForm() ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Login
              </button>
              <Link to="/register" className="mt-4 hover:text-luni-dark-blue text-luni-blue font-bold py-2 px-6 rounded-xl focus:outline-none focus:shadow-outline w-36">
                Don't have an account? Sign up
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
