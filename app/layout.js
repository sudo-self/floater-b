"use client";

import localFont from "next/font/local";
import ClientScriptComponent from "./clientScriptComponent";
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

import Head from "next/head";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Floater B.</title>
        <meta name="title" content="Floater B." />
        <meta
          name="description"
          content="A floating button generator app using Next.js, Tailwind CSS, Firebase API, and Vercel serverless functions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://floater.jessejesse.xyz" />
        <meta property="og:title" content="Floater B." />
        <meta
          property="og:description"
          content="A floating button generator app using Next.js, Tailwind CSS, Firebase API, and Vercel serverless functions."
        />
        <meta
          property="og:image"
          content="https://floater.jessejesse.xyz/floaterog.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://floater.jessejesse.xyz" />
        <meta property="twitter:title" content="Floater B." />
        <meta
          property="twitter:description"
          content="A floating button generator app using Next.js, Tailwind CSS, Firebase API, and Vercel serverless functions."
        />
        <meta
          property="twitter:image"
          content="https://floater.jessejesse.xyz/floaterog.png"
        />
        <meta name="author" content="Jesse Roper" />

        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="16x16 32x32"
          href="/favicon.ico"
        />
        <link rel="apple-touch-icon" sizes="any" href="/apple-touch-icon.png" />
        <link rel="icon" sizes="32x32" href="/favicon-32.png" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="/favicon-144.png" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" sizes="192x192" href="/favicon-192.png" />
      </Head>
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












