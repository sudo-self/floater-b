import localFont from "next/font/local";
import Head from "next/head";
import ClientScriptComponent from './clientScriptComponent';
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Create Custom Embeddable Floater Buttons</title>
        <meta name="title" content="Create Custom Embeddable Floater Buttons" />
        <meta name="description" content="Create Custom Embeddable Floater buttons that you can share or host on your site with zero-code" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://floater.jessejesse.xyz" />
        <meta property="og:title" content="Create Custom Embeddable Floater Buttons" />
        <meta property="og:description" content="Create Custom Embeddable Floater buttons that you can share or host on your site with zero-code" />
        <meta property="og:image" content="https://floater.jessejesse.xyz/floater.og" />   
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://floater.jessejesse.xyz" />
        <meta property="twitter:title" content="Create Custom Embeddable Floater Buttons" />
        <meta property="twitter:description" content="Create Custom Embeddable Floater buttons that you can share or host on your site with zero-code" />
        <meta property="twitter:image" content="https://floater.jessejesse.xyz/floater.og" />
        <meta property="twitter:card" content="summary_large_image" />    
        <meta name="author" content="Floater B." />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <ClientScriptComponent />
      </body>
    </html>
  );
}

