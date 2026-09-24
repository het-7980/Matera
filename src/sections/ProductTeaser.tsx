import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Media from "../components/Media";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { products } from "../data/products";
import "./ProductTeaser.css";

export default function ProductTeaser() {
  const sample = products.filter(
    (p, i) => products.findIndex((q) => q.collection === p.collection) === i
  );

  return (
    <section className="product-teaser">
      <div className="container">
        <div className="product-teaser-header">
          <SectionHeading eyebrow="Catalogue" title="Explore Surfaces" />
          <Reveal delay={0.1}>
            <Link to="/explore" className="product-teaser-link link-underline">
              Open Full Catalogue <ArrowUpRight size={15} strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>

        <div className="product-teaser-grid">
          {sample.map((p, i) => (
            <Link key={p.slug} to={`/product/${p.slug}`} className="product-teaser-card" data-cursor="View">
              <div className="product-teaser-media">
                <Media
                  tone={p.tone}
                  src={p.image}
                  alt={`${p.name} stoneware tile`}
                  sizes="(max-width: 900px) 50vw, 25vw"
                  ratio="4 / 5"
                  reveal
                  revealDelay={i * 0.1}
                />
              </div>
              <Reveal className="product-teaser-info" delay={0.5 + i * 0.1} y={12}>
                <h4>{p.name}</h4>
                <span>{p.collection} · {p.finish}</span>
              </Reveal>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
