import React from "react";
import { motion } from "framer-motion";
import type { BlitzBrandsProps } from "./schema";

export default function BlitzBrands({
  logos = [],
  speed = 25,
}: BlitzBrandsProps) {
  // Duplicate for seamless infinite scroll
  const allLogos = [...logos, ...logos];

  return (
    <section
      style={{
        background: "#ffffff",
        padding: "40px 0",
        borderTop: "1px solid #f3f4f6",
        borderBottom: "1px solid #f3f4f6",
        overflow: "hidden",
      }}
    >
      <div style={{ overflow: "hidden", position: "relative" }}>
        {/* Fade edges */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "140px",
            background: "linear-gradient(to right, #fff, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "140px",
            background: "linear-gradient(to left, #fff, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <motion.div
          style={{
            display: "flex",
            gap: "64px",
            alignItems: "center",
            width: "max-content",
            padding: "8px 0",
          }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {allLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              style={{
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
                opacity: 0.65,
                filter: "grayscale(100%)",
                transition: "opacity 0.2s, filter 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
                (e.currentTarget as HTMLElement).style.filter = "grayscale(0%)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.65";
                (e.currentTarget as HTMLElement).style.filter = "grayscale(100%)";
              }}
            >
              <img
                src={logo.src}
                alt={logo.name}
                style={{
                  height: "auto",
                  maxHeight: "40px",
                  width: "auto",
                  maxWidth: logo.width ? `${logo.width}px` : "auto",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
