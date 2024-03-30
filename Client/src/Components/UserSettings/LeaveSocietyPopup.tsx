import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LeaveSocietyPopupProps {
  societyName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const popupVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
};

const LeaveSocietyPopup: React.FC<LeaveSocietyPopupProps> = ({
  societyName,
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className="bg-white p-6 m-2 rounded-md shadow-lg font-montserrat"
        variants={popupVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.2 }}
      >
        <h3 className="text-xl mb-1 font-bold text-center">Leave Society</h3>
        <p className="mb-6 text-center">
          Are you sure you want to leave "{societyName}"?
        </p>
        <div className="flex justify-between">
          <button
            className="bg-red text-white px-4 py-2 rounded-md font-semibold mr-2"
            onClick={onConfirm}
          >
            Leave
          </button>
          <button
            className="bg-gray-200 text-black px-4 py-2 rounded-md font-semibold"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LeaveSocietyPopup;
