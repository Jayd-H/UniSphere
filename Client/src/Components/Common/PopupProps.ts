import { User } from "../../types/user";
import { useState } from "react";

export interface PopupProps {
  title: string;
  subheading?: string;
  inputs: {
    placeholder: string;
    type?: string;
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id: string;
    minLength?: number;
    maxLength?: number;
  }[];
  confirmButton: {
    text: string;
    onClick: () => void;
    disabled?: boolean;
  };
  cancelButton: {
    text: string;
    onClick: () => void;
  };
  onClose: () => void;
}

export const getPopupProps = (
  popupType: string | null,
  handleConfirm: (data: any) => void,
  handleCancel: () => void,
  setPopupType: (popupType: string | null) => void,
  user: User
): PopupProps => {
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  switch (popupType) {
    case "username":
      return {
        title: "Change Username",
        inputs: [
          {
            placeholder: "New Username",
            value: user.userName,
            onChange: (e) => setInputValues({ ...inputValues, username: e.target.value }),
            id: "username",
            minLength: 5,
            maxLength: 20,
          },
          {
            placeholder: "Confirm Password",
            type: "password",
            value: "",
            onChange: (e) => setInputValues({ ...inputValues, password: e.target.value }),
            id: "password",
            minLength: 5,
          },
        ],
        confirmButton: {
          text: "Confirm",
          onClick: () => handleConfirm({ username: inputValues.username, password: inputValues.password }),
          disabled: false,
        },
        cancelButton: {
          text: "Cancel",
          onClick: handleCancel,
        },
        onClose: () => setPopupType(null),
      };
    case "displayName":
      return {
        title: "Change Display Name",
        inputs: [
          {
            placeholder: "New Display Name",
            value: user.displayName,
            onChange: (e) => setInputValues({ ...inputValues, displayName: e.target.value }),
            id: "displayName",
            minLength: 5,
            maxLength: 20,
          },
          {
            placeholder: "Confirm Password",
            type: "password",
            value: "",
            onChange: (e) => setInputValues({ ...inputValues, password: e.target.value }),
            id: "password",
            minLength: 5,
          },
        ],
        confirmButton: {
          text: "Confirm",
          onClick: () => handleConfirm({ displayName: inputValues.displayName, password: inputValues.password }),
          disabled: false,
        },
        cancelButton: {
          text: "Cancel",
          onClick: handleCancel,
        },
        onClose: () => setPopupType(null),
      };
    case "password":
      return {
        title: "Change Password",
        inputs: [
          {
            placeholder: "Current Password",
            type: "password",
            value: "",
            onChange: (e) => setInputValues({ ...inputValues, currentPassword: e.target.value }),
            id: "currentPassword",
            minLength: 5,
          },
          {
            placeholder: "New Password",
            type: "password",
            value: "",
            onChange: (e) => setInputValues({ ...inputValues, newPassword: e.target.value }),
            id: "newPassword",
            minLength: 5,
          },
          {
            placeholder: "Confirm New Password",
            type: "password",
            value: "",
            onChange: (e) => setInputValues({ ...inputValues, confirmPassword: e.target.value }),
            id: "confirmPassword",
            minLength: 5,
          },
        ],
        confirmButton: {
          text: "Confirm",
          onClick: () =>
            handleConfirm({
              currentPassword: inputValues.currentPassword,
              newPassword: inputValues.newPassword,
              confirmPassword: inputValues.confirmPassword,
            }),
          disabled: false,
        },
        cancelButton: {
          text: "Cancel",
          onClick: handleCancel,
        },
        onClose: () => setPopupType(null),
      };
    case "deleteAccount":
      return {
        title: "Delete Account",
        subheading: "Are you sure you want to delete your account?",
        inputs: [
          {
            placeholder: "Confirm Password",
            type: "password",
            value: "",
            onChange: (e) => setInputValues({ ...inputValues, password: e.target.value }),
            id: "password",
            minLength: 5,
          },
        ],
        confirmButton: {
          text: "Delete",
          onClick: () => handleConfirm({ password: inputValues.password }),
          disabled: false,
        },
        cancelButton: {
          text: "Cancel",
          onClick: handleCancel,
        },
        onClose: () => setPopupType(null),
      };
    default:
      return {
        title: "",
        inputs: [],
        confirmButton: {
          text: "",
          onClick: () => {},
          disabled: true,
        },
        cancelButton: {
          text: "",
          onClick: () => {},
        },
        onClose: () => setPopupType(null),
      };
  }
};