import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <section className="not-found container">
      <span className="eyebrow">404</span>
      <h1>This surface doesn't exist.</h1>
      <Link to="/" className="btn btn-filled">Return Home</Link>
    </section>
  );
}
