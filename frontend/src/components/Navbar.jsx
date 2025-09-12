import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../customHooks/ThemeProvider";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useToken } from "../customHooks/TokenProvider";
import { SiSemanticuireact } from "react-icons/si";
function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { token, setToken } = useToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/auth/login");
  };

  return (
    <nav className="flex justify-between items-center bg-slate-300 dark:bg-cyan-950 ">
      <SiSemanticuireact className="w-[80px] h-[80px] fill-black py-3 dark:fill-cyan-300" />
      {!menuOpen && (
        <button
          onClick={() => setMenuOpen(true)}
          className="max-sm:block hidden mr-8 cursor-pointer hover:scale-105 transition-all duration-500"
        >
          <MenuOutlinedIcon />
        </button>
      )}

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-cyan-200/30 backdrop-blur-sm z-40"
            onClick={() => setMenuOpen(false)}
          ></div>
          <div className="max-sm:block hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-300 h-[400px] w-[300px] dark:bg-cyan-950 dark:text-white z-50 rounded-3xl">
            <ul className="flex flex-col justify-between items-center gap-4 h-[350px]">
              <li className="px-4 pt-8 flex justify-between w-full">
                <button onClick={toggleTheme}>
                  {theme === "dark" ? (
                    <LightModeOutlinedIcon className="cursor-pointer hover:scale-105 transition-all duration-200" />
                  ) : (
                    <DarkModeOutlinedIcon className="cursor-pointer hover:scale-105 transition-all duration-200 " />
                  )}
                </button>
                <button onClick={() => setMenuOpen(false)}>
                  <CloseOutlinedIcon className="cursor-pointer hover:scale-108" />
                </button>
              </li>
              <li className="px-4 py-2 w-full text-center">
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li className="px-4 py-2 w-full text-center">
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
              </li>
              {token ? (
                <button
                  className="px-4 py-2 w-full bg-slate-300 dark:bg-cyan-950"
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                >
                  Log Out
                </button>
              ) : (
                <li className="px-4 py-2 w-full bg-slate-300 dark:bg-cyan-950 text-center">
                  <Link to="/auth/login" onClick={() => setMenuOpen(false)}>
                    Get Started
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </>
      )}

      {/* Desktop nav */}
      <ul className="flex gap-2 items-center space-between mr-8 max-sm:hidden">
        <li className="px-4">
          <button onClick={toggleTheme}>
            {theme === "dark" ? (
              <LightModeOutlinedIcon className="cursor-pointer hover:scale-105 transition-all duration-200" />
            ) : (
              <DarkModeOutlinedIcon className="cursor-pointer hover:scale-105 transition-all duration-200 " />
            )}
          </button>
        </li>
        <li className="px-4">
          <Link to="/">Home</Link>
        </li>
        <li className="px-4">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        {token ? (
          <button
            className="px-4 cursor-pointer bg-cyan-400 rounded-full hover:scale-105 transition-all duration-300 p-2"
            onClick={handleLogout}
          >
            Log Out
          </button>
        ) : (
          <li className="px-4 cursor-pointer bg-cyan-400 rounded-full hover:scale-105 transition-all duration-300 p-2">
            <Link to="/auth/login">Get Started</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
