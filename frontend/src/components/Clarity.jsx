"use client";

import { useEffect } from "react";
import { clarity } from "@microsoft/clarity";

export default function Clarity() {
  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "x09ry50skr";
    
    if (projectId) {
      clarity.init(projectId);
    } else {
      console.warn("Microsoft Clarity: NEXT_PUBLIC_CLARITY_PROJECT_ID is not defined in environment variables.");
    }
  }, []);

  return null;
}
