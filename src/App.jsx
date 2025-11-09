import { motion, AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";
import useScreen from "./hooks/useScreen";
import { useEffect, useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import axios from "./api/axiosInstance";
import { usePropertyAPI } from "./hooks/useProperty";

const App = () => {
  const { isDesktop } = useScreen();
  const [sidebarOpen, setSidebarOpen] = useState(isDesktop);
  const { data, isLoading, searchProperties } = usePropertyAPI();

  useEffect(() => {
    searchProperties("");
  }, []);

  // Extract properties from the hook data
  const properties = data.properties || [];
  const totalProperties = properties.length;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`/auth/all-users`, {});

      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex h-screen bg-linear-to-br from-gray-50 via-yellow-50/30 to-red-50/30">
      <Sidebar
        setSidebarOpen={setSidebarOpen}
        isDesktop={isDesktop}
        sidebarOpen={sidebarOpen}
        totalProperties={totalProperties}
        users={users.length || 0}
        isPropertyLoading={isLoading("properties")}
        isUserLoading={loading}
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
