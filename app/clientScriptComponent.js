"use client";

import Script from 'next/script';

export default function ClientScriptComponent() {
  return (
    <>
      {/*Engineer*/}
      <Script
        src="https://firebasestorage.googleapis.com/v0/b/jessejessexyz.appspot.com/o/scripts%2F1726642674787-nbl1t6kdlp.js?alt=media&token=ca340da8-d246-4728-9bcc-c089c286c85d"
        strategy="afterInteractive"
      />

      {/*Project Lead*/}
      <Script
        src="https://firebasestorage.googleapis.com/v0/b/jessejessexyz.appspot.com/o/projectlead.js?alt=media&token=ea8542c3-be20-42c1-a68d-40cd145c82a2"
        strategy="afterInteractive"
      />
    </>
  );
}
