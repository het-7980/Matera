import { Fragment } from "react";
import { motion, type Variants } from "framer-motion";
import { easePremium } from "../lib/motion";
import { usePageReady } from "../lib/transition";
import "./SplitText.css";

const TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
};

interface SplitTextProps {
  text: string;
  as?: keyof typeof TAGS;
  className?: string;
  mode?: "words" | "chars";
  delay?: number;
  stagger?: number;
  duration?: number;
  play?: boolean;
  amount?: number;
}

// Lines split on "\n"; each word (or char) slides up from behind its own mask.
export default function SplitText({
  text,
  as = "div",
  className = "",
  mode = "words",
  delay = 0,
  stagger = 0.06,
  duration = 1.1,
  play,
  amount = 0.4,
}: SplitTextProps) {
  const Tag = TAGS[as];
  const ready = usePageReady();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const piece: Variants = {
    hidden: { y: "115%", rotate: 2 },
    visible: { y: "0%", rotate: 0, transition: { duration, ease: easePremium } },
  };

  const trigger =
    play === undefined
      ? { whileInView: ready ? "visible" : undefined, viewport: { once: true, amount } }
      : { animate: play ? "visible" : "hidden" };

  return (
    <Tag
      className={`split ${className}`}
      aria-label={text.replace(/\n/g, " ")}
      initial="hidden"
      variants={container}
      {...trigger}
    >
      {text.split("\n").map((line, li) => (
        <span className="split-line" key={li} aria-hidden="true">
          {line.split(" ").map((word, wi, words) => (
            <Fragment key={wi}>
              <span className="split-word">
                {mode === "chars" ? (
                  word.split("").map((ch, ci) => (
                    <span key={ci} className="split-mask">
                      <motion.span className="split-piece" variants={piece}>
                        {ch}
                      </motion.span>
                    </span>
                  ))
                ) : (
                  <span className="split-mask">
                    <motion.span className="split-piece" variants={piece}>
                      {word}
                    </motion.span>
                  </span>
                )}
              </span>
              {wi < words.length - 1 && " "}
            </Fragment>
          ))}
        </span>
      ))}
    </Tag>
  );
}
