import { useState } from "react";
import { motion } from "framer-motion";
import Media from "../components/Media";
import SectionHeading from "../components/SectionHeading";
import { applications } from "../data/applications";
import { easeInOutExpo } from "../lib/motion";
import { usePageReady } from "../lib/transition";
import "./ApplicationsSection.css";

export default function ApplicationsSection() {
  const [active, setActive] = useState(0);
  const ready = usePageReady();

  return (
    <section className="applications-section">
      <div className="container">
        <SectionHeading eyebrow="Application" title="Made for Space" />

        <motion.div
          className="app-panels"
          initial="hidden"
          whileInView={ready ? "visible" : undefined}
          viewport={{ once: true, amount: 0.3 }}
        >
          {applications.map((app, i) => (
            <motion.article
              key={app.name}
              className={`app-panel ${i === active ? "is-active" : ""}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              tabIndex={0}
              aria-label={`${app.name}: ${app.description}`}
              variants={{
                hidden: { clipPath: "inset(100% 0% 0% 0%)" },
                visible: {
                  clipPath: "inset(0% 0% 0% 0%)",
                  transition: { duration: 1.3, delay: i * 0.08, ease: easeInOutExpo },
                },
              }}
            >
              <Media
                tone={app.tone}
                src={app.image}
                alt=""
                sizes="(max-width: 900px) 100vw, 50vw"
                ratio="auto"
                className="app-panel-media"
              />
              <span className="app-panel-vertical" aria-hidden="true">
                {app.name}
              </span>
              <div className="app-panel-content" aria-hidden="true">
                <span className="app-panel-index">0{i + 1}</span>
                <h3 className="app-panel-name">{app.name}</h3>
                <p className="app-panel-desc">{app.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
