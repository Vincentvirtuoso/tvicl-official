import React from "react";
import clsx from "clsx";

export const Loader = ({
  variant = "spinner",
  size = 40,
  color = "#facc15",
  label = "",
  fullScreen = false,
  className = "",
}) => {
  const commonStyle = {
    width: size,
    height: size,
  };

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return (
          <div className="flex space-x-1" role="status" aria-label="Loading">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={clsx(
                  "w-2.5 h-2.5 rounded-full animate-bounce",
                  i === 1 && "[animation-delay:-.15s]",
                  i === 2 && "[animation-delay:-.3s]"
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        );

      case "bars":
        return (
          <div
            className="flex items-end space-x-1"
            role="status"
            aria-label="Loading"
          >
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="w-1.5 rounded-sm animate-[grow_1s_ease-in-out_infinite]"
                style={{
                  backgroundColor: color,
                  animationDelay: `${i * 0.15}s`,
                  height: `${6 + i * 2}px`,
                }}
              />
            ))}
          </div>
        );

      case "pulse":
        return (
          <div
            role="status"
            aria-label="Loading"
            className="rounded-full animate-pulse"
            style={{
              ...commonStyle,
              backgroundColor: color,
              opacity: 0.75,
            }}
          />
        );

      case "spinner":
      default:
        return (
          <svg
            className="animate-spin text-current"
            viewBox="0 0 24 24"
            style={{ width: size, height: size, color }}
            role="status"
            aria-label="Loading"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0
              c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        );
    }
  };

  const Container = ({ children }) =>
    fullScreen ? (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-50">
        {children}
      </div>
    ) : (
      <div
        className={clsx(
          "flex items-center gap-3 justify-center space-y-2",
          className
        )}
      >
        {children}
      </div>
    );

  return (
    <Container>
      {renderLoader()}
      {label && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{label}</p>
      )}
    </Container>
  );
};
