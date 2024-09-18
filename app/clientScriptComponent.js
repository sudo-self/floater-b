"use client"; 

import Script from 'next/script';

export default function ClientScriptComponent() {
  return (
    <>
      {/* Engineer Script */}
      <Script
        src="https://firebasestorage.googleapis.com/v0/b/jessejessexyz.appspot.com/o/scripts%2F1726642674787-nbl1t6kdlp.js?alt=media&token=ca340da8-d246-4728-9bcc-c089c286c85d"
        strategy="lazyOnload"
      />

      {/* Project Lead Script */}
      <Script
        src="https://firebasestorage.googleapis.com/v0/b/jessejessexyz.appspot.com/o/floaterLeft_BG.js?alt=media&token=7c41a90d-283f-4c81-8905-6ee7945397a9"
        strategy="lazyOnload"
      />
    </>
  );
}

  

