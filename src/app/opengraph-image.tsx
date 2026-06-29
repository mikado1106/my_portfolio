import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mikhael Edo Sinambela — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(#232326 1px, transparent 1px), linear-gradient(90deg, #232326 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.4,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            position: "relative",
          }}
        >
          {/* Green dot */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "9999px",
              border: "1px solid #232326",
              backgroundColor: "#111113",
              fontSize: "14px",
              color: "#52525b",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
              }}
            />
            Available for opportunities
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "#fafafa",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            Mikhael Edo Sinambela
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "24px",
              color: "#a1a1aa",
              marginTop: "4px",
            }}
          >
            Full-Stack Developer · Jakarta, Indonesia
          </div>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "20px",
            }}
          >
            {["React", "Next.js", "PHP", "Flutter", "TypeScript"].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  border: "1px solid #232326",
                  backgroundColor: "#111113",
                  color: "#52525b",
                  fontSize: "14px",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
