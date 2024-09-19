// ./FloaterForm.js

import React, { useState } from 'react';

const FloaterForm = ({ onSubmit }) => {
    const [tooltipText, setTooltipText] = useState('');
    const [iframeSrc, setIframeSrc] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [labelTextColor, setLabelTextColor] = useState('#ffffff');
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
            <h1>Floater Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="tooltipText">Name:</label>
                    <input
                        type="text"
                        id="tooltipText"
                        value={tooltipText}
                        onChange={(e) => setTooltipText(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="iframeSrc">Website URL:</label>
                    <input
                        type="text"
                        id="iframeSrc"
                        value={iframeSrc}
                        onChange={(e) => setIframeSrc(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="imageURL">Image URL:</label>
                    <input
                        type="text"
                        id="imageURL"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="labelTextColor">Text Color:</label>
                    <input
                        type="color"
                        id="labelTextColor"
                        value={labelTextColor}
                        onChange={(e) => setLabelTextColor(e.target.value)}
                    />
                </div>
                <button type="submit">Send API Request</button>
            </form>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
};

export default FloaterForm;

