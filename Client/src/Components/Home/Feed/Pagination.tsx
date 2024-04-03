import React from "react";
import { motion } from "framer-motion";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4 mb-8 font-bold font-montserrat-alt">
      {pageNumbers.map((pageNumber) => (
        <motion.button
          key={pageNumber}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`p-2 px-4 mx-1 rounded ${
            pageNumber === currentPage
              ? "bg-blue text-white border-black border-2 border-dashed hover:bg-dark-blue"
              : "bg-gray-200 text-black border-black border-2 border-dashed hover:bg-mint"
          }`}
          onClick={() => onPageChange(pageNumber)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >
          {pageNumber}
        </motion.button>
      ))}
    </div>
  );
};

export default Pagination;
