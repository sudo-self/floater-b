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


var button = document.createElement('div');
button.className = '${uniqueId}-floating-button';
button.addEventListener('click', openPopup); 
button.addEventListener('touchend', function(e) {
  e.preventDefault();
  openPopup();
});

document.body.appendChild(button);

  var popup = document.createElement('div');
  popup.id = uniqueId + '-popup';
  popup.className = uniqueId + '-popup';
  popup.innerHTML = \`
    <button class="${uniqueId}-close-button">×</button>
    <iframe src="${iframeUrl}" title="Floater Content"></iframe>
  \`;
  document.body.appendChild(popup);

  popup.querySelector(\`.${uniqueId}-close-button\`).addEventListener('click', function() {
    closePopup(uniqueId);
  });


  var tooltip = document.createElement('div');
  tooltip.className = '${uniqueId}-tooltip';
  tooltip.innerText = '${tooltipText}';
  button.appendChild(tooltip);

  function openPopup() {
    var popup = document.getElementById(uniqueId + '-popup');
    if (popup) {
      popup.style.display = 'block';
    }
  }

  function closePopup(uniqueId) {
    var popup = document.getElementById(uniqueId + '-popup');
    if (popup) {
      popup.style.display = 'none';
    }
  }


  button.addEventListener('mouseover', () => {
    tooltip.classList.add('visible');
  });
  button.addEventListener('mouseout', () => {
    tooltip.classList.remove('visible');
  });


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
      const newLeft = e.clientX - offsetX;
      const newTop = e.clientY - offsetY;
      button.style.left = newLeft + 'px';
      button.style.top = newTop + 'px';
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
      const newLeft = touch.clientX - offsetX;
      const newTop = touch.clientY - offsetY;
      button.style.left = newLeft + 'px';
      button.style.top = newTop + 'px';
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
})();

`;
};

export const uploadScript = async (scriptContent) => {
  try {
    const filename = generateUniqueFilename();
    const scriptRef = ref(storage, `scripts/${filename}`);

    await uploadString(scriptRef, scriptContent);

    const downloadUrl = await getDownloadURL(scriptRef);

    return downloadUrl;
  } catch (error) {
    console.error('Error uploading script:', error.message);
    throw error;
  }
};

export const appendScriptToHead = (scriptUrl) => {
  const script = document.createElement('script');
  script.src = scriptUrl;
  script.async = true;
  document.head.appendChild(script);
};

