import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import autosize from "autosize";

interface AutoResizeTextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  maxLength: number;
  className?: string;
}

const AutoResizeTextArea: React.FC<AutoResizeTextAreaProps> = ({
  value,
  onChange,
  placeholder,
  maxLength,
  className,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);

  const remainingCharacters = maxLength - value.length;

  return (
    <>
      <motion.textarea
        className={`w-full p-2 text-md bg-white font-work-sans focus:outline-none border-b-2 focus:border-blue border-mint resize-none ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        rows={1}
        ref={textareaRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, height: 0 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="flex justify-end mr-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        <p className="text-sm text-grey">
          {remainingCharacters} characters remaining
        </p>
      </motion.div>
    </>
  );
};

export default AutoResizeTextArea;
