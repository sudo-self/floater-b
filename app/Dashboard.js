// Dashboard.js
"use client";

import { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
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

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return user;
};

export const signInWithGoogle = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
  }
};

export const signInWithGithub = async () => {
  const auth = getAuth();
  const provider = new GithubAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("GitHub Sign-In Error:", error.message);
  }
};

export const handleSignOut = async () => {
  const auth = getAuth();
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

export const handleGenerateAndUpload = () => {
  // Your implementation here
};

