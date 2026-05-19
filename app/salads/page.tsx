"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 435;
const FRAME_PATH = (i: number) => `/salads-frames/frame_${String(i).padStart(4, "0")}.jpg`;

const PURPLE = "#4a1a6b";
const DEEP = "#320b35";
const DARK = "#1a1a1a";

export default function SaladsPage() {
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
          trigger: "#salads-scroll-zone",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          pin: "#salads-canvas-container",
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
    <main style={{ background: DARK, fontFamily: "Montserrat, sans-serif" }}>

      <nav style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 28px",
        pointerEvents: "none",
      }}>
        <Link href="/" style={{ pointerEvents: "all" }}>
          <img
            src="/panago-logo.png"
            alt="Panago Pizza"
            style={{ width: "120px", display: "block", filter: "none", transition: "filter 0.4s" }}
          />
        </Link>

        <div
          style={{
            cursor: "pointer",
            pointerEvents: "all",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            padding: "8px",
          }}>
          <span style={{ display: "block", width: "28px", height: "2px", background: PURPLE }} />
          <span style={{ display: "block", width: "20px", height: "2px", background: PURPLE }} />
          <span style={{ display: "block", width: "24px", height: "2px", background: PURPLE }} />
        </div>
      </nav>

      <div id="salads-scroll-zone" style={{ height: "800vh", position: "relative" }}>
        <div id="salads-canvas-container" style={{
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
          }}>
            <h1 style={{
              fontSize: "clamp(48px, 8vw, 96px)",
              fontWeight: 300,
              color: "#fff",
              textShadow: "0 2px 40px rgba(0,0,0,0.6)",
              letterSpacing: "-0.02em",
            }}>
              FRESH SALADS
            </h1>
            <p style={{
              fontSize: "11px",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase",
              marginTop: "16px",
            }}>
              Scroll to explore
            </p>
          </div>
        </div>
      </div>

      <section style={{
        background: "#fff",
        padding: "80px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 300,
          color: DEEP,
          marginBottom: "48px",
          textAlign: "center",
        }}>
          Our Salad Selection
        </h2>
        <p style={{ fontSize: "14px", color: "#666", maxWidth: "600px", textAlign: "center", lineHeight: 1.6 }}>
          Fresh, crisp, and made to order. Explore our range of salads crafted with premium ingredients.
        </p>
      </section>

      <footer style={{
        background: DARK,
        padding: "48px 24px",
        textAlign: "center",
        borderTop: "1px solid #2a2a2a",
      }}>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px", letterSpacing: "0.1em" }}>
          &copy; 2026 Panago Pizza. Canadian to the crust.
        </p>
      </footer>

      <style>{`
        @import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap);
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: auto; }
        body { font-family: Montserrat, sans-serif; }
      `}</style>
    </main>
  );
}
