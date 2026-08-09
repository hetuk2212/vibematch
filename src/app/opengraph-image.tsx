import { renderOgImage } from "@/lib/og";

export const alt = "Vibematch — pick a room, hit play";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("VIBEMATCH", "pick a room. hit play. that's it.");
}
