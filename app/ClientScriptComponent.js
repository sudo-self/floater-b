"use client";

import Script from 'next/script';

export default function ClientScriptComponent() {
  return (
    <>
      {/* Project Lead */}
      <Script
        src="https://pub-62f7f17b63fe4f5cbbf739cf66c0c5ee.r2.dev/tl.js"
        strategy="lazyOnload"
      />
      
      {/* meow */}
      <Script
        src="https://pub-62f7f17b63fe4f5cbbf739cf66c0c5ee.r2.dev/meow.js"
        strategy="lazyOnload"
      />
      
      {/* Sudo Self */}
      <Script
        src="https://pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev/sudo-self-vp.js"
        strategy="lazyOnload"
      />
      
      {/* Graphics Engineer */}
      <Script
        src="https://pub-62f7f17b63fe4f5cbbf739cf66c0c5ee.r2.dev/graphics.js"
        strategy="lazyOnload"
      />
    </>
  );
}

