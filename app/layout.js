import localFont from "next/font/local";
import Head from "next/head"; 
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Floater B.",
  description: "Create custom floater buttons",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <script
          src="https://firebasestorage.googleapis.com/v0/b/jessejessexyz.appspot.com/o/scripts%2F1726642674787-nbl1t6kdlp.js?alt=media&token=e12485cb-0d3a-4a84-ae8c-537fb9718703"
          async
        ></script>
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}


