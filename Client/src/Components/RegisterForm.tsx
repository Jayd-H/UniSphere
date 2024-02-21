import React, { useState } from "react";
import {
  ChatBubbleBottomCenterTextIcon,
  UserIcon,
  LockClosedIcon,
  GlobeAltIcon,
  CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    displayName: "",
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

  const displayNameChecks = {
    lengthCheck:
      formData.displayName.length >= 5 && formData.displayName.length <= 64,
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
      !passwordChecks.lengthCheck ||
      !displayNameChecks.lengthCheck
    );
  };

  const getInputBorderClass = (isValid: boolean) =>
    isValid ? "border-gray-400" : "border-red-500";

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
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 35}}
      >
        <div className="flex flex-col items-center p-8 w-full">
        <div className="logo-container transition-transform text-luni-black mb-1 -mt-4">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <GlobeAltIcon className="w-8 h-8" />
            </motion.div>
          </div>
          <span className="text-sm font-semibold font-arimo">UniSphere</span>
          <h1 className="text-xl font-semibold mt-4 mb-8 font-montserrat text-luni-black">Create Account</h1>
          <form onSubmit={handleRegisterSubmit} className="space-y-8 w-full">
            {/* Username Input */}
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
                placeholder="Enter username..."
                required
              />
            </div>
            {/* Password Input */}
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
                placeholder="Enter password..."
                required
              />
            </div>
            {/* Display Name Input */}
            <div className="relative">
              <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-luni-black absolute left-1 inset-y-0 flex items-center mt-2.5" />
              <input
                type="text"
                id="displayName"
                value={formData.displayName}
                onChange={(e) => handleInputChange(e, "displayName")}
                className={`py-2 pl-8 block w-full bg-transparent border-0 border-b-2 focus:border-luni-blue outline-none font-montserrat placeholder-luni-grey ${getInputBorderClass(
                  displayNameChecks.lengthCheck
                )}`}
                placeholder="Enter display name..."
                required
              />
            </div>
            {/* Submit Button */}
            <div className="flex flex-col items-center justify-center mt-8">
              <button
                type="submit"
                disabled={shouldDisableForm()}
                className={`bg-luni-blue hover:bg-luni-dark-blue text-white font-bold py-2 px-6 rounded-l focus:outline-none focus:shadow-outline ${
                  shouldDisableForm() ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Register
              </button>
            </div>
          </form>
        </div>
        {/* Validation Checklist */}
<div className="-mt-4 p-2">
  <ul>
    <li className={`flex items-center m-2 font-semibold ${usernameChecks.lengthCheck ? "text-green-700" : "text-red-700"}`}>
      <div className="flex-shrink-0">
        {usernameChecks.lengthCheck ? (
          <CheckCircleIcon className="h-6 w-6 mr-3" />
        ) : (
          <XCircleIcon className="h-6 w-6 mr-3" />
        )}
      </div>
      <span>Username must be between 5-32 characters</span>
    </li>
    <li className={`flex items-center m-2 font-semibold ${usernameChecks.spaceCheck ? "text-green-700" : "text-red-700"}`}>
      <div className="flex-shrink-0">
        {usernameChecks.spaceCheck ? (
          <CheckCircleIcon className="h-6 w-6 mr-3" />
        ) : (
          <XCircleIcon className="h-6 w-6 mr-3" />
        )}
      </div>
      <span>Username must not contain spaces</span>
    </li>
    <li className={`flex items-center m-2 font-semibold ${passwordChecks.lengthCheck ? "text-green-700" : "text-red-700"}`}>
      <div className="flex-shrink-0">
        {passwordChecks.lengthCheck ? (
          <CheckCircleIcon className="h-6 w-6 mr-3" />
        ) : (
          <XCircleIcon className="h-6 w-6 mr-3" />
        )}
      </div>
      <span>Password must be between 5-32 characters</span>
    </li>
    <li className={`flex items-center m-2 font-semibold ${displayNameChecks.lengthCheck ? "text-green-700" : "text-red-700"}`}>
      <div className="flex-shrink-0">
        {displayNameChecks.lengthCheck ? (
          <CheckCircleIcon className="h-6 w-6 mr-3" />
        ) : (
          <XCircleIcon className="h-6 w-6 mr-3" />
        )}
      </div>
      <span>Display name must be between 5-64 characters</span>
    </li>
  </ul>
</div>

        <div className="flex items-center justify-center mt-4 text-luni-grey">
                <Link
                  to="/login"
                  className="hover:text-luni-dark-blue text-luni-blue font-bold"
                >
                  Login
                </Link>
              </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
