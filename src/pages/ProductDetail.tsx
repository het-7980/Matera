import { useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Mail, ZoomIn } from "lucide-react";
import Media from "../components/Media";
import ProductCard from "../components/ProductCard";
import RollText from "../components/RollText";
import SplitText from "../components/SplitText";
import { getProduct, products } from "../data/products";
import { easeInOutExpo, easePremium } from "../lib/motion";
import { usePageReady } from "../lib/transition";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProduct(slug ?? "");
  const ready = usePageReady();
  const loupeRef = useRef<HTMLDivElement>(null);
  const [zooming, setZooming] = useState(false);

  if (!product) return <Navigate to="/explore" replace />;

  const related = products
    .filter((p) => p.collection === product.collection && p.slug !== product.slug)
    .slice(0, 4);

  const specs: [string, string][] = [
    ["Collection", product.collection],
    ["Colour", product.colour],
    ["Finish", product.finish],
    ["Size", product.size],
    ["Surface", product.surface],
    ["Application", product.application.join(", ")],
  ];

  const onLoupeMove = (e: React.MouseEvent) => {
    const el = loupeRef.current!;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--zx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--zy", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 1, delay, ease: easePremium },
  });

  return (
    <>
      <section className="container product-detail">
        <div className="product-detail-gallery">
          <motion.div
            ref={loupeRef}
            className={`product-detail-loupe ${zooming ? "is-zooming" : ""}`}
            onMouseMove={onLoupeMove}
            onMouseEnter={() => setZooming(true)}
            onMouseLeave={() => setZooming(false)}
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={ready ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
            transition={{ duration: 1.4, ease: easeInOutExpo }}
          >
            <Media
              tone={product.tone}
              src={product.image}
              alt={`${product.name} stoneware tile`}
              sizes="(max-width: 900px) 100vw, 80vw"
              ratio="4 / 5"
              eager
            />
            <span className="product-detail-loupe-hint">
              <ZoomIn size={14} strokeWidth={1.5} /> Hover to inspect surface
            </span>
          </motion.div>
          <div className="product-detail-gallery-row">
            <Media
              tone={product.tone}
              src={product.image}
              alt={`${product.name} surface detail`}
              sizes="(max-width: 900px) 100vw, 60vw"
              ratio="1 / 1"
              reveal
              imgStyle={{ scale: 2.2 }}
            />
            <Media
              tone={product.tone}
              src={product.inSituImage}
              alt={`${product.name} tiles installed`}
              sizes="(max-width: 900px) 50vw, 28vw"
              ratio="1 / 1"
              reveal
              revealDelay={0.12}
            />
          </div>
        </div>

        <div className="product-detail-info">
          <motion.span className="eyebrow" {...fade(0.2)}>
            {product.collection} Collection
          </motion.span>
          <SplitText as="h1" text={product.name} play={ready} delay={0.3} />

          <dl className="product-detail-specs">
            {specs.map(([label, value], i) => (
              <motion.div key={label} {...fade(0.5 + i * 0.06)}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </motion.div>
            ))}
          </dl>

          <motion.div className="product-detail-actions" {...fade(0.9)}>
            <button className="btn btn-filled">
              <Download size={15} strokeWidth={1.6} /> <RollText text="Download Specification" />
            </button>
            <Link to="/contact" className="btn">
              <Mail size={15} strokeWidth={1.6} /> <RollText text="Request Enquiry" />
            </Link>
          </motion.div>

          <motion.p className="product-detail-note" {...fade(1)}>
            Sample tiles and full technical datasheets are available on request. Colour and surface may vary slightly from screen representation.
          </motion.p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container product-detail-related">
          <span className="eyebrow">More from {product.collection}</span>
          <div className="product-detail-related-grid">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
