"use client";

import { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'; // Correct import
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBlF6vV8QM3pgKzXHR7bxi_dHphZ-7gNr4",
  authDomain: "jessejessexyz.firebaseapp.com",
  databaseURL: "https://jessejessexyz-default-rtdb.firebaseio.com",
  projectId: "jessejessexyz",
  storageBucket: "jessejessexyz.appspot.com",
  messagingSenderId: "669687494879",
  appId: "1:669687494879:web:5a07750ab8367a71fad16a",
  measurementId: "G-4XWDBHPV61",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const Dashboard = () => {
  const [iframeUrl, setIframeUrl] = useState("");
  const [bgImageUrl, setBgImageUrl] = useState("");
  const [scriptUrl, setScriptUrl] = useState("");
  const [allFilled, setAllFilled] = useState(false);
  const [user, setUser] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setAllFilled(iframeUrl !== "" && bgImageUrl !== "");
  }, [iframeUrl, bgImageUrl]);

  const signInWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  const signInWithGithub = async () => {
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("GitHub Sign-In Error:", error.message);
    }
  };

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("Sign-Out Successful");
    } catch (error) {
      console.error("Sign-Out Error:", error.message);
    }
  };

  const generateFileContent = (unique_id) => `
    (function() {
      var style = document.createElement('style');
      style.innerHTML = \`
        .floating-button-${unique_id} {
          position: fixed;
          bottom: 20px;
          right: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: background-color 0.3s ease;
          z-index: 1000;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          background-image: url('${bgImageUrl}');
          background-size: cover;
          background-position: center;
          border: none;
        }
        .floating-button-${unique_id}:hover {
          background-color: #3498db;
        }
        .popup-${unique_id} {
          display: none;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          max-width: 600px;
          background-color: #2d3748;
          color: #e5e7eb;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          z-index: 1001;
          border: none;
        }
        .popup-${unique_id} iframe {
          width: 100%;
          height: 400px;
          border: none;
        }
        .popup-${unique_id} .close-button-${unique_id} {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: #e74c3c;
          border: none;
          color: #ffffff;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      \`;
      document.head.appendChild(style);

      var button = document.createElement('button');
      button.className = 'floating-button-${unique_id}';
      button.addEventListener('click', openPopup);
      button.addEventListener('touchend', function(e) {
        e.preventDefault();
        openPopup();
      });

      var popup = document.createElement('div');
      popup.id = 'popup-${unique_id}';
      popup.className = 'popup-${unique_id}';
      popup.innerHTML = \`
        <button class="close-button-${unique_id}" onclick="closePopup()">×</button>
        <iframe src="${iframeUrl}" title="Floater Content"></iframe>
      \`;

      document.body.appendChild(button);
      document.body.appendChild(popup);

      let isDragging = false;
      let offsetX, offsetY;

      function startDrag(e) {
        isDragging = true;
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        offsetX = clientX - button.getBoundingClientRect().left;
        offsetY = clientY - button.getBoundingClientRect().top;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);
      }

      function onMouseMove(e) {
        if (isDragging) {
          button.style.left = \`\${e.clientX - offsetX}px\`;
          button.style.top = \`\${e.clientY - offsetY}px\`;
        }
      }

      function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      function onTouchMove(e) {
        if (isDragging) {
          const touch = e.touches[0];
          button.style.left = \`\${touch.clientX - offsetX}px\`;
          button.style.top = \`\${touch.clientY - offsetY}px\`;
        }
      }

      function onTouchEnd() {
        isDragging = false;
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
      }

      button.addEventListener('mousedown', startDrag);
      button.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDrag(e);
      });

      function openPopup() {
        document.getElementById('popup-${unique_id}').style.display = 'block';
      }

      window.closePopup = function() {
        document.getElementById('popup-${unique_id}').style.display = 'none';
      };
    })();
  `;

  const generateHTMLContent = (scriptUrl) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Floater Button</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      </style>
    </head>
    <body class="bg-gray-900 text-gray-100 flex flex-col min-h-screen">
      <div class="flex-grow flex items-center justify-center">
        <h1 class="text-white text-6xl font-bold">npx floater-xyz</h1>
      </div>
      <!-- floater.js -->
      <script src="${scriptUrl}"></script>
      <footer class="text-gray-300 text-center p-2 text-sm mt-auto">
        JesseJesse.xyz
      </footer>
    </body>
    </html>
  `;

  const uploadToFirebase = async (file, fileName) => {
    const fileRef = storageRef(storage, `floater-scripts/${fileName}`);
    try {
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      console.log(`File uploaded to Firebase Storage at ${downloadURL}`);
      return downloadURL;
    } catch (error) {
      console.error("Upload Error:", error.message);
    }
  };

const handleGenerateAndUpload = async () => {
  const unique_id = new Date().toISOString().replace(/[-:.T]/g, '');
  const fileContent = generateFileContent(unique_id);
  const htmlContent = generateHTMLContent(fileContent);

  const fileName = `floater-${unique_id}.js`;
  const htmlFileName = `floater-${unique_id}.html`;

  const fileBlob = new Blob([fileContent], { type: 'application/javascript' });
  const htmlBlob = new Blob([htmlContent], { type: 'text/html' });

  try {
    const jsUrl = await uploadToFirebase(fileBlob, fileName);
    const htmlUrl = await uploadToFirebase(htmlBlob, htmlFileName);
    setScriptUrl(jsUrl);
    setIframeUrl(htmlUrl);

    const script = document.createElement('script');
    script.src = jsUrl;
    document.body.appendChild(script);
  } catch (error) {
    console.error("Error generating and uploading files:", error.message);
  }
};

    const copyToClipboard = (url) => {
   
      const cleanUrl = url.replace(/<script.*?>.*?<\/script>/gi, '').trim();

     
      const scriptTag = `<script src="${scriptUrl}"></script>`;
      
      navigator.clipboard.writeText(scriptTag).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch((error) => {
        console.error("Copy Error:", error.message);
      });
    };

 return (
    <div className="flex flex-col items-center justify-center p-4">
      {!user ? (
<div className="flex flex-row space-x-4 items-center">
  <button className="px-4 py-2 bg-blue-700 text-white rounded" onClick={signInWithGoogle}>
    Sign in Google
  </button>
  <button className="px-4 py-2 bg-gray-800 text-white rounded" onClick={signInWithGithub}>
    Sign in GitHub
  </button>
</div>


      ) : (
        <div className="flex flex-col items-center">
          <button className="px-4 py-2 bg-red-600 text-white rounded mb-2" onClick={handleSignOut}>Sign Out</button>
<div className="mb-4">
  <input
    type="text"
    placeholder="image URL:"
    value={bgImageUrl}
    onChange={(e) => setBgImageUrl(e.target.value)}
    className="p-2 border-b border-gray-300 bg-transparent text-black dark:border-gray-700 dark:text-white focus:outline-none"
  />
</div>
<div className="mb-4">
  <input
    type="text"
    placeholder="Website URL:"
    value={iframeUrl}
    onChange={(e) => setIframeUrl(e.target.value)}
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
      onClick={() => copyToClipboard(`<script src="${scriptUrl}"></script>`)}
      src="https://api.iconify.design/ic:outline-copy-all.svg?color=%23929292"
      alt="Copy icon"
      className="w-8 h-8 mb-1"
      />
      <span>{copied ? 'copied!' : 'copy button code'}</span>
  </div>
)}

        </div>
      )}
    </div>
  );
};

export default Dashboard;
