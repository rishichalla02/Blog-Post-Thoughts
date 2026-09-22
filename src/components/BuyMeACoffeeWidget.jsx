// src/components/BuyMeACoffeeWidget.jsx
import React from "react";

export default function BuyMeACoffeeWidget() {
  return (
    <a
      href="https://www.buymeacoffee.com/rishi.challa"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-5 z-50 flex items-center gap-2 bg-[#FF813F] text-white font-cookie font-semibold text-sm px-4 py-2.5 rounded-full shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-200 border border-white/20"
      style={{ boxShadow: "0px 4px 12px rgba(0,0,0,0.15)" }}
    >
      <img
        src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
        alt="Buy me a coffee"
        className="w-5 h-5"
      />
      <span>Buy me Coffee</span>
    </a>
  );
}
