"use client";

import React, { useState } from 'react';
import '../globals.css'; 

const FloaterForm = () => {
    const [tooltipText, setTooltipText] = useState('');
    const [iframeSrc, setIframeSrc] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [labelTextColor, setLabelTextColor] = useState('#FFFFFF');
    const [data, setData] = useState('');
    const [copied, setCopied] = useState(false);

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

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => console.error('Failed to copy:', err));
    };

    return (
        <div className="bg-black min-h-screen p-6">
            <div className="bg-black text-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-4">&nbsp;&nbsp;&nbsp;&nbsp;(⌐■_■)_🔘 ⇒ ⭘ ⇒ 🔘_(■_■)&nbsp;</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            id="tooltipText"
                            value={tooltipText}
                            onChange={(e) => setTooltipText(e.target.value)}
                            placeholder="Name"
                            className="w-full p-2 border border-gray-700 rounded-md text-white bg-transparent placeholder-gray-200"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="iframeSrc"
                            value={iframeSrc}
                            onChange={(e) => setIframeSrc(e.target.value)}
                            placeholder="Website"
                            className="w-full p-2 border border-gray-700 rounded-md text-white bg-transparent placeholder-gray-200"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="imageURL"
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)}
                            placeholder="Image"
                            className="w-full p-2 border border-gray-700 rounded-md text-white bg-transparent placeholder-gray-200"
                        />
                    </div>
                    <div>
                        <input
                            type="color"
                            id="labelTextColor"
                            value={labelTextColor}
                            onChange={(e) => setLabelTextColor(e.target.value)}
                            className="w-full p-2 border border-gray-700 rounded-md bg-transparent"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-green-800 hover:bg-green-900 text-white font-bold rounded-md"
                    >
                        Send Floater API Request
                    </button>
                </form>
                {data && (
                    <div className="mt-4 p-4 bg-transparent border border-gray-700 rounded-md relative">
                        <pre className="whitespace-pre-wrap overflow-auto max-h-60 text-green-600">{data}</pre>
                        <div className="mt-2 flex flex-col items-center">
                            <img
                                onClick={() => copyToClipboard(data)}
                                src="https://api.iconify.design/ic:outline-copy-all.svg?color=%23929292"
                                alt="Copy icon"
                                className="w-8 h-8 mb-1 cursor-pointer"
                            />
                            <span className="text-green-600">{copied ? 'Floater copied!' : 'Copy button'}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FloaterForm;










