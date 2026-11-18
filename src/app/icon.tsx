import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#c8f36d",
        borderRadius: "120px",
      }}
    >
      <div
        style={{
          width: "230px",
          height: "230px",
          borderRadius: "9999px",
          border: "36px solid #242038",
        }}
      />
    </div>,
    {
      ...size,
    },
  );
}
