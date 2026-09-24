import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Media, { type MediaTone } from "./Media";
import SplitText from "./SplitText";
import { easePremium } from "../lib/motion";
import { usePageReady } from "../lib/transition";
import "./DetailHero.css";

interface DetailHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  tone: MediaTone;
}

export default function DetailHero({ eyebrow, title, subtitle, image, alt, tone }: DetailHeroProps) {
  const ready = usePageReady();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { duration: 1.1, delay, ease: easePremium },
  });

  return (
    <section className="detail-hero" ref={ref}>
      <motion.div className="detail-hero-media" style={{ y: imgY }}>
        <motion.div
          className="detail-hero-media-inner"
          initial={{ scale: 1.2 }}
          animate={{ scale: ready ? 1 : 1.2 }}
          transition={{ duration: 2.4, ease: easePremium }}
        >
          <Media tone={tone} src={image} alt={alt} ratio="auto" className="detail-hero-fill" eager />
        </motion.div>
      </motion.div>
      <motion.div className="detail-hero-content container" style={{ opacity: contentOpacity }}>
        <motion.span className="eyebrow" {...fade(0.2)}>
          {eyebrow}
        </motion.span>
        <SplitText as="h1" className="detail-hero-title" text={title} mode="chars" stagger={0.035} delay={0.3} play={ready} />
        <motion.p className="detail-hero-sub" {...fade(0.75)}>
          {subtitle}
        </motion.p>
      </motion.div>
    </section>
  );
}
