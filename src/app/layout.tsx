import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";

const fontSans = localFont({
  src: "../assets/nunito-var.ttf",
  variable: "--font-sans",
});
const displaySans = localFont({
  src: "../assets/recoleta-regular.ttf",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "TC Co.",
  description: "Connecting African Communities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} font-sans ${displaySans.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
