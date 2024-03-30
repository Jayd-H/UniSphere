import React, { useState } from "react";
import { motion } from "framer-motion";

interface PopupProps {
  title: string;
  subheading?: string;
  inputs: {
    placeholder: string;
    type?: string;
    id: string;
  }[];
  confirmButton: {
    text: string;
    onClick: (inputValues: { [key: string]: string }) => void;
    disabled?: boolean;
  };
  cancelButton: {
    text: string;
    onClick: () => void;
  };
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({
  title,
  subheading,
  inputs,
  confirmButton,
  cancelButton,
  onClose,
}) => {
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>(
    inputs.reduce((acc, input) => ({ ...acc, [input.id]: "" }), {})
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.id]: e.target.value,
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8 },
    visible: {
      scale: 1,
      transition: { duration: 0.3, delayChildren: 0.3, staggerChildren: 0.1 },
    },
    exit: {
      scale: 0.8,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  const isConfirmDisabled = Object.values(inputValues).some(
    (value) => value.length < 5
  );

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 font-montserrat"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      onClick={onClose}
    >
      <motion.div
        className="bg-white p-8 rounded-md"
        variants={cardVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.h3
          className="text-xl font-bold mb-4 text-center"
          variants={childVariants}
        >
          {title}
        </motion.h3>
        {subheading && (
          <motion.p
            className="text-red-500 mb-4 text-center"
            variants={childVariants}
          >
            {subheading}
          </motion.p>
        )}
        <motion.div
          className="grid grid-cols-1 space-y-4"
          variants={childVariants}
        >
          {inputs.map((input) => (
            <motion.div key={input.id} variants={childVariants}>
              <input
                type={input.type || "text"}
                id={input.id}
                value={inputValues[input.id]}
                onChange={handleInputChange}
                className="py-2 pl-2 block w-full rounded-md bg-transparent border-2 focus:border-blue outline-none font-montserrat placeholder-grey"
                placeholder={input.placeholder}
                required
              />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="flex justify-between mt-6"
          variants={childVariants}
        >
          <motion.button
            className={`${
              isConfirmDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue hover:bg-blue-600"
            } text-white px-4 py-2 rounded-md font-semibold mr-2 transition-colors duration-300`}
            onClick={() => confirmButton.onClick(inputValues)}
            disabled={isConfirmDisabled}
            variants={childVariants}
          >
            {confirmButton.text}
          </motion.button>
          <motion.button
            className="bg-gray-200 text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-300 transition-colors duration-300"
            onClick={cancelButton.onClick}
            variants={childVariants}
          >
            {cancelButton.text}
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Popup;
