import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { easePremium } from "../lib/motion";
import { usePageReady } from "../lib/transition";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 1,
  className,
  once = true,
  amount = 0.3,
}: RevealProps) {
  const ready = usePageReady();
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: easePremium },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView={ready ? "visible" : undefined}
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
