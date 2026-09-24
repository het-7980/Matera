import { motion } from "framer-motion";
import SplitText from "./SplitText";
import { easePremium } from "../lib/motion";
import { usePageReady } from "../lib/transition";
import "./PageHero.css";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  const ready = usePageReady();
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 1.1, delay, ease: easePremium },
  });

  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        <motion.span className="eyebrow" {...fade(0.05)}>
          {eyebrow}
        </motion.span>
        <SplitText as="h1" className="page-hero-title" text={title} play={ready} delay={0.15} stagger={0.07} />
        {description && (
          <motion.p className="page-hero-desc" {...fade(0.6)}>
            {description}
          </motion.p>
        )}
        <motion.span
          className="page-hero-rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: ready ? 1 : 0 }}
          transition={{ duration: 1.6, delay: 0.5, ease: easePremium }}
        />
      </div>
    </section>
  );
}
