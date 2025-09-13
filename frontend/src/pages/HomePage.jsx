import React from "react";
import { useTheme } from "../customHooks/ThemeProvider";
import LiquidChrome from "../components/LiquidChrome";

function HomePage() {
  const { theme } = useTheme();

  const baseColor = theme === "dark" ? [0.02, 0.03, 0.06] : [1.0, 1.0, 1.0];
  const accentColor = theme === "dark" ? [0.1, 0.55, 1.0] : [0.12, 0.45, 0.95];

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <LiquidChrome
          key={theme} // <-- force re-init on theme change
          baseColor={baseColor}
          accentColor={accentColor} // remove if your component doesn't support this prop
          speed={1}
          amplitude={0.6}
          interactive
        />
      </div>

      <main className="relative z-10 flex items-center justify-center min-h-screen pointer-events-none px-4">
        <div className="text-center space-y-4">
          <h1
            className="
              text-4xl sm:text-6xl font-extrabold tracking-tight
              bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600
              dark:from-cyan-300 dark:via-sky-300 dark:to-indigo-300
              text-transparent bg-clip-text
            "
          >
            Welcome to Auth System
          </h1>
          <p className="text-base sm:text-lg text-black/70 dark:text-white/80">
            Secure, fast, and beautiful.
          </p>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
