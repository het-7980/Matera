import Media from "../components/Media";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SplitText from "../components/SplitText";
import { aboutContent } from "../data/company";
import FinalCTA from "../sections/FinalCTA";
import "./About.css";

const blocks = [
  aboutContent.story,
  aboutContent.philosophy,
  aboutContent.manufacturing,
  aboutContent.quality,
  aboutContent.sustainability,
];

export default function About() {
  return (
    <>
      <PageHero eyebrow="About" title={aboutContent.headline} description={aboutContent.intro} />

      <section className="about-blocks container">
        {blocks.map((block, i) => (
          <div key={block.heading} className={`about-block ${i % 2 === 1 ? "about-block-reverse" : ""}`}>
            <div className="about-block-media">
              <Media tone="sand" src={block.image} alt={block.heading} sizes="(max-width: 800px) 100vw, 55vw" ratio="16 / 11" reveal parallax={0.1} />
            </div>
            <div className="about-block-text">
              <Reveal y={10}>
                <span className="about-block-index">0{i + 1}</span>
              </Reveal>
              <SplitText as="h3" text={block.heading} delay={0.1} />
              <Reveal delay={0.3}>
                <p>{block.body}</p>
              </Reveal>
            </div>
          </div>
        ))}
      </section>

      <FinalCTA />
    </>
  );
}
