import React, { useState } from "react";
import {
  UserIcon,
  LockClosedIcon,
  ArrowLeftIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import uniSphereLogo from "../assets/UniSphereLogo.svg"; // Ensure this path matches your project structure
import { motion } from "framer-motion";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorField, setErrorField] = useState("");

  // Validation works by checking the length of the input and whether it contains spaces.
  // If the input is valid, the function returns true and the error message is cleared.

  // This function validates the input based on the min, max, and allowSpaces parameters
  const validateInput = (
    input: string,
    min: number,
    max: number,
    allowSpaces: boolean
  ) => {
    if (
      input.length < min ||
      input.length > max ||
      (!allowSpaces && input.includes(" "))
    ) {
      return false;
    }
    return true;
  };

  // This function sets the error message based on the input validation
  const setValidationMessage = (
    field: "username" | "password" | "displayName"
  ) => {
    if (field === "username" && !validateInput(username, 5, 32, false)) {
      setErrorMessage("Username must be 5-32 characters long without spaces.");
      setErrorField("username");
    } else if (field === "password" && !validateInput(password, 5, 32, false)) {
      setErrorMessage("Password must be 5-32 characters long without spaces.");
      setErrorField("password");
    } else if (
      field === "displayName" &&
      !validateInput(displayName, 5, 64, true)
    ) {
      setErrorMessage("Display name must be 5-64 characters long.");
      setErrorField("displayName");
    } else {
      setErrorMessage("");
      setErrorField(""); // Clear the error field if there are no errors
    }
  };

  // These functions handle the input changes and set the error message
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setValidationMessage("username");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setValidationMessage("password");
  };

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
    if (isRegistering) {
      setValidationMessage("displayName");
    }
  };
  // This function checks if the form is valid based on the error message
  const validateForm = () => {
    if (errorMessage === "") {
      return true;
    }
    return false;
  };

  // These functions handle the form submissions and proceed with login or registration
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      // Proceed with login
    }
  };

  const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      // Proceed with registration
    }
  };

  // This function checks if the form should be disabled based on the input validation
  const shouldDisableForm = () => {
    if (
      !validateInput(username, 5, 32, false) ||
      !validateInput(password, 5, 32, false)
    ) {
      return true;
    }
    if (isRegistering && !validateInput(displayName, 5, 64, true)) {
      return true;
    }
    return false;
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
                    value={displayName}
                    onChange={handleDisplayNameChange}
                    className={`py-2 pl-10 block w-full bg-transparent border-0 border-b-2 ${
                      errorField === "displayName"
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-luni-blue outline-none font-montserrat placeholder-luni-grey`}
                    placeholder="Enter display name..."
                    required
                  />
                </div>
                <div className="text-center">
                {errorMessage.includes("Display name") && (
                  <div className="text-red-600 text-sm p-3 rounded mt-4">
                    {errorMessage}
                  </div>
                )}
                </div>
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
                    value={username}
                    onChange={handleUsernameChange}
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
                    value={password}
                    onChange={handlePasswordChange}
                    className={`py-2 pl-10 block w-full bg-transparent border-0 border-b-2 ${
                      errorField === "password"
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-luni-blue outline-none font-montserrat placeholder-luni-grey`}
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
                  <button
                    type="button"
                    disabled={shouldDisableForm()}
                    className={`mt-4 hover:text-luni-dark-blue text-luni-blue font-bold py-2 px-6 rounded-xl focus:outline-none focus:shadow-outline w-36 ${
                      shouldDisableForm() ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => setIsRegistering(true)}
                  >
                    Register
                  </button>
                </div>
                <div className="text-center">
                {errorMessage && !errorMessage.includes("Display name") && (
                  <div className="text-red-600 text-sm p-3 rounded mt-4">
                    {errorMessage}
                  </div>
                )}
                </div>
              </form>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default LoginForm;
