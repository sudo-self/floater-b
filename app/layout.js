// app/layout.js

import localFont from "next/font/local";
import ClientScriptComponent from "./ClientScriptComponent";
import "./globals.css";
import Link from 'next/link'; 
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32" },
      { url: "/favicon-32.png", sizes: "32x32" },
      { url: "/favicon-192.png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { url: "/favicon-144.png", type: "image/png", sizes: "144x144" },
      { url: "/manifest.json", type: "application/manifest+json" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ilostmyipad",
    title: "Floater B.",
    description: "A floating button generator app using Next.js, Tailwind CSS, Firebase API, and Vercel serverless functions.",
    image: "https://floater.jessejesse.xyz/floaterog.png",
  },
  openGraph: {
    type: "website",
    url: "https://floater.jessejesse.xyz",
    title: "Floater B.",
    description: "A floating button generator app using Next.js, Tailwind CSS, Firebase API, and Vercel serverless functions.",
    images: [
      {
        url: "https://floater.jessejesse.xyz/floaterog.png",
        width: 1200,
        height: 630,
        alt: "Floater B.",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <nav>
          <ul>
            <li>
              <Link href="/FloaterForm"></Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
