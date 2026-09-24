import { Link, Navigate, useParams } from "react-router-dom";
import DetailHero from "../components/DetailHero";
import Media from "../components/Media";
import Reveal from "../components/Reveal";
import { getProject, projects } from "../data/projects";
import FinalCTA from "../sections/FinalCTA";
import "./ProjectDetail.css";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug ?? "");

  if (!project) return <Navigate to="/projects" replace />;

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <DetailHero
        eyebrow={`${project.year} · ${project.application}`}
        title={project.name}
        subtitle={project.location}
        image={project.image}
        alt={project.name}
        tone={project.tone}
      />

      <section className="container project-detail-body">
        <Reveal className="project-detail-desc">
          <p>{project.description}</p>
        </Reveal>
        <Reveal delay={0.1} className="project-detail-specs">
          <div><span className="eyebrow">Location</span><p>{project.location}</p></div>
          <div><span className="eyebrow">Application</span><p>{project.application}</p></div>
          <div><span className="eyebrow">Collection</span><p>{project.collection}</p></div>
          <div><span className="eyebrow">Year</span><p>{project.year}</p></div>
        </Reveal>
      </section>

      <section className="container project-detail-images">
        <Media tone={project.tone} src={project.gallery[0]} alt={`${project.name} — detail`} ratio="16 / 9" reveal parallax={0.1} />
        <div className="project-detail-images-row">
          <Media tone={project.tone} src={project.gallery[1]} alt={`${project.name} — tile detail`} sizes="(max-width: 800px) 100vw, 50vw" ratio="4 / 5" reveal parallax={0.08} />
          <Media tone={project.tone} src={project.gallery[2]} alt={`${project.name} — installed surface`} sizes="(max-width: 800px) 100vw, 50vw" ratio="4 / 5" reveal revealDelay={0.15} parallax={0.08} />
        </div>
      </section>

      <section className="container project-detail-more">
        <span className="eyebrow">More Projects</span>
        <div className="project-detail-more-grid">
          {others.map((p, i) => (
            <Link key={p.slug} to={`/projects/${p.slug}`} className="project-detail-more-item" data-cursor="View">
              <Media tone={p.tone} src={p.image} alt={p.name} sizes="(max-width: 800px) 50vw, 33vw" ratio="4 / 5" reveal revealDelay={i * 0.1} />
              <h4>{p.name}</h4>
              <span>{p.location}</span>
            </Link>
          ))}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
