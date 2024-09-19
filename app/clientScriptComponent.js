"use client";

import Script from 'next/script';

export default function ClientScriptComponent() {
  return (
    <>
      {/* HProjecr Lead */}
      <Script
        src="https://firebasestorage.googleapis.com/v0/b/jessejessexyz.appspot.com/o/floaterLeft_BG.js?alt=media&token=7c41a90d-283f-4c81-8905-6ee7945397a9"
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



  

