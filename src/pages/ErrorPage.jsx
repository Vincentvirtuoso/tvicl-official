// src/pages/ErrorPage.jsx
import { useRouteError, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LuHouse as HomeIcon,
  LuChevronLeft,
  LuRefreshCcw,
  LuTriangleAlert,
  LuSearch,
  LuShieldQuestion,
} from "react-icons/lu";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error("Router Error:", error);

  // Error configuration based on status
  const getErrorConfig = () => {
    const config = {
      icon: LuTriangleAlert,
      iconColor: "text-yellow-500",
      gradient: "from-yellow-400 to-orange-500",
      title: "Oops! Something went wrong",
      message: "An unexpected error has occurred.",
      ...(errorConfigs[error?.status] || {}),
    };

    // Override with error message if available
    if (error?.message && error.status !== 404) {
      config.message = error.message;
    }

    return config;
  };

  const errorConfigs = {
    404: {
      icon: LuSearch,
      iconColor: "text-blue-500",
      gradient: "from-blue-400 to-purple-500",
      title: "Page Not Found",
      message: "The page you are looking for doesn't exist or has been moved.",
    },
    401: {
      icon: LuShieldQuestion,
      iconColor: "text-red-500",
      gradient: "from-red-400 to-pink-500",
      title: "Unauthorized",
      message: "You need to be logged in to access this page.",
    },
    403: {
      icon: LuShieldQuestion,
      iconColor: "text-orange-500",
      gradient: "from-orange-400 to-red-500",
      title: "Access Denied",
      message: "You don't have permission to access this resource.",
    },
    500: {
      icon: LuTriangleAlert,
      iconColor: "text-red-500",
      gradient: "from-red-500 to-pink-600",
      title: "Server Error",
      message: "Something went wrong on our servers. Please try again later.",
    },
  };

  const errorConfig = getErrorConfig();
  const IconComponent = errorConfig.icon;

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleReload = () => {
    window.location.reload();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <div
      className={`min-h-screen bg-white flex items-center justify-center p-6`}
    >
      <motion.div
        className="max-w-xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-8 text-center"
          variants={itemVariants}
        >
          {/* Animated Icon */}
          <motion.div
            className="flex justify-center mb-6"
            variants={iconVariants}
            whileHover="hover"
          >
            <div
              className={`p-4 rounded-2xl bg-gradient-to-br ${errorConfig.gradient} bg-opacity-10`}
            >
              <IconComponent className={`h-16 w-16 text-white`} />
            </div>
          </motion.div>

          {/* Error Title */}
          <motion.h1
            className="text-3xl font-bold text-gray-800 mb-3"
            variants={itemVariants}
          >
            {errorConfig.title}
          </motion.h1>

          {/* Error Message */}
          <motion.p
            className="text-gray-600 text-lg mb-6 leading-relaxed"
            variants={itemVariants}
          >
            {errorConfig.message}
          </motion.p>

          {/* Error Code */}
          {error?.status && (
            <motion.div
              className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200"
              variants={itemVariants}
            >
              <p className="text-sm text-gray-500">Error Code</p>
              <p className="text-2xl font-mono font-bold text-gray-800">
                {error.status}
              </p>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
            variants={itemVariants}
          >
            <motion.button
              onClick={handleGoBack}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              <LuChevronLeft className="h-5 w-5" />
              Go Back
            </motion.button>

            <motion.button
              onClick={handleReload}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
            >
              <LuRefreshCcw className="h-5 w-5" />
              Reload
            </motion.button>

            <motion.div
              onClick={() => navigate("/")}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-6 py-3 bg-linear-to-r flex items-center justify-center gap-2 from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
            >
              <HomeIcon className="h-5 w-5" />
              Go Home
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="border-t border-gray-200 pt-6"
            variants={itemVariants}
          >
            <p className="text-sm text-gray-500 mb-3">Quick Links</p>
            <div className="flex justify-center gap-4">
              <Link
                to="/users"
                className="text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors"
              >
                Browse Users
              </Link>
              <Link
                to="/properties"
                className="text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors"
              >
                Browse Properties
              </Link>
            </div>
          </motion.div>

          {/* Development Stack Trace */}
          {import.meta.env.NODE_ENV === "development" &&
            error?.error?.stack && (
              <motion.details
                className="mt-6 text-left"
                variants={itemVariants}
              >
                <summary className="cursor-pointer text-sm text-gray-500 font-medium mb-2">
                  Technical Details (Development)
                </summary>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-xs overflow-auto max-h-40 mt-2">
                  {error.error.stack}
                </pre>
              </motion.details>
            )}
        </motion.div>

        {/* Support Message */}
        <motion.div className="text-center mt-6" variants={itemVariants}>
          <p className="text-white text-opacity-80 text-sm">
            Need help?{" "}
            <button className="underline hover:text-white transition-colors">
              Contact Support
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
