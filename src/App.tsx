import { useCallback, useEffect, useRef, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { easeOut } from "./lib/motion";
import CursorReticle from "./components/CursorReticle";
import GridOverlay from "./components/GridOverlay";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Loader from "./components/Loader";
import About from "./components/About";
import Projects from "./components/Projects";
import Expertise from "./components/Expertise";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/**
 * loading  — boot overlay on top, hero mounted underneath
 * hero     — terminal gate; awaiting `npm run portfolio` launch
 * launched — rest of the site revealed and scrolled into view
 */
type Phase = "loading" | "hero" | "launched";

export default function App() {
  const [phase, setPhase] = useState<Phase>("loading");
  const siteRef = useRef<HTMLDivElement>(null);

  const launch = useCallback(() => {
    setPhase((p) => (p === "hero" ? "launched" : p));
  }, []);

  // Press ENTER to launch while sitting at the terminal gate.
  useEffect(() => {
    if (phase !== "hero") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        launch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, launch]);

  // Once launched, let the reveal begin then smooth-scroll down to it.
  useEffect(() => {
    if (phase !== "launched") return;
    const id = window.setTimeout(() => {
      siteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);
    return () => window.clearTimeout(id);
  }, [phase]);

  const launched = phase === "launched";

  return (
    <MotionConfig reducedMotion="user">
      <CursorReticle />

      {phase === "loading" && <Loader onComplete={() => setPhase("hero")} />}

      <GridOverlay />
      <Header />
      <main>
        <Hero launched={launched} onLaunch={launch} />

        {launched && (
          <motion.div
            ref={siteRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <About />
            <Projects />
            <Expertise />
            <TechStack />
            <Contact />
          </motion.div>
        )}
      </main>

      {launched && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <Footer />
        </motion.div>
      )}
    </MotionConfig>
  );
}
