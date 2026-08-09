"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type BackgroundContextValue = {
  image: string;
  setImage: (src: string) => void;
};

const BackgroundContext = createContext<BackgroundContextValue | null>(null);

export function BackgroundProvider({
  initialImage,
  children,
}: {
  initialImage: string;
  children: ReactNode;
}) {
  const [image, setImage] = useState(initialImage);
  const value = useMemo(() => ({ image, setImage }), [image]);

  return <BackgroundContext.Provider value={value}>{children}</BackgroundContext.Provider>;
}

export function useBackground() {
  const ctx = useContext(BackgroundContext);
  if (!ctx) throw new Error("useBackground must be used within BackgroundProvider");
  return ctx;
}
