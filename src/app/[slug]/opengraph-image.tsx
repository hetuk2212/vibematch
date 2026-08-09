import { categories, getCategory } from "@/data/categories";
import { renderOgImage } from "@/lib/og";

export const alt = "Vibematch category cover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const category = getCategory(params.slug);
  const title = category?.title ?? "Vibematch";
  const subtitle = category?.tagline ?? "pick a room. hit play. that's it.";
  return renderOgImage(title, subtitle);
}
