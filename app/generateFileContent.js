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
