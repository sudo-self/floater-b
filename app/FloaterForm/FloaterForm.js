"use client";

import React, { useState } from 'react';

const FloaterForm = () => {
    const [tooltipText, setTooltipText] = useState('');
    const [iframeSrc, setIframeSrc] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [labelTextColor, setLabelTextColor] = useState('#FFFFFF');
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
           const result = await res.text(); 
        setData(result);
    } catch (error) {
        console.error('Error:', error);
    }
};

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Floater API Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="tooltipText" className="block text-sm font-medium mb-1">Name:</label>
                    <input
                        type="text"
                        id="tooltipText"
                        value={tooltipText}
                        onChange={(e) => setTooltipText(e.target.value)}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="iframeSrc" className="block text-sm font-medium mb-1">Website:</label>
                    <input
                        type="text"
                        id="iframeSrc"
                        value={iframeSrc}
                        onChange={(e) => setIframeSrc(e.target.value)}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="imageURL" className="block text-sm font-medium mb-1">Image:</label>
                    <input
                        type="text"
                        id="imageURL"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="labelTextColor" className="block text-sm font-medium mb-1">Text Color:</label>
                    <input
                        type="color"
                        id="labelTextColor"
                        value={labelTextColor}
                        onChange={(e) => setLabelTextColor(e.target.value)}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Send API Request
                </button>
            </form>
            {data && (
                <pre className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-md">{JSON.stringify(data, null, 2)}</pre>
            )}
        </div>
    );
};

export default FloaterForm;
