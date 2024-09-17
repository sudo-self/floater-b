"use client";

import { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadString } from 'firebase/storage';
import { generateFileContent } from './generateFileContent';

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
const auth = getAuth(app);
const storage = getStorage(app);

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return user;
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
  }
};

export const signInWithGithub = async () => {
  const provider = new GithubAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("GitHub Sign-In Error:", error.message);
  }
};

export const handleSignOut = async () => {
  try {
    await signOut(auth);
    console.log("Sign-Out Successful");
  } catch (error) {
    console.error("Sign-Out Error:", error.message);
  }
};

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(
    () => console.log("Copied to clipboard"),
    (err) => console.error("Failed to copy:", err)
  );
};

export const handleGenerateAndUpload = async (options) => {
  try {
    // Generate the file content
    const content = generateFileContent(options);

    // Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, 'generated-content/unique-floating-button.js');

    // Upload the content to Firebase Storage
    await uploadString(storageRef, content, 'raw');

    console.log('Upload Successful');
  } catch (error) {
    console.error('Error generating and uploading:', error.message);
  }
};

const Dashboard = ({ options }) => {
  const user = useAuth();

  const handleGenerate = () => {
    if (options) {
      handleGenerateAndUpload(options);
    } else {
      console.error('No options provided for generation.');
    }
  };

  return (
    <div>
      <h1>Floater Factory</h1>
      {user ? (
        <div>
          <p>Welcome, {user.displayName || 'User'}!</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
          <button onClick={signInWithGithub}>Sign in with GitHub</button>
        </div>
      )}
      <button onClick={handleGenerate}>Generate and Upload</button>
    </div>
  );
};

export default Dashboard;
