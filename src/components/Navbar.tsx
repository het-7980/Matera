import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { company } from "../data/company";
import { easeInOutExpo, easePremium } from "../lib/motion";
import { lockScroll } from "../lib/smoothScroll";
import { useIntroDone } from "../lib/transition";
import RollText from "./RollText";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Collections", to: "/collections" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Craft", to: "/craft" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const introDone = useIntroDone();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const lastY = useRef(0);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
    const goingDown = y > lastY.current;
    if (Math.abs(y - lastY.current) > 6) setHidden(goingDown && y > 240);
    lastY.current = y;
  });

  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [open]);

  const isActive = (to: string) => location.pathname === to || location.pathname.startsWith(`${to}/`);
  const solid = scrolled || !isHome || open;

  return (
    <>
      <motion.header
        className={`navbar ${solid ? "navbar-solid" : "navbar-transparent"}`}
        initial={{ y: "-100%" }}
        animate={{ y: !introDone || (hidden && !open) ? "-100%" : "0%" }}
        transition={{ duration: 0.8, ease: easePremium, delay: introDone && !scrolled ? 0.5 : 0 }}
      >
        <div className="navbar-inner container">
          <Link to="/" className="navbar-logo" aria-label={`${company.name} home`}>
            {company.name}
          </Link>

          <nav className="navbar-links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`navbar-link ${isActive(link.to) ? "is-active" : ""}`}
                aria-current={isActive(link.to) ? "page" : undefined}
              >
                <RollText text={link.label} />
              </Link>
            ))}
          </nav>

          <div className="navbar-actions">
            <Link to="/contact" className="btn navbar-cta">
              <RollText text="Request Catalogue" />
            </Link>
            <button
              className="navbar-toggle"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={22} strokeWidth={1.4} /> : <Menu size={22} strokeWidth={1.4} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="navbar-mobile"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: easeInOutExpo }}
          >
            <nav className="navbar-mobile-links" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <Link key={link.to} to={link.to} className="navbar-mobile-link">
                  <span className="navbar-mobile-index">0{i + 1}</span>
                  <span className="navbar-mobile-mask">
                    <motion.span
                      className="navbar-mobile-label"
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%", transition: { duration: 0.4 } }}
                      transition={{ duration: 0.9, delay: 0.25 + 0.06 * i, ease: easePremium }}
                    >
                      {link.label}
                    </motion.span>
                  </span>
                </Link>
              ))}
            </nav>
            <motion.div
              className="navbar-mobile-footer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: easePremium }}
            >
              <Link to="/contact" className="btn btn-filled">Request Catalogue</Link>
              <span className="navbar-mobile-meta">{company.email}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
