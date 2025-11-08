import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LuX } from "react-icons/lu";

const toastVariants = {
  success: {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    colors: "bg-emerald-500 text-white",
    progressBar: "bg-emerald-300",
  },
  error: {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    colors: "bg-rose-500 text-white",
    progressBar: "bg-rose-300",
  },
  warning: {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    colors: "bg-amber-500 text-white",
    progressBar: "bg-amber-300",
  },
  info: {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    colors: "bg-blue-500 text-white",
    progressBar: "bg-blue-300",
  },
};

const Toast = ({
  // id,
  message,
  type = "info",
  onClose,
  duration = 3000,
  showProgress = true,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const { icon, colors, progressBar } =
    toastVariants[type] || toastVariants.info;

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onClose?.(), 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.8,
      }}
      className="pointer-events-auto relative overflow-hidden rounded-lg"
    >
      <div
        className={`flex items-start gap-3 min-w-[300px] max-w-md px-4 py-3 shadow-lg ${colors} backdrop-blur-sm`}
      >
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">{icon}</div>

        {/* Message */}
        <div className="flex-1 pr-8">
          <p className="text-sm font-medium leading-relaxed">{message}</p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            setIsExiting(true);
            setTimeout(() => onClose?.(), 300);
          }}
          className="absolute top-3 right-3 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close notification"
        >
          <LuX />
        </button>
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <motion.div
          className={`absolute bottom-0 left-0 h-1 ${progressBar} rounded-b-xl`}
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
        />
      )}
    </motion.div>
  );
};

export default Toast;
