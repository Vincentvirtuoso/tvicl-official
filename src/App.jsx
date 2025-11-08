import { motion, AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";
import useScreen from "./hooks/useScreen";
import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";

const App = () => {
  const { isDesktop } = useScreen();
  const [sidebarOpen, setSidebarOpen] = useState(isDesktop);

  return (
    <div className="flex h-screen bg-linear-to-br from-gray-50 via-yellow-50/30 to-red-50/30">
      <Sidebar
        setSidebarOpen={setSidebarOpen}
        isDesktop={isDesktop}
        sidebarOpen={sidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-72">
        <Navbar isDesktop={isDesktop} setSidebarOpen={setSidebarOpen} />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default App;
