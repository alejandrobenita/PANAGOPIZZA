"use client";
import SaladsPreview from "./SaladsPreview";import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 97;
const FRAME_PATH = (i: number) => `/frames/frame_${String(i).padStart(4, "0")}.jpg`;

const PURPLE = "#4a1a6b";
const DEEP = "#320b35";
const DARK = "#1a1a1a";

const MENU_ITEMS = [
  "Value Menu", "Deals", "Pizzas", "Salads", "Sides", "Dips", "Dessert", "Beverages",
];

const DEALS = [
  {
    title: 'Taco Churro Meal Deal',
    desc: 'Buy a 14" large Chicken or Beef Taco pizza and get an 8 pc Churro Bites for only $2.75. Delivery fee not included.',
    image: '/deal-taco.jpg',
    alt: 'Taco pizza with churros',
  },
  {
    title: 'Cajun Chicken Southwest Salad',
    desc: 'Cajun chicken, romaine lettuce, fire-roasted corn, diced tomatoes, pepperoncini, black olives, green peppers + feta. Delivery fee not included.',
    image: '/deal-salad.jpg',
    alt: 'Fresh southwest salad',
  },
  {
    title: 'Cheezy Bread Deal',
    desc: 'Buy any 2 - 12" medium recipe pizzas and get an 8 pc Cheezy Bread (includes dip) for only $2.75. Delivery fee not included.',
    image: '/deal-bread.jpg',
    alt: 'Cheezy bread with pizzas',
  },
];

const FOOTER_LINKS_LEFT = [
  "Franchise Opportunities", "Terms and Conditions", "Nutrition", "Catering",
  "Gift Cards", "Community + School Programs", "Contact Us", "Work With Us",
];

