import { Fragment, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import "./Marquee.css";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const COPIES = 4;

export default function Marquee({ items, baseVelocity = -1.6 }: { items: string[]; baseVelocity?: number }) {
  const reduceMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(velocity, [-2500, 2500], [6, -6], { clamp: true });
  const x = useTransform(baseX, (v) => `${wrap(-50, -25, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const f = velocityFactor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    moveBy += direction.current * moveBy * f;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="marquee" aria-label={items.join(", ")}>
      <motion.div className="marquee-track" style={{ x, skewX }} aria-hidden="true">
        {Array.from({ length: COPIES }).map((_, c) => (
          <div className="marquee-copy" key={c}>
            {items.map((item, i) => (
              <Fragment key={i}>
                <span className={`marquee-item ${i % 2 ? "marquee-item-outline" : ""}`}>{item}</span>
                <span className="marquee-tile" />
              </Fragment>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
