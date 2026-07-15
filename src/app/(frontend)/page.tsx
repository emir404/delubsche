import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Owners } from "@/components/Owners";
import { Gallery } from "@/components/Gallery";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { getHomeData, getSiteData } from "@/lib/content";

// Content is edited in the admin — re-render the page about once a minute so
// a save goes live without a deploy.
export const revalidate = 60;

export default async function Home() {
  const [home, site] = await Promise.all([getHomeData(), getSiteData()]);

  return (
    <div className="flex flex-col">
      <MobileNav site={site} />
      {/* z-10 + solid background so the page slides over the sticky footer
          (curtain reveal) */}
      <div className="relative z-10 flex flex-col bg-background">
        <Hero hero={home.hero} site={site} />
        <About about={home.about} site={site} />
        <Owners owners={home.owners} />
        <Gallery gallery={home.gallery} />
        <Contact contact={home.contact} site={site} />
      </div>
      <Footer site={site} />
    </div>
  );
}
