"use client";

import { useEffect } from "react";
import { useBackground } from "./BackgroundProvider";

/** Renders nothing — just tells the persistent AnimatedBackground which photo to crossfade to. */
export default function BackgroundSync({ image }: { image: string }) {
  const { setImage } = useBackground();

  useEffect(() => {
    setImage(image);
  }, [image, setImage]);

  return null;
}
