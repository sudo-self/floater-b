"use client";

import Script from 'next/script';

export default function ClientScriptComponent() {
  return (
    <>
      {/* Help Desk */}
      <Script
        src="https://firebasestorage.googleapis.com/v0/b/jessejessexyz.appspot.com/o/scripts%2F1726642674787-nbl1t6kdlp-2.js?alt=media&token=52b4d103-3634-4665-aae4-ea12103f4dcb"
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



  

