import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProjects } from "@/components/bento/FeaturedProjects";
import { Skills } from "@/components/sections/Skills";
import { Hero } from "@/components/hero/Hero";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { GithubTile } from "@/components/bento/GithubTile";
import { InterestsTile } from "@/components/bento/InterestsTile";
import { StatusTile } from "@/components/bento/StatusTile";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Hero bento strip — three dashboard tiles, mobile order:
          status → interests → GitHub (docs/wireframes.md §2). */}
      <section aria-label="Status overview" className="pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <BentoGrid className="md:grid-cols-3">
            <StatusTile />
            <InterestsTile />
            <GithubTile />
          </BentoGrid>
        </div>
      </section>

      <FeaturedProjects />
      <Skills />
      <Experience />
      <About />
      <Contact />
    </>
  );
}
