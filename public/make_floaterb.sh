#!/bin/bash

# Generate a unique identifier
unique_id=$(openssl rand -hex 4)

# Prompt for floater image
read -p "Enter the background image URL: " bg_image_url

# Prompt for floater URL
read -p "Enter the full https:// URL Link to the website or resource the button will open: " iframe_url

# Generate the JavaScript snippet with unique class names
cat <<EOF > ${unique_id}.js
(function() {
    var style = document.createElement('style');
    style.innerHTML = \`
    .floating-button-${unique_id} {
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
        background-image: url('${bg_image_url}');
        background-size: cover;
        background-position: center;
    }

    .floating-button-${unique_id}:hover {
        background-color: darken(#800000, 10%);
    }
    .popup-${unique_id} {
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
    .popup-${unique_id} iframe {
        width: 100%;
        height: 400px;
        border: none;
    }
    .popup-${unique_id} .close-button-${unique_id} {
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
    \`;
    document.head.appendChild(style);

    var button = document.createElement('button');
    button.className = 'floating-button-${unique_id}';

    // Add event listeners for opening the popup
    button.addEventListener('click', openPopup);
    button.addEventListener('touchend', function(e) {
        e.preventDefault(); // Prevent the default touch behavior
        openPopup();
    });

    var popup = document.createElement('div');
    popup.id = 'popup-${unique_id}';
    popup.className = 'popup-${unique_id}';
    popup.innerHTML = \`
      <button class="close-button-${unique_id}" onclick="closePopup()">×</button>
      <iframe src="${iframe_url}" title="Floater Content"></iframe>
    \`;

    document.body.appendChild(button);
    document.body.appendChild(popup);

    // Drag-and-drop functionality for both mouse and touch events
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
            button.style.left = \`\${e.clientX - offsetX}px\`;
            button.style.top = \`\${e.clientY - offsetY}px\`;
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
            button.style.left = \`\${touch.clientX - offsetX}px\`;
            button.style.top = \`\${touch.clientY - offsetY}px\`;
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
        document.getElementById('popup-${unique_id}').style.display = 'block';
    }

    window.closePopup = function() {
        document.getElementById('popup-${unique_id}').style.display = 'none';
    };
})();
EOF


h1_content="npx floater-xyz"


cat <<EOF > index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Floater Bash Button</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
    </style>
</head>
<body class="bg-gray-900 text-gray-100 flex flex-col min-h-screen">
    <div class="flex-grow flex items-center justify-center">
        <h1 class="text-white text-6xl font-bold">npx floater-xyz</h1>
    </div>
    <!-- Include the generated JavaScript file -->
    <script src="${unique_id}.js"></script>
    <footer class="text-gray-300 text-center p-2 text-sm mt-auto">
         JesseJesse.xyz
    </footer>
</body>
</html>
EOF


echo "floater button was generated!"
