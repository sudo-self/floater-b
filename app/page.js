"use client";

import { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import BigText from './BigText';
import Footer from './Footer';
import ColorPicker from './ColorPicker';
import { useAuth, signInWithGoogle, signInWithGithub, handleSignOut } from './firebase';
import { generateFileContent, uploadScript } from './scriptUtils';
import ClientScriptComponent from './ClientScriptComponent';


const Home = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [color, setColor] = useState("#4b0082");
  const [hoverColor, setHoverColor] = useState("rgba(255, 255, 255, 0.3)");
  const [shape, setShape] = useState("circle");
  const [label, setLabel] = useState("(■_■)");
  const [bgImageUrl, setBgImageUrl] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const [tooltipText, setTooltipText] = useState("");
  const [scriptUrl, setScriptUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [allFilled, setAllFilled] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useAuth();

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    setAllFilled(bgImageUrl && iframeUrl && tooltipText);
  }, [bgImageUrl, iframeUrl, tooltipText]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleGenerateAndUpload = async () => {
    setLoading(true);
    setError('');

    const scriptContent = generateFileContent({
      color,
      hoverColor,
      shape,
      label,
      bgImageUrl,
      iframeUrl,
      tooltipText,
    });

    try {
      const uploadedScriptUrl = await uploadScript(scriptContent);
      setScriptUrl(uploadedScriptUrl);
    } catch (error) {
      console.error('Error uploading script:', error);
      setError('Failed to upload the script. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text:', err);
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ClientScriptComponent />
      <header className="relative p-6 bg-opacity-30 w-full max-w-screen-2xl mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200 flex-grow">
          Floater B.
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded hover:bg-gray-700 transition-colors duration-300"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <SunIcon className="w-6 h-6 text-gray-400" />
            ) : (
              <MoonIcon className="w-6 h-6 text-gray-400" />
            )}
          </button>
          <a
            href="https://github.com/sudo-self/floater-b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
            aria-label="GitHub repository"
          >
            <FaGithub className="w-6 h-6" />
          </a>
        </div>
      </header>

      <main className="flex-grow">
        <BigText slides={['API', 'Floater', 'Buttons']} />

        {!user ? (
          <div className="flex flex-row space-x-4 items-center justify-center p-4">
            <button className="px-4 py-2 bg-blue-700 text-white rounded" onClick={signInWithGoogle}>
              Google Sign in
            </button>
            <button className="px-4 py-2 bg-gray-800 text-white rounded" onClick={signInWithGithub}>
              GitHub Sign in
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center p-4">
            <button className="px-4 py-2 bg-rose-800 text-white rounded mb-2" onClick={handleSignOut}>
              Sign Out
            </button>
            <div className="mb-4">
              <input
                type="text"
                placeholder="image:"
                value={bgImageUrl}
                onChange={(e) => setBgImageUrl(e.target.value)}
                className="p-2 border-b border-gray-300 bg-transparent text-black dark:border-gray-700 dark:text-white focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="website:"
                value={iframeUrl}
                onChange={(e) => setIframeUrl(e.target.value)}
                className="p-2 border-b border-gray-300 bg-transparent text-black dark:border-gray-700 dark:text-white focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="name:"
                value={tooltipText}
                onChange={(e) => setTooltipText(e.target.value)}
                className="p-2 border-b border-gray-300 bg-transparent text-black dark:border-gray-700 dark:text-white focus:outline-none"
              />
            </div>
            <button
              className={`px-4 py-2 bg-blue-500 text-white rounded ${loading || !allFilled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              onClick={handleGenerateAndUpload}
              disabled={loading || !allFilled}
            >
              {loading ? 'Creating...' : 'Create Floater'}
            </button>
            {error && <div className="text-red-500">{error}</div>}
            {scriptUrl && (
              <div className="mt-4 flex flex-col items-center">
                <img
                  onClick={() => copyToClipboard(`<script src="${scriptUrl}"></script>`)}
                  src="https://api.iconify.design/ic:outline-copy-all.svg?color=%23929292"
                  alt="Copy icon"
                  className="w-8 h-8 mb-1 cursor-pointer"
                />
                <span>{copied ? 'copied!' : 'Copy?'}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShape(shape === 'circle' ? 'square' : 'circle')}
            className={`p-2 transition-colors duration-300 text-white border border-gray-950 focus:outline-none
            ${shape === 'circle' ? 'bg-green-500 rounded-full' : 'bg-gray-800 rounded-none'} relative`}
            style={{
              backgroundColor: color || '#4b0082',
              width: '70px',
              height: '70px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title={`form factor ${shape === 'circle' ? 'square' : 'circle'}`}
          >
            <span
              className="absolute inset-0"
              style={{
                backgroundColor: hoverColor || 'rgba(255, 255, 255, 0.3)',
                opacity: 0,
                transition: 'opacity 0.3s',
                zIndex: -1,
              }}
            />
            {label || (shape === 'circle' ? '(■_■)' : '[■_■]')}
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
       <div className="flex justify-center mt-8">
<a
  href="https://github.com/sudo-self/floater-b"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
  data-icon="octicon-star" 
  data-size="large" 
  aria-label="Star sudo-self/floater-b on GitHub"
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    class="w-6 h-6" 
    fill="currentColor" 
    viewBox="0 0 16 16" 
    aria-hidden="true">
    <path d="M8 0l2.48 5.04L16 5.76l-4 3.92.96 5.64L8 12.64 3.04 15.32l.96-5.64-4-3.92 5.52-.72L8 0z"></path>
  </svg>
</a>
       </div>
      <Footer />
    </div>
  );
};

export default Home;



