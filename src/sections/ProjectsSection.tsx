import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Media from "../components/Media";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { projects, type Project } from "../data/projects";
import { easePremium } from "../lib/motion";
import "./ProjectsSection.css";

function ProjectTile({ project, ratio, sizes, delay, large = false }: { project: Project; ratio: string; sizes: string; delay: number; large?: boolean }) {
  return (
    <div className={`project-tile ${large ? "project-tile-lg" : ""}`}>
      <Link to={`/projects/${project.slug}`} data-cursor="View">
        <Media tone={project.tone} src={project.image} alt={project.name} sizes={sizes} ratio={ratio} reveal revealDelay={delay} parallax={0.1} />
        <motion.div
          className="project-tile-meta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: delay + 0.6, ease: easePremium }}
        >
          <div>
            <h3>{project.name}</h3>
            <span>{project.location} — {project.application}</span>
          </div>
          <ArrowUpRight className="project-tile-arrow" size={20} strokeWidth={1.4} />
        </motion.div>
      </Link>
    </div>
  );
}

export default function ProjectsSection() {
  const [a, b, c] = projects;

  return (
    <section className="projects-section">
      <div className="container">
        <div className="projects-header">
          <SectionHeading eyebrow="Projects" title="Where Surfaces Become Space." />
          <Reveal delay={0.1}>
            <Link to="/projects" className="projects-view-all link-underline">
              All Projects <ArrowUpRight size={15} strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>

        <div className="projects-asymmetric">
          <ProjectTile project={a} ratio="4 / 5" sizes="(max-width: 800px) 100vw, 56vw" delay={0} large />
          <div className="project-tile-col">
            <ProjectTile project={b} ratio="16 / 10" sizes="(max-width: 800px) 100vw, 44vw" delay={0.15} />
            <ProjectTile project={c} ratio="16 / 10" sizes="(max-width: 800px) 100vw, 44vw" delay={0.3} />
          </div>
        </div>
      </div>
    </section>
  );
}
