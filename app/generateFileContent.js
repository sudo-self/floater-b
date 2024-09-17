// /app/generateFileContent.js

export const generateFileContent = ({ bgImageUrl, tooltipText, iframeUrl }) => `
  (function() {
    var style = document.createElement('style');
    style.innerHTML = \`
      .unique-floating-button {
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
        background-image: url('${bgImageUrl}');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }
      .unique-floating-button:hover {
        background-color: rgba(75, 0, 130, 0.8);
      }
      .popup {
        display: none;
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
      }
      .popup iframe {
        width: 100%;
        height: 400px;
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
      .tooltip {
        position: absolute;
        background-color: #333;
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
    \`;
    document.head.appendChild(style);

    var button = document.createElement('button');
    button.className = 'unique-floating-button';
    button.innerText = '';
    button.addEventListener('click', openPopup);
    button.addEventListener('touchend', function(e) {
      e.preventDefault();
      openPopup();
    });

    var popup = document.createElement('div');
    popup.id = 'popup';
    popup.className = 'popup';
    popup.innerHTML = \`
      <button class="close-button" onclick="closePopup()">×</button>
      <iframe src="${iframeUrl}" title="Floater Content"></iframe>
    \`;

    document.body.appendChild(button);
    document.body.appendChild(popup);

    var tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerText = '${tooltipText}';
    button.appendChild(tooltip);

    function openPopup() {
      popup.style.display = 'block';
    }

    function closePopup() {
      popup.style.display = 'none';
    }

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
        const newLeft = e.clientX - offsetX;
        const newTop = e.clientY - offsetY;
        button.style.left = \`\${newLeft}px\`;
        button.style.top = \`\${newTop}px\`;
        updateTooltipPosition();
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
        const newLeft = touch.clientX - offsetX;
        const newTop = touch.clientY - offsetY;
        button.style.left = \`\${newLeft}px\`;
        button.style.top = \`\${newTop}px\`;
        updateTooltipPosition();
      }
    }

    function onTouchEnd() {
      isDragging = false;
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    }

    function updateTooltipPosition() {
      const buttonRect = button.getBoundingClientRect();
      tooltip.style.left = \`\${buttonRect.width + 10}px\`;
      tooltip.style.top = \`\${buttonRect.height / 2}px\`;
      tooltip.style.transform = \`translateY(-50%)\`;
    }

    button.addEventListener('mousedown', startDrag);
    button.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startDrag(e);
    });

    button.addEventListener('mouseover', () => {
      tooltip.classList.add('visible');
    });

    button.addEventListener('mouseout', () => {
      tooltip.classList.remove('visible');
    });

  })();
`;
