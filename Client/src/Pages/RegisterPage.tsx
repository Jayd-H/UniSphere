import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormContainer from "../Components/LoginRegister/FormContainer";
import FormInput from "../Components/LoginRegister/FormInput";
import SubmitButton from "../Components/LoginRegister/SubmitButton";
import ValidationChecklist from "../Components/LoginRegister/ValidationChecklist";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../Components/Common/AlertMessage";
import { motion } from "framer-motion";
import { registerUser } from "../api/authAPI";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [, setError] = useState("");
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
    confirmPassword: "",
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
    matchCheck: formData.password === formData.confirmPassword,
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

  const shouldDisableForm = () =>
    !usernameChecks.lengthCheck ||
    !usernameChecks.spaceCheck ||
    !passwordChecks.lengthCheck ||
    !passwordChecks.matchCheck ||
    !displayNameChecks.lengthCheck;

  const handleRegisterSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");
    if (!shouldDisableForm()) {
      try {
        const data = await registerUser(
          formData.username,
          formData.password,
          formData.displayName
        );
        if (data.success) {
          showAlert("Registration successful!", "success");
          setTimeout(() => {
            navigate("/login", { state: { registered: true } });
          }, 2000);
        } else {
          showAlert(data.message, "error");
          setError(data.message);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Registration error:", error.response.data.message);
            showAlert(error.response.data.message, "error");
            setError(error.response.data.message);
          } else if (error.request) {
            // The request was made but no response was received
            console.error(
              "Registration error: No response received from the server"
            );
            showAlert("No response received from the server", "error");
            setError("No response received from the server");
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Registration error:", error.message);
            showAlert("An error occurred during registration", "error");
            setError("An error occurred during registration");
          }
        } else {
          console.error("Registration error:", error);
          showAlert("An unknown error occurred during registration", "error");
          setError("An unknown error occurred during registration");
        }
      }
    }
  };

  const validationItems = [
    {
      isValid: usernameChecks.lengthCheck,
      message: "Username must be between 5-32 characters",
    },
    {
      isValid: usernameChecks.spaceCheck,
      message: "Username must not contain spaces",
    },
    {
      isValid: passwordChecks.lengthCheck,
      message: "Password must be between 5-32 characters",
    },
    {
      isValid: passwordChecks.matchCheck,
      message: "Passwords must match",
    },
    {
      isValid: displayNameChecks.lengthCheck,
      message: "Display name must be between 5-64 characters",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.6,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background-gradient font-work-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 space-x-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hidden lg:block"
        >
          <FormContainer>
            <motion.div className=" items-center p-6" variants={childVariants}>
              <h2 className="text-lg font-semibold mb-8 font-montserrat-alt text-center">
                Validation Checklist
              </h2>
              <ValidationChecklist checks={validationItems} />
            </motion.div>
          </FormContainer>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <FormContainer>
            <motion.div className="flex flex-col items-center p-8 w-full">
              <div className="logo-container transition-transform text-luni-black mb-1 -mt-4">
                <GlobeAltIcon className="w-8 h-8" />
              </div>
              <span className="text-sm font-semibold font-montserrat-alt">
                UNISPHERE
              </span>
              <h1 className="text-xl font-semibold mt-4 font-montserrat-alt">
                Create Account
              </h1>
              <h1 className="text-md font-semibold mb-8 -mt-2 font-montserrat-alt">
                Welcome
              </h1>
              <motion.form
                onSubmit={handleRegisterSubmit}
                className="space-y-8 w-full"
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
                <FormInput
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange(e, "confirmPassword")}
                  placeholder="Confirm Password..."
                  inputKey="confirmPassword"
                  isValid={passwordChecks.matchCheck}
                />
                <FormInput
                  id="displayName"
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => handleInputChange(e, "displayName")}
                  placeholder="Display Name..."
                  inputKey="displayName"
                  isValid={displayNameChecks.lengthCheck}
                />
                <motion.div variants={childVariants}>
                  <h1 className="text-center text-sm text-black font-work-sans lg:hidden">
                    Username and password must be between 5-32 characters,
                    display name must be between 5-64 characters.
                  </h1>
                </motion.div>
                <motion.div variants={childVariants}>
                  <SubmitButton
                    isDisabled={shouldDisableForm()}
                    text="Register"
                  />
                </motion.div>
              </motion.form>
              <AlertMessage
                message={alertMessage}
                isVisible={alertMessage !== ""}
                isSuccess={alertType === "success"}
              />
              <motion.div
                className="flex items-center justify-center -mb-8 mt-8 text-luni-grey"
                variants={childVariants}
              >
                <Link
                  to="/login"
                  className="hover:underline decoration-wavy text-dark-blue font-bold text-sm"
                >
                  Already have an account?
                </Link>
              </motion.div>
            </motion.div>
          </FormContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
