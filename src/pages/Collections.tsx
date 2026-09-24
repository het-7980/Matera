import PageHero from "../components/PageHero";
import CollectionsSection from "../sections/CollectionsSection";
import FinalCTA from "../sections/FinalCTA";

export default function Collections() {
  return (
    <>
      <PageHero
        eyebrow="Collections"
        title="Four ways to shape stone."
        description="Stacked ledge, cut ashlar, riven strata and sculpted relief — each Matera collection reinterprets a different kind of stone as a textured stoneware wall tile, in 300 × 450 and 300 × 600 mm formats."
      />
      <CollectionsSection />
      <FinalCTA />
    </>
  );
}
