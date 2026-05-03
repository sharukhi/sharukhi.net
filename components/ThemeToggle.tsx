"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const themes = ["system", "light", "dark"];
const labels = ["System", "Light", "Dark"];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <button className="theme-toggle">System</button>;
  }

  const idx = themes.indexOf(theme ?? "system");
  const label = labels[idx] ?? "System";

  function cycle() {
    setTheme(themes[(idx + 1) % themes.length]);
  }

  return (
    <button onClick={cycle} className="theme-toggle" aria-label="Toggle theme">
      {label}
    </button>
  );
}
