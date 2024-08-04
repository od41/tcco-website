"use client";

import React from "react";
import {
  motion,
  AnimatePresence,
  type MotionStyle,
  useIsPresent,
} from "framer-motion";
import { usePathname } from "next/navigation";

export const styles: { slideIn: MotionStyle; privacyScreen: MotionStyle } = {
  slideIn: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    transformOrigin: "bottom",
    zIndex: 10000,
  },
  privacyScreen: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // transformOrigin: "top",
    zIndex: 10000,
  },
};

export default function ClientSideWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPresent = useIsPresent();
  console.log(isPresent);

  return (
    <AnimatePresence mode="wait">{children}
      <motion.div
        key={pathname}
        initial={{ scaleY: 1 }}
        animate={{
          scaleY: 0,
        }}
        exit={{
          scaleY: 1,
        }}
        style={{
          ...styles.privacyScreen,
          originY: !isPresent ? "top" : "bottom",
        }}
        transition={{ duration: 0.5, type: "tween", ease: [0.22, 1, 0.36, 1] }}
        className="privacy-screen bg-primary"
      />
      {/* <motion.div
        style={styles.privacyScreen}
        className="bg-primary my-animate-last"
        key={pathname}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 1, type: "tween", ease: [0.22, 1, 0.36, 1] }}
      /> */}
    </AnimatePresence>
  );
}
