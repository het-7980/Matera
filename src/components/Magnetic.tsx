import { useRef, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

const SPRING = { stiffness: 170, damping: 20, mass: 0.3 };

export default function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} style={{ x, y, display: "inline-block" }} onMouseMove={onMove} onMouseLeave={reset}>
      {children}
    </motion.div>
  );
}
