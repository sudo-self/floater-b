"use client";

import { useState, useEffect } from 'react';
import Dashboard from './Dashboard'; // Keep it here
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { FaGithub } from 'react-icons/fa';
import BigText from './BigText';
import Footer from './Footer.js';
import ColorPicker from './ColorPicker'; // Import ColorPicker

const Home = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [color, setColor] = useState("#4b0082");
  const [hoverColor, setHoverColor] = useState("rgba(255, 255, 255, 0.3)");
  const [shape, setShape] = useState("circle");
  const [label, setLabel] = useState("(■_■)");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const slides = ['Floater', 'Buttons'];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="relative p-6 bg-opacity-30 w-full max-w-screen-2xl mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200 flex-grow">
          Floater B.
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded hover:bg-gray-700 transition-colors duration-300"
          >
            {darkMode ? (
              <SunIcon className="w-6 h-6 text-gray-400" />
            ) : (
              <MoonIcon className="w-6 h-6 text-gray-400" />
            )}
          </button>
          <a
            href="https://github.com/sudo-self"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
          >
            <FaGithub className="w-6 h-6" />
          </a>
        </div>
      </header>

      <main className="flex-grow">
        <BigText slides={slides} />
        <Dashboard />

        {/* Centered Button Below Dashboard */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShape(shape === "circle" ? "square" : "circle")}
            className={`p-2 transition-colors duration-300 text-white border border-gray-700 focus:outline-none
            ${shape === "circle" ? "bg-green-500" : "bg-gray-800"}
            ${shape === "circle" ? "rounded-full" : "rounded-none"} relative`}
            style={{
              backgroundColor: color || "#4b0082",
              width: "70px",
              height: "70px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title={`Floater B. ${shape === "circle" ? "Square" : "Circle"}`}
          >
            <span
              className="absolute inset-0"
              style={{
                backgroundColor: hoverColor || "rgba(255, 255, 255, 0.3)",
                opacity: 0,
                transition: "opacity 0.3s",
                zIndex: -1,
              }}
            />
            {label || (shape === "circle" ? "(■_■)" : "[■_■]")}
          </button>
        </div>

        {/* Color Picker Below the Button */}
        <div className="flex justify-center mt-4">
          <ColorPicker
            setColor={setColor}
            setHoverColor={setHoverColor}
            activeColorInput="color"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

