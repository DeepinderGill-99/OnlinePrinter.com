import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  BookOpen,
  PartyPopper,
  Crown,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
  MessageCircle,
  Volume2,
  VolumeX,
  Users,
  PlaneTakeoff,
  BedDouble,
} from "lucide-react";

/* ============================================================
   THEME TOKENS
   ============================================================ */
const C = {
  maroonDeep: "#2B0512",
  maroon: "#800020",
  maroonLight: "#A33247",
  emerald: "#0B6E4F",
  emeraldLight: "#14895F",
  gold: "#D4AF37",
  goldLight: "#F1D77E",
  ivory: "#FBF3E7",
  ink: "#3A1220",
  /* hero palette — premium baby pink + gold */
  blush: "#FCE9EE",
  babyPink: "#F3C9D4",
  pinkMid: "#E6A8BC",
  pinkDeep: "#C97D96",
  roseInk: "#5A2438",
  roseInkSoft: "#7A3A50",
  /* site-wide dark rose family (replaces maroon as the base theme) */
  roseDeep: "#3D1626",
  roseBase: "#9C3A5C",
};

const WHATSAPP_NUMBER = "918837712597"; // +91 88377 12597
const WHATSAPP_DISPLAY = "+91 88377 12597";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "With the blessings of our families — I had a question about Gurpreet & Harleen's wedding! 🌸"
)}`;

/* Royalty-free / non-copyright ambient wedding music.
   "Wedding March" (Mendelssohn), public-domain recording via Musopen / European Archive,
   hosted on Wikimedia Commons (Special:FilePath is the stable hotlink form). */
const WEDDING_SONG_URL =
  "https://commons.wikimedia.org/wiki/Special:FilePath/A_Midsummer_Night%27s_Dream_Op._61_Wedding_March_%28Mendelssohn%29_European_Archive.ogg";
const WEDDING_SONG_CREDIT = "“Wedding March” — Mendelssohn, performed by European Archive (Public Domain, via Musopen)";

const JALI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'>
    <g fill='none' stroke='${C.gold}' stroke-width='0.6' opacity='0.5'>
      <circle cx='40' cy='40' r='14'/>
      <path d='M40 4 L76 40 L40 76 L4 40 Z'/>
      <circle cx='40' cy='40' r='2'/>
    </g>
  </svg>`);

const JALI_ROSE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>
    <g fill='none' stroke='${C.gold}' stroke-width='0.7' opacity='0.55'>
      <circle cx='60' cy='60' r='20'/>
      <circle cx='60' cy='60' r='30'/>
      <path d='M60 4 L116 60 L60 116 L4 60 Z'/>
      <path d='M60 24 L96 60 L60 96 L24 60 Z'/>
    </g>
  </svg>`);

/* ============================================================
   GLOBAL STYLE / KEYFRAMES
   ============================================================ */
function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Poppins:wght@300;400;500;600&display=swap');

      .prw-root { font-family: 'Poppins', sans-serif; color: ${C.roseInk}; }
      .prw-display { font-family: 'Cormorant Garamond', serif; }
      .prw-label { font-family: 'Cinzel', serif; letter-spacing: 0.18em; }

      section { transition: background 0.6s ease; }

      @keyframes prwFall {
        0% { transform: translateY(-12vh) rotate(0deg); opacity: 0; }
        8% { opacity: 0.9; }
        100% { transform: translateY(112vh) rotate(380deg); opacity: 0.2; }
      }
      @keyframes prwConfetti {
        0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
        100% { transform: translateY(108vh) rotate(540deg); opacity: 0; }
      }
      @keyframes prwFlapOpen {
        from { transform: rotateX(0deg); }
        to { transform: rotateX(-178deg); }
      }
      @keyframes prwLetterRise {
        from { transform: translateY(10px) scale(0.92); opacity: 0; }
        to { transform: translateY(-46px) scale(1); opacity: 1; }
      }
      @keyframes prwFadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes prwBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(8px); }
      }
      @keyframes prwPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.55); }
        50% { box-shadow: 0 0 0 12px rgba(212,175,55,0); }
      }
      @keyframes prwShimmer {
        0% { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
      }
      @keyframes prwSpinSlow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes prwSpinSlowRev {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
      }
      @keyframes prwTwinkle {
        0%, 100% { opacity: 0.15; transform: scale(0.7); }
        50% { opacity: 1; transform: scale(1.15); }
      }
      @keyframes prwGlowDrift {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(14px, -10px) scale(1.08); }
      }
      @keyframes prwSheen {
        0% { transform: translateX(-120%) skewX(-12deg); }
        100% { transform: translateX(220%) skewX(-12deg); }
      }
      @keyframes prwPopIn {
        0% { opacity: 0; transform: scale(0.85) translateY(12px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
      }

      /* ---- interactive transition utilities (used across every section) ---- */
      .prw-card {
        transition: transform 0.45s cubic-bezier(.22,1,.36,1), box-shadow 0.45s ease, border-color 0.35s ease;
      }
      .prw-card:hover, .prw-card:focus-within {
        transform: translateY(-5px) scale(1.012);
        box-shadow: 0 18px 34px rgba(90,36,56,0.18);
        border-color: ${C.gold} !important;
      }
      .prw-btn {
        transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s ease, filter 0.3s ease;
      }
      .prw-btn:hover {
        transform: translateY(-2px) scale(1.03);
        filter: brightness(1.06);
        box-shadow: 0 10px 22px rgba(90,36,56,0.22);
      }
      .prw-btn:active { transform: translateY(0) scale(0.97); }
      .prw-link {
        transition: color 0.25s ease, gap 0.25s ease, letter-spacing 0.25s ease;
      }
      .prw-link:hover { color: ${C.roseInk} !important; letter-spacing: 0.02em; }
      .prw-icon-btn {
        transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
      }
      .prw-icon-btn:hover {
        transform: translateY(-2px) scale(1.08);
        box-shadow: 0 8px 18px rgba(90,36,56,0.25);
      }
      .prw-dot { transition: width 0.35s ease, background 0.35s ease, opacity 0.35s ease; }
      .prw-img-fade { animation: prwPopIn 0.55s ease; }
      .prw-reveal {
        opacity: 0;
        transform: translateY(26px);
        transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
      }
      .prw-reveal.prw-in {
        opacity: 1;
        transform: translateY(0);
      }
      .prw-input-focus {
        transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
      }
      .prw-input-focus:focus {
        border-color: ${C.gold} !important;
        box-shadow: 0 0 0 3px rgba(212,175,55,0.18);
        background: rgba(255,255,255,0.85) !important;
      }
      .prw-scrollbtn:focus-visible, .prw-focus:focus-visible {
        outline: 2px solid ${C.gold};
        outline-offset: 3px;
      }
      @media (prefers-reduced-motion: reduce) {
        .prw-root * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
      }
    `}</style>
  );
}

