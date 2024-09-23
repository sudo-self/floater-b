"use client";

import Script from 'next/script';

export default function ClientScriptComponent() {
  return (
    <>
      {/* Sr. Tech */}
      <Script
        src="https://firebasestorage.googleapis.com/v0/b/jessejessexyz.appspot.com/o/scripts%2F1727063232009-egh5o9ppsr.js?alt=media&token=58195bc5-17eb-40c3-a296-9b92d03d15aa"
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
