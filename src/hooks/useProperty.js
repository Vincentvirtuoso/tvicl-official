import { useState, useRef, useEffect, useCallback } from "react";
import api from "../api/axiosInstance";

export const usePropertyAPI = (userId = null, debounceMs = 400) => {
  const [data, setData] = useState({});
  const [loadingMap, setLoadingMap] = useState({});
  const [errorMap, setErrorMap] = useState({});

  // Changed: Use a Map to track individual request controllers
  const controllersRef = useRef(new Map());
  const debounceTimer = useRef(null);
  const cache = useRef({});

  // 🔄 Cancel a specific request by key
  const cancelRequest = (key) => {
    const controller = controllersRef.current.get(key);
    if (controller) {
      controller.abort();
      controllersRef.current.delete(key);
    }
  };

  // 🔄 Cancel all ongoing requests
  const cancelAllRequests = () => {
    controllersRef.current.forEach((controller) => controller.abort());
    controllersRef.current.clear();
  };

  // ⚙️ Centralized Fetcher
  const fetchData = useCallback(
    async (endpoint, key, params = {}, options = {}) => {
      const cacheKey = `${endpoint}-${JSON.stringify(params)}`;

      setLoadingMap((prev) => ({ ...prev, [key]: true }));

      if (cache.current[cacheKey]) {
        setData((prev) => ({ ...prev, [key]: cache.current[cacheKey] }));
        return;
      }

      // Cancel only the specific request for this key (not all requests)
      cancelRequest(key);

      // Create a new controller for this specific request
      const controller = new AbortController();
      controllersRef.current.set(key, controller);

      try {
        setErrorMap((prev) => ({ ...prev, [key]: null }));

        const res = await api.get(`/properties/${endpoint}`, {
          params,
          signal: controller.signal,
          ...options,
        });

        const result = res.data.data;
        setData((prev) => ({ ...prev, [key]: result }));
        cache.current[cacheKey] = result;
      } catch (err) {
        if (err?.name !== "AbortError") {
          const errorMessage =
            err.response?.data || err.message || "Failed to fetch data";

          setErrorMap((prev) => ({
            ...prev,
            [key]: errorMessage,
          }));
        }
      } finally {
        setLoadingMap((prev) => ({ ...prev, [key]: false }));
        // Clean up the controller after request completes
        controllersRef.current.delete(key);
      }
    },
    []
  );

  // 🧠 Debounced Fetch
  const debouncedFetch = useCallback(
    (endpoint, key, params) => {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(
        () => fetchData(endpoint, key, params),
        debounceMs
      );
    },
    [fetchData, debounceMs]
  );

  // 🧩 CRUD Operations
  const createProperty = async (payload) =>
    api.post("/properties/create", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  const updateProperty = async (id, payload) =>
    api.put(`/properties/${id}`, payload);
  const deleteProperty = async (id) => api.delete(`/properties/${id}`);
  const restoreProperty = async (id) => api.patch(`/properties/${id}/restore`);
  const verifyProperty = async (id) => api.patch(`/properties/${id}/verify`);

  // 📊 Analytics Fetchers
  const fetchAnalytics = useCallback(() => {
    Promise.all([
      fetchData("analytics/trending", "trending"),
      fetchData(`analytics/recommend/${userId}`, "recommended"),
      fetchData("analytics/top-searches", "topSearches"),
      fetchData("analytics/top-viewed", "topViewed"),
      fetchData("analytics/stats", "stats"),
      fetchData("analytics/average-price", "averagePrice"),
      fetchData("analytics/by-state", "listingsByState"),
      fetchData("analytics/recent", "recent"),
    ]);
  }, [fetchData, userId]);

  const fetchRelated = (propertyId) =>
    fetchData(`analytics/related/${propertyId}`, "related");

  // 🔍 Debounced search handler
  const searchProperties = (query) =>
    debouncedFetch("", "properties", { search: query });

  const fetchPropertyDetails = (id) => {
    return fetchData(`${id}`, "propertyById");
  };

  // 🧹 Cleanup - cancel all requests on unmount
  useEffect(() => cancelAllRequests, []);

  // 🧭 Utilities
  const isLoading = (key) => !!loadingMap[key];
  const getError = (key) => errorMap[key];
  const isAnyLoading = Object.values(loadingMap).some(Boolean);
  const hasAnyError = Object.values(errorMap).some(Boolean);

  return {
    data,
    propertyById: data.propertyById,

    loadingMap,
    errorMap,
    isLoading,
    getError,
    isAnyLoading,
    hasAnyError,

    createProperty,
    updateProperty,
    deleteProperty,
    restoreProperty,
    verifyProperty,

    fetchAnalytics,
    fetchRelated,
    searchProperties,
    fetchPropertyDetails,
    refetch: fetchAnalytics,
  };
};
