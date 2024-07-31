"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type MotionStyle } from "framer-motion";
import { usePathname } from "next/navigation";

export const styles: { slideIn: MotionStyle; slideOut: MotionStyle } = {
  slideIn: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    transformOrigin: "bottom",
    zIndex: 10000,
  },
  slideOut: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    transformOrigin: "top",
    zIndex: 10000,
  },
};

const variants = {
  initial: (direction: number) => ({
    scaleY: direction > 0 ? 1 : 0,
  }),
  animate: (direction: number) => ({
    scaleY: direction > 0 ? 1 : 0,
  }),
  exit: (direction: number) => ({
    scaleY: direction > 0 ? 0 : 1,
  }),
};

export default function ClientSideWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    setDirection(direction * -1);
  }, [pathname]);

  // return (
  //   <AnimatePresence
  //     mode="wait"
  //     custom={direction}
  //     onExitComplete={() => setDirection(direction * -1)}
  //   >
  //     <motion.div
  //       key={pathname}
  //       style={{ position: "relative", width: "100%", height: "100%" }}
  //     >
  //       {children}

  //       <motion.div
  //         style={styles.slideOut}
  //         className="bg-red-300 my-animate-first"
  //         custom={direction}
  //         variants={variants}
  //         initial="initial"
  //         animate="animate"
  //         exit="exit"
  //         transition={{
  //           duration: 1,
  //           type: "tween",
  //           ease: [0.22, 1, 0.36, 1],
  //         }}
  //       />
  //       <motion.div
  //         style={styles.slideOut}
  //         className="bg-primary my-animate-last"
  //         custom={direction}
  //         variants={variants}
  //         initial="initial"
  //         animate="animate"
  //         exit="exit"
  //         transition={{
  //           duration: 0.5,
  //           type: "tween",
  //           ease: [0.22, 1, 0.36, 1],
  //           delay: 0.5,
  //         }}
  //       />
  //     </motion.div>
  //   </AnimatePresence>
  // );
  return (
    <AnimatePresence mode="wait">
      {children}

      {/* <motion.div
        style={styles.slideIn}
        className="bg-primary my-animate-first"
        key={pathname}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 1, type: "tween", ease: [0.22, 1, 0.36, 1] }}
      /> */}
      <motion.div
        style={styles.slideOut}
        className="bg-primary my-animate-last"
        key={pathname}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 1, type: "tween", ease: [0.22, 1, 0.36, 1] }}
      />
    </AnimatePresence>
  );
}
