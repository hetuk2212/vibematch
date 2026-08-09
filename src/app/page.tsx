import type { Metadata } from "next";
import BackgroundSync from "@/components/BackgroundSync";
import CategoryCard from "@/components/CategoryCard";
import { categories, NEUTRAL_BG } from "@/data/categories";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: "Vibematch — background music rooms. Pick a category, hit play, that's it.",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BackgroundSync image={NEUTRAL_BG} />
      <main className="vibe-picker">
        <header className="vibe-picker-header">
          <h1>vibe radio</h1>
          <p>pick a room. hit play. that&apos;s it.</p>
        </header>
        <div className="vibe-grid">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </main>
    </>
  );
}
