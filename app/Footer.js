"use client";

import ApiStatusBadge from './ApiStatusBadge'; 

export default function Footer() {
  return (
    <div className="flex flex-col items-center mx-auto my-16 text-center">
      <p className="text-quaternary">
        &nbsp;&nbsp;&nbsp;&#10085;&nbsp;
        <a
          className="ml-1 text-secondary text-green-600 hover:text-primary group"
          href="https://jessejesse.xyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          JesseJesse.xyz
          <span className="ml-1 transition-opacity duration-200 ease-in-out opacity-0 group-hover:opacity-100">
            &nbsp;↗
          </span>
        </a>
      </p>
      <div className="mt-4">
        <ApiStatusBadge /> 
      </div>
    </div>
  );
}


