import { Link } from "react-router-dom";
import Media from "./Media";
import type { Product } from "../data/products";
import "./ProductCard.css";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.slug}`} className="product-card" data-cursor="View">
      <div className="product-card-media">
        <Media
          tone={product.tone}
          src={product.image}
          alt={`${product.name} stoneware tile`}
          sizes="(max-width: 560px) 50vw, (max-width: 1000px) 40vw, 25vw"
          ratio="4 / 5"
        />
      </div>
      <div className="product-card-info">
        <div className="product-card-info-top">
          <h4>{product.name}</h4>
          <span className="product-card-collection">{product.collection}</span>
        </div>
        <span className="product-card-meta">{product.finish} · {product.size}</span>
      </div>
    </Link>
  );
}
