import "./globals.css";
import Script from "next/script";
import CustomCursor from "@/components/CustomCursor";

export const metadata = {
  title: "S.M Ademola | Fullstack Developer",
  description: "Portfolio of S.M Ademola, a fullstack developer specializing in React, Next.js, NestJS and React Native.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body style={{ cursor: 'none' }}>
        {/* Flash-free theme init — runs before paint */}
        <Script id="theme-init" strategy="beforeInteractive">{`
          (function() {
            try {
              var t = localStorage.getItem('theme');
              document.documentElement.setAttribute('data-theme', t || 'dark');
            } catch(e) {}
          })();
        `}</Script>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
