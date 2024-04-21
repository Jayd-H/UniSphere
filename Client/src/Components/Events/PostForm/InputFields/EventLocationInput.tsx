import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import AutoResizeTextArea from "../AutoResizeTextArea";

interface EventLocationInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength: number;
}

const EventLocationInput: React.FC<EventLocationInputProps> = ({
  value,
  onChange,
  maxLength,
}) => {
  return (
    <div className="relative px-2 mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-md font-montserrat-alt pl-2">
          Where's it happening?
        </span>
        <AnimatePresence>
          {value.trim().length > 0 && (
            <motion.p
              className="text-sm text-gray-500 pr-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {maxLength - value.length} characters remaining
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <AutoResizeTextArea
        value={value}
        onChange={onChange}
        placeholder="Event location..?"
        maxLength={maxLength}
        className="px-4 py-3 pr-10 rounded-lg border-2 border-mint focus:border-blue"
      />
    </div>
  );
};

export default EventLocationInput;
