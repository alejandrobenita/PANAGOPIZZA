"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 145;
const FRAME_PATH = (i: number) => `/salads-frames/frame_${String(i).padStart(4, "0")}.jpg`;

const PURPLE = "#4a1a6b";
const DARK = "#1a1a1a";
export default function SaladsPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef({ current: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = 1920;
    canvas.height = 1080;

    const drawFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) {
          drawFrame(0);
          initAnimation();
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    const initAnimation = () => {
      gsap.to(frameRef.current, {
        current: TOTAL_FRAMES - 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#salads-preview-scroll",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          pin: "#salads-preview-canvas-container",
        },
        onUpdate: () => {
          drawFrame(Math.round(frameRef.current.current));
        },
      });
    };

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <div id="salads-preview-scroll" style={{ height: "300vh", position: "relative" }}>
        <div id="salads-preview-canvas-container" style={{
          height: "100vh",
          position: "sticky",
          top: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}>
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}>
            <p style={{
              fontSize: "11px",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase",
            }}>
              Fresh & Crisp
            </p>
            <h2 style={{
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 300,
              color: "#fff",
              textShadow: "0 2px 40px rgba(0,0,0,0.6)",
              letterSpacing: "-0.02em",
            }}>
              SALADS
            </h2>
            <Link
              href="/salads"
              style={{
                pointerEvents: "all",
                display: "inline-block",
                padding: "14px 40px",
                border: "1px solid #fff",
                color: "#fff",
                fontSize: "11px",
                letterSpacing: "0.3em",
                textDecoration: "none",
                textTransform: "uppercase",
                marginTop: "24px",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = DARK;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#fff";
              }}
            >
              Explore Salads
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
