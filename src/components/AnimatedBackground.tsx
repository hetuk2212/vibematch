"use client";

import { useEffect, useRef, useState } from "react";
import { useBackground } from "./BackgroundProvider";

export default function AnimatedBackground() {
  const { image } = useBackground();
  const [current, setCurrent] = useState(image);
  const [previous, setPrevious] = useState<string | null>(null);
  const [fadeKey, setFadeKey] = useState(0);
  const lastImageRef = useRef(image);

  useEffect(() => {
    if (image !== lastImageRef.current) {
      setPrevious(lastImageRef.current);
      setCurrent(image);
      setFadeKey((k) => k + 1);
      lastImageRef.current = image;
    }
  }, [image]);

  return (
    <div className="vibe-bg" aria-hidden="true">
      {previous && (
        <div className="vibe-bg-layer" style={{ backgroundImage: `url(${previous})` }} />
      )}
      <div
        key={fadeKey}
        className="vibe-bg-layer vibe-bg-layer-enter"
        style={{ backgroundImage: `url(${current})` }}
      />
      <div className="vibe-bg-overlay" />
      <div className="vibe-bg-grain" />
    </div>
  );
}