const SOCIAL_ICONS = ["IG", "FB", "X"];

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef({ current: 0 });
  const logoCenterRef = useRef<HTMLImageElement>(null);
  const logoNavRef = useRef<HTMLDivElement>(null);
  const logoNavImgRef = useRef<HTMLImageElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const sloganRef = useRef<HTMLDivElement>(null);
  const since1986Ref = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    canvas.width = 1920;
    canvas.height = 1080;

    const drawFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    const images = [];
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
          trigger: "#scroll-zone",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          pin: "#canvas-container",
        },
        onUpdate: () => {
          drawFrame(Math.round(frameRef.current.current));
        },
      });

      ScrollTrigger.create({
        trigger: "#scroll-zone",
        start: "top top",
        end: "90% bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (logoCenterRef.current) logoCenterRef.current.style.opacity = `${1 - p}`;
          if (since1986Ref.current) since1986Ref.current.style.opacity = `${1 - p}`;
        },
      });

      ScrollTrigger.create({
        trigger: "#scroll-zone",
        start: "top top",
        end: "60% bottom",
        scrub: true,
        onUpdate: (self) => {
          if (sloganRef.current) sloganRef.current.style.opacity = `${1 - self.progress}`;
        },
      });

      ScrollTrigger.create({
        trigger: "#scroll-zone",
        start: "35% top",
        end: "55% bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (logoNavRef.current) logoNavRef.current.style.opacity = `${p}`;
          if (menuRef.current) menuRef.current.style.opacity = `${p}`;
        },
      });

      // Color inversion when nav passes over purple section
      ScrollTrigger.create({
        trigger: "#deals-section",
        start: "top 60px",
        end: "bottom 60px",
        onEnter: () => {
          if (logoNavImgRef.current) logoNavImgRef.current.style.filter = "brightness(0) invert(1)";
          if (hamburgerRef.current) {
            const spans = hamburgerRef.current.querySelectorAll("span");
            spans.forEach((s) => (s.style.background = "#fff"));
          }
        },
        onLeave: () => {
          if (logoNavImgRef.current) logoNavImgRef.current.style.filter = "none";
          if (hamburgerRef.current) {
            const spans = hamburgerRef.current.querySelectorAll("span");
            spans.forEach((s) => (s.style.background = PURPLE));
          }
        },
        onEnterBack: () => {
          if (logoNavImgRef.current) logoNavImgRef.current.style.filter = "brightness(0) invert(1)";
          if (hamburgerRef.current) {
            const spans = hamburgerRef.current.querySelectorAll("span");
            spans.forEach((s) => (s.style.background = "#fff"));
          }
        },
        onLeaveBack: () => {
          if (logoNavImgRef.current) logoNavImgRef.current.style.filter = "none";
          if (hamburgerRef.current) {
            const spans = hamburgerRef.current.querySelectorAll("span");
            spans.forEach((s) => (s.style.background = PURPLE));
          }
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
        <img
          ref={(el) => { logoNavRef.current = el; logoNavImgRef.current = el; }}
          src="/panago-logo.png"
          alt="Panago Pizza"
          style={{ width: "180px", opacity: 0, display: "block", pointerEvents: "none", filter: "none", transition: "filter 0.4s" }}
        />

        <div
          ref={(el) => { menuRef.current = el; hamburgerRef.current = el; }}
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            opacity: 0,
            cursor: "pointer",
            pointerEvents: "all",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            padding: "8px",
            transition: "filter 0.4s",
          }}>
          <span style={{ display: "block", width: "28px", height: "2px", background: PURPLE, transition: "background 0.4s" }} />
          <span style={{ display: "block", width: "20px", height: "2px", background: PURPLE, transition: "background 0.4s" }} />
          <span style={{ display: "block", width: "24px", height: "2px", background: PURPLE, transition: "background 0.4s" }} />
        </div>
      </nav>

      {menuOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(26,26,26,0.97)",
          zIndex: 99,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "28px",
        }}>
          {MENU_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => setMenuOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "clamp(18px, 3.5vw, 28px)",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 300,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                padding: "8px 24px",
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = PURPLE; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#fff"; }}
            >
              {item}
            </button>
          ))}
          <div style={{ display: "flex", gap: "24px", marginTop: "32px" }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", letterSpacing: "0.2em", cursor: "pointer" }}>Log In</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", letterSpacing: "0.2em", cursor: "pointer" }}>Orders</span>
            <span style={{ color: PURPLE, fontSize: "11px", letterSpacing: "0.2em", cursor: "pointer" }}>Cart (0)</span>
          </div>
        </div>
      )}

      <div id="scroll-zone" style={{ height: "400vh", position: "relative" }}>
        <div id="canvas-container" style={{
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
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0)",
            zIndex: 5,
          }} />

          <div style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "18px",
          }}>
            <p
              ref={sloganRef}
              style={{
                fontSize: "14px",
                letterSpacing: "0.35em",
                color: "rgba(255,255,255,0.7)",
                textTransform: "uppercase",
                fontWeight: 500,
                opacity: 1,
              }}>
              Canadian to the crust
            </p>
            <img
              ref={logoCenterRef}
              src="/panago-logo.png"
              alt="Panago Pizza"
              style={{
                width: "clamp(320px, 50vw, 680px)",
                display: "block",
                opacity: 1,
              }}
            />
            <p
              ref={since1986Ref}
              style={{
                fontSize: "14px",
                letterSpacing: "0.35em",
                color: "rgba(255,255,255,0.55)",
                textTransform: "uppercase",
                fontWeight: 400,
                opacity: 1,
              }}>
              Since 1986
            </p>
            <p style={{
              fontSize: "10px",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              fontWeight: 400,
              animation: "pulse 2s ease-in-out infinite",
              marginTop: "8px",
            }}>
              Scroll to explore
            </p>
          </div>
        </div>
      </div>

      <section id="deals-section" style={{
        background: PURPLE,
        padding: "100px 24px 120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <p style={{
          fontSize: "11px",
          letterSpacing: "0.4em",
          color: "rgba(255,255,255,0.5)",
          marginBottom: "16px",
          textTransform: "uppercase",
          fontWeight: 500,
        }}>
          Limited Time
        </p>
        <h2 style={{
          fontSize: "clamp(36px, 6vw, 72px)",
          fontWeight: 300,
          color: "#fff",
          marginBottom: "64px",
          textAlign: "center",
          letterSpacing: "-0.02em",
        }}>
          Hot Deals
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "32px",
          maxWidth: "1200px",
          width: "100%",
        }}>
          {DEALS.map((deal) => (
            <div
              key={deal.title}
              style={{
                background: "#fff",
                borderRadius: "12px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.4s, box-shadow 0.4s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 24px 60px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{
                width: "100%",
                aspectRatio: "4/3",
                overflow: "hidden",
                position: "relative",
              }}>
                <img
                  src={deal.image}
                  alt={deal.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <div style={{
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                flex: 1,
              }}>
                <div>
                  <p style={{
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: PURPLE,
                    textTransform: "uppercase",
                    marginBottom: "8px",
                    fontWeight: 600,
                  }}>
                    {deal.title}
                  </p>
                  <p style={{
                    fontSize: "13px",
                    lineHeight: 1.6,
                    color: "#555",
                    fontWeight: 400,
                  }}>
                    {deal.desc}
                  </p>
                </div>
                <button style={{
                  alignSelf: "flex-start",
                  padding: "14px 32px",
                  background: PURPLE,
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.background = DEEP; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.background = PURPLE; }}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Salads Preview Section */}
      <section id="salads-preview" style={{
        background: DARK,
        padding: "0",
        position: "relative",
      }}>
        <SaladsPreview />
      </section>
      <footer style={{
        background: DARK,
        padding: "64px 24px 48px",
        borderTop: "1px solid #2a2a2a",
      }}>
        <div style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          alignItems: "start",
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
            {FOOTER_LINKS_LEFT.map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  fontWeight: 400,
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
              >
                {link}
              </a>
            ))}
          </div>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            alignItems: "flex-end",
            textAlign: "right",
          }}>
            <div>
              <p style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
                marginBottom: "8px",
                fontWeight: 500,
              }}>
                Call to Order
              </p>
              <a
                href="tel:310-0001"
                style={{
                  color: PURPLE,
                  fontSize: "24px",
                  letterSpacing: "0.05em",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                310–0001
              </a>
            </div>

            <div>
              <p style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
                marginBottom: "16px",
                fontWeight: 500,
              }}>
                Let&apos;s Connect
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "flex-end" }}>
                {SOCIAL_ICONS.map((icon) => (
                  <a
                    key={icon}
                    href="#"
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "11px",
                      fontWeight: 600,
                      textDecoration: "none",
                      letterSpacing: "0.05em",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = PURPLE;
                      el.style.color = PURPLE;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "rgba(255,255,255,0.2)";
                      el.style.color = "rgba(255,255,255,0.5)";
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          maxWidth: "1000px",
          margin: "48px auto 0",
          paddingTop: "32px",
          borderTop: "1px solid #2a2a2a",
          textAlign: "center",
        }}>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px", letterSpacing: "0.1em" }}>
            &copy; 2026 Panago Pizza. Canadian to the crust.
          </p>
        </div>
      </footer>

      <style>{`
        @import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap);
        @keyframes pulse { 0%,100%{opacity:0.35} 50%{opacity:0.1} }
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: auto; }
        body { font-family: Montserrat, sans-serif; }
      `}</style>
    </main>
  );
}
