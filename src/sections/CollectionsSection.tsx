import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Media from "../components/Media";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import SplitText from "../components/SplitText";
import { collections } from "../data/collections";
import { easePremium } from "../lib/motion";
import "./CollectionsSection.css";

interface CollectionsSectionProps {
  showViewAll?: boolean;
}

export default function CollectionsSection({ showViewAll = false }: CollectionsSectionProps) {
  return (
    <section className="collections-section">
      <div className="container">
        <div className="collections-header">
          <SectionHeading eyebrow="Range" title="The Collection" />
          {showViewAll && (
            <Reveal delay={0.1}>
              <Link to="/collections" className="collections-view-all link-underline">
                View All Collections <ArrowUpRight size={15} strokeWidth={1.5} />
              </Link>
            </Reveal>
          )}
        </div>
      </div>

      <div className="collections-list">
        {collections.map((c) => (
          <Link key={c.slug} to={`/collections/${c.slug}`} className="collection-row" data-cursor="Explore">
            <div className="collection-row-media">
              <Media
                tone={c.tone}
                src={c.image}
                alt={`${c.name} collection wall tiles`}
                ratio="16 / 10"
                reveal
                parallax={0.12}
              />
            </div>
            <motion.div
              className="collection-row-content container"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <motion.span
                className="collection-row-index"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.7, transition: { duration: 1, delay: 0.5 } } }}
              >
                {c.index}
              </motion.span>
              <div className="collection-row-text">
                <SplitText as="h3" className="collection-row-name" text={c.name} mode="chars" stagger={0.035} delay={0.35} />
                <motion.p
                  className="collection-row-desc"
                  variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.7, ease: easePremium } } }}
                >
                  {c.description}
                </motion.p>
              </div>
              <motion.span
                className="collection-row-cta"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1, delay: 0.9 } } }}
              >
                Explore <ArrowUpRight size={16} strokeWidth={1.5} />
              </motion.span>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
