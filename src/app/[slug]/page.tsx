import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BackgroundSync from "@/components/BackgroundSync";
import ListenerCount from "@/components/ListenerCount";
import LiveClock from "@/components/LiveClock";
import Player from "@/components/Player";
import { ExternalArrowIcon, LinkGlyphIcon } from "@/components/icons";
import { categories, getCategory } from "@/data/categories";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = getCategory(params.slug);
  if (!category) return {};
  return {
    title: `${category.title} — vibe radio`,
    description: category.tagline,
  };
}

export default function CategoryPage({ params }: Props) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  return (
    <>
      <BackgroundSync image={category.bgImage} />
      <main className="vibe-room">
        <div className="vibe-topbar">
          <Link href="/" className="vibe-topbar-clock" aria-label="Back to categories">
            <LiveClock />
          </Link>

          <ListenerCount base={category.listenerBase} className="vibe-topbar-listeners" />

          <div className="vibe-topbar-links">
            <a
              className="vibe-topbar-link"
              href={category.links.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkGlyphIcon />
              Spotify
              <ExternalArrowIcon />
            </a>
            <a
              className="vibe-topbar-link"
              href={category.links.ytmusic}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkGlyphIcon />
              YT Music
              <ExternalArrowIcon />
            </a>
          </div>
        </div>

        <div className="vibe-room-title">
          <h1>{category.title}</h1>
          <p>{category.tagline}</p>
        </div>

        <Player category={category} />
      </main>
    </>
  );
}
