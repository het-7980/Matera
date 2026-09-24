import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { company } from "../data/company";
import { easeInOutExpo, easePremium } from "../lib/motion";
import "./Loader.css";

export default function Loader({ onDone }: { onDone: () => void }) {
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => String(Math.round(v)).padStart(3, "0"));
  const progress = useTransform(count, [0, 100], [0, 1]);

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 1.35,
      ease: [0.65, 0, 0.35, 1],
      delay: 0.25,
      onComplete: () => window.setTimeout(onDone, 180),
    });
    return () => controls.stop();
  }, [count, onDone]);

  return (
    <motion.div
      className="loader"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 1.05, ease: easeInOutExpo } }}
      aria-hidden="true"
    >
      <div className="loader-center">
        <div className="loader-wordmark">
          {company.name.split("").map((ch, i) => (
            <span key={i} className="loader-char-mask">
              <motion.span
                className="loader-char"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                exit={{ y: "-110%" }}
                transition={{ duration: 1, delay: 0.1 + i * 0.06, ease: easePremium }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </div>
        <motion.span
          className="loader-caption"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Stoneware Surfaces
        </motion.span>
      </div>

      <div className="loader-footer">
        <motion.span className="loader-count">{display}</motion.span>
        <span className="loader-note">Preparing surfaces</span>
      </div>
      <motion.div className="loader-bar" style={{ scaleX: progress }} />
    </motion.div>
  );
}
