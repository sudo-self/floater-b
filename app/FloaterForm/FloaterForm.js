"use client";

"use client";

import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Icon } from '@iconify/react'; 

const FloaterForm = () => {
    const [tooltipText, setTooltipText] = useState('');
    const [iframeSrc, setIframeSrc] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [labelTextColor, setLabelTextColor] = useState('#FFFFFF');
    const [data, setData] = useState('');

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
            setData(result.trim()); 
        } catch (error) {
            console.error('Error:', error);
            setData('Error occurred. Please check the console for details.');
        }
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Floater B. API Demo</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="tooltipText" className="block text-sm font-medium mb-1">Name:</label>
                    <input
                        type="text"
                        id="tooltipText"
                        value={tooltipText}
                        onChange={(e) => setTooltipText(e.target.value)}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                    />
                </div>
                <div>
                    <label htmlFor="iframeSrc" className="block text-sm font-medium mb-1">Website:</label>
                    <input
                        type="text"
                        id="iframeSrc"
                        value={iframeSrc}
                        onChange={(e) => setIframeSrc(e.target.value)}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                    />
                </div>
                <div>
                    <label htmlFor="imageURL" className="block text-sm font-medium mb-1">Image:</label>
                    <input
                        type="text"
                        id="imageURL"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
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
                    className="w-full py-2 bg-green-800 hover:bg-green-900 text-white font-bold rounded-md"
                >
                    Send Floater B. API Request
                </button>
            </form>
            {data && (
                <div className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-md relative">
                    <pre className="whitespace-pre-wrap overflow-auto max-h-60">{data}</pre>
                    <CopyToClipboard text={data}>
                        <button className="absolute top-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                            <Icon icon="mdi:content-copy" width={24} height={24} />
                        </button>
                    </CopyToClipboard>
                </div>
            )}
        </div>
    );
};

export default FloaterForm;
