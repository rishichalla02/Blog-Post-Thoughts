import { useEffect, useRef, useState } from "react";

export default function AdBanner({ slot, format = "auto" }) {
  const containerRef = useRef(null);
  const pushed = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect?.width || 0;
      if (width > 0 && !ready) {
        setReady(true);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [ready]);

  useEffect(() => {
    if (!ready || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, [ready]);

  return (
    <div ref={containerRef} className="w-full min-h-[100px]">
      {ready && (
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client="ca-pub-2026574876216711"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}
