
"use client";

import { useState, useEffect, useRef } from 'react';

const FloatingButton = ({
  tooltipText = 'Rockies B.',
  iframeSrc = 'https://nextjs.org',
  imageURL = 'https://server.jessejesse.workers.dev/mnt.gif',
  labelTextColor = '#000000',
  borderColor = '#000000',
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [showDelayedTooltip, setShowDelayedTooltip] = useState(true);
  const buttonRef = useRef(null);
  const tooltipTimeoutRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ left: 0, top: 0 });

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const startDrag = (e) => {
    setIsDragging(true);
    const { clientX, clientY } = e;
    const { left, top } = buttonRef.current.getBoundingClientRect();
    setOffset({
      x: clientX - left,
      y: clientY - top,
    });
    e.preventDefault();
  };

  const handleDrag = (e) => {
    if (isDragging) {
      const { clientX, clientY } = e;
      buttonRef.current.style.left = `${clientX - offset.x}px`;
      buttonRef.current.style.top = `${clientY - offset.y}px`;
      e.preventDefault();
    }
  };

  const stopDrag = () => {
    setIsDragging(false);
    const { left, top } = buttonRef.current.getBoundingClientRect();
    localStorage.setItem('buttonPosition', JSON.stringify({ left, top }));
  };

  const handleMouseEnter = () => {
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowDelayedTooltip(true);
    }, 3000);
  };

  const handleMouseLeave = () => {
    clearTimeout(tooltipTimeoutRef.current);
    setShowDelayedTooltip(false);
  };

  const handleDoubleClick = () => {
    togglePopup();
  };

  useEffect(() => {
    const storedPosition = localStorage.getItem('buttonPosition');
    if (storedPosition) {
      setPosition(JSON.parse(storedPosition));
    } else {
      const { innerWidth, innerHeight } = window;
      const randomX = Math.floor(Math.random() * (innerWidth - 60)); // Ensure within bounds
      const randomY = Math.floor(Math.random() * (innerHeight - 60)); // Ensure within bounds
      setPosition({ left: randomX, top: randomY });
    }
  }, []);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.style.left = `${position.left}px`;
      buttonRef.current.style.top = `${position.top}px`;
    }
  }, [position]);

  useEffect(() => {
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('touchend', stopDrag);

    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchmove', handleDrag);
      document.removeEventListener('touchend', stopDrag);
    };
  }, [isDragging]);

  return (
    <>
      <div
        className="floating-button"
        onDoubleClick={handleDoubleClick}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={buttonRef}
      >
        <img src={imageURL} alt="Button Icon" />
        {isPopupVisible && (
          <div className="popup">
            <button className="close-button" onClick={togglePopup}>×</button>
            <iframe src={iframeSrc} title="Popup Content"></iframe>
          </div>
        )}
      </div>
      <div className={`immediate-tooltip ${!showDelayedTooltip ? 'visible' : ''}`}>
        Immediate Tooltip
      </div>
      {showDelayedTooltip && (
        <div className="delayed-tooltip">
          {tooltipText}
        </div>
      )}
      <style jsx>{`
        .floating-button {
          position: fixed;
          width: 60px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          border: 6px solid ${borderColor}; /* Thicker border */
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          background: ${labelTextColor};
          z-index: 1000;
          transition: background-color 0.3s ease;
        }
        .floating-button img {
          width: 24px;
          height: 24px;
        }
        .immediate-tooltip {
          position: absolute;
          bottom: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          color: #fff;
          padding: 5px;
          border-radius: 5px;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 1001;
        }
        .immediate-tooltip.visible {
          opacity: 1;
        }
        .delayed-tooltip {
          position: absolute;
          bottom: calc(100% + 50px);
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          color: #fff;
          padding: 5px;
          border-radius: 5px;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 1001;
          margin-bottom: 10px;
        }
        .delayed-tooltip {
          opacity: 1;
        }
        .popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          color: black;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          width: 500px;
          height: 450px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 1001;
          border: 6px solid ${borderColor}; /* Thicker border */
        }
        .popup iframe {
          flex: 1;
          border: none;
          width: 100%;
          height: 100%;
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: #e74c3c;
          color: white;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-size: 16px;
          z-index: 1002;
        }
      `}</style>
    </>
  );
};

export default FloatingButton;
