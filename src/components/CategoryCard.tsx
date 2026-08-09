import Link from "next/link";
import type { Category } from "@/data/categories";
import ListenerCount from "./ListenerCount";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/${category.slug}`} className="vibe-card">
      <div
        className="vibe-card-bg"
        style={{ backgroundImage: `url(${category.bgImage})` }}
      />
      <div className="vibe-card-overlay" />
      <div className="vibe-card-content">
        <h2 className="vibe-card-title">{category.title}</h2>
        <p className="vibe-card-tagline">{category.tagline}</p>
        <ListenerCount base={category.listenerBase} className="vibe-card-listeners" />
      </div>
    </Link>
  );
}
