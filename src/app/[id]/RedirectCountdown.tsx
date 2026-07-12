"use client";

import React, { useEffect, useState } from "react";

function RedirectCountdown({ url }: { url: string }) {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (seconds <= 0) {
      window.location.replace(url);
      return;
    }
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, url]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <div className="text-center">
        <h4 className="text-3xl font-bold">Redirecting you in...</h4>

        <div className="text-7xl font-extrabold mt-4">
          {seconds} second{seconds === 1 ? "" : "s"}
        </div>
      </div>

      <div id="container-9049c3c244f96a9f73fec77b523bbc33"></div>
    </div>
  );
}

export default RedirectCountdown;
