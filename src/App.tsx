import { useCallback, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import TransitionLayout from "./components/TransitionLayout";
import { destroySmoothScroll, initSmoothScroll, lockScroll, scrollToY } from "./lib/smoothScroll";
import { IntroContext } from "./lib/transition";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import CollectionDetail from "./pages/CollectionDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import Craft from "./pages/Craft";
import Contact from "./pages/Contact";
import ProductExplorer from "./pages/ProductExplorer";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";

const INTRO_KEY = "matera-intro-seen";

function shouldPlayIntro() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return !sessionStorage.getItem(INTRO_KEY);
  } catch {
    return true;
  }
}

export default function App() {
  const location = useLocation();
  const [introDone, setIntroDone] = useState(() => !shouldPlayIntro());

  useEffect(() => {
    initSmoothScroll();
    return destroySmoothScroll;
  }, []);

  useEffect(() => {
    lockScroll(!introDone);
  }, [introDone]);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      // storage unavailable (private mode) — intro simply replays next load
    }
    setIntroDone(true);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={introDone}>
        <AnimatePresence>{!introDone && <Loader key="loader" onDone={finishIntro} />}</AnimatePresence>
        <Cursor />
        <Navbar />
        <AnimatePresence mode="wait" onExitComplete={() => scrollToY(0, { immediate: true })}>
          <Routes location={location} key={location.pathname}>
            <Route element={<TransitionLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/collections/:slug" element={<CollectionDetail />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/craft" element={<Craft />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/explore" element={<ProductExplorer />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AnimatePresence>
        <Footer />
      </IntroContext.Provider>
    </MotionConfig>
  );
}
