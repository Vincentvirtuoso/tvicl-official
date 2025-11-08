import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Toast from "../components/common/Toast";

// Toast Context
const ToastContext = createContext();

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, variant = "info", options = {}) => {
    const {
      duration = 3000,
      position = "top-right",
      id = Date.now() + Math.random(),
      showProgress = true,
      ...rest
    } = options;

    const newToast = {
      id,
      message,
      type: variant,
      duration,
      position,
      showProgress,
      ...rest,
    };

    setToasts((prev) => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const positions = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ];

  const getPositionClasses = (pos) => {
    const base = "fixed z-[9999] flex flex-col gap-3 pointer-events-none";
    switch (pos) {
      case "top-left":
        return `${base} top-6 left-6 items-start`;
      case "top-center":
        return `${base} top-6 left-1/2 -translate-x-1/2 items-center`;
      case "top-right":
        return `${base} top-6 right-6 items-end`;
      case "bottom-left":
        return `${base} bottom-6 left-6 items-start`;
      case "bottom-center":
        return `${base} bottom-6 left-1/2 -translate-x-1/2 items-center`;
      case "bottom-right":
        return `${base} bottom-6 right-6 items-end`;
      default:
        return `${base} top-6 right-6 items-end`;
    }
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      {positions.map((pos) => (
        <div key={pos} className={getPositionClasses(pos)}>
          <AnimatePresence mode="popLayout">
            {toasts
              .filter((t) => t.position === pos)
              .map((t) => (
                <Toast
                  key={t.id}
                  id={t.id}
                  message={t.message}
                  type={t.type}
                  duration={t.duration}
                  showProgress={t.showProgress}
                  onClose={() => removeToast(t.id)}
                />
              ))}
          </AnimatePresence>
        </div>
      ))}
    </ToastContext.Provider>
  );
};

// Hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

// Demo Component
