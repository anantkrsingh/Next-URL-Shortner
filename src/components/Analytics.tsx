"use client";
import React, { useEffect } from "react";
import { logEvent } from "firebase/analytics";
import { analytics } from "../lib/firebase";

function Analytics() {
  useEffect(() => {
    if (!analytics) return;

    if (typeof window !== "undefined") {
      logEvent(analytics, "page_view");
    }
  }, []);
  return <div></div>;
}

export default Analytics;
