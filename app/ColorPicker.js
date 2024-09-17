import React from 'react';

const ColorPicker = ({ setColor, setHoverColor, activeColorInput }) => {
  const colors = [
    { name: "Coral", hex: "#ff7f50" },
    { name: "Moss Green", hex: "#8a9a5b" },
    { name: "Maroon", hex: "#800000" },
    { name: "Midnight Blue", hex: "#191970" },
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
  ];

  const handleColorClick = (color) => {
    if (activeColorInput === "color") {
      setColor(color);
    } else if (activeColorInput === "hoverColor") {
      setHoverColor(color);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Select Color</h3>
      <div className="flex flex-wrap gap-2">
        {colors.map(({ name, hex }) => (
          <div
            key={hex}
            title={name}
            style={{ backgroundColor: hex }}
            className="w-8 h-8 rounded cursor-pointer border border-gray-300"
            onClick={() => handleColorClick(hex)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;

