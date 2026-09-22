// src/components/BuyMeACoffeeWidget.jsx
import { useEffect } from "react";

export default function BuyMeACoffeeWidget() {
  useEffect(() => {
    // Check if script is already present
    const existingScript = document.getElementById("bmc-widget-script");

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "bmc-widget-script";
      script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
      script.setAttribute("data-name", "BMC-Widget");
      script.setAttribute("data-cfasync", "false");
      script.setAttribute("data-id", "rishi.challa");
      script.setAttribute("data-description", "Support me on Buy me a coffee!");
      script.setAttribute(
        "data-message",
        "Buy me Coffee and Know about Developer !",
      );
      script.setAttribute("data-color", "#FF813F");
      script.setAttribute("data-position", "Right");
      script.setAttribute("data-x_margin", "80");
      script.setAttribute("data-y_margin", "18");
      script.async = true;

      document.body.appendChild(script);
    }

    return () => {
      // Optional cleanup on unmount
      const scriptToRemove = document.getElementById("bmc-widget-script");
      const widgetFrame = document.getElementById("bmc-w415");
      if (scriptToRemove) scriptToRemove.remove();
      if (widgetFrame) widgetFrame.remove();
    };
  }, []);

  return null;
}