/* ============================================================
   AMBIENT FLOATING PETALS (subtle, always on)
   ============================================================ */
function FloatingPetals({ count = 10 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.round((i / count) * 100 + (i % 3) * 2),
        delay: (i * 1.7) % 12,
        duration: 14 + (i % 5) * 3,
        size: 6 + (i % 4) * 2,
        color: i % 2 === 0 ? C.gold : C.goldLight,
      })),
    [count]
  );
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}
    >
      {petals.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: "-8%",
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            borderRadius: "0 60% 0 60%",
            background: p.color,
            opacity: 0.35,
            animation: `prwFall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   CONFETTI BURST (triggered)
   ============================================================ */
function ConfettiBurst({ active, burstId }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 42 }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2.4 + Math.random() * 1.6,
        size: 6 + Math.random() * 7,
        color: [C.gold, C.goldLight, C.emerald, C.pinkDeep, "#ffffff"][i % 5],
        round: Math.random() > 0.5,
      })),
    [burstId]
  );
  if (!active) return null;
  return (
    <div
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 60 }}
    >
      {pieces.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: "-8%",
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.4,
            background: p.color,
            borderRadius: p.round ? "50%" : "2px",
            animation: `prwConfetti ${p.duration}s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   SCROLL REVEAL WRAPPER (used throughout for entrance transitions)
   ============================================================ */
function Reveal({ children, delay = 0, as = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} className={`prw-reveal${shown ? " prw-in" : ""}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </Tag>
  );
}

/* ============================================================
   ORNAMENTAL DIVIDER
   ============================================================ */
function Divider({ tone = "gold" }) {
  const lineColor = tone === "gold" ? C.gold : C.emeraldLight;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "0 1.5rem" }}>
      <span style={{ height: 1, flex: 1, background: `linear-gradient(to left, ${lineColor}, transparent)` }} />
      <Sparkles size={16} color={lineColor} />
      <span style={{ height: 1, flex: 1, background: `linear-gradient(to right, ${lineColor}, transparent)` }} />
    </div>
  );
}

function Eyebrow({ children, color = C.roseInkSoft }) {
  return (
    <p
      className="prw-label"
      style={{ color, fontSize: 12, textAlign: "center", margin: "0 0 8px 0", fontWeight: 600 }}
    >
      {children}
    </p>
  );
}

/* ---- premium hero decoration: twinkles, glow blobs, corners, mandala ---- */
function TwinkleStars({ count = 18 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        top: (i * 37) % 100,
        left: (i * 53 + 7) % 100,
        size: 2 + (i % 3) * 1.5,
        delay: (i * 0.41) % 4,
        duration: 2.4 + (i % 4) * 0.6,
      })),
    [count]
  );
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
      {stars.map((s, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: i % 3 === 0 ? C.gold : "#FFFFFF",
            boxShadow: `0 0 6px 1px ${C.goldLight}`,
            animation: `prwTwinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function GlowBlobs() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <div
        style={{
          position: "absolute",
          top: "-8%",
          left: "-12%",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.goldLight}55, transparent 70%)`,
          filter: "blur(18px)",
          animation: "prwGlowDrift 9s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "4%",
          right: "-10%",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.pinkDeep}66, transparent 70%)`,
          filter: "blur(20px)",
          animation: "prwGlowDrift 11s ease-in-out 1.5s infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "8%",
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.gold}40, transparent 70%)`,
          filter: "blur(14px)",
        }}
      />
    </div>
  );
}

function CornerFlourish({ corner = "tl" }) {
  const rot = { tl: 0, tr: 90, br: 180, bl: 270 }[corner];
  const pos =
    corner === "tl"
      ? { top: 14, left: 14 }
      : corner === "tr"
      ? { top: 14, right: 14 }
      : corner === "br"
      ? { bottom: 14, right: 14 }
      : { bottom: 14, left: 14 };
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      style={{ position: "absolute", ...pos, transform: `rotate(${rot}deg)`, zIndex: 3, opacity: 0.85 }}
      aria-hidden="true"
    >
      <path d="M2 2 H22 M2 2 V22" stroke={C.gold} strokeWidth="1.5" fill="none" />
      <path d="M2 2 Q2 16 16 16" stroke={C.gold} strokeWidth="1" fill="none" opacity="0.7" />
      <circle cx="2" cy="2" r="2.5" fill={C.gold} />
      <circle cx="14" cy="2" r="1.3" fill={C.goldLight} />
      <circle cx="2" cy="14" r="1.3" fill={C.goldLight} />
    </svg>
  );
}

function MandalaRings() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 320,
        height: 320,
        marginLeft: -160,
        marginTop: -190,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <svg width="320" height="320" viewBox="0 0 320 320" style={{ position: "absolute", inset: 0, animation: "prwSpinSlow 60s linear infinite" }}>
        <circle cx="160" cy="160" r="148" fill="none" stroke={C.gold} strokeWidth="0.7" strokeDasharray="2 8" opacity="0.45" />
      </svg>
      <svg width="320" height="320" viewBox="0 0 320 320" style={{ position: "absolute", inset: 0, animation: "prwSpinSlowRev 80s linear infinite" }}>
        <circle cx="160" cy="160" r="118" fill="none" stroke={C.goldLight} strokeWidth="0.6" strokeDasharray="1 5" opacity="0.35" />
      </svg>
    </div>
  );
}

function ToranGarland() {
  // a string of small mango-leaves + bells across the very top — classic bandanwar/toran motif
  const leaves = Array.from({ length: 13 });
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="46"
      viewBox="0 0 400 46"
      preserveAspectRatio="none"
      style={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 2, opacity: 0.9 }}
    >
      <path d="M0 2 Q200 26 400 2" stroke={C.gold} strokeWidth="1.4" fill="none" opacity="0.8" />
      {leaves.map((_, i) => {
        const x = 8 + i * (384 / 12);
        const y = 2 + 24 * Math.sin((i / 12) * Math.PI);
        return (
          <g key={i} transform={`translate(${x}, ${y})`}>
            <path d="M0 0 L-6 11 Q0 18 6 11 Z" fill={i % 3 === 0 ? C.pinkDeep : C.gold} opacity="0.85" />
            <circle cx="0" cy="15" r="1.6" fill={C.goldLight} />
          </g>
        );
      })}
    </svg>
  );
}

function MonogramWatermark() {
  return (
    <div
      aria-hidden="true"
      className="prw-display"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <span style={{ fontSize: 220, fontStyle: "italic", color: C.roseInk, opacity: 0.05, whiteSpace: "nowrap" }}>
        G &amp; H
      </span>
    </div>
  );
}

function PaperGrain() {
  const grain =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>
      <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter>
      <rect width='100%' height='100%' filter='url(#n)' opacity='0.5'/>
    </svg>`);
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("${grain}")`,
        opacity: 0.05,
        mixBlendMode: "multiply",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}

function RibbonBow({ style }) {
  return (
    <svg width="40" height="26" viewBox="0 0 40 26" style={style} aria-hidden="true">
      <path d="M18 13 C18 13 2 2 2 13 C2 22 14 18 18 13 Z" fill={C.pinkDeep} stroke={C.gold} strokeWidth="0.8" />
      <path d="M22 13 C22 13 38 2 38 13 C38 22 26 18 22 13 Z" fill={C.pinkDeep} stroke={C.gold} strokeWidth="0.8" />
      <circle cx="20" cy="13" r="4" fill={C.gold} />
      <path d="M20 17 L16 26 M20 17 L24 26" stroke={C.pinkDeep} strokeWidth="2" fill="none" />
    </svg>
  );
}

/* ============================================================
   1. HERO — ENVELOPE + GATE
   ============================================================ */
function HeroSection({ onAdvance }) {
  const [stage, setStage] = useState("closed"); // closed -> opening -> gate

  const handleOpen = () => {
    if (stage !== "closed") return;
    setStage("opening");
    setTimeout(() => setStage("gate"), 1500);
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: `radial-gradient(circle at 50% 18%, ${C.blush} 0%, ${C.babyPink} 45%, ${C.pinkDeep} 100%)`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* layered premium background: jali texture, glow blobs, mandala, stars, foil frame */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url("${JALI_ROSE}")`, opacity: 0.55, zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url("${JALI}")`, opacity: 0.35, zIndex: 0 }} />
      <MonogramWatermark />
      <PaperGrain />
      <GlowBlobs />
      <MandalaRings />
      <TwinkleStars />
      <FloatingPetals count={16} />
      <ToranGarland />

      {/* ornate foil border frame */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 10,
          border: `1px solid rgba(212,175,55,0.55)`,
          borderRadius: 18,
          boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.25), inset 0 0 30px rgba(212,175,55,0.12)`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <CornerFlourish corner="tl" />
      <CornerFlourish corner="tr" />
      <CornerFlourish corner="bl" />
      <CornerFlourish corner="br" />

      {/* ENVELOPE STAGES */}
      {stage !== "gate" && (
        <div
          style={{
            position: "relative",
            zIndex: 5,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <p className="prw-label" style={{ fontSize: 10, color: C.roseInkSoft, marginBottom: 18, opacity: 0.8 }}>
            ✺ AN ANAND KARAJ CELEBRATION ✺
          </p>

          <button
            onClick={handleOpen}
            aria-label="Open your wedding invitation"
            className="prw-focus"
            style={{
              background: "none",
              border: "none",
              cursor: stage === "closed" ? "pointer" : "default",
              perspective: 900,
              padding: 0,
            }}
          >
            <div style={{ position: "relative", width: 230, height: 160 }}>
              {/* letter */}
              <div
                style={{
                  position: "absolute",
                  left: 14,
                  right: 14,
                  top: 10,
                  height: 120,
                  background: `linear-gradient(180deg, ${C.ivory}, #f6e3ea)`,
                  borderRadius: 6,
                  boxShadow: "0 8px 18px rgba(90,36,56,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 12,
                  zIndex: 1,
                  animation: stage === "opening" ? "prwLetterRise 1.1s ease forwards" : "none",
                  opacity: stage === "opening" ? undefined : 0,
                }}
              >
                <p className="prw-display" style={{ color: C.roseInk, fontSize: 15, fontStyle: "italic", margin: 0 }}>
                  With the blessings of our families,<br />you are warmly invited.
                </p>
              </div>

              {/* envelope body */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  top: 18,
                  background: `linear-gradient(135deg, ${C.pinkMid}, ${C.pinkDeep})`,
                  borderRadius: 8,
                  boxShadow: "0 10px 24px rgba(90,36,56,0.45)",
                  zIndex: 2,
                }}
              />

              {/* flap */}
              <div
                style={{
                  position: "absolute",
                  top: 18,
                  left: 0,
                  right: 0,
                  height: 90,
                  background: `linear-gradient(160deg, ${C.babyPink}, ${C.pinkMid})`,
                  clipPath: "polygon(0 0, 100% 0, 50% 78%)",
                  transformOrigin: "top center",
                  transformStyle: "preserve-3d",
                  zIndex: 3,
                  animation: stage === "opening" ? "prwFlapOpen 0.8s ease forwards" : "none",
                  boxShadow: "0 0 0 1px rgba(212,175,55,0.5) inset",
                }}
              />

              {/* gold trim line on envelope body */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 18,
                  bottom: 0,
                  borderRadius: 8,
                  border: `1px solid ${C.gold}`,
                  opacity: 0.6,
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />

              {/* ribbon bow */}
              <RibbonBow
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 32,
                  transform: "translateX(-50%)",
                  zIndex: 5,
                  opacity: stage === "opening" ? 0 : 1,
                  transition: "opacity 0.3s ease",
                }}
              />

              {/* wax seal */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 58,
                  transform: "translateX(-50%)",
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  background: `radial-gradient(circle at 35% 30%, ${C.roseInkSoft}, ${C.roseInk})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `2px solid ${C.gold}`,
                  zIndex: 4,
                  animation: stage === "closed" ? "prwPulse 2.2s ease-in-out infinite" : "none",
                  opacity: stage === "opening" ? 0 : 1,
                  transition: "opacity 0.4s ease",
                }}
              >
                <span className="prw-display" style={{ color: C.goldLight, fontSize: 16, fontWeight: 700 }}>
                  G&amp;H
                </span>
              </div>
            </div>
          </button>

          <p
            className="prw-label"
            style={{
              marginTop: 28,
              fontSize: 13,
              color: C.roseInk,
              opacity: stage === "closed" ? 1 : 0,
              transition: "opacity 0.4s ease",
              fontWeight: 600,
            }}
          >
            ✺ YOU HAVE RECEIVED AN INVITE ✺
          </p>
          <p style={{ marginTop: 6, fontSize: 13, color: C.roseInkSoft }}>
            {stage === "closed" ? "tap the envelope to open" : "unsealing your invitation…"}
          </p>
        </div>
      )}

      {/* GATE STAGE */}
      {stage === "gate" && (
        <div
          style={{
            position: "relative",
            zIndex: 5,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2.5rem 1.5rem",
            textAlign: "center",
            animation: "prwFadeIn 1s ease forwards",
          }}
        >
          <GateIllustration />

          <div
            style={{
              background: "rgba(255,255,255,0.4)",
              backdropFilter: "blur(6px)",
              border: `1px solid rgba(212,175,55,0.6)`,
              borderRadius: 20,
              padding: "26px 28px",
              boxShadow: "0 14px 34px rgba(90,36,56,0.25)",
            }}
          >
            <Eyebrow color={C.roseInkSoft}>THE WEDDING OF</Eyebrow>
            <h1
              className="prw-display"
              style={{
                fontSize: 44,
                lineHeight: 1.1,
                margin: "0 0 10px 0",
                fontStyle: "italic",
                backgroundImage: `linear-gradient(100deg, ${C.roseInk} 30%, ${C.gold} 50%, ${C.roseInk} 70%)`,
                backgroundSize: "220% 100%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                animation: "prwShimmer 5s linear infinite",
              }}
            >
              Gurpreet <span style={{ color: C.gold, WebkitTextFillColor: C.gold }}>&amp;</span> Harleen
            </h1>
            <div style={{ width: 60, height: 1, background: C.gold, margin: "10px auto 14px" }} />
            <p className="prw-label" style={{ fontSize: 15, color: C.roseInk, margin: 0, fontWeight: 600 }}>
              NOVEMBER 14, 2026
            </p>
            <p style={{ fontSize: 12, color: C.roseInkSoft, marginTop: 4 }}>Amritsar, Punjab</p>
          </div>

          <button
            onClick={onAdvance}
            className="prw-scrollbtn"
            aria-label="Scroll to explore"
            style={{
              marginTop: 34,
              background: "rgba(255,255,255,0.35)",
              border: `1px solid ${C.gold}`,
              borderRadius: 999,
              padding: "8px 18px",
              color: C.roseInk,
              fontSize: 11,
              letterSpacing: "0.15em",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 600,
            }}
          >
            SCROLL TO EXPLORE
            <ChevronDown size={14} style={{ animation: "prwBounce 1.6s ease-in-out infinite" }} />
          </button>
        </div>
      )}
    </section>
  );
}

function GateIllustration() {
  return (
    <svg width="220" height="160" viewBox="0 0 220 160" style={{ marginBottom: 10 }} aria-hidden="true">
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.goldLight} />
          <stop offset="100%" stopColor={C.gold} />
        </linearGradient>
      </defs>
      {/* finials */}
      <circle cx="20" cy="18" r="7" fill="url(#goldGrad)" />
      <circle cx="200" cy="18" r="7" fill="url(#goldGrad)" />
      <circle cx="110" cy="8" r="8" fill="url(#goldGrad)" />
      {/* main arch */}
      <path
        d="M20 150 V60 C20 24 60 8 110 8 C160 8 200 24 200 60 V150"
        fill="none"
        stroke="url(#goldGrad)"
        strokeWidth="5"
      />
      {/* inner arch line */}
      <path
        d="M34 150 V64 C34 36 66 22 110 22 C154 22 186 36 186 64 V150"
        fill="none"
        stroke={C.goldLight}
        strokeWidth="1.5"
        opacity="0.6"
      />
      {/* doors */}
      <line x1="110" y1="150" x2="110" y2="40" stroke={C.goldLight} strokeWidth="1" opacity="0.5" />
      <line x1="20" y1="150" x2="200" y2="150" stroke="url(#goldGrad)" strokeWidth="5" />
    </svg>
  );
}

/* ============================================================
   2. SCRATCH CARD
   ============================================================ */
function ScratchCard() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const drawingRef = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [size, setSize] = useState({ w: 320, h: 200 });

  useEffect(() => {
    const update = () => {
      if (wrapRef.current) {
        const rect = wrapRef.current.getBoundingClientRect();
        setSize({ w: rect.width, h: rect.height });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = size.w;
    canvas.height = size.h;
    const ctx = canvas.getContext("2d");
    const grad = ctx.createLinearGradient(0, 0, size.w, size.h);
    grad.addColorStop(0, "#caa544");
    grad.addColorStop(0.5, C.gold);
    grad.addColorStop(1, "#b8902c");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size.w, size.h);

    ctx.fillStyle = "rgba(43,5,18,0.55)";
    ctx.font = "600 13px Cinzel, serif";
    ctx.textAlign = "center";
    for (let y = 20; y < size.h; y += 32) {
      ctx.fillText("SCRATCH HERE  ✺  SCRATCH HERE", size.w / 2, y);
    }
    setRevealed(false);
  }, [size.w, size.h]);

  const scratchAt = useCallback((x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const checkRevealRatio = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    if (!width || !height) return;
    const data = ctx.getImageData(0, 0, width, height).data;
    let cleared = 0;
    const step = 8;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * step) {
      total++;
      if (data[i] < 40) cleared++;
    }
    if (total && cleared / total > 0.5) {
      setRevealed(true);
    }
  }, []);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    return { x: point.clientX - rect.left, y: point.clientY - rect.top };
  };

  const handleStart = (e) => {
    drawingRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { x, y } = getPos(e, canvas);
    scratchAt(x, y);
  };
  const handleMove = (e) => {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { x, y } = getPos(e, canvas);
    scratchAt(x, y);
  };
  const handleEnd = () => {
    if (drawingRef.current) checkRevealRatio();
    drawingRef.current = false;
  };

  return (
    <section
      style={{
        position: "relative",
        background: `linear-gradient(180deg, ${C.blush}, ${C.babyPink})`,
        padding: "4rem 1.5rem",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <FloatingPetals count={8} />
      <Reveal>
        <Eyebrow>SAVE THE DATE</Eyebrow>
        <h2 className="prw-display" style={{ fontSize: 28, fontStyle: "italic", color: C.roseInk, margin: "0 0 6px" }}>
          Scratch to Reveal the Date
        </h2>
        <p style={{ fontSize: 13, color: "rgba(90,36,56,0.62)", marginBottom: 24 }}>
          Drag your finger across the gold foil
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <div
          ref={wrapRef}
          className="prw-card"
          style={{
            position: "relative",
            maxWidth: 340,
            height: 190,
            margin: "0 auto",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: `0 0 0 1px ${C.gold}, 0 16px 36px rgba(90,36,56,0.22)`,
            background: C.ivory,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(160deg, #fff8ea, ${C.ivory})`,
            }}
          >
            <Crown size={22} color={C.roseBase} style={{ marginBottom: 6 }} />
            <p className="prw-label" style={{ fontSize: 11, color: C.roseBase, margin: 0 }}>
              SAVE THE DATE
            </p>
            <p className="prw-display" style={{ fontSize: 30, fontWeight: 700, color: C.roseBase, margin: "4px 0" }}>
              14 . 11 . 2026
            </p>
            <p style={{ fontSize: 12, color: C.pinkDeep, margin: 0 }}>Amritsar, Punjab</p>
          </div>

          <canvas
            ref={canvasRef}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              touchAction: "none",
              cursor: "pointer",
              opacity: revealed ? 0 : 1,
              transition: "opacity 0.6s ease",
              pointerEvents: revealed ? "none" : "auto",
            }}
          />
        </div>
      </Reveal>
      {revealed && (
        <p style={{ marginTop: 16, fontSize: 12, color: C.pinkDeep, animation: "prwFadeIn 0.6s ease" }}>
          ✺ Mark your calendars — we can't wait to celebrate with you ✺
        </p>
      )}
    </section>
  );
}

