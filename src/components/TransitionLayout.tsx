import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { company } from "../data/company";
import { easeInOutExpo } from "../lib/motion";
import { PageCurtainContext } from "../lib/transition";
import "./TransitionLayout.css";

let hasMountedOnce = false;

export default function TransitionLayout() {
  // The very first page is revealed by the intro loader, not the curtain.
  const [isFirstPage] = useState(() => !hasMountedOnce);
  const [curtainLifted, setCurtainLifted] = useState(isFirstPage);

  useEffect(() => {
    hasMountedOnce = true;
  }, []);

  return (
    <PageCurtainContext.Provider value={curtainLifted}>
      <main>
        <Outlet />
      </main>

      <motion.div
        className="curtain"
        initial={isFirstPage ? { y: "-100%" } : { y: "0%" }}
        animate={{ y: "-100%", transition: { duration: 0.9, delay: 0.15, ease: easeInOutExpo } }}
        exit={{ y: ["100%", "0%"], transition: { duration: 0.75, ease: easeInOutExpo } }}
        onAnimationComplete={() => setCurtainLifted(true)}
        aria-hidden="true"
      >
        <motion.span
          className="curtain-mark"
          initial={isFirstPage ? false : { opacity: 1 }}
          animate={{ opacity: 0, transition: { duration: 0.3 } }}
          exit={{ opacity: [0, 1], transition: { duration: 0.4, delay: 0.3 } }}
        >
          {company.name}
        </motion.span>
      </motion.div>
    </PageCurtainContext.Provider>
  );
}
