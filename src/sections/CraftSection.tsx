import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Media from "../components/Media";
import SectionHeading from "../components/SectionHeading";
import { craftStages } from "../data/craft";
import { useMediaQuery } from "../hooks/useMediaQuery";
import "./CraftSection.css";

// Desktop: vertical scroll drives the stage track sideways while the section is pinned.
// Below 900px it falls back to a native, swipeable horizontal row.
export default function CraftSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinned = useMediaQuery("(min-width: 901px)");
  const [travel, setTravel] = useState(0);
  const [stage, setStage] = useState(0);
  const travelMV = useMotionValue(0);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!pinned || !track) {
      setTravel(0);
      travelMV.set(0);
      return;
    }
    const measure = () => {
      const d = Math.max(0, track.scrollWidth - window.innerWidth);
      setTravel(d);
      travelMV.set(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned, travelMV]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform([scrollYProgress, travelMV], ([p, d]: number[]) => -p * d);
  const drift = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStage(Math.min(craftStages.length - 1, Math.floor(v * craftStages.length)));
  });

  return (
    <section
      ref={sectionRef}
      className={`craft-h ${pinned ? "is-pinned" : ""}`}
      style={pinned ? { height: `calc(100svh + ${travel}px)` } : undefined}
    >
      <div className="craft-h-sticky">
        <div className="container craft-h-header">
          <SectionHeading eyebrow="Manufacturing" title="Crafted With Precision." />
          <div className="craft-h-meta">
            {pinned && (
              <span className="craft-h-counter">
                Stage <strong>{String(stage + 1).padStart(2, "0")}</strong> / {String(craftStages.length).padStart(2, "0")}
              </span>
            )}
            <Link to="/craft" className="craft-h-link link-underline">
              The Full Process <ArrowUpRight size={15} strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        <motion.div ref={trackRef} className="craft-h-track" style={pinned ? { x } : undefined}>
          <div className="craft-h-intro">
            <p>
              From raw mineral body to a finished wall, every Matera tile passes through the same six disciplined stages.
            </p>
            <span className="craft-h-hint">{pinned ? "Keep scrolling →" : "Swipe →"}</span>
          </div>

          {craftStages.map((s, i) => (
            <article className="craft-h-card" key={s.index}>
              <div className="craft-h-card-media">
                <Media
                  tone={s.tone}
                  src={s.image}
                  alt={s.name}
                  sizes="(max-width: 900px) 75vw, 32vw"
                  ratio="4 / 5"
                  reveal
                  revealDelay={pinned ? 0 : i * 0.05}
                  imgStyle={{ x: drift }}
                />
                <span className="craft-h-card-index">{s.index}</span>
              </div>
              <h3 className="craft-h-card-name">{s.name}</h3>
              <p className="craft-h-card-desc">{s.description}</p>
            </article>
          ))}
        </motion.div>

        {pinned && (
          <div className="container" aria-hidden="true">
            <div className="craft-h-progress">
              <motion.span className="craft-h-progress-fill" style={{ scaleX: scrollYProgress }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
