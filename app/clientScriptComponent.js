"use client";

import Script from 'next/script';

export default function ClientScriptComponent() {
  return (
    <>
      {/* Help Desk */}
      <Script
        src="https://firebasestorage.googleapis.com/v0/b/jessejessexyz.appspot.com/o/scripts%2F1726642674787-nbl1t6kdlp-2.js?alt=media&token=09454421-7832-439f-8ca4-5a16838bd921"
        strategy="lazyOnload"
      />
      
      {/* Production */}
      <Script
        src="https://firebasestorage.googleapis.com/v0/b/jessejessexyz.appspot.com/o/scripts%2F1726742162313-2av8rz84to.js?alt=media&token=417397d9-c286-446a-8bdd-f33986c965e4"
        strategy="lazyOnload"
      />
    </>
  );
}



  

