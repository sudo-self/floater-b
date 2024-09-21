"use client";

import Script from 'next/script';

export default function ClientScriptComponent() {
  return (
    <>
      {/* source code */}
      <Script
        src="https://pub-62f7f17b63fe4f5cbbf739cf66c0c5ee.r2.dev/floater.js"
        strategy="lazyOnload"
      />
      
      {/* NFT */}
      <Script
        src="https://pub-62f7f17b63fe4f5cbbf739cf66c0c5ee.r2.dev/floaterLEFT.js"
        strategy="lazyOnload"
      />
    </>
  );
}



  

