// src/components/AAdsBanner.jsx
import { useEffect, useRef } from "react";

export default function AAdsBanner() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Prevent appending duplicate scripts if container already holds the ad
    if (!containerRef.current || containerRef.current.children.length > 0) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.mbidadm.com/static/scripts.js";
    script.async = true;
    script.setAttribute("data-admpid", "465753");

    containerRef.current.appendChild(script);

    return () => {
      // Cleanup script tag on component unmount
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
    //   className="w-full flex justify-center items-center my-2 min-h-[20px] overflow-hidden"
    />
  );
}