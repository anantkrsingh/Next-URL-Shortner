"use client";

import React, { useEffect, useState } from "react";

function Loader() {
  const [count, setCount] = useState(5);

  useEffect(() => {
    let current = 5;

    const interval = setInterval(() => {
      current -= 1;

      setCount(current);

      if (current <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <div className="text-center">
        <h4 className="text-3xl font-bold">
          Redirecting you in...
        </h4>

        <div className="text-7xl font-extrabold mt-4">
          {count} seconds
        </div>
      </div>

      <div id="container-9049c3c244f96a9f73fec77b523bbc33"></div>
    </div>
  );
}

export default Loader;