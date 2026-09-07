import { ImageResponse } from "next/og";

export const alt = "AURELIS AI — Intelligence, refined.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "72px",
        background: "#0B0B0D",
        color: "#F8F7F4",
        fontFamily: "serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <div
          style={{
            width: 116,
            height: 116,
            borderRadius: 58,
            border: "2px solid #D4AF37",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#D4AF37",
            fontSize: 62,
          }}
        >
          A
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, letterSpacing: 8, color: "#D4AF37" }}>AURELIS</div>
          <div style={{ marginTop: 8, fontSize: 25, letterSpacing: 7, color: "#AAA39A" }}>ANDRZEJ MIKULSKI</div>
        </div>
      </div>
      <div style={{ marginTop: 58, width: 240, height: 2, background: "#D4AF37" }} />
      <div style={{ marginTop: 30, fontFamily: "sans-serif", fontSize: 34, letterSpacing: 2 }}>Intelligence, refined.</div>
      <div style={{ marginTop: 18, fontFamily: "sans-serif", fontSize: 22, color: "#AAA39A" }}>Inteligencja. Precyzja. Forma.</div>
    </div>,
    { ...size }
  );
}
