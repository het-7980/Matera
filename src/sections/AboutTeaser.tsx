import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Media from "../components/Media";
import Magnetic from "../components/Magnetic";
import Reveal from "../components/Reveal";
import RollText from "../components/RollText";
import SplitText from "../components/SplitText";
import { aboutContent } from "../data/company";
import { images } from "../data/images";
import "./AboutTeaser.css";

export default function AboutTeaser() {
  return (
    <section className="about-teaser">
      <div className="container about-teaser-grid">
        <div className="about-teaser-media">
          <Media
            tone="sand"
            src={images.bathStoneSlab}
            alt="Bathroom wall clad in textured stone-effect tiles"
            sizes="(max-width: 800px) 100vw, 45vw"
            ratio="4 / 5"
            reveal
            parallax={0.1}
          />
        </div>
        <div className="about-teaser-content">
          <Reveal y={12}>
            <span className="eyebrow">About Matera</span>
          </Reveal>
          <SplitText as="h2" className="about-teaser-title" text={aboutContent.headline} delay={0.1} />
          <Reveal delay={0.3}>
            <p className="about-teaser-text">{aboutContent.intro}</p>
          </Reveal>
          <Reveal delay={0.45}>
            <Magnetic>
              <Link to="/about" className="btn about-teaser-btn">
                <RollText text="Our Story" /> <ArrowUpRight size={15} strokeWidth={1.5} />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
