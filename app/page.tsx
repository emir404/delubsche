import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Owners } from "./components/Owners";
import { Gallery } from "./components/Gallery";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { MobileNav } from "./components/MobileNav";

export default function Home() {
  return (
    <div className="flex flex-col">
      <MobileNav />
      {/* z-10 + solid background so the page slides over the sticky footer
          (curtain reveal) */}
      <div className="relative z-10 flex flex-col bg-background">
        <Hero />
        <About />
        <Owners />
        <Gallery />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
