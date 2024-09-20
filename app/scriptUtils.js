"use client";

import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

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


const generateUniqueFilename = () => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 12);
  return `${timestamp}-${randomString}.js`;
};


export const generateScriptContent = ({ bgImageUrl, tooltipText, iframeUrl }) => {
  const uniqueId = `btn-${Math.random().toString(36).substring(2, 9)}`;
 return `
(function() {
  var style = document.createElement('style');
  style.innerHTML = \`
    .${uniqueId}-floating-button {
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
      background-repeat: no-repeat;
    }
    .${uniqueId}-floating-button:hover {
      background-color: rgba(75, 0, 130, 0.8);
    }
    .${uniqueId}-popup {
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
    }
    .${uniqueId}-popup iframe {
      width: 100%;
      height: 400px;
      border: none;
    }
    .${uniqueId}-close-button {
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
    .${uniqueId}-tooltip {
      position: absolute;
      bottom: 60px; 
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.7); 
      color: #f8f8f2;
      border-radius: 5px;
      padding: 5px 10px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      z-index: 1001;
    }
    .${uniqueId}-tooltip.visible {
      opacity: 1;
    }
  \`;
  document.head.appendChild(style);

  // Create the button
  var button = document.createElement('div');
  button.className = '${uniqueId}-floating-button';
  button.addEventListener('dblclick', openPopup);
  button.addEventListener('touchend', function(e) {
    e.preventDefault();
    if (e.detail === 2) { // Check for double-tap
      openPopup();
    }
  });
  document.body.appendChild(button);

   // Create the popup
  var popup = document.createElement('div');
  popup.id = uniqueId + '-popup';
  popup.className = uniqueId + '-popup';
  popup.innerHTML = \`
    <button class="${uniqueId}-close-button">&times;</button>
    <iframe src="${iframeUrl}" frameborder="0"></iframe>
  \`;
  document.body.appendChild(popup);

  // Create the close button for the popup
  var closeButton = popup.querySelector('.${uniqueId}-close-button');
  closeButton.addEventListener('click', closePopup);

  // Create the tooltip
  var tooltip = document.createElement('div');
  tooltip.className = '${uniqueId}-tooltip';
  tooltip.textContent = '${tooltipText}';
  document.body.appendChild(tooltip);

  button.addEventListener('mouseenter', function() {
    tooltip.style.left = button.getBoundingClientRect().left + button.offsetWidth / 2 + 'px';
    tooltip.style.bottom = window.innerHeight - button.getBoundingClientRect().bottom + 'px';
    tooltip.classList.add('visible');
  });

  button.addEventListener('mouseleave', function() {
    tooltip.classList.remove('visible');
  });

  function openPopup() {
    popup.style.display = 'block';
  }

  function closePopup() {
    popup.style.display = 'none';
  }
})();
