import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormContainer from "../Common/FormContainer";
import FormInput from "../Inputs/FormInput";
import SubmitButton from "../Forms/SubmitButton";
import ValidationChecklist from "../Forms/ValidationChecklist";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

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

  const shouldDisableForm = () =>
    !usernameChecks.lengthCheck ||
    !usernameChecks.spaceCheck ||
    !passwordChecks.lengthCheck ||
    !displayNameChecks.lengthCheck;

  const handleRegisterSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!shouldDisableForm()) {
      try {
        const response = await fetch(
          "https://unispherebackend.vercel.app/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: formData.username,
              password: formData.password,
              displayName: formData.displayName,
            }),
          }
        );

        const data = await response.json();
        if (data.success) {
          // Handle success
          navigate("/login", { state: { registered: true } });
        } else {
          // Handle failure
          console.error(data.message);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Register error:", error.message);
        } else {
          console.error("Register error:", error);
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
      isValid: displayNameChecks.lengthCheck,
      message: "Display name must be between 5-64 characters",
    },
  ];

  return (
    <div className="flex justify-center items-center h-screen glowing-background font-arimo">
      <FormContainer>
        <div className="flex flex-col items-center p-8 w-full">
          <div className="logo-container transition-transform text-luni-black mb-1 -mt-4">
            <GlobeAltIcon className="w-8 h-8" />
          </div>
          <span className="text-sm font-semibold">UniSphere</span>
          <h1 className="text-xl font-semibold mt-4 mb-8">Create Account</h1>
          <form onSubmit={handleRegisterSubmit} className="space-y-8 w-full">
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
            <FormInput
              id="displayName"
              type="text"
              value={formData.displayName}
              onChange={(e) => handleInputChange(e, "displayName")}
              placeholder="Display Name..."
              inputKey="displayName"
              isValid={displayNameChecks.lengthCheck}
            />
            <SubmitButton isDisabled={shouldDisableForm()} text="Register" />
          </form>
          <ValidationChecklist checks={validationItems} />
          <div className="flex items-center justify-center -mb-6 text-luni-grey">
            <Link
              to="/login"
              className="hover:text-luni-dark-blue text-luni-blue font-bold"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </FormContainer>
    </div>
  );
};

export default RegisterForm;
