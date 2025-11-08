import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_TVICL_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// ---- Global handlers (connected by useAuth) ----
let onUnauthorizedLogout = null;
let onTryRefresh = null;

export const setUnauthorizedLogoutHandler = (cb) => {
  onUnauthorizedLogout = cb;
};

export const setRefreshHandler = (cb) => {
  onTryRefresh = cb;
};

// ---- Health Check Utility ----
export const checkApiHealth = async () => {
  try {
    const res = await axios.get(
      `${BASE_URL.replace(/\/api$/, "")}/api/health`,
      {
        timeout: 5000,
      }
    );

    if (res.status === 200 && res.data.status === "Running ✅") {
      console.log("✅ API Health: OK");
      return { ok: true, data: res.data };
    } else {
      console.warn("⚠️ API Health Check: Unexpected response", res.data);
      return { ok: false, data: res.data };
    }
  } catch (err) {
    console.error("🚨 API Health Check Failed:", err.message);
    return { ok: false, error: err.message };
  }
};

// ---- 401 Interceptor ----
let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed() {
  refreshSubscribers.forEach((cb) => cb());
  refreshSubscribers = [];
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (!err.response) {
      console.warn("Network offline or server unreachable");
      return Promise.reject(err);
    }

    if (err.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push(() => resolve(api(originalRequest)));
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        if (onTryRefresh) {
          await onTryRefresh();
        }
        onRefreshed();
        return api(originalRequest);
      } catch (refreshErr) {
        console.warn("Token refresh failed, logging out...");
        if (onUnauthorizedLogout) onUnauthorizedLogout();
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default api;
