import { motion } from "framer-motion";
import SplitText from "./SplitText";
import { easePremium } from "../lib/motion";
import "./SectionHeading.css";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  size?: "md" | "lg";
}

export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
  size = "md",
}: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading-${align}`}>
      {eyebrow && (
        <motion.span
          className="eyebrow section-heading-eyebrow"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
        >
          <motion.span
            className="section-heading-rule"
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1, ease: easePremium } } }}
          />
          <motion.span
            variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0, transition: { duration: 0.9, delay: 0.25, ease: easePremium } } }}
          >
            {eyebrow}
          </motion.span>
        </motion.span>
      )}
      <SplitText
        as="h2"
        className={`section-heading-title section-heading-${size}`}
        text={title}
        delay={0.1}
      />
    </div>
  );
}
