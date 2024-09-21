"use client";

import Script from 'next/script';

export default function ClientScriptComponent() {
  return (
    <>
      {/* Project Lead */}
      <Script
        src="https://pub-62f7f17b63fe4f5cbbf739cf66c0c5ee.r2.dev/projectlead.js"
        strategy="lazyOnload"
      />
      
      {/* NFT */}
      <Script
        src="https://pub-62f7f17b63fe4f5cbbf739cf66c0c5ee.r2.dev/floaterLEFT.js"
        strategy="lazyOnload"
      />
      
      {/* Sudo Self */}
      <Script
        src="https://pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev/random.js"
        strategy="lazyOnload"
      />
    </>
  );
}
