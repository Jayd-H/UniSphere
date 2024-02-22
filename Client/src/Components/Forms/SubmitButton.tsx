import React from 'react';

interface SubmitButtonProps {
  isDisabled: boolean;
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isDisabled, text }) => {
  return (
    <div className="flex flex-col items-center justify-center m">
    <button
      type="submit"
      disabled={isDisabled}
      className={`bg-luni-blue hover:bg-luni-dark-blue text-white font-bold py-2 px-6 rounded-l focus:outline-none focus:shadow-outline w-40 font-montserrat ${
        isDisabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {text}
    </button>
    </div>
  );
};

export default SubmitButton;
