import React, { useState, useRef, useMemo } from "react";
import {
  LuX as X,
  LuPlus as Plus,
  LuSparkles as Sparkles,
  LuLightbulb as Lightbulb,
} from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

const defaultSuggestions = [
  "Modern Kitchen",
  "Spacious Living Room",
  "24/7 Security",
  "Private Balcony",
  "Smart Home Features",
  "Fully Furnished",
  "Swimming Pool Access",
  "Great Location",
  "Ample Parking Space",
  "En-suite Bathroom",
  "Energy Efficient Design",
  "High-speed Internet",
  "Pet Friendly",
];

const HighlightsInput = ({
  formData,
  onChange,
  name = "highlights",
  label = "Property Highlights",
  placeholder = "Add a highlight...",
  maxTags = 10,
  suggestions = defaultSuggestions,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const highlights = formData[name] || [];

  const handleAddHighlight = (value = inputValue.trim()) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    if (highlights.includes(trimmed)) {
      setInputValue("");
      return;
    }

    if (highlights.length >= maxTags) return;

    const syntheticEvent = {
      target: {
        name,
        value: [...highlights, trimmed],
        type: "array",
      },
    };

    onChange(syntheticEvent);
    setInputValue("");
  };

  const handleRemoveHighlight = (indexToRemove) => {
    const updated = highlights.filter((_, index) => index !== indexToRemove);
    const syntheticEvent = {
      target: { name, value: updated, type: "array" },
    };
    onChange(syntheticEvent);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddHighlight();
    } else if (e.key === "Backspace" && !inputValue && highlights.length > 0) {
      handleRemoveHighlight(highlights.length - 1);
    }
  };

  const filteredSuggestions = useMemo(() => {
    if (!inputValue.trim()) return [];
    return suggestions.filter(
      (s) =>
        s.toLowerCase().includes(inputValue.toLowerCase()) &&
        !highlights.includes(s)
    );
  }, [inputValue, suggestions, highlights]);

  return (
    <div className="w-full">
      {/* Label */}
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
        <Sparkles className="w-4 h-4 text-yellow-600" />
        {label}
        {highlights.length > 0 && (
          <span className="text-xs font-normal text-gray-500">
            ({highlights.length}/{maxTags})
          </span>
        )}
      </label>

      {/* Input Container */}
      <div
        onClick={() => inputRef.current?.focus()}
        className={`relative min-h-[120px] p-3 bg-white border-2 rounded-xl cursor-text transition-all duration-200 ${
          isFocused
            ? "border-yellow-500 shadow-lg shadow-yellow-100"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          {highlights.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="group flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-900 px-3 py-1.5 rounded-lg border border-yellow-200 hover:border-yellow-300 hover:shadow-md transition-all"
            >
              <span className="text-sm font-medium">{tag}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveHighlight(index);
                }}
                className="text-yellow-600 hover:text-yellow-800 hover:bg-yellow-200 rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${tag}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        {highlights.length < maxTags && (
          <div className="flex items-center gap-2 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={
                highlights.length === 0 ? placeholder : "Add another..."
              }
              className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
              maxLength={50}
            />
            {inputValue.trim() && (
              <button
                type="button"
                onClick={() => handleAddHighlight()}
                className="flex items-center gap-1 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            )}
          </div>
        )}

        {/* Suggestions */}
        <AnimatePresence>
          {filteredSuggestions.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg w-full max-h-40 overflow-y-auto text-sm"
            >
              {filteredSuggestions.map((s) => (
                <li
                  key={s}
                  onMouseDown={() => handleAddHighlight(s)}
                  className="px-3 py-2 hover:bg-yellow-50 text-gray-700 cursor-pointer flex items-center gap-2"
                >
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  {s}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Max reached */}
        {highlights.length >= maxTags && (
          <p className="text-xs text-gray-500 italic mt-1">
            Maximum of {maxTags} highlights reached
          </p>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Press <span className="font-semibold">Enter</span> or click <b>Add</b>{" "}
        to include a highlight. Click <b>x</b> to remove.
      </p>
    </div>
  );
};

export default HighlightsInput;
