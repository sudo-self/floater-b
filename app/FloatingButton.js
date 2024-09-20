"use client";

import { useState, useEffect, useRef } from 'react';

const FloatingButton = ({
  tooltipText = 'Rockies B.',
  iframeSrc = 'https://floater-xyz.vercel.app',
  imageURL = 'https://media2.giphy.com/media/LWYj2JxzlJteRcgWHX/200.webp',
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
      const randomX = Math.floor(Math.random() * (innerWidth - 60));
      const randomY = Math.floor(Math.random() * (innerHeight - 60));
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
      <div className={`tooltip immediate-tooltip ${!showDelayedTooltip ? 'visible' : ''}`}>
        Immediate Tooltip
      </div>
      {showDelayedTooltip && (
        <div className="tooltip delayed-tooltip">
          {tooltipText}
        </div>
      )}
      <style jsx>{`
        .floating-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: background-color 0.3s ease;
          z-index: 1000;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          background-image: url('${imageURL}');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        .floating-button:hover {
          background-color: rgba(75, 0, 130, 0.8);
        }
        
        .popup {
          display: ${isPopupVisible ? 'block' : 'none'};
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          max-width: 600px;
          background-color: #2d3748;
          color: #e5e7eb;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          z-index: 1001;
          position: relative;
        }
        
        .popup iframe {
          width: 100%;
          height: 400px;
          border: none;
        }
        
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: #e74c3c;
          border: none;
          color: #ffffff;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-size: 16px;
        }
        
        .tooltip {
          position: absolute;
          top: 50%;
          left: calc(100% + 10px);
          transform: translateY(-50%);
          background-color: rgba(51, 51, 51, 0.8);
          color: #f8f8f2;
          border-radius: 5px;
          padding: 5px 10px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 1001;
        }
        
        .tooltip.visible {
          opacity: 1;
        }
        
        .immediate-tooltip {
          bottom: calc(100% + 10px);
        }
        
        .delayed-tooltip {
          bottom: calc(100% + 50px);
          margin-bottom: 10px;
        }
      `}</style>
    </>
  );
};

export default FloatingButton;

