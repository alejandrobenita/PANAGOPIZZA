"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PURPLE = "#4a1a6b";
const DEEP = "#320b35";
const DARK = "#1a1a1a";

export default function PasswordPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const router = useRouter();

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
        padding: "24px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <img
          src="/panago-logo.png"
          alt="Panago Pizza"
          style={{
            width: "180px",
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
