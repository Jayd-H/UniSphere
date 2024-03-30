import React from "react";

interface SubmitButtonProps {
  isDisabled: boolean;
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isDisabled, text }) => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <button
        type="submit"
        disabled={isDisabled}
        className={`bg-blue-dark-blue-b2t text-white font-bold py-2 px-6 rounded-lg focus:outline-none w-40 shadow-card font-montserrat-alt ${
          isDisabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-dark-blue-t2b hover:shadow-md transition-transform transform"
        }`}
      >
        {text}
      </button>
    </div>
  );
};

export default SubmitButton;
