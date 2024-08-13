import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";
import { AppProps } from "next/app";
import { AnimatePresence, motion } from "framer-motion";

const fontSans = localFont({
  src: "../assets/recoleta-regular.ttf",
  variable: "--font-sans",
});
const displaySans = localFont({
  src: "../assets/biorhyme-bold.ttf",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "TC Co.",
  description: "Connecting African Communities",
  icons: {
    icon: "/favicon.png", // /public/favicon.ico
  },
};

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
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
            <Navbar />
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
  );
}
