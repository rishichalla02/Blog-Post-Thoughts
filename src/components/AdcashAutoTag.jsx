import { useEffect, useRef } from "react";

export default function AdcashAutoTag() {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;

    const existingScript = document.getElementById("aclib");
    if (existingScript) {
      loaded.current = true;
      return;
    }

    const script = document.createElement("script");
    script.id = "aclib";
    script.type = "text/javascript";
    script.src = "//acscdn.com/script/aclib.js";
    script.onload = () => {
      if (window.aclib) {
        window.aclib.runAutoTag({ zoneId: "biseddyrpy" });
      }
    };

    document.body.appendChild(script);
    loaded.current = true;
  }, []);

  return null;
}
