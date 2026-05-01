import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "InkOS Migration — Whatever you're on, we move it for you.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#F7F7F5",
          padding: 80,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(200,53,31,0.18) 0%, rgba(200,53,31,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -150,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(216,149,56,0.15) 0%, rgba(216,149,56,0) 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              background: "#0F0F0F",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#F7F7F5",
              fontSize: 36,
              fontStyle: "italic",
              fontFamily: "serif",
            }}
          >
            i
          </div>
          <span
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#0F0F0F",
              letterSpacing: "-0.02em",
            }}
          >
            InkOS
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontFamily: "serif",
            color: "#0F0F0F",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            maxWidth: 1000,
          }}
        >
          <span style={{ fontStyle: "italic", color: "#C8351F" }}>
            Whatever
          </span>{" "}
          you're on, we move it for you.
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 40,
            borderTop: "1px solid #E7E5E1",
          }}
        >
          <span style={{ fontSize: 22, color: "#4B4842" }}>inkos.studio</span>
          <span
            style={{
              fontSize: 18,
              color: "#787774",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            14-day white-glove · Free above Solo
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
