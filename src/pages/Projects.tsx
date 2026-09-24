import { Link } from "react-router-dom";
import Media from "../components/Media";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { projects } from "../data/projects";
import FinalCTA from "../sections/FinalCTA";
import "./Projects.css";

export default function Projects() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Where surfaces become space."
        description="A selection of residential, hospitality and commercial projects specified with Matera stoneware."
      />

      <section className="container projects-page-grid">
        {projects.map((p, i) => (
          <div key={p.slug} className={`project-page-tile ${i % 5 === 0 ? "project-page-tile-lg" : ""}`}>
            <Link to={`/projects/${p.slug}`} data-cursor="View">
              <Media
                tone={p.tone}
                src={p.image}
                alt={p.name}
                sizes={i % 5 === 0 ? "(max-width: 600px) 100vw, 66vw" : "(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"}
                ratio={i % 5 === 0 ? "4 / 5" : "16 / 11"}
                reveal
                revealDelay={(i % 3) * 0.12}
                parallax={0.08}
              />
              <Reveal className="project-page-meta" delay={1 + (i % 3) * 0.12} y={14} amount={0.1}>
                <h3>{p.name}</h3>
                <span>{p.location} — {p.application}</span>
              </Reveal>
            </Link>
          </div>
        ))}
      </section>

      <FinalCTA />
    </>
  );
}
