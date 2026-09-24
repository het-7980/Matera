import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import PageHero from "../components/PageHero";
import ProductCard from "../components/ProductCard";
import { filterOptions, products } from "../data/products";
import { easePremium } from "../lib/motion";
import { usePageReady } from "../lib/transition";
import "./ProductExplorer.css";

type FilterKey = keyof typeof filterOptions;

const FILTER_LABELS: Record<FilterKey, string> = {
  collection: "Collection",
  colour: "Colour",
  finish: "Finish",
  size: "Size",
  surface: "Surface",
  application: "Application",
};

export default function ProductExplorer() {
  const [searchParams] = useSearchParams();
  const initialCollection = searchParams.get("collection") ?? "";

  const [active, setActive] = useState<Record<FilterKey, string>>({
    collection: initialCollection,
    colour: "",
    finish: "",
    size: "",
    surface: "",
    application: "",
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const ready = usePageReady();
  // Stagger only the initial page reveal; filter changes should respond instantly.
  const [firstReveal, setFirstReveal] = useState(true);

  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => setFirstReveal(false), 1800);
    return () => window.clearTimeout(t);
  }, [ready]);

  const toggleFilter = (key: FilterKey, value: string) => {
    setActive((prev) => ({ ...prev, [key]: prev[key] === value ? "" : value }));
  };

  const clearFilters = () =>
    setActive({ collection: "", colour: "", finish: "", size: "", surface: "", application: "" });

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (active.collection && p.collection !== active.collection) return false;
      if (active.colour && p.colour !== active.colour) return false;
      if (active.finish && p.finish !== active.finish) return false;
      if (active.size && p.size !== active.size) return false;
      if (active.surface && p.surface !== active.surface) return false;
      if (active.application && !p.application.includes(active.application)) return false;
      return true;
    });
  }, [active]);

  const activeCount = Object.values(active).filter(Boolean).length;

  return (
    <>
      <PageHero
        eyebrow="Catalogue"
        title="Explore surfaces."
        description="Filter the full Matera range by collection, colour, finish, size, surface and application."
      />

      <section className="container explorer-layout">
        <button className="explorer-filter-toggle" onClick={() => setFiltersOpen((v) => !v)}>
          <SlidersHorizontal size={16} strokeWidth={1.5} />
          Filters {activeCount > 0 && `(${activeCount})`}
        </button>

        <aside className={`explorer-filters ${filtersOpen ? "is-open" : ""}`}>
          <div className="explorer-filters-header">
            <span className="eyebrow">Filter</span>
            {activeCount > 0 && (
              <button className="explorer-clear" onClick={clearFilters}>
                Clear <X size={13} strokeWidth={1.6} />
              </button>
            )}
          </div>

          {(Object.keys(filterOptions) as FilterKey[]).map((key) => (
            <div className="explorer-filter-group" key={key}>
              <span className="explorer-filter-label">{FILTER_LABELS[key]}</span>
              <div className="explorer-filter-options">
                {filterOptions[key].map((value) => (
                  <button
                    key={value}
                    className={`explorer-chip ${active[key] === value ? "is-active" : ""}`}
                    onClick={() => toggleFilter(key, value)}
                    aria-pressed={active[key] === value}
                  >
                    {active[key] === value && (
                      <motion.span
                        layoutId={`chip-${key}`}
                        className="explorer-chip-bg"
                        transition={{ type: "spring", stiffness: 420, damping: 38 }}
                      />
                    )}
                    <span className="explorer-chip-label">{value}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </aside>

        <div className="explorer-results">
          <div className="explorer-results-count" aria-live="polite">
            {filtered.length} surface{filtered.length !== 1 ? "s" : ""}
          </div>
          <motion.div layout className="explorer-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 28, scale: 0.97 }}
                  animate={ready ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.97 }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.35 } }}
                  transition={{
                    duration: 0.8,
                    ease: easePremium,
                    delay: firstReveal ? 0.2 + i * 0.06 : 0,
                    layout: { duration: 0.7, ease: easePremium },
                  }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div
                className="explorer-empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <p>No surfaces match the selected filters.</p>
                <button className="btn" onClick={clearFilters}>Clear Filters</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
