import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormContainer from "../Common/FormContainer";
import FormInput from "../Inputs/FormInput";
import SubmitButton from "../Forms/SubmitButton";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

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

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!shouldDisableForm()) {
      // Proceed with login
    }
  };

  return (
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
        <h1 className="text-lg font-semibold -mt-1">Login to your account</h1>
        <form onSubmit={handleLogin} className="space-y-8 mt-10">
          <FormInput
            id="username"
            type="text"
            value={formData.username}
            onChange={(e) => handleInputChange(e, "username")}
            placeholder="Username..."
            inputKey="username"
            isValid={usernameChecks.lengthCheck && usernameChecks.spaceCheck}
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
  );
};

export default LoginForm;
