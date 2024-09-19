"use client";

import React from 'react';

const ApiStatusBadge = () => {
  return (
    <div className="flex items-center">
      <a
        href="https://floater.jessejesse.xyz/api/floater"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
      >
        <img
          src="https://img.shields.io/endpoint?url=https://floater.jessejesse.xyz/api/floater"
          alt="Floater API Status"
          className="h-2"
        />
      </a>
    </div>
  );
};

export default ApiStatusBadge;


