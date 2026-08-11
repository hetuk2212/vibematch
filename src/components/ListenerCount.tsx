"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";

type ListenerCountProps = {
  slug: string;
  className?: string;
};

export default function ListenerCount({ slug, className }: ListenerCountProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    setCount(null);

    const channel = supabase.channel(`listeners:${slug}`, {
      config: { presence: { key: crypto.randomUUID() } },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        setCount(Object.keys(channel.presenceState()).length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug]);

  return (
    <span className={className}>
      <span className="vibe-live-dot" aria-hidden="true" />
      {count === null ? "—" : count.toLocaleString()} listening
    </span>
  );
}
