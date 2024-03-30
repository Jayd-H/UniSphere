export interface PopupProps {
  title: string;
  subheading?: string;
  inputs: {
    placeholder: string;
    type?: string;
    value: string;
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
  setPopupType: (popupType: string | null) => void
): PopupProps => {
  switch (popupType) {
    case "username":
      return {
        title: "Change Username",
        inputs: [
          {
            placeholder: "New Username",
            value: "",
            onChange: () => {},
            id: "username",
            minLength: 5,
            maxLength: 20,
          },
          {
            placeholder: "Confirm Password",
            type: "password",
            value: "",
            onChange: () => {},
            id: "password",
            minLength: 5,
          },
        ],
        confirmButton: {
          text: "Confirm",
          onClick: () => handleConfirm({ username: "", password: "" }),
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
            value: "",
            onChange: () => {},
            id: "displayName",
            minLength: 5,
            maxLength: 20,
          },
          {
            placeholder: "Confirm Password",
            type: "password",
            value: "",
            onChange: () => {},
            id: "password",
            minLength: 5,
          },
        ],
        confirmButton: {
          text: "Confirm",
          onClick: () => handleConfirm({ displayName: "", password: "" }),
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
            onChange: () => {},
            id: "currentPassword",
            minLength: 5,
          },
          {
            placeholder: "New Password",
            type: "password",
            value: "",
            onChange: () => {},
            id: "newPassword",
            minLength: 5,
          },
          {
            placeholder: "Confirm New Password",
            type: "password",
            value: "",
            onChange: () => {},
            id: "confirmPassword",
            minLength: 5,
          },
        ],
        confirmButton: {
          text: "Confirm",
          onClick: () =>
            handleConfirm({
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
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
            onChange: () => {},
            id: "password",
            minLength: 5,
          },
        ],
        confirmButton: {
          text: "Delete",
          onClick: () => handleConfirm({ password: "" }),
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