"use client";

import { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { FaGithub } from 'react-icons/fa';
import BigText from './BigText';
import Footer from './Footer';
import ColorPicker from './ColorPicker';
import { useAuth, signInWithGoogle, signInWithGithub, handleSignOut } from './firebase';
import { generateScriptContent, uploadScript, appendScriptToHead } from './scriptUtils';

const Home = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [color, setColor] = useState("#4b0082");
  const [hoverColor, setHoverColor] = useState("rgba(255, 255, 255, 0.3)");
  const [shape, setShape] = useState("circle");
  const [label, setLabel] = useState("(■_■)");
  const [bgImageUrl, setBgImageUrl] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const [scriptUrl, setScriptUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [allFilled, setAllFilled] = useState(false);
  const user = useAuth();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    setAllFilled(bgImageUrl && iframeUrl);
  }, [bgImageUrl, iframeUrl]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleGenerateAndUpload = async () => {
    try {
      const scriptContent = generateScriptContent({
        bgImageUrl,
        tooltipText: label,
        iframeUrl
      });

      const uploadedScriptUrl = await uploadScript(scriptContent);
      setScriptUrl(uploadedScriptUrl);

  
      appendScriptToHead(uploadedScriptUrl);
    } catch (error) {
      console.error('Error generating and uploading script:', error.message);
    }
  };

 const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  });
};


  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
    <script src="https://firebasestorage.googleapis.com/v0/b/jessejessexyz.appspot.com/o/scripts%2F1726591738316-fiqt4swysb.js?alt=media&token=849eea68-7eea-4498-a2e3-ab52440338e6"></script>"></script>      <header className="relative p-6 bg-opacity-30 w-full max-w-screen-2xl mx-auto flex items-center justify-between">
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
            href="https://github.com/sudo-self/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
          >
            <FaGithub className="w-6 h-6" />
          </a>
        </div>
      </header>

      <main className="flex-grow">
        <BigText slides={['npx', 'floater-xyz']} />
        
        {!user ? (
          <div className="flex flex-row space-x-4 items-center justify-center p-4">
            <button className="px-4 py-2 bg-blue-700 text-white rounded" onClick={signInWithGoogle}>
              Sign in with Google
            </button>
            <button className="px-4 py-2 bg-gray-800 text-white rounded" onClick={signInWithGithub}>
              Sign in with GitHub
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center p-4">
            <button className="px-4 py-2 bg-red-600 text-white rounded mb-2" onClick={handleSignOut}>
              Sign Out
            </button>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter image URL:"
                value={bgImageUrl}
                onChange={(e) => setBgImageUrl(e.target.value)}
                className="p-2 border-b border-gray-300 bg-transparent text-black dark:border-gray-700 dark:text-white focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter website URL:"
                value={iframeUrl}
                onChange={(e) => setIframeUrl(e.target.value)}
                className="p-2 border-b border-gray-300 bg-transparent text-black dark:border-gray-700 dark:text-white focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter button name:"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="p-2 border-b border-gray-300 bg-transparent text-black dark:border-gray-700 dark:text-white focus:outline-none"
              />
            </div>
            <button
              onClick={handleGenerateAndUpload}
              disabled={!allFilled}
              className={`px-4 py-2 ${allFilled ? 'bg-green-900' : 'bg-gray-400'} text-white rounded`}
            >
              Create Custom Floater
            </button>
            {scriptUrl && (
              <div className="mt-4 flex flex-col items-center">
                <img
                  onClick={() => {
                    copyToClipboard(`<script src="${scriptUrl}"></script>`);
                  }}
                  src="https://api.iconify.design/ic:outline-copy-all.svg?color=%23929292"
                  alt="Copy icon"
                  className="w-8 h-8 mb-1 cursor-pointer"
                />
                <span>{copied ? 'Copied!' : 'Copy script tag'}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShape(shape === "circle" ? "square" : "circle")}
            className={`p-2 transition-colors duration-300 text-white border border-gray-950 focus:outline-none
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
            title={`Switch to ${shape === "circle" ? "square" : "circle"}`}
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
