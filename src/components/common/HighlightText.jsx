import React from "react";
import { motion } from "framer-motion";

const HighlightText = ({
  text = "",
  query = "",
  highlightColor = "#ffe16a",
  animation = true,
}) => {
  if (!query) return <span>{text}</span>;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <motion.span
            key={i}
            initial={animation ? { backgroundColor: "#ffffff00" } : {}}
            animate={animation ? { backgroundColor: highlightColor } : {}}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{
              borderRadius: "4px",
              padding: "2px 4px",
              fontWeight: 600,
              backgroundColor: highlightColor,
            }}
          >
            {part}
          </motion.span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

export default HighlightText;
