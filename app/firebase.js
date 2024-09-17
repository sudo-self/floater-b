// firebase.js
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBlF6vV8QM3pgKzXHR7bxi_dHphZ-7gNr4",
  authDomain: "jessejessexyz.firebaseapp.com",
  databaseURL: "https://jessejessexyz-default-rtdb.firebaseio.com",
  projectId: "jessejessexyz",
  storageBucket: "jessejessexyz.appspot.com",
  messagingSenderId: "669687494879",
  appId: "1:669687494879:web:5a07750ab8367a71fad16a",
  measurementId: "G-4XWDBHPV61"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const db = getDatabase(app);
const storage = getStorage(app);

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithGithub = () => signInWithPopup(auth, githubProvider);
export const handleSignOut = () => firebaseSignOut(auth);

export const generateScriptContent = ({ bgImageUrl, tooltipText, iframeUrl }) => {
  return `
    <script>
      (function() {
        var script = document.createElement('script');
        script.src = 'https://your-firebase-storage-url/${encodeURIComponent(bgImageUrl)}';
        script.onload = function() {
          // Additional script logic here
        };
        document.body.appendChild(script);
      })();
    </script>
  `;
};

export const uploadScript = async (scriptContent) => {
  const scriptRef = ref(storage, 'scripts/custom-script.js');
  await uploadString(scriptRef, scriptContent);
  const downloadURL = await getDownloadURL(scriptRef);
  return downloadURL;
};

