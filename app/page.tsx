"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const PURPLE = "#4a1a6b";
const DEEP = "#320b35";
const DARK = "#1a1a1a";

const TOTAL_FRAMES = 420;
const FRAME_PATH = (i: number) => {
  if (i <= 140) return `/salads-frames/frame_${String(i).padStart(4, "0")}.jpg`;
  if (i <= 287) return `/salads-frames/frame_${String(i + 15).padStart(4, "0")}.jpg`;
  return `/salads-frames/frame_${String(i + 15).padStart(4, "0")}.jpg`;
};
const FPS = 24;

export default function PasswordPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const router = useRouter();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef({ current: 0 });
  const directionRef = useRef(1); // 1 = forward, -1 = backward
  const animRef = useRef<number>(0);

  // Password form handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === "panago") {
      router.push("/home");
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 2000);
    }
  };

  // Canvas animation loop
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

    // Preload frames
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) {
          startAnimation();
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    const startAnimation = () => {
      let lastTime = 0;
      const frameInterval = 1000 / FPS;

      const animate = (timestamp: number) => {
        if (timestamp - lastTime >= frameInterval) {
          // Update frame
          frameRef.current.current += directionRef.current;

          // Bounce back at ends
          if (frameRef.current.current >= TOTAL_FRAMES - 1) {
            frameRef.current.current = TOTAL_FRAMES - 1;
            directionRef.current = -1;
          } else if (frameRef.current.current <= 0) {
            frameRef.current.current = 0;
            directionRef.current = 1;
          }

          drawFrame(Math.round(frameRef.current.current));
          lastTime = timestamp;
        }

        animRef.current = requestAnimationFrame(animate);
      };

      animRef.current = requestAnimationFrame(animate);
    };

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <main
      style={{
        background: DARK,
        fontFamily: "Montserrat, sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background canvas animation */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
      />

      {/* Black overlay at 50% opacity */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
          padding: "24px",
        }}
      >
        <img
          src="/panago-logo.png"
          alt="Panago Pizza"
          style={{
            width: "360px",
            marginBottom: "48px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />

        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.35em",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "32px",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Enter Password
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{
              width: "100%",
              padding: "16px 20px",
              background: "rgba(255,255,255,0.05)",
              border: error ? "1px solid #e74c3c" : "1px solid rgba(255,255,255,0.15)",
              borderRadius: "4px",
              color: "#fff",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "14px",
              letterSpacing: "0.1em",
              outline: "none",
              transition: "all 0.3s",
              textAlign: "center",
              animation: shake ? "shake 0.5s ease-in-out" : "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = PURPLE;
              e.target.style.background = "rgba(255,255,255,0.08)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = error ? "#e74c3c" : "rgba(255,255,255,0.15)";
              e.target.style.background = "rgba(255,255,255,0.05)";
            }}
          />

          {error && (
            <p
              style={{
                fontSize: "11px",
                color: "#e74c3c",
                letterSpacing: "0.1em",
                margin: 0,
              }}
            >
              Incorrect password
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "16px 40px",
              background: PURPLE,
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = DEEP;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = PURPLE;
            }}
          >
            Enter
          </button>
        </form>

        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.2)",
            marginTop: "48px",
            textTransform: "uppercase",
          }}
        >
          Canadian to the crust
        </p>
      </div>

      <style>{`
        @import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap);
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-10px); }
          80% { transform: translateX(10px); }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Montserrat, sans-serif; }
        ::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>
    </main>
  );
}
