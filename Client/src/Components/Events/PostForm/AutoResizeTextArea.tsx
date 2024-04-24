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

  return (
    <motion.textarea
      className={`w-full p-3 pr-10 py-1 text-base bg-white font-work-sans focus:outline-none resize-none ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      rows={1}
      ref={textareaRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
};

export default AutoResizeTextArea;
