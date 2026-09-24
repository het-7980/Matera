import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import DetailHero from "../components/DetailHero";
import Media from "../components/Media";
import Reveal from "../components/Reveal";
import { getCollection } from "../data/collections";
import { products } from "../data/products";
import FinalCTA from "../sections/FinalCTA";
import "./CollectionDetail.css";

export default function CollectionDetail() {
  const { slug } = useParams();
  const collection = getCollection(slug ?? "");

  if (!collection) return <Navigate to="/collections" replace />;

  const relatedProducts = products.filter(
    (p) => p.collection.toLowerCase() === collection.name.toLowerCase()
  );

  return (
    <>
      <DetailHero
        eyebrow={`Collection ${collection.index}`}
        title={collection.name}
        subtitle={collection.description}
        image={collection.heroImage}
        alt={`${collection.name} collection`}
        tone={collection.tone}
      />

      <section className="collection-detail-body container">
        <Reveal className="collection-detail-text">
          <p>{collection.longDescription}</p>
        </Reveal>

        <Reveal delay={0.1} className="collection-detail-specs">
          <div>
            <span className="eyebrow">Colourways</span>
            <ul>{collection.colours.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
          <div>
            <span className="eyebrow">Finishes</span>
            <ul>{collection.finishes.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>
        </Reveal>
      </section>

      <section className="container collection-detail-products">
        <div className="collection-detail-products-header">
          <h2>Surfaces in {collection.name}</h2>
          <Link to={`/explore?collection=${collection.name}`} className="link-underline">
            View in Catalogue <ArrowUpRight size={15} strokeWidth={1.5} />
          </Link>
        </div>
        <div className="collection-detail-grid">
          {relatedProducts.map((p, i) => (
            <Link key={p.slug} to={`/product/${p.slug}`} className="collection-detail-product" data-cursor="View">
              <Media
                tone={p.tone}
                src={p.image}
                alt={`${p.name} stoneware tile`}
                sizes="(max-width: 800px) 50vw, 25vw"
                ratio="4 / 5"
                reveal
                revealDelay={i * 0.1}
              />
              <div>
                <h4>{p.name}</h4>
                <span>{p.finish} · {p.size}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
