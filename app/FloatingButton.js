import { useEffect } from 'react';

const FloatingButton = () => {
  useEffect(() => {
    (function() {
      const style = document.createElement('style');
      style.innerHTML = `
        .floating-button {
          position: fixed;
          bottom: 20px;
          left: 20px; /* Changed from right to left */
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
          background-image: url('https://firebasestorage.googleapis.com/v0/b/jessejessexyz.appspot.com/o/floaterb_BG.png?alt=media&token=f4ca3fe9-a5dd-4012-acf8-2367bd58bb7c'); /* Ensure the path is correct */
          background-size: cover;
          background-position: center;
        }
        .floating-button::before {
          content: ''; /* Test content */
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #ffffff;
          font-size: 24px;
          line-height: 1;
          text-align: center;
        }
        .floating-button:hover {
          background-color: rgba(75, 0, 130, 0.8); /* Optional: Add hover effect */
        }
        .popup {
          display: none;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70%;
          max-width: 500px;
          background: url('./floaterb_BD.png'); /* Ensure the path is correct */
          color: #e5e7eb;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          z-index: 1001;
        }
        .popup iframe {
          width: 100%;
          height: 350px;
          border: none;
        }
        .popup .close-button {
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
        }
      `;
      document.head.appendChild(style);

      const button = document.createElement('button');
      button.className = 'floating-button';

      button.addEventListener('click', openPopup);
      button.addEventListener('touchend', function(e) {
        e.preventDefault(); // Prevent the default touch behavior
        openPopup();
      });

      const popup = document.createElement('div');
      popup.id = 'popup';
      popup.className = 'popup';
      popup.innerHTML = `
        <button class="close-button" onclick="closePopup()">×</button>
        <iframe src="https://floater-xyz.vercel.app" title="Floater Content"></iframe>
      `;

      document.body.appendChild(button);
      document.body.appendChild(popup);

      let isDragging = false;
      let offsetX, offsetY;

      function startDrag(e) {
        isDragging = true;
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        offsetX = clientX - button.getBoundingClientRect().left;
        offsetY = clientY - button.getBoundingClientRect().top;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);
      }

      function onMouseMove(e) {
        if (isDragging) {
          button.style.left = `${e.clientX - offsetX}px`;
          button.style.top = `${e.clientY - offsetY}px`;
        }
      }

      function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      function onTouchMove(e) {
        if (isDragging) {
          const touch = e.touches[0];
          button.style.left = `${touch.clientX - offsetX}px`;
          button.style.top = `${touch.clientY - offsetY}px`;
        }
      }

      function onTouchEnd() {
        isDragging = false;
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
      }

      button.addEventListener('mousedown', startDrag);
      button.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent default behavior
        startDrag(e);
      });

      function openPopup() {
        document.getElementById('popup').style.display = 'block';
      }

      window.closePopup = function() {
        document.getElementById('popup').style.display = 'none';
      };
    })();
  }, []);

  return null; // This component doesn't need to render anything itself
};

export default FloatingButton;

