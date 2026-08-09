import { ImageResponse } from "next/og";

export function renderOgImage(title: string, subtitle: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b0b12",
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.10), transparent 55%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.06), transparent 55%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 36,
            color: "rgba(244,244,248,0.72)",
            textAlign: "center",
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 64,
            fontSize: 28,
            fontWeight: 600,
            color: "rgba(244,244,248,0.45)",
            letterSpacing: "0.08em",
          }}
        >
          VIBEMATCH.WTF
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
