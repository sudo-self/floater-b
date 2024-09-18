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
        src="https://firebasestorage.googleapis.com/v0/b/jessejessexyz.appspot.com/o/projectlead.js?alt=media&token=8c5a3143-6c2a-4bda-9c61-8ec5a46f10c3"
        strategy="afterInteractive"
      />
    </>
  );
}
