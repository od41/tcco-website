import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";
import { AppProps } from "next/app";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider } from "@/providers/auth-provider";

import Script from "next/script";

const fontSans = localFont({
  src: "../assets/recoleta-regular.ttf",
  variable: "--font-sans",
});
const displaySans = localFont({
  src: "../assets/biorhyme-bold.ttf",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "TCCo.",
  description: "Connecting SMB Communities",
  icons: {
    icon: "/favicon.png", // /public/favicon.ico
  },
};

export default function MyApp({ Component, pageProps, router }: AppProps) {
  // Check if current path is an admin auth page
  const isAdminAuthPage = router.pathname.startsWith('/lido/admin/auth/');

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload" id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}',{
          page_path: window.location.pathname});
         `}
      </Script>
      <AuthProvider>
        <AnimatePresence mode="wait">
          <motion.div key={router.pathname}>
            <div
              className={`${fontSans.variable} font-sans ${displaySans.variable}`}
            >
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                {/* Only show Navbar if not on admin auth pages */}
                {!isAdminAuthPage && <Navbar />}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.75,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Component {...pageProps} />
                </motion.div>
              </ThemeProvider>
            </div>
            <motion.div
              className="slide-in"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 0 }}
              exit={{ scaleY: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            ></motion.div>
            <motion.div
              className="slide-out"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            ></motion.div>
          </motion.div>
        </AnimatePresence>
      </AuthProvider>
    </>
  );
}
