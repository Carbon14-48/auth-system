/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../customHooks/ThemeProvider";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useToken } from "../customHooks/TokenProvider";
import Button from "@mui/material/Button";
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
    <nav className="flex justify-between items-center bg-slate-300 dark:bg-cyan-950">
      <img src={logo} alt="Auth-System logo" className="w-[100px] h-[100px]" />
      {menuOpen === true ? (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hidden max-sm:block mr-8 cursor-pointer hover:scale-105 transition-all duration-500"
        >
          <MenuOutlinedIcon />
        </button>
      ) : undefined}

      {/* small screen nav  */}
      {menuOpen === true ? (
        <>
          {" "}
          <div className="fixed inset-0 bg-cyan-200/30 backdrop-blur-sm z-40"></div>
          <div
            className="hidden max-sm:block max-sm:fixed max-sm:top-1/2 max-sm:left-1/2 
      max-sm:-translate-x-1/2 max-sm:-translate-y-1/2 max-sm:bg-slate-300 
      h-[400px] w-[300px] dark:bg-cyan-950 dark:text-white z-50 rounded-3xl "
          >
            <ul className="max-sm:flex-col justify-between items-center gap-8">
              <li className="px-4 py-8 flex justify-between">
                <button onClick={toggleTheme}>
                  {theme === "dark" ? (
                    <LightModeOutlinedIcon className="cursor-pointer hover:scale-105 transition-all duration-200" />
                  ) : (
                    <DarkModeOutlinedIcon className="cursor-pointer hover:scale-105 transition-all duration-200 " />
                  )}
                </button>
                <button onClick={() => setMenuOpen(!menuOpen)}>
                  <CloseOutlinedIcon className="cursor-pointer hover:scale-108" />
                </button>
              </li>
              <li className="px-4 py-8">
                <Link to="/">Home</Link>
              </li>
              <li className="px-4 py-8">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              {token ? (
                <button className="bg-cyan-600 hover:scale-103 p-2 text-white dark:text-black">
                  Log Out
                </button>
              ) : (
                <li className="px-4 py-8 bg-slate-300 dark:bg-cyan-950">
                  <Link to="/getstarted">Get Started</Link>
                </li>
              )}
            </ul>
          </div>
        </>
      ) : undefined}

      {/* big screen nav */}
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

        <li className="px-4 cursor-pointer bg-cyan-400 rounded-full  hover:scale-105 transition-all duration-300 p-2">
          <Link to="/auth/login">Get Started</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
