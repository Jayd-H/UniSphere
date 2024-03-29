import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import FormContainer from "../Common/FormContainer";
import FormInput from "../Inputs/FormInput";
import SubmitButton from "../Forms/SubmitButton";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

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

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!shouldDisableForm()) {
      try {
        const response = await fetch(
          "https://unispherebackend.vercel.app/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: formData.username,
              password: formData.password,
            }),
          }
        );
        const data = await response.json();
        if (data.success && data.accessToken) {
          localStorage.setItem("token", data.accessToken);
          console.log("Login successful:", data.message);
          navigate("/home");
        } else {
          // Handle login failure
          console.error("Login failed:", data.message);
          setError(data.message);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Login error:", error.message);
          setError("An error occurred while logging in: " + error.message);
        } else {
          console.error("Login error:", error);
          setError("An unknown error occurred while logging in.");
        }
      }
    }
  };

  useEffect(() => {
    if (location.state?.registered) {
      setShowSuccessMessage(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="flex justify-center items-center h-screen glowing-background font-arimo">
      <div>
        {/* Show the success message if registered is true */}
        {showSuccessMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-2 justify-center text-center"
            role="alert"
          >
            <strong className="font-bold">Registered successfully!</strong>
          </div>
        )}
        <FormContainer>
          <div className="flex flex-col items-center p-8">
            <div className="logo-container transition-transform text-luni-black mb-1 -mt-4">
              <motion.div
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <GlobeAltIcon className="w-8 h-8" />
              </motion.div>
            </div>
            <span className="text-sm font-semibold">UniSphere</span>
            <h1 className="text-2xl font-semibold mt-6">Welcome back</h1>
            <h1 className="text-lg font-semibold -mt-1">
              Login to your account
            </h1>
            <form onSubmit={handleLogin} className="space-y-8 mt-10">
              <FormInput
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange(e, "username")}
                placeholder="Username..."
                inputKey="username"
                isValid={
                  usernameChecks.lengthCheck && usernameChecks.spaceCheck
                }
              />
              <FormInput
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange(e, "password")}
                placeholder="Password..."
                inputKey="password"
                isValid={passwordChecks.lengthCheck}
              />
              <div>
                <form
                  onSubmit={handleLogin}
                  className="space-y-8 mt-4 justify-center items-center w-full text-center"
                >
                  {error && <div className="text-red-500 text-md">{error}</div>}
                </form>
              </div>
              <div className="pt-6">
                <SubmitButton isDisabled={shouldDisableForm()} text="Login" />
              </div>
            </form>
            <div className="flex items-center justify-center mt-8 -mb-8">
              <Link
                to="/register"
                className="hover:text-luni-dark-blue text-luni-blue font-bold text-sm"
              >
                Sign up
              </Link>
            </div>
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default LoginForm;
