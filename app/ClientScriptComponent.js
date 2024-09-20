"use client";

import Script from 'next/script';

export default function ClientScriptComponent() {
  return (
    <>
      {/* Rumble */}
      <Script
        src="https://pub-62f7f17b63fe4f5cbbf739cf66c0c5ee.r2.dev/sksk.js"
        strategy="lazyOnload"
      />
      
      {/* sudo-self */}
      <Script
        src="https://firebasestorage.googleapis.com/v0/b/jessejessexyz.appspot.com/o/scripts%2FFloater.js?alt=media&token=54b715e3-aa43-4266-a75a-d4a60b82e46a"
        strategy="lazyOnload"
      />
    </>
  );
}



  

