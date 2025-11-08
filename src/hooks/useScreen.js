import { useState, useEffect } from "react";

const getDeviceType = (width) => {
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
};

export default function useScreen() {
  const [screen, setScreen] = useState(() => {
    if (typeof window === "undefined") {
      return {
        width: 0,
        height: 0,
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        orientation: "portrait",
        deviceType: "desktop",
      };
    }

    const { innerWidth, innerHeight } = window;
    const deviceType = getDeviceType(innerWidth);

    return {
      width: innerWidth,
      height: innerHeight,
      isMobile: deviceType === "mobile",
      isTablet: deviceType === "tablet",
      isDesktop: deviceType === "desktop",
      orientation: innerWidth > innerHeight ? "landscape" : "portrait",
      deviceType,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      const deviceType = getDeviceType(innerWidth);

      setScreen({
        width: innerWidth,
        height: innerHeight,
        isMobile: deviceType === "mobile",
        isTablet: deviceType === "tablet",
        isDesktop: deviceType === "desktop",
        orientation: innerWidth > innerHeight ? "landscape" : "portrait",
        deviceType,
      });
    };

    handleResize(); // initialize
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return screen;
}
