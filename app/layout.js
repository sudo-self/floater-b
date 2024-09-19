import localFont from "next/font/local";
import ClientScriptComponent from './clientScriptComponent';
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav>
          <ul>
            <li>
              <Link href="/FloaterForm">
                Floater API
              </Link>
            </li>
          </ul>
        </nav>
        {children}
        <ClientScriptComponent />
      </body>
    </html>
  );
}
















