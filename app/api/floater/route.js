// app/api/floater/route.js

export async function POST(req) {
  const { tooltipText, iframeSrc, imageURL, labelTextColor } = await req.json();

  const floaterScript = `
    class FloaterButton {
        constructor(options = {}) {
            this.buttonId = options.buttonId || 'btn-qrtdogd-floating-button';
            this.popupId = options.popupId || 'btn-qrtdogd-popup';
            this.tooltipText = options.tooltipText || '${tooltipText || 'Floater B.'}';
            this.iframeSrc = options.iframeSrc || '${iframeSrc || 'https://floater.jessejesse.xyz'}';
            this.createStyles();
            this.createButton();
            this.createPopup();
            this.createTooltip();
            this.attachEventListeners();
        }

        createStyles() {
            const style = document.createElement('style');
            style.innerHTML = \`
                .btn-qrtdogd-floating-button {
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
                    background-image: url('${imageURL || 'https://media2.giphy.com/media/LWYj2JxzlJteRcgWHX/200.webp'}');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }
                .btn-qrtdogd-floating-button:hover {
                    background-color: rgba(75, 0, 130, 0.8);
                }
                .btn-qrtdogd-popup {
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
                    box-sizing: border-box;
                }
                .btn-qrtdogd-popup iframe {
                    width: 100%;
                    height: 400px;
                    border: none;
                    display: block;
                }
                .btn-qrtdogd-close-button {
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
                .btn-qrtdogd-tooltip {
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
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    margin-bottom: 10px;
                }
                .btn-qrtdogd-tooltip.visible {
                    opacity: 1;
                }
            \`;
            document.head.appendChild(style);
        }

        createButton() {
            this.button = document.createElement('div');
            this.button.id = this.buttonId;
            this.button.className = 'btn-qrtdogd-floating-button';
            document.body.appendChild(this.button);
        }

        createPopup() {
            this.popup = document.createElement('div');
            this.popup.id = this.popupId;
            this.popup.className = 'btn-qrtdogd-popup';
            this.popup.innerHTML = \`
                <button class="btn-qrtdogd-close-button">×</button>
                <iframe src="\${this.iframeSrc}" title="Floater Content"></iframe>
            \`;
            document.body.appendChild(this.popup);
        }

        createTooltip() {
            this.tooltip = document.createElement('div');
            this.tooltip.className = 'btn-qrtdogd-tooltip';
            this.tooltip.innerText = this.tooltipText;
            this.button.appendChild(this.tooltip);
        }

        attachEventListeners() {
            this.button.addEventListener('click', () => this.openPopup());
            this.button.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.openPopup();
            });

            document.querySelector(\`#\${this.popupId} .btn-qrtdogd-close-button\`).addEventListener('click', () => this.closePopup());

            this.button.addEventListener('mouseover', () => {
                this.tooltip.classList.add('visible');
            });
            this.button.addEventListener('mouseout', () => {
                this.tooltip.classList.remove('visible');
            });

            this.button.addEventListener('mousedown', (e) => this.startDrag(e));
            this.button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.startDrag(e);
            });
        }

        openPopup() {
            if (this.popup) {
                this.popup.style.display = 'block';
            }
        }

        closePopup() {
            if (this.popup) {
                this.popup.style.display = 'none';
            }
        }

        startDrag(e) {
            this.isDragging = true;
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            this.offsetX = clientX - this.button.getBoundingClientRect().left;
            this.offsetY = clientY - this.button.getBoundingClientRect().top;
            document.addEventListener('mousemove', (e) => this.onMouseMove(e));
            document.addEventListener('mouseup', () => this.onMouseUp());
            document.addEventListener('touchmove', (e) => this.onTouchMove(e));
            document.addEventListener('touchend', () => this.onTouchEnd());
        }

        onMouseMove(e) {
            if (this.isDragging) {
                const newLeft = e.clientX - this.offsetX;
                const newTop = e.clientY - this.offsetY;
                this.button.style.left = \`\${newLeft}px\`;
                this.button.style.top = \`\${newTop}px\`;
            }
        }

        onMouseUp() {
            this.isDragging = false;
            document.removeEventListener('mousemove', (e) => this.onMouseMove(e));
            document.removeEventListener('mouseup', () => this.onMouseUp());
        }

        onTouchMove(e) {
            if (this.isDragging) {
                const touch = e.touches[0];
                const newLeft = touch.clientX - this.offsetX;
                const newTop = touch.clientY - this.offsetY;
                this.button.style.left = \`\${newLeft}px\`;
                this.button.style.top = \`\${newTop}px\`;
            }
        }

        onTouchEnd() {
            this.isDragging = false;
            document.removeEventListener('touchmove', (e) => this.onTouchMove(e));
            document.removeEventListener('touchend', () => this.onTouchEnd());
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        new FloaterButton({
            tooltipText: '${tooltipText || 'Floater B.'}',
            iframeSrc: '${iframeSrc || 'https://floater.jessejesse.xyz'}',
        });
    });
  `;

  return new Response(floaterScript, {
    status: 200,
    headers: {
      'Content-Type': 'application/javascript',
    },
  });
}


/*
 
 curl -X POST https://floater.jessejesse.xyz/api/floater \
   -H "Content-Type: application/json" \
   -d '{
         "tooltipText": "Floater B.",
         "iframeSrc": "https://floater.jessejesse.xyz",
         "imageURL": "https://media2.giphy.com/media/LWYj2JxzlJteRcgWHX/200.webp",
         "labelTextColor": "#FFFFFF"
       }'

 */

