import { Link } from "react-router-dom";
import Magnetic from "../components/Magnetic";
import Reveal from "../components/Reveal";
import RollText from "../components/RollText";
import SplitText from "../components/SplitText";
import "./FinalCTA.css";

export default function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container final-cta-inner">
        <SplitText as="h2" className="final-cta-title" text={"Let's Create\nSomething\nTimeless."} stagger={0.09} duration={1.3} />
        <Reveal delay={0.5}>
          <div className="final-cta-actions">
            <Magnetic>
              <Link to="/contact" className="btn btn-inverse">
                <RollText text="Request Catalogue" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link to="/contact" className="btn-text link-underline final-cta-text-link">Contact Us</Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
