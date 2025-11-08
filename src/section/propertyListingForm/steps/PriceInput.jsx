import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuTriangleAlert } from "react-icons/lu";
import { formatCurrency, numberToWords } from "../../../utils/helper";
import { useToast } from "../../../context/ToastManager";

export default function PriceInput({ price, handleChange, errors }) {
  const [displayValue, setDisplayValue] = useState("");
  const [inWords, setInWords] = useState("");

  const { addToast } = useToast();

  useEffect(() => {
    if (price?.amount) {
      setDisplayValue(formatCurrency(price.amount).replace("₦", ""));
      setInWords(numberToWords(price.amount));
    } else {
      setDisplayValue("");
      setInWords("");
    }
  }, [price.amount]);

  const handlePriceInput = (e) => {
    const raw = e.target.value.replace(/[₦,\s]/g, "");
    if (raw.length > 15) {
      addToast("Max reached!");
      return;
    }
    const numericValue = Number(raw);
    setDisplayValue(formatCurrency(raw).replace("₦", ""));
    setInWords(numberToWords(numericValue));

    handleChange({
      target: {
        name: "price.amount",
        value: isNaN(numericValue) ? "" : numericValue,
      },
    });
  };

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Base Price *
      </label>

      <div className="flex flex-col items-start sm:items-center sm:flex-row gap-4">
        <div className="relative w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
            ₦
          </span>
          <input
            type="text"
            name="price.amount"
            value={displayValue}
            onChange={handlePriceInput}
            inputMode="numeric"
            className={`w-full pl-8 pr-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
              errors.priceAmount
                ? "border-red-500 bg-red-50"
                : "border-gray-400/20"
            }`}
            placeholder="Enter amount"
          />
        </div>

        <label className="flex items-center text-gray-700 text-sm gap-2">
          <input
            type="checkbox"
            name="price.negotiable"
            checked={price.negotiable || false}
            onChange={handleChange}
            className="w-4 h-4 accent-yellow-500 focus:ring-yellow-400"
          />
          Negotiable
        </label>
      </div>

      <AnimatePresence mode="wait">
        {inWords && (
          <motion.p
            key={inWords}
            initial={{ opacity: 0, y: -3, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -3, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-sm text-gray-500 mt-1 italic"
          >
            {inWords}
          </motion.p>
        )}
      </AnimatePresence>

      {errors.priceAmount && (
        <motion.p
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-1 flex items-center gap-1"
        >
          <LuTriangleAlert /> {errors.priceAmount}
        </motion.p>
      )}
    </div>
  );
}
