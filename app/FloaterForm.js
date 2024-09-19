// ./FloaterForm.js

import React, { useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { FaGithub } from 'react-icons/fa';
import BigText from './BigText';
import Footer from './Footer';

import { useAuth, signInWithGoogle, signInWithGithub, handleSignOut } from './firebase';
import { generateScriptContent, uploadScript } from './scriptUtils';const FloaterForm = ({ onSubmit }) => {
    const [tooltipText, setTooltipText] = useState('Floater B.');
    const [iframeSrc, setIframeSrc] = useState('https://floater-xyz.vercel.app');
    const [imageURL, setImageURL] = useState('https://media2.giphy.com/media/aTjuxBktuWPerLyGBU/200w.webp');
    const [labelTextColor, setLabelTextColor] = useState('#000000');
    const [data, setData] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch('/api/floater', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tooltipText,
                    iframeSrc,
                    imageURL,
                    labelTextColor
                }),
            });
            const result = await res.json();
            setData(result);
            if (onSubmit) onSubmit(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="tooltipText">name:</label>
                    <input
                        type="text"
                        id="tooltipText"
                        value={tooltipText}
                        onChange={(e) => setTooltipText(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="iframeSrc">website:</label>
                    <input
                        type="text"
                        id="iframeSrc"
                        value={iframeSrc}
                        onChange={(e) => setIframeSrc(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="imageURL">image:</label>
                    <input
                        type="text"
                        id="imageURL"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="labelTextColor">text color:</label>
                    <input
                        type="color"
                        id="labelTextColor"
                        value={labelTextColor}
                        onChange={(e) => setLabelTextColor(e.target.value)}
                    />
                </div>
                <button type="submit">Send APi Request</button>
            </form>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
};

export default FloaterForm;
