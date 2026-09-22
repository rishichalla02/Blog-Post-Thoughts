// import { useEffect, useRef, useState } from "react";

// const SCRIPT_SRC =
//   "https://pl31456224.profitableratecpmnetwork.com/5652eec1f0b8b0c5f9c76b1ba5725db7/invoke.js";
// const CONTAINER_ID = "container-5652eec1f0b8b0c5f9c76b1ba5725db7";

// export default function AdsterraBanner() {
//   const wrapperRef = useRef(null);
//   const loaded = useRef(false);
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     if (!wrapperRef.current) return;

//     const observer = new ResizeObserver((entries) => {
//       const width = entries[0]?.contentRect?.width || 0;
//       if (width > 0 && !ready) setReady(true);
//     });

//     observer.observe(wrapperRef.current);
//     return () => observer.disconnect();
//   }, [ready]);

//   useEffect(() => {
//     if (!ready || loaded.current) return;

//     const script = document.createElement("script");
//     script.async = true;
//     script.setAttribute("data-cfasync", "false");
//     script.src = SCRIPT_SRC;

//     const container = document.getElementById(CONTAINER_ID);
//     if (container) {
//       container.appendChild(script);
//       loaded.current = true;
//     }
//   }, [ready]);

//   return (
//     <div ref={wrapperRef} className="w-full min-h-[100px] flex justify-center">
//       {ready && <div id={CONTAINER_ID} />}
//     </div>
//   );
// }
