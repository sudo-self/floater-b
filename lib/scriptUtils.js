import { getStorage, ref, uploadString } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

// Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const generateUniqueFilename = () => {
  // Generate a unique filename using a timestamp and a random string
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 12);
  return `${timestamp}-${randomString}.js`;
};

export const generateScriptContent = ({ bgImageUrl, tooltipText, iframeUrl }) => `
  // Your custom script content here
  const button = document.createElement('div');
  button.style.backgroundColor = '${bgImageUrl}';
  button.style.backgroundImage = 'url(${bgImageUrl})';
  button.title = '${tooltipText}';
  document.body.appendChild(button);

  const iframe = document.createElement('iframe');
  iframe.src = '${iframeUrl}';
  document.body.appendChild(iframe);
`;

export const uploadScript = async (scriptContent) => {
  const filename = generateUniqueFilename();
  const scriptRef = ref(storage, `scripts/${filename}`);
  await uploadString(scriptRef, scriptContent);
  return `https://firebasestorage.googleapis.com/v0/b/${storage.app.options.storageBucket}/o/scripts%2F${encodeURIComponent(filename)}?alt=media`;
};

