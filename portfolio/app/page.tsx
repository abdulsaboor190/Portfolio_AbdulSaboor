import type { Metadata } from "next";
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
import { Reveal } from "@/components/shared/Reveal";
import { site } from "@/lib/site-config";

const title = `${site.name} — ${site.role}`;
const description = `${site.headline} ${site.pitch}`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

// Person structured data — real values only (name, role, URLs from config).
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "FAST-NUCES",
  },
  sameAs: [site.links.github, site.links.linkedin].filter(Boolean),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />

      {/* Hero bento strip — three dashboard tiles, mobile order:
          status → interests → GitHub (docs/wireframes.md §2). */}
      <section aria-label="Status overview" className="pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <BentoGrid className="md:grid-cols-3">
              <StatusTile />
              <InterestsTile />
              <GithubTile />
            </BentoGrid>
          </Reveal>
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
