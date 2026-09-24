import { useRef, type CSSProperties, type ReactNode, type RefObject } from "react";
import { motion, useScroll, useTransform, type MotionStyle, type Variants } from "framer-motion";
import { unsplashResize, unsplashSrcSet } from "../data/images";
import { easeInOutExpo, easePremium } from "../lib/motion";
import { usePageReady } from "../lib/transition";
import "./Media.css";

export type MediaTone =
  | "stone"
  | "sand"
  | "concrete"
  | "charcoal"
  | "marble"
  | "clay"
  | "ivory";

interface MediaProps {
  tone: MediaTone;
  src: string;
  alt: string;
  sizes?: string;
  ratio?: string;
  className?: string;
  eager?: boolean;
  reveal?: boolean;
  revealDelay?: number;
  parallax?: number;
  imgStyle?: MotionStyle;
  children?: ReactNode;
  style?: CSSProperties;
}

type ImgProps = React.ComponentProps<typeof motion.img>;

function ParallaxImg({ amount, target, style, ...props }: ImgProps & { amount: number; target: RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  const range = (amount / (1 + 2 * amount)) * 100;
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);
  return (
    <motion.img
      {...props}
      style={{ top: `-${amount * 100}%`, height: `${100 + amount * 200}%`, y, ...style }}
    />
  );
}

// The toned gradient sits behind the photo so slots never flash empty while images load.
export default function Media({
  tone,
  src,
  alt,
  sizes = "100vw",
  ratio = "4 / 5",
  className = "",
  eager = false,
  reveal = false,
  revealDelay = 0,
  parallax = 0,
  imgStyle,
  children,
  style,
}: MediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ready = usePageReady();
  const ar = ratio === "auto" ? undefined : ratio.replace(/\s/g, "").replace("/", ":");

  const containerVariants: Variants = {
    hidden: { clipPath: "inset(100% 0% 0% 0%)" },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 1.4, ease: easeInOutExpo, delay: revealDelay },
    },
  };
  const imgVariants: Variants = {
    hidden: { scale: 1.3 },
    visible: { scale: 1, transition: { duration: 1.9, ease: easePremium, delay: revealDelay } },
  };

  const imgProps: ImgProps = {
    className: "media-img",
    src: unsplashResize(src, 1200, ar),
    srcSet: unsplashSrcSet(src, ar),
    sizes,
    alt,
    loading: eager ? "eager" : "lazy",
    decoding: "async",
    onLoad: (e) => e.currentTarget.classList.add("is-loaded"),
    variants: reveal ? imgVariants : undefined,
    style: imgStyle,
  };

  // Clip lives on the inner frame: IntersectionObserver never reports a fully clip-pathed element as in view.
  return (
    <motion.div
      ref={ref}
      className={`media ${className}`}
      style={{ aspectRatio: ratio, ...style }}
      initial={reveal ? "hidden" : false}
      whileInView={reveal && ready ? "visible" : undefined}
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div className={`media-frame media-${tone}`} variants={reveal ? containerVariants : undefined}>
        {parallax > 0 ? <ParallaxImg {...imgProps} amount={parallax} target={ref} /> : <motion.img {...imgProps} />}
      </motion.div>
      {children}
    </motion.div>
  );
}
