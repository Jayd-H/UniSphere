import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import FormContainer from "../Components/LoginRegister/FormContainer";
import FormInput from "../Components/LoginRegister/FormInput";
import SubmitButton from "../Components/LoginRegister/SubmitButton";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../Components/Common/AlertMessage";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const showAlert = (message: string, type: "success" | "error") => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage("");
    }, 3000);
  };

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
          showAlert(data.message, "error");
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
        showAlert("An error occurred during login.", "error");
      }
    }
  };

  useEffect(() => {
    if (location.state?.registered) {
      showAlert("Registered successfully!", "success");
      window.history.replaceState({}, document.title);
    }
  }, [location.state?.registered]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        staggerChildren: 0.2,
        delayChildren: 0.9,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background-gradient">
      <div className="relative">
        <AlertMessage
          message={alertMessage}
          isVisible={alertMessage !== ""}
          isSuccess={alertType === "success"}
        />
        <FormContainer>
          <motion.div
            className="flex flex-col items-center p-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="logo-container transition-transform text-black mb-1 -mt-4">
              <motion.div
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <GlobeAltIcon className="w-8 h-8" />
              </motion.div>
            </div>
            <span className="text-sm font-semibold font-montserrat-alt">
              UNISPHERE
            </span>
            <h1 className="text-xl font-semibold mt-4 font-montserrat-alt">
              Welcome back
            </h1>
            <h1 className="text-md -mt-1 italic font-montserrat-alt">
              Login to your account
            </h1>
            <motion.form
              onSubmit={handleLogin}
              className="space-y-8 mt-10"
              variants={childVariants}
            >
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
                ></form>
              </div>
              <motion.div className="pt-6" variants={childVariants}>
                <SubmitButton isDisabled={shouldDisableForm()} text="Login" />
              </motion.div>
            </motion.form>
            <motion.div
              className="flex items-center justify-center mt-8 -mb-8"
              variants={childVariants}
            >
              <Link
                to="/register"
                className="hover:underline decoration-wavy text-dark-blue font-bold text-sm"
              >
                Sign up
              </Link>
            </motion.div>
          </motion.div>
        </FormContainer>
      </div>
    </div>
  );
};

export default LoginPage;
