import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform, type MotionValue } from "framer-motion";
import "./BrandStatement.css";

const LINE_1 = "A surface is more than a finish.";
const LINE_2 = "It becomes part of the architecture.";

function ScrollWords({ text, progress, start, end }: { text: string; progress: MotionValue<number>; start: number; end: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => {
        const segStart = start + ((end - start) * i) / words.length;
        const segEnd = start + ((end - start) * (i + 1)) / words.length;
        return <Word key={i} word={word} progress={progress} start={segStart} end={segEnd} />;
      })}
    </>
  );
}

function Word({ word, progress, start, end }: { word: string; progress: MotionValue<number>; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const blur = useTransform(progress, [start, end], [8, 0]);
  const y = useTransform(progress, [start, end], [14, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  return (
    <span className="statement-word-wrap">
      <motion.span className="statement-word" style={{ opacity, filter, y }}>
        {word}
      </motion.span>{" "}
    </span>
  );
}

export default function BrandStatement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  return (
    <section className="statement" ref={ref}>
      <div className="container statement-inner">
        <p className="statement-text">
          <ScrollWords text={LINE_1} progress={scrollYProgress} start={0} end={0.5} />
          <br />
          <span className="statement-line-2">
            <ScrollWords text={LINE_2} progress={scrollYProgress} start={0.5} end={1} />
          </span>
        </p>
      </div>
    </section>
  );
}
