// src/components/WpAdManagerBanner.jsx
import { useEffect, useRef } from "react";

export default function WpAdManagerBanner() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Prevent appending duplicate scripts if container already holds the ad
    if (!containerRef.current || containerRef.current.children.length > 0) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.wpadmngr.com/static/adManager.js";
    script.async = true;
    script.setAttribute("data-admpid", "465760");

    containerRef.current.appendChild(script);

    return () => {
      // Cleanup script tag on component unmount
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return <div ref={containerRef} />;
}
