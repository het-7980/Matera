import Hero from "../sections/Hero";
import BrandStatement from "../sections/BrandStatement";
import CollectionsSection from "../sections/CollectionsSection";
import MaterialExperience from "../sections/MaterialExperience";
import CraftSection from "../sections/CraftSection";
import ApplicationsSection from "../sections/ApplicationsSection";
import ProjectsSection from "../sections/ProjectsSection";
import ProductTeaser from "../sections/ProductTeaser";
import AboutTeaser from "../sections/AboutTeaser";
import FinalCTA from "../sections/FinalCTA";
import Marquee from "../components/Marquee";
import { collections } from "../data/collections";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <CollectionsSection showViewAll />
      <MaterialExperience />
      <CraftSection />
      <ApplicationsSection />
      <ProjectsSection />
      <ProductTeaser />
      <AboutTeaser />
      <Marquee items={collections.map((c) => c.name)} />
      <FinalCTA />
    </>
  );
}
