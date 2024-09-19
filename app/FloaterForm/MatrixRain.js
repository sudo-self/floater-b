"use client";

import React, { useEffect } from 'react';

export default function MatrixRain() {
  useEffect(() => {
    const matrixContainer = document.createElement('div');
    matrixContainer.classList.add('matrix-rain');
    document.querySelector('.matrix-rain-container').appendChild(matrixContainer);

    const matrixCharacters = 'JJ';
    const numColumns = Math.floor(window.innerWidth / 20);

   
    for (let i = 0; i < numColumns; i++) {
      const matrixColumn = document.createElement('div');
      matrixColumn.classList.add('matrix-column');
      matrixColumn.style.left = `${i * 20}px`;
      matrixColumn.style.animationDuration = `${Math.random() * 5 + 5}s`;

      for (let j = 0; j < 20; j++) {
        const matrixChar = document.createElement('span');
        matrixChar.textContent = matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)];
        matrixChar.style.animationDelay = `${Math.random() * 2}s`;
        matrixColumn.appendChild(matrixChar);
      }
      matrixContainer.appendChild(matrixColumn);
    }

  
    return () => {
      matrixContainer.remove();
    };
  }, []);

  return null;
}
