import React, { useState } from "react";
import { ChatBubbleBottomCenterTextIcon, UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import uniSphereLogo from "../assets/UniSphereLogo.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    displayName: "",
  });

  const usernameChecks = {
    lengthCheck: formData.username.length >= 5 && formData.username.length <= 32,
    spaceCheck: !formData.username.includes(" "),
  };

  const passwordChecks = {
    lengthCheck: formData.password.length >= 5 && formData.password.length <= 32,
  };

  const displayNameChecks = {
    lengthCheck: formData.displayName.length >= 5 && formData.displayName.length <= 64,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof formData) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const shouldDisableForm = () => {
    return !usernameChecks.lengthCheck || !usernameChecks.spaceCheck || !passwordChecks.lengthCheck || !displayNameChecks.lengthCheck;
  };

  const getInputBorderClass = (isValid: boolean) => isValid ? "border-gray-300" : "border-red-500";

  const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!shouldDisableForm()) {
      // Proceed with registration
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
        <div className="flex flex-col items-center p-8 w-full">
          <img src={uniSphereLogo} alt="UniSphere Logo" className="h-15 w-48 mb-6" />
          <h1 className="text-xl font-bold text-luni-grey mb-8">Register</h1>
          <form onSubmit={handleRegisterSubmit} className="space-y-8 w-full">
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
            <div className="relative">
              <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-luni-grey absolute left-2 inset-y-0 flex items-center mt-2.5" />
              <input
                type="text"
                id="displayName"
                value={formData.displayName}
                onChange={(e) => handleInputChange(e, "displayName")}
                className={`py-2 pl-10 block w-full bg-transparent border-0 border-b-2 focus:border-luni-blue outline-none font-montserrat placeholder-luni-grey ${getInputBorderClass(
                  displayNameChecks.lengthCheck
                )}`}
                placeholder="Enter display name..."
                required
              />
            </div>
            <div className="flex flex-col items-center justify-center mt-8">
              <button
                type="submit"
                disabled={shouldDisableForm()}
                className={`bg-luni-blue hover:bg-luni-dark-blue text-white font-bold py-2 px-6 rounded-xl focus:outline-none focus:shadow-outline ${
                  shouldDisableForm() ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Register
              </button>
              <Link to="/login" className="mt-4 hover:text-luni-dark-blue text-luni-blue font-bold py-2 px-6 rounded-xl focus:outline-none focus:shadow-outline">
                Already have an account? Log in
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