/* ============================================================
   3. COUNTDOWN
   ============================================================ */
function useCountdown(target) {
  const [remaining, setRemaining] = useState(() => target.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setRemaining(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const clamped = Math.max(remaining, 0);
  const d = Math.floor(clamped / (1000 * 60 * 60 * 24));
  const h = Math.floor((clamped / (1000 * 60 * 60)) % 24);
  const m = Math.floor((clamped / (1000 * 60)) % 60);
  const s = Math.floor((clamped / 1000) % 60);
  return { d, h, m, s, done: clamped <= 0 };
}

function CountdownBlock({ value, label }) {
  return (
    <div
      className="prw-card"
      style={{
        background: `linear-gradient(180deg, #ffffff, ${C.blush})`,
        border: `1px solid ${C.gold}`,
        borderRadius: 12,
        padding: "14px 6px",
        minWidth: 68,
        textAlign: "center",
        boxShadow: "0 8px 18px rgba(90,36,56,0.15)",
      }}
    >
      <div className="prw-display" style={{ fontSize: 30, fontWeight: 700, color: C.roseInk, lineHeight: 1 }}>
        {String(value).padStart(2, "0")}
      </div>
      <div className="prw-label" style={{ fontSize: 10, color: "rgba(90,36,56,0.65)", marginTop: 4 }}>
        {label}
      </div>
    </div>
  );
}

function CountdownSection() {
  const target = useMemo(() => new Date("2026-11-14T18:00:00+05:30"), []);
  const { d, h, m, s, done } = useCountdown(target);
  return (
    <section
      style={{
        position: "relative",
        background: `radial-gradient(circle at 50% 0%, ${C.babyPink}, ${C.blush})`,
        padding: "4rem 1.5rem",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <FloatingPetals count={6} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <Reveal>
          <Eyebrow>COUNTING DOWN TO FOREVER</Eyebrow>
          <h2 className="prw-display" style={{ fontSize: 26, fontStyle: "italic", color: C.roseInk, margin: "0 0 26px" }}>
            {done ? "The Celebration Has Begun" : "Until We Say 'I Do'"}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <CountdownBlock value={d} label="DAYS" />
            <CountdownBlock value={h} label="HRS" />
            <CountdownBlock value={m} label="MINS" />
            <CountdownBlock value={s} label="SECS" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   4. ITINERARY
   ============================================================ */
const EVENTS = [
  {
    key: "akhand-path",
    title: "Akhand Path",
    punjabi: "ਅਖੰਡ ਪਾਠ",
    date: "Thursday, Nov 12, 2026",
    time: "7:00 AM – 9:00 AM",
    venue: "Guru Nanak Niwas, Golden Temple Complex",
    address: "Golden Temple Complex, Amritsar, Punjab",
    dress: { label: "Modest & Traditional", note: "Soft pastels · head covering kindly requested", swatch: ["#E9D9C4", "#C9B79C"] },
    icon: BookOpen,
    accent: C.emerald,
    photo: "prwakhand",
  },
  {
    key: "jaggo-night",
    title: "Jaggo Night",
    punjabi: "ਜਾਗੋ",
    date: "Friday, Nov 13, 2026",
    time: "9:00 PM onwards",
    venue: "Ranjit Avenue Community Lawns",
    address: "Ranjit Avenue, Amritsar, Punjab",
    dress: { label: "Phulkari & Vibrant Folk Colours", note: "the brighter, the better", swatch: ["#D4AF37", "#0B6E4F", "#800020", "#E07A2F"] },
    icon: PartyPopper,
    accent: C.gold,
    photo: "prwjaggo",
  },
  {
    key: "grand-wedding",
    title: "The Grand Wedding",
    punjabi: "ਅਨੰਦ ਕਾਰਜ",
    date: "Saturday, Nov 14, 2026",
    time: "6:00 PM – Late",
    venue: "Sarovar Heritage Lawns",
    address: "Mall Road, Amritsar, Punjab",
    dress: { label: "Maroon & Gold", note: "Sherwani for him · Lehenga for her", swatch: ["#800020", "#D4AF37"] },
    icon: Crown,
    accent: C.roseBase,
    photo: "prwwedding",
  },
];

function DressSwatch({ colors }) {
  return (
    <div style={{ display: "flex", marginRight: 8 }}>
      {colors.map((c, i) => (
        <span
          key={i}
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: c,
            border: "1px solid rgba(255,255,255,0.9)",
            boxShadow: "0 0 0 1px rgba(90,36,56,0.15)",
            marginLeft: i === 0 ? 0 : -5,
          }}
        />
      ))}
    </div>
  );
}

function ItineraryCard({ event, isLast, delay = 0 }) {
  const Icon = event.icon;
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(event.address)}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`;

  return (
    <Reveal delay={delay}>
      <div style={{ display: "flex", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            className="prw-icon-btn"
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              background: `linear-gradient(160deg, ${event.accent}, ${C.roseInk})`,
              border: `2px solid ${C.gold}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={20} color={C.goldLight} />
          </div>
          {!isLast && <div style={{ flex: 1, width: 1, background: `linear-gradient(${C.gold}, transparent)`, marginTop: 4 }} />}
        </div>

        <div style={{ paddingBottom: 40, flex: 1 }}>
          <p className="prw-label" style={{ fontSize: 10, color: C.roseInkSoft, margin: "4px 0 2px" }}>
            {event.date.toUpperCase()}
          </p>
          <h3 className="prw-display" style={{ fontSize: 22, fontStyle: "italic", color: C.roseInk, margin: "0 0 2px" }}>
            {event.title}
          </h3>
          <p style={{ fontSize: 13, color: "rgba(90,36,56,0.6)", margin: "0 0 10px" }}>{event.punjabi} · {event.time}</p>

          <div
            className="prw-card"
            style={{
              background: "rgba(255,255,255,0.55)",
              border: `1px solid rgba(212,175,55,0.35)`,
              borderRadius: 12,
              padding: 14,
            }}
          >
            <div
              style={{
                borderRadius: 8,
                overflow: "hidden",
                height: 120,
                marginBottom: 12,
                border: `1px solid rgba(212,175,55,0.3)`,
              }}
            >
              <img
                src={`https://picsum.photos/seed/${event.photo}/500/300`}
                alt={`${event.title} celebration`}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
              <MapPin size={15} color={C.gold} style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 13, color: C.roseInk, margin: 0, fontWeight: 500 }}>{event.venue}</p>
                <p style={{ fontSize: 12, color: "rgba(90,36,56,0.6)", margin: "2px 0 0" }}>{event.address}</p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
              <DressSwatch colors={event.dress.swatch} />
              <div>
                <p style={{ fontSize: 12, color: C.roseInk, margin: 0, fontWeight: 600 }}>{event.dress.label}</p>
                <p style={{ fontSize: 11, color: "rgba(90,36,56,0.55)", margin: 0 }}>{event.dress.note}</p>
              </div>
            </div>

            <div
              style={{
                borderRadius: 8,
                overflow: "hidden",
                border: `1px solid rgba(212,175,55,0.3)`,
                height: 130,
                marginBottom: 8,
              }}
            >
              <iframe
                title={`Map to ${event.venue}`}
                src={mapSrc}
                loading="lazy"
                style={{ width: "100%", height: "100%", border: 0 }}
              />
            </div>
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="prw-focus prw-link"
              style={{ fontSize: 12, color: C.pinkDeep, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 600 }}
            >
              Open in Google Maps <ChevronRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function ItinerarySection() {
  return (
    <section style={{ background: `linear-gradient(180deg, ${C.babyPink}, ${C.blush})`, padding: "4rem 1.25rem 1rem" }}>
      <Reveal>
        <Eyebrow>THE CELEBRATIONS</Eyebrow>
        <h2 className="prw-display" style={{ fontSize: 28, fontStyle: "italic", color: C.roseInk, textAlign: "center", margin: "0 0 36px" }}>
          Three Days of Festivities
        </h2>
      </Reveal>
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        {EVENTS.map((ev, i) => (
          <ItineraryCard key={ev.key} event={ev} isLast={i === EVENTS.length - 1} delay={i * 0.12} />
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   5. GALLERY — OUR STORY
   ============================================================ */
const STORY = [
  { seed: "prwstory1", caption: "Where It Began" },
  { seed: "prwstory2", caption: "First Trip Together" },
  { seed: "prwstory3", caption: "Meeting the Families" },
  { seed: "prwstory4", caption: "The Proposal" },
  { seed: "prwstory5", caption: "Roka Ceremony" },
  { seed: "prwstory6", caption: "Forever Begins" },
];

function GallerySection() {
  const [index, setIndex] = useState(0);
  const touchX = useRef(null);

  const go = (dir) => setIndex((i) => (i + dir + STORY.length) % STORY.length);

  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchX.current;
    if (delta > 50) go(-1);
    else if (delta < -50) go(1);
    touchX.current = null;
  };

  return (
    <section style={{ background: `linear-gradient(180deg, ${C.blush}, ${C.babyPink})`, padding: "4rem 1.25rem", overflow: "hidden" }}>
      <Reveal>
        <Eyebrow>OUR STORY</Eyebrow>
        <h2 className="prw-display" style={{ fontSize: 28, fontStyle: "italic", color: C.roseInk, textAlign: "center", margin: "0 0 28px" }}>
          A Few Moments We Cherish
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{ maxWidth: 380, margin: "0 auto" }}>
          <div
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="prw-card"
            style={{
              position: "relative",
              borderRadius: 18,
              overflow: "hidden",
              border: `1px solid ${C.gold}`,
              boxShadow: "0 18px 36px rgba(90,36,56,0.25)",
              aspectRatio: "4 / 5",
              background: C.pinkDeep,
            }}
          >
            <img
              key={STORY[index].seed}
              src={`https://picsum.photos/seed/${STORY[index].seed}/700/900`}
              alt={STORY[index].caption}
              className="prw-img-fade"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                padding: "28px 16px 14px",
                background: "linear-gradient(to top, rgba(90,36,56,0.92), transparent)",
              }}
            >
              <p className="prw-label" style={{ fontSize: 10, color: C.goldLight, margin: "0 0 4px" }}>
                {String(index + 1).padStart(2, "0")} / {String(STORY.length).padStart(2, "0")}
              </p>
              <p className="prw-display" style={{ fontSize: 20, fontStyle: "italic", color: C.ivory, margin: 0 }}>
                {STORY[index].caption}
              </p>
            </div>

            <button
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="prw-focus prw-icon-btn"
              style={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(90,36,56,0.55)",
                border: `1px solid ${C.gold}`,
                borderRadius: "50%",
                width: 34,
                height: 34,
                color: C.goldLight,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next photo"
              className="prw-focus prw-icon-btn"
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(90,36,56,0.55)",
                border: `1px solid ${C.gold}`,
                borderRadius: "50%",
                width: 34,
                height: 34,
                color: C.goldLight,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
            {STORY.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
                className="prw-focus prw-dot"
                style={{
                  width: i === index ? 18 : 7,
                  height: 7,
                  borderRadius: 4,
                  background: i === index ? C.gold : "rgba(212,175,55,0.4)",
                  border: "none",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================================================
   6. RSVP & WISHES
   ============================================================ */
function RsvpSection({ onCelebrate }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState(null);
  const [wishes, setWishes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please share your name with us.");
      return;
    }
    if (attending === null) {
      setError("Let us know if you'll be joining us.");
      return;
    }
    setError("");
    setSubmitted(true);
    onCelebrate();
  };

  if (submitted) {
    return (
      <section style={{ background: `linear-gradient(180deg, ${C.babyPink}, ${C.blush})`, padding: "4rem 1.5rem", textAlign: "center" }}>
        <div
          style={{
            maxWidth: 380,
            margin: "0 auto",
            background: `linear-gradient(180deg, #ffffff, ${C.blush})`,
            border: `1px solid ${C.gold}`,
            borderRadius: 18,
            padding: "2.5rem 1.5rem",
            animation: "prwPopIn 0.7s ease",
            boxShadow: "0 16px 34px rgba(90,36,56,0.18)",
          }}
        >
          <Heart size={26} color={C.pinkDeep} style={{ marginBottom: 10 }} />
          <h3 className="prw-display" style={{ fontSize: 24, fontStyle: "italic", color: C.roseInk, margin: "0 0 8px" }}>
            Your Blessings Have Been Received
          </h3>
          <p style={{ fontSize: 13, color: "rgba(90,36,56,0.7)", margin: "0 0 16px" }}>
            {attending === "yes"
              ? `Thank you, ${name}. We can't wait to celebrate with you in Amritsar.`
              : `Thank you, ${name}. You'll be missed — we appreciate your warm wishes.`}
          </p>
          {wishes.trim() && (
            <div
              style={{
                background: "rgba(212,175,55,0.1)",
                border: `1px solid rgba(212,175,55,0.3)`,
                borderRadius: 10,
                padding: "12px 14px",
                textAlign: "left",
              }}
            >
              <p className="prw-display" style={{ fontSize: 14, fontStyle: "italic", color: C.roseInk, margin: 0 }}>
                "{wishes.trim()}"
              </p>
              <p className="prw-label" style={{ fontSize: 9, color: "rgba(90,36,56,0.55)", margin: "8px 0 0" }}>
                — {name}
              </p>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: `linear-gradient(180deg, ${C.babyPink}, ${C.blush})`, padding: "4rem 1.5rem 5rem", overflow: "hidden" }}>
      <Reveal>
        <Eyebrow>JOIN US</Eyebrow>
        <h2 className="prw-display" style={{ fontSize: 28, fontStyle: "italic", color: C.roseInk, textAlign: "center", margin: "0 0 8px" }}>
          RSVP &amp; Wishes
        </h2>
        <p style={{ fontSize: 13, color: "rgba(90,36,56,0.6)", textAlign: "center", marginBottom: 28 }}>
          Kindly respond by October 15, 2026
        </p>
      </Reveal>

      <Reveal delay={0.12}>
        <form
          onSubmit={handleSubmit}
          className="prw-card"
          style={{
            maxWidth: 400,
            margin: "0 auto",
            background: "rgba(255,255,255,0.55)",
            border: `1px solid rgba(212,175,55,0.4)`,
            borderRadius: 16,
            padding: "1.75rem",
          }}
        >
          <label className="prw-label" style={{ fontSize: 11, color: C.roseInkSoft, display: "block", marginBottom: 6 }}>
            GUEST NAME
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="prw-focus prw-input-focus"
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.7)",
              border: `1px solid rgba(212,175,55,0.45)`,
              borderRadius: 8,
              padding: "10px 12px",
              color: C.roseInk,
              fontSize: 14,
              marginBottom: 18,
              boxSizing: "border-box",
            }}
          />

          <label className="prw-label" style={{ fontSize: 11, color: C.roseInkSoft, display: "block", marginBottom: 8 }}>
            WILL YOU BE ATTENDING?
          </label>
          <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
            {[
              { v: "yes", label: "Joyfully Yes" },
              { v: "no", label: "Sadly, No" },
            ].map((opt) => (
              <button
                type="button"
                key={opt.v}
                onClick={() => setAttending(opt.v)}
                className="prw-focus prw-btn"
                style={{
                  flex: 1,
                  padding: "10px 8px",
                  borderRadius: 8,
                  fontSize: 13,
                  cursor: "pointer",
                  border: `1px solid ${attending === opt.v ? C.gold : "rgba(212,175,55,0.4)"}`,
                  background: attending === opt.v ? C.gold : "rgba(255,255,255,0.5)",
                  color: attending === opt.v ? C.roseInk : C.roseInk,
                  fontWeight: 600,
                  transition: "background 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <label className="prw-label" style={{ fontSize: 11, color: C.roseInkSoft, display: "block", marginBottom: 6 }}>
            BLESSINGS &amp; WISHES
          </label>
          <textarea
            value={wishes}
            onChange={(e) => setWishes(e.target.value)}
            placeholder="Share your blessings for the couple…"
            rows={4}
            className="prw-focus prw-input-focus"
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.7)",
              border: `1px solid rgba(212,175,55,0.45)`,
              borderRadius: 8,
              padding: "10px 12px",
              color: C.roseInk,
              fontSize: 14,
              resize: "vertical",
              marginBottom: 14,
              boxSizing: "border-box",
              fontFamily: "Poppins, sans-serif",
            }}
          />

          {error && <p style={{ color: "#B8395B", fontSize: 12, marginBottom: 12 }}>{error}</p>}

          <button
            type="submit"
            className="prw-focus prw-btn"
            style={{
              width: "100%",
              background: `linear-gradient(135deg, ${C.gold}, #b8902c)`,
              border: "none",
              borderRadius: 999,
              padding: "12px 0",
              color: C.roseInk,
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              letterSpacing: "0.03em",
            }}
          >
            Send My Wishes
          </button>
        </form>
      </Reveal>
    </section>
  );
}

/* ============================================================
   7. OUR FAMILIES
   ============================================================ */
const FAMILIES = [
  { side: "The Groom", names: "Gurpreet Singh", parents: "S. Manjit Singh & Smt. Rajwant Kaur", seed: "prwgroomfam" },
  { side: "The Bride", names: "Harleen Kaur", parents: "S. Baldev Singh & Smt. Simran Kaur", seed: "prwbridefam" },
];

function FamiliesSection() {
  return (
    <section style={{ background: `linear-gradient(180deg, ${C.blush}, ${C.babyPink})`, padding: "4rem 1.25rem" }}>
      <Reveal>
        <Eyebrow>WITH THEIR BLESSINGS</Eyebrow>
        <h2 className="prw-display" style={{ fontSize: 28, fontStyle: "italic", color: C.roseInk, textAlign: "center", margin: "0 0 32px" }}>
          Our Families
        </h2>
      </Reveal>
      <div style={{ maxWidth: 440, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 }}>
        {FAMILIES.map((f, i) => (
          <Reveal key={f.side} delay={i * 0.12}>
            <div
              className="prw-card"
              style={{
                display: "flex",
                gap: 14,
                alignItems: "center",
                background: "rgba(255,255,255,0.55)",
                border: `1px solid rgba(212,175,55,0.4)`,
                borderRadius: 14,
                padding: 14,
              }}
            >
              <img
                src={`https://picsum.photos/seed/${f.seed}/140/140`}
                alt={f.names}
                style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: `2px solid ${C.gold}`, flexShrink: 0 }}
              />
              <div>
                <p className="prw-label" style={{ fontSize: 10, color: C.roseInkSoft, margin: "0 0 2px" }}>{f.side.toUpperCase()}</p>
                <p className="prw-display" style={{ fontSize: 19, fontStyle: "italic", color: C.roseInk, margin: "0 0 2px" }}>{f.names}</p>
                <p style={{ fontSize: 12, color: "rgba(90,36,56,0.6)", margin: 0 }}>Son/Daughter of {f.parents}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   8. TRAVEL & STAY
   ============================================================ */
const STAY_OPTIONS = [
  { name: "Hotel Ranjit's Svaasa", note: "Heritage haveli stay, 10 min from venue" },
  { name: "Hyatt Amritsar", note: "Modern comfort, 15 min from venue" },
  { name: "Ramada Amritsar", note: "Budget-friendly, close to airport" },
];

function TravelSection() {
  return (
    <section style={{ background: `linear-gradient(180deg, ${C.babyPink}, ${C.blush})`, padding: "4rem 1.25rem" }}>
      <Reveal>
        <Eyebrow>FOR OUR OUT-OF-TOWN GUESTS</Eyebrow>
        <h2 className="prw-display" style={{ fontSize: 28, fontStyle: "italic", color: C.roseInk, textAlign: "center", margin: "0 0 8px" }}>
          Travel &amp; Stay
        </h2>
        <p style={{ fontSize: 13, color: "rgba(90,36,56,0.6)", textAlign: "center", margin: "0 0 28px" }}>
          Amritsar (ATQ) is well-connected by air, rail &amp; road
        </p>
      </Reveal>

      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        <Reveal delay={0.08}>
          <div
            className="prw-card"
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 22,
              background: "rgba(255,255,255,0.55)",
              border: `1px solid rgba(212,175,55,0.4)`,
              borderRadius: 14,
              padding: 14,
            }}
          >
            <PlaneTakeoff size={18} color={C.gold} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontSize: 13, color: C.roseInk, margin: "0 0 2px", fontWeight: 500 }}>Sri Guru Ram Dass Jee Airport (ATQ)</p>
              <p style={{ fontSize: 12, color: "rgba(90,36,56,0.6)", margin: 0 }}>
                ~20 minutes from all wedding venues. Direct flights from Delhi, Mumbai &amp; abroad.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="prw-label" style={{ fontSize: 11, color: C.roseInkSoft, margin: "0 0 12px" }}>
            SUGGESTED STAYS
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
            {STAY_OPTIONS.map((s) => (
              <div
                key={s.name}
                className="prw-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(255,255,255,0.5)",
                  border: `1px solid rgba(212,175,55,0.3)`,
                  borderRadius: 10,
                  padding: "10px 12px",
                }}
              >
                <BedDouble size={16} color={C.gold} style={{ flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 13, color: C.roseInk, margin: 0 }}>{s.name}</p>
                  <p style={{ fontSize: 11, color: "rgba(90,36,56,0.55)", margin: 0 }}>{s.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <div
            className="prw-card"
            style={{
              textAlign: "center",
              background: `linear-gradient(135deg, ${C.pinkDeep}26, ${C.gold}22)`,
              border: `1px solid ${C.gold}`,
              borderRadius: 14,
              padding: "20px 16px",
            }}
          >
            <p style={{ fontSize: 13, color: C.roseInk, margin: "0 0 12px" }}>
              Need help with travel, stay, or directions? We're a tap away.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="prw-focus prw-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#25D366",
                color: "#0B2912",
                fontWeight: 700,
                fontSize: 13,
                padding: "10px 18px",
                borderRadius: 999,
                textDecoration: "none",
              }}
            >
              <MessageCircle size={16} />
              Chat on WhatsApp · {WHATSAPP_DISPLAY}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer style={{ background: `linear-gradient(180deg, ${C.blush}, ${C.babyPink})`, padding: "2rem 1.5rem 3rem", textAlign: "center" }}>
      <Divider />
      <p className="prw-display" style={{ fontSize: 18, fontStyle: "italic", color: C.roseInk, margin: "16px 0 4px" }}>
        With love, Gurpreet &amp; Harleen
      </p>
      <p style={{ fontSize: 11, color: "rgba(90,36,56,0.5)", margin: 0 }}>Amritsar, Punjab · November 2026</p>
    </footer>
  );
}

/* ============================================================
   FLOATING WHATSAPP BUTTON
   ============================================================ */
function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message us on WhatsApp at ${WHATSAPP_DISPLAY}`}
      className="prw-focus prw-icon-btn"
      style={{
        position: "fixed",
        bottom: 18,
        right: 18,
        zIndex: 50,
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 20px rgba(90,36,56,0.3)",
        border: "2px solid rgba(255,255,255,0.7)",
      }}
    >
      <MessageCircle size={24} color="#0B2912" />
    </a>
  );
}

/* ============================================================
   BACKGROUND MUSIC TOGGLE
   ============================================================ */
function MusicToggle() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [errored, setErrored] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setErrored(true));
    }
  };

  return (
    <>
      <audio ref={audioRef} src={WEDDING_SONG_URL} loop onError={() => setErrored(true)} />
      <button
        onClick={toggle}
        aria-label={playing ? "Pause wedding music" : "Play wedding music"}
        title={WEDDING_SONG_CREDIT}
        className="prw-focus prw-icon-btn"
        style={{
          position: "fixed",
          bottom: 18,
          left: 18,
          zIndex: 50,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: C.roseInk,
          border: `2px solid ${C.gold}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 20px rgba(90,36,56,0.3)",
          cursor: "pointer",
        }}
      >
        {playing && !errored ? <Volume2 size={22} color={C.goldLight} /> : <VolumeX size={22} color={C.goldLight} />}
      </button>
    </>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function PunjabiRoyalWedding() {
  const [confettiOn, setConfettiOn] = useState(false);
  const [burstId, setBurstId] = useState(0);
  const itineraryRef = useRef(null);

  const fireConfetti = useCallback(() => {
    setBurstId((id) => id + 1);
    setConfettiOn(true);
    setTimeout(() => setConfettiOn(false), 4000);
  }, []);

  const scrollToNext = () => {
    itineraryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="prw-root" style={{ width: "100%", overflowX: "hidden" }}>
      <GlobalStyle />
      <ConfettiBurst active={confettiOn} burstId={burstId} />

      <HeroSection onAdvance={scrollToNext} />

      <div ref={itineraryRef}>
        <ScratchCard />
      </div>
      <Divider tone="emerald" />
      <CountdownSection />
      <Divider />
      <ItinerarySection />
      <Divider tone="emerald" />
      <GallerySection />
      <Divider />
      <RsvpSection onCelebrate={fireConfetti} />
      <Footer />
    </div>
  );
}
