import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import Media from "../components/Media";
import SectionHeading from "../components/SectionHeading";
import { collections } from "../data/collections";
import { easePremium } from "../lib/motion";
import { scrollToY } from "../lib/smoothScroll";
import "./MaterialExperience.css";

const TOTAL = collections.length;

const rollVariants: Variants = {
  enter: (dir: number) => ({ y: dir > 0 ? "100%" : "-100%" }),
  center: { y: "0%", transition: { duration: 0.9, ease: easePremium } },
  exit: (dir: number) => ({ y: dir > 0 ? "-100%" : "100%", transition: { duration: 0.6, ease: easePremium } }),
};

function RollingValue({ value, dir, className }: { value: string; dir: number; className?: string }) {
  return (
    <span className={`material-exp-mask ${className ?? ""}`}>
      <AnimatePresence mode="popLayout" initial={false} custom={dir}>
        <motion.span key={value} className="material-exp-roll" custom={dir} variants={rollVariants} initial="enter" animate="center" exit="exit">
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function ProgressSegment({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const scaleX = useTransform(progress, [index / TOTAL, (index + 1) / TOTAL], [0, 1]);
  return (
    <span className="material-exp-dot">
      <motion.span className="material-exp-dot-fill" style={{ scaleX }} />
    </span>
  );
}

export default function MaterialExperience() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(TOTAL - 1, Math.floor(v * TOTAL));
    if (next !== active) {
      setDir(next > active ? 1 : -1);
      setActive(next);
    }
  });

  const current = collections[active];
  const next = collections[active + 1];

  const scrollToStep = (step: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const distance = el.offsetHeight - window.innerHeight;
    scrollToY(top + (distance * step) / TOTAL + 2);
  };

  return (
    <section className="material-exp" ref={ref} style={{ height: `${TOTAL * 100}vh` }}>
      <div className="material-exp-sticky">
        <div className="container material-exp-heading">
          <SectionHeading eyebrow="Process" title="From Material to Space" />
        </div>

        <div className="material-exp-split">
          {(["image", "appliedImage"] as const).map((key) => (
            <div className="material-exp-pane" key={key}>
              {collections.map((c, i) => (
                <Media
                  key={c.slug}
                  tone={key === "image" ? c.tone : "charcoal"}
                  src={c[key]}
                  alt={key === "image" ? `${c.name} tile surface, close up` : `${c.name} tiles applied in an interior`}
                  sizes="(max-width: 760px) 100vw, 50vw"
                  ratio="auto"
                  className={`material-exp-media ${i <= active ? "is-shown" : ""}`}
                  style={{ zIndex: i }}
                />
              ))}
              <span className="material-exp-tag">{key === "image" ? "Material" : "Architecture"}</span>
            </div>
          ))}
        </div>

        <div className="container material-exp-footer">
          <div className="material-exp-index">
            <RollingValue value={String(active + 1).padStart(2, "0")} dir={dir} />
            <span className="material-exp-index-total">/ {String(TOTAL).padStart(2, "0")}</span>
          </div>
          <h3 className="material-exp-name">
            <RollingValue value={current.name} dir={dir} />
          </h3>
          <div className="material-exp-progress" aria-hidden="true">
            {collections.map((c, i) => (
              <ProgressSegment key={c.slug} progress={scrollYProgress} index={i} />
            ))}
          </div>
          <button
            className="material-exp-cue"
            onClick={() => scrollToStep(active + 1)}
            aria-label={next ? `Scroll to next material: ${next.name}` : "Continue scrolling"}
          >
            <span className="material-exp-cue-label">
              {next ? (
                <>
                  <span className="material-exp-cue-muted">Next —</span> {next.name}
                </>
              ) : (
                "Keep scrolling"
              )}
            </span>
            <ArrowDown size={16} strokeWidth={1.4} className="material-exp-cue-arrow" />
          </button>
        </div>
      </div>
    </section>
  );
}
