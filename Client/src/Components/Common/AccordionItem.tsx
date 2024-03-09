import React, { useState } from "react";
import { motion } from "framer-motion";

interface AccordionItemProps {
  title: string;
  content: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const variants = {
    open: { opacity: 1, height: "auto" },
    collapsed: { opacity: 0, height: 0 },
  };

  return (
    <motion.div
      className="accordion-item frosted-glass my-2 mx-auto p-4 rounded-lg w-full md:w-2/3"
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
    >
      <motion.h3 className="text-lg font-semibold" layout>
        {title}
      </motion.h3>
      <motion.div
        className="accordion-content"
        initial="collapsed"
        animate={isExpanded ? "open" : "collapsed"}
        variants={variants}
        transition={{ duration: 0.5 }}
        style={{ overflow: "hidden" }}
      >
        <p className="text-md mt-2">{content}</p>
      </motion.div>
    </motion.div>
  );
};

export default AccordionItem;
