"use client";

import React, { useState } from 'react';
import '../globals.css'; 
import Footer from '../Footer';  

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
                <h1 className="text-2xl font-bold mb-4">
                    <a href="/" className="text-green-600">
                        &nbsp;&nbsp;(⌐■_■)_🔘 ⇒ api ⇒ 🔘_(■_■)&nbsp;
                    </a>
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            id="tooltipText"
                            value={tooltipText}
                            onChange={(e) => setTooltipText(e.target.value)}
                            placeholder="name:"
                            className="w-full p-2 border border-gray-700 rounded-md bg-transparent placeholder-gray-500 focus:ring-green-600 focus:border-green-600"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="iframeSrc"
                            value={iframeSrc}
                            onChange={(e) => setIframeSrc(e.target.value)}
                            placeholder="website"
                            className="w-full p-2 border border-gray-700 rounded-md bg-transparent placeholder-gray-500 focus:ring-green-600 focus:border-green-600"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="imageURL"
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)}
                            placeholder="image:"
                            className="w-full p-2 border border-gray-700 rounded-md bg-transparent placeholder-gray-500 focus:ring-green-600 focus:border-green-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-green-800 hover:bg-green-900 text-white font-bold rounded-md"
                    >
                        Send Request
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
                            <span className="text-green-600">{copied ? 'copied!' : 'copy?'}</span>
                        </div>
                    </div>
                )}
            </div>
            <Footer /> 
        </div>
    );
};

export default FloaterForm;












