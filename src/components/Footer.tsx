import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { company } from "../data/company";
import { scrollToY } from "../lib/smoothScroll";
import RollText from "./RollText";
import SplitText from "./SplitText";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <span className="footer-logo">{company.name}</span>
          <p className="footer-desc">{company.descriptionShort}</p>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <span className="eyebrow">Navigate</span>
            <Link to="/collections"><RollText text="Collections" /></Link>
            <Link to="/projects"><RollText text="Projects" /></Link>
            <Link to="/about"><RollText text="About" /></Link>
            <Link to="/craft"><RollText text="Craft" /></Link>
          </div>
          <div className="footer-col">
            <span className="eyebrow">Studio</span>
            <Link to="/contact"><RollText text="Contact" /></Link>
            <Link to="/explore"><RollText text="Catalogue" /></Link>
            <a href={company.social.instagram} target="_blank" rel="noreferrer"><RollText text="Instagram" /></a>
            <a href={company.social.pinterest} target="_blank" rel="noreferrer"><RollText text="Pinterest" /></a>
          </div>
          <div className="footer-col">
            <span className="eyebrow">Contact</span>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}>{company.phone}</a>
            <span className="footer-address">{company.address}</span>
          </div>
        </div>
      </div>

      <div className="footer-wordmark-wrap" aria-hidden="true">
        <SplitText as="div" className="footer-wordmark" text={company.name} mode="chars" stagger={0.07} duration={1.4} amount={0.3} />
      </div>

      <div className="container footer-bottom">
        <span>© {year} {company.fullName}. All rights reserved.</span>
        <button className="footer-top-btn" onClick={() => scrollToY(0)}>
          <RollText text="Back to top" /> <ArrowUp size={14} strokeWidth={1.5} />
        </button>
      </div>
    </footer>
  );
}
