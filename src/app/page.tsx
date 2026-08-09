import BackgroundSync from "@/components/BackgroundSync";
import CategoryCard from "@/components/CategoryCard";
import { categories, NEUTRAL_BG } from "@/data/categories";

export default function Home() {
  return (
    <>
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
