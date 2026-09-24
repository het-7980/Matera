import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Media from "../components/Media";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SplitText from "../components/SplitText";
import { craftStages } from "../data/craft";
import FinalCTA from "../sections/FinalCTA";
import "./Craft.css";

export default function Craft() {
  const stagesRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: stagesRef, offset: ["start 0.6", "end 0.6"] });

  return (
    <>
      <PageHero
        eyebrow="Craft"
        title="Crafted with precision."
        description="Every Matera surface passes through the same disciplined sequence — from raw mineral body to a finished tile ready for a wall."
      />

      <section className="craft-page-stages container" ref={stagesRef}>
        <span className="craft-page-spine" aria-hidden="true">
          <motion.span className="craft-page-spine-fill" style={{ scaleY: scrollYProgress }} />
        </span>

        {craftStages.map((stage) => (
          <div key={stage.index} className="craft-page-stage">
            <div className="craft-page-stage-media">
              <Media
                tone={stage.tone}
                src={stage.image}
                alt={stage.name}
                sizes="(max-width: 800px) 100vw, 50vw"
                ratio="4 / 3"
                reveal
                parallax={0.1}
              />
            </div>
            <div className="craft-page-stage-text">
              <Reveal y={16}>
                <span className="craft-page-stage-index">{stage.index}</span>
              </Reveal>
              <SplitText as="h3" text={stage.name} delay={0.1} />
              <Reveal delay={0.3}>
                <p>{stage.description}</p>
              </Reveal>
            </div>
          </div>
        ))}
      </section>

      <FinalCTA />
    </>
  );
}
