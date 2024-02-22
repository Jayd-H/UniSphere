import React from 'react';
import { UserIcon, LockClosedIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

const icons = {
  username: UserIcon,
  password: LockClosedIcon,
  displayName: ChatBubbleBottomCenterTextIcon,
};

interface FormInputProps {
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isValid: boolean;
  inputKey: keyof typeof icons;
}

const FormInput: React.FC<FormInputProps> = ({ type, id, value, onChange, placeholder, isValid, inputKey }) => {
  const Icon = icons[inputKey];
  return (
    <div className="relative">
      <Icon className="h-5 w-5 text-luni-black absolute left-1 inset-y-0 flex items-center mt-2.5" />
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`py-2 pl-8 block w-full bg-transparent border-0 border-b-2 focus:border-luni-blue outline-none font-montserrat placeholder-luni-grey ${
          isValid ? "border-gray-400" : "border-red-500"
        }`}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default FormInput;
