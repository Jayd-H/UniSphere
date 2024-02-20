import React, { useState } from "react";
import {
  UserIcon,
  LockClosedIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import uniSphereLogo from "../assets/UniSphereLogo.svg";
import { motion } from "framer-motion";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    displayName: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorField, setErrorField] = useState("");

  // Simplified validation logic
  const inputValidations = {
    username: () =>
      formData.username.length >= 5 &&
      formData.username.length <= 32 &&
      !formData.username.includes(" "),
    password: () =>
      formData.password.length >= 5 && formData.password.length <= 32,
    displayName: () =>
      formData.displayName.length >= 5 && formData.displayName.length <= 64,
  };

  const validateInput = (field: keyof typeof formData) => {
    if (field === "username" && !inputValidations.username()) {
      setErrorMessage("Username must be 5-32 characters long without spaces.");
      setErrorField("username");
    } else if (field === "password" && !inputValidations.password()) {
      setErrorMessage("Password must be 5-32 characters long without spaces.");
      setErrorField("password");
    } else if (field === "displayName" && !inputValidations.displayName()) {
      setErrorMessage("Display name must be 5-64 characters long.");
      setErrorField("displayName");
    } else {
      setErrorMessage("");
      setErrorField("");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof formData
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
    validateInput(field);
  };

  const shouldDisableForm = () => {
    return !inputValidations.username() ||
           !inputValidations.password() ||
           (isRegistering && !inputValidations.displayName());
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!shouldDisableForm()) {
      // Proceed with login
    }
  };

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
        {isRegistering ? (
          <>
            <button
              className="absolute top-2 left-2 text-luni-grey"
              onClick={() => setIsRegistering(false)}
            >
              <ArrowLeftIcon className="h-5 w-5 mt-2 ml-2" />
            </button>
            <div className="flex flex-col items-center p-8 w-full">
              <h1 className="text-xl font-bold text-luni-grey mb-8 text-center w-full">
                Create Display Name
              </h1>
              <form
                onSubmit={handleRegisterSubmit}
                className="space-y-8 w-full"
              >
                <div className="relative">
                  <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-luni-grey absolute left-2 inset-y-0 flex items-center mt-2.5" />
                  <input
                    type="text"
                    id="displayName"
                    value={formData.displayName}
                    onChange={(e) => handleInputChange(e, "displayName")}
                    className={`py-2 pl-10 block w-full bg-transparent border-0 border-b-2 ${
                      errorField === "displayName"
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-luni-blue outline-none font-montserrat placeholder-luni-grey`}
                    placeholder="Enter display name..."
                    required
                  />
                </div>
                {errorMessage.includes("Display name") && (
                  <div className="text-red-600 text-sm p-3 rounded mt-4">
                    {errorMessage}
                  </div>
                )}
                <div className="flex flex-col items-center justify-center mt-8">
                  <button
                    type="submit"
                    disabled={shouldDisableForm()}
                    className={`bg-luni-blue hover:bg-luni-dark-blue text-white font-bold py-2 px-6 rounded-xl focus:outline-none focus:shadow-outline ${
                      shouldDisableForm() ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center p-8">
              <img
                src={uniSphereLogo}
                alt="UniSphere Logo"
                className="h-15 w-48"
              />
              <h1 className="text-xl font-bold text-luni-grey mb-6">Login</h1>
              <form onSubmit={handleLogin} className="space-y-8">
                <div className="relative">
                  <UserIcon className="h-5 w-5 text-luni-grey absolute left-2 inset-y-0 flex items-center mt-2.5" />
                  <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleInputChange(e, "username")}
                    className={`py-2 pl-10 block w-full bg-transparent border-0 border-b-2 ${
                      errorField === "username"
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-luni-blue outline-none font-montserrat placeholder-luni-grey`}
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
                    className={`py-2 pl-10 block w-full bg-transparent border-0 border-b-2 ${
                      errorField === "password"
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-luni-blue outline-none font-montserrat placeholder-luni-grey`}
                    placeholder="Enter password..."
                    required
                  />
                </div>
                {errorMessage && !errorMessage.includes("Display name") && (
                  <div className="text-red-600 text-sm p-3 rounded mt-4">
                    {errorMessage}
                  </div>
                )}
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
                  <button
                    type="button"
                    onClick={() => setIsRegistering(true)}
                    className={`mt-4 hover:text-luni-dark-blue text-luni-blue font-bold py-2 px-6 rounded-xl focus:outline-none focus:shadow-outline w-36 ${
                      shouldDisableForm() ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
        <div className="mt-4 p-4 bg-white bg-opacity-80 rounded-lg shadow-inner">
          <ul>
            {!isRegistering && (
              <>
                <li className={`flex items-center ${inputValidations.username() ? 'text-green-500' : 'text-red-500'}`}>
                  <CheckCircleIcon className="h-5 w-5 mr-2" /> Username is between 5-32 characters and does not contain spaces
                </li>
                <li className={`flex items-center ${inputValidations.password() ? 'text-green-500' : 'text-red-500'}`}>
                  <CheckCircleIcon className="h-5 w-5 mr-2" /> Password is between 5-32 characters
                </li>
              </>
            )}
            {isRegistering && (
              <li className={`flex items-center ${inputValidations.displayName() ? 'text-green-500' : 'text-red-500'}`}>
                <CheckCircleIcon className="h-5 w-5 mr-2" /> Display name is between 5-64 characters
              </li>
            )}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
