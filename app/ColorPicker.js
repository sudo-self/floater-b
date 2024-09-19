"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const ColorPicker = ({ setColor, setHoverColor, activeColorInput }) => {
  const colors = [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#ffffff" },
    { name: "Coral", hex: "#ff7f50" },
    { name: "Moss Green", hex: "#8a9a5b" },
    { name: "Maroon", hex: "#800000" },
    { name: "Sandy Brown", hex: "#f4a460" },
    { name: "Wheat", hex: "#f5deb3" },
    { name: "Chocolate", hex: "#d2691e" },
    { name: "Dark Violet", hex: "#9400d3" },
    { name: "Light Steel Blue", hex: "#b0c4de" },
    { name: "Deep Sky Blue", hex: "#00bfff" },
    { name: "Tan", hex: "#d2b48c" },
    { name: "Salmon", hex: "#fa8072" },
    { name: "Electric Blue", hex: "#7df9ff" },
    { name: "Hot Pink", hex: "#ff69b4" },
    { name: "Crimson", hex: "#dc143c" },
    { name: "Peach Puff", hex: "#ffdab9" },
    { name: "Neon Green", hex: "#39ff14" },
    { name: "Electric Purple", hex: "#bf00ff" },
    { name: "Neon Yellow", hex: "#ccff00" },
    { name: "Neon Pink", hex: "#ff10f0" },
    { name: "Dark Slate Gray", hex: "#2f4f4f" },
    { name: "Midnight Blue", hex: "#191970" },
    { name: "Slate Blue", hex: "#6A5ACD" },
    { name: "Lime Green", hex: "#32CD32" },
    { name: "Dodger Blue", hex: "#1E90FF" },
    { name: "Orchid", hex: "#DA70D6" },
    { name: "Firebrick", hex: "#B22222" },
    { name: "Slate Gray", hex: "#708090" },
    { name: "Burlywood", hex: "#DEB887" }
  ];

  const rows = [];
  for (let i = 0; i < colors.length; i += 10) {
    rows.push(colors.slice(i, i + 10));
  }

  const [linkColor, setLinkColor] = useState('#00ff00');
  const [hoverColor, setHoverStateColor] = useState('#00ff00');

  const handleColorClick = (color) => {
    if (activeColorInput === 'color') {
      setColor(color);
      setLinkColor(color);
    } else if (activeColorInput === 'hoverColor') {
      setHoverColor(color);
      setHoverStateColor(color);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold mb-2 text-center font-mono">
        <Link href="/FloaterForm">
          <span
            style={{ color: linkColor }}
            className="hover:underline"
            onMouseEnter={(e) => (e.target.style.color = hoverColor)}
            onMouseLeave={(e) => (e.target.style.color = linkColor)}
          >
          send Floater API request
          </span>
        </Link>
      </h3>
      <div className="flex flex-col items-center">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 mb-2">
            {row.map(({ name, hex }) => (
              <div
                key={hex}
                title={name}
                style={{ backgroundColor: hex }}
                className="w-10 h-10 rounded cursor-pointer border border-gray-300"
                onClick={() => handleColorClick(hex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;

