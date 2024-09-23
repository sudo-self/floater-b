
class JesseRoperFloaterButton {
    constructor(options = {}) {
        this.buttonId = options.buttonId || 'JesseRoper-btn-floating-button';
        this.popupId = options.popupId || 'JesseRoper-btn-popup';
        this.tooltipText = options.tooltipText || 'Jesse Roper';
        this.iframeSrc = options.iframeSrc || 'https://JesseJesse.xyz';
        this.imageURL = options.imageURL || 'https://pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev/dev.jpeg';
        this.labelTextColor = options.labelTextColor || '#000000';
        this.buttonClass = 'JesseRoper-btn-floating-button';
        this.popupClass = 'JesseRoper-btn-popup';
        this.closeButtonClass = 'JesseRoper-btn-close-button';
        this.tooltipClass = 'JesseRoper-btn-tooltip';
        this.createStyles();
        this.createButton();
        this.createPopup();
        this.createTooltip();
        this.attachEventListeners();
    }

    createStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            .${this.buttonClass} {
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
                background-image: url('${this.imageURL}');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
            .${this.buttonClass}:hover {
                background-color: rgba(75, 0, 130, 0.8);
            }
            .${this.popupClass} {
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
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .${this.popupClass} iframe {
                width: 100%;
                height: 400px;
                border: none;
            }
            .${this.closeButtonClass} {
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
            .${this.tooltipClass} {
                position: absolute;
                bottom: 70px;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(0, 0, 0, 0.7);
                color: #f8f8f2;
                border-radius: 5px;
                padding: 5px 10px;
                font-size: 12px;
                white-space: nowrap;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
                z-index: 1002;
            }
            .${this.tooltipClass}.visible {
                opacity: 1;
            }
            .${this.buttonClass}.long-press {
                animation: rumble 0.3s ease forwards;
            }
            @keyframes rumble {
                0%, 100% { transform: translate(0); }
                25% { transform: translate(-2px, 2px); }
                50% { transform: translate(2px, -2px); }
                75% { transform: translate(-2px, -2px); }
            }
        `;
        document.head.appendChild(style);
    }

    createButton() {
        this.button = document.createElement('div');
        this.button.id = this.buttonId;
        this.button.className = this.buttonClass;
        document.body.appendChild(this.button);
    }

    createPopup() {
        this.popup = document.createElement('div');
        this.popup.id = this.popupId;
        this.popup.className = this.popupClass;
        this.popup.innerHTML = `
            <button class="${this.closeButtonClass}">×</button>
            <iframe src="${this.iframeSrc}" title="Floater Content"></iframe>
        `;
        document.body.appendChild(this.popup);
    }

    createTooltip() {
        this.tooltip = document.createElement('div');
        this.tooltip.className = this.tooltipClass;
        this.tooltip.innerText = this.tooltipText;
        this.button.appendChild(this.tooltip);
    }

    attachEventListeners() {
        let longPressTimeout;

        this.button.addEventListener('mousedown', () => this.startLongPress());
        this.button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startLongPress();
        });

        this.button.addEventListener('mouseup', () => this.endLongPress());
        this.button.addEventListener('mouseleave', () => this.endLongPress());
        this.button.addEventListener('touchend', () => this.endLongPress());

        this.button.addEventListener('click', () => this.openPopup());
        document.querySelector(`#${this.popupId} .${this.closeButtonClass}`).addEventListener('click', () => this.closePopup());

        this.button.addEventListener('mouseover', () => this.tooltip.classList.add('visible'));
        this.button.addEventListener('mouseout', () => this.tooltip.classList.remove('visible'));
        this.button.addEventListener('touchstart', () => this.tooltip.classList.add('visible'));
        this.button.addEventListener('touchend', () => this.tooltip.classList.remove('visible'));

        this.button.addEventListener('mousedown', (e) => this.startDrag(e));
        this.button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startDrag(e);
        });
    }

    startLongPress() {
        longPressTimeout = setTimeout(() => {
            this.button.classList.add('long-press');
            if (navigator.vibrate) {
                navigator.vibrate(200);
            }
            this.openPopup();
        }, 500);
    }

    endLongPress() {
        clearTimeout(longPressTimeout);
        this.button.classList.remove('long-press');
    }

    openPopup() {
        this.popup.style.display = 'block';
        this.popup.style.opacity = '1';
    }

    closePopup() {
        this.popup.style.opacity = '0';
        setTimeout(() => {
            this.popup.style.display = 'none';
        }, 300);
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
            this.button.style.left = `${newLeft}px`;
            this.button.style.top = `${newTop}px`;
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
            this.button.style.left = `${newLeft}px`;
            this.button.style.top = `${newTop}px`;
        }
    }

    onTouchEnd() {
        this.isDragging = false;
        document.removeEventListener('touchmove', (e) => this.onTouchMove(e));
        document.removeEventListener('touchend', () => this.onTouchEnd());
    }
}

export async function POST(req) {
    const { tooltipText, iframeSrc, imageURL, labelTextColor } = await req.json();
    const floaterButton = new JesseRoperFloaterButton({
        tooltipText,
        iframeSrc,
        imageURL,
        labelTextColor,
    });
  
    return new Response('Floater.js created by Jesse Roper', {
        status: 201,
    });
}

export async function GET(req) {
  return new Response(JSON.stringify({
    schemaVersion: 1,
    label: 'API',
    message: '200/ok',
    color: 'blue',
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

