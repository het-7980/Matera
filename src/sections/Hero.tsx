import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import Media from "../components/Media";
import Magnetic from "../components/Magnetic";
import RollText from "../components/RollText";
import SplitText from "../components/SplitText";
import { company } from "../data/company";
import { images } from "../data/images";
import { easePremium } from "../lib/motion";
import { usePageReady } from "../lib/transition";
import "./Hero.css";

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, delay, ease: easePremium } },
});

export default function Hero() {
  const ready = usePageReady();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const state = ready ? "visible" : "hidden";

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero-media" style={{ y: imgY }}>
        <motion.div
          className="hero-media-inner"
          initial={{ scale: 1.25 }}
          animate={{ scale: ready ? 1 : 1.25 }}
          transition={{ duration: 2.6, ease: easePremium }}
        >
          <Media
            tone="charcoal"
            src={images.woodStoneLobby}
            alt="Corridor lined with textured stone wall tiles"
            ratio="auto"
            className="hero-media-fill"
            eager
          />
        </motion.div>
      </motion.div>
      <div className="hero-scrim" />

      <motion.div className="hero-content container" style={{ y: contentY, opacity }} initial="hidden" animate={state}>
        <motion.span className="eyebrow hero-eyebrow" variants={fadeUp(0.2)}>
          Stoneware Wall Tiles
        </motion.span>
        <SplitText as="h1" className="hero-title" text={company.tagline} play={ready} delay={0.3} stagger={0.08} duration={1.3} />
        <motion.p className="hero-sub" variants={fadeUp(0.85)}>
          {company.descriptionShort}
        </motion.p>
        <motion.div className="hero-actions" variants={fadeUp(1.05)}>
          <Magnetic>
            <Link to="/collections" className="btn btn-inverse">
              <RollText text="Explore Collections" />
            </Link>
          </Magnetic>
          <Link to="/contact" className="btn-text link-underline hero-text-link">Request Catalogue</Link>
        </motion.div>
      </motion.div>

      <motion.div className="hero-scroll-indicator" style={{ opacity }}>
        <motion.div
          className="hero-scroll-inner"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 1.4, ease: easePremium }}
        >
          <span>Scroll</span>
          <span className="hero-scroll-line" />
          <ArrowDown size={16} strokeWidth={1.3} className="hero-scroll-arrow" />
        </motion.div>
      </motion.div>
    </section>
  );
}
