// "use client";
// import { motion } from "framer-motion";
// // import { motion } from "motion/react";
// import React from 'react'
// import { useUser } from "../provider";
// import Link from "next/link";

// function Hero() {
//   const { user } = useUser();
//   return (
//     <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
//       <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
//         <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
//       </div>
//       <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
//         <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
//       </div>
//       <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
//         <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
//       </div>
//       <div className="px-4 py-10 md:py-20">
//         <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
//           {"HireReady AI Mock Interview"
//             .split(" ")
//             .map((word, index) => (
//               <motion.span
//                 key={index}
//                 initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
//                 animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
//                 transition={{
//                   duration: 0.3,
//                   delay: index * 0.1,
//                   ease: "easeInOut",
//                 }}
//                 className="mr-2 inline-block"
//               >
//                 {word}
//               </motion.span>
//             ))}
//         </h1>
//         <motion.p
//           initial={{
//             opacity: 0,
//           }}
//           animate={{
//             opacity: 1,
//           }}
//           transition={{
//             duration: 0.3,
//             delay: 0.8,
//           }}
//           className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
//         >
//           Practice personalized mock interviews with AI.
//           Get instant feedback, improve your answers, and confidently prepare for your next job interview.
//         </motion.p>
//         <motion.div
//           initial={{
//             opacity: 0,
//           }}
//           animate={{
//             opacity: 1,
//           }}
//           transition={{
//             duration: 0.3,
//             delay: 1,
//           }}
//           className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
//         >

//           <div className="item">
//             {user ? (
//               <div>
//                 <Link href="./dashboard">
//                   <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
//                     Go to Dashboard
//                   </button>
//                 </Link>
//               </div>
//             ) : (

//               <Link href="./auth">
//                 <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
//                   Explore Now
//                 </button>
//               </Link>

//             )}
//           </div>


//           <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
//             Contact Support
//           </button>


//         </motion.div>


//       </div>
//     </div>
//   )
// }

// export default Hero


// ------------------------------------------------------------------

"use client";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useUser } from "../provider";
import Link from "next/link";

/* ── Animated dot-grid canvas background ── */
function DotGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    const SPACING = 36;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;

      const cols = Math.ceil(canvas.width / SPACING) + 1;
      const rows = Math.ceil(canvas.height / SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING;
          const y = r * SPACING;

          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = Math.max(0, 1 - dist / 180);

          // Subtle wave pulse
          const wave = Math.sin(t + c * 0.3 + r * 0.3) * 0.5 + 0.5;
          const base = 0.12 + wave * 0.06;
          const alpha = base + proximity * 0.55;
          const radius = 1 + proximity * 2.5;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);

          if (proximity > 0.05) {
            // Glow blue near cursor
            ctx.fillStyle = `rgba(59,130,246,${alpha})`;
          } else {
            ctx.fillStyle = `rgba(255,255,255,${alpha * 0.6})`;
          }
          ctx.fill();
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}

/* ── Floating orb blobs ── */
function Orbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top-left blue orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 520,
          height: 520,
          top: -160,
          left: -140,
          background:
            "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Bottom-right violet orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 480,
          height: 480,
          bottom: -120,
          right: -100,
          background:
            "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
      {/* Center subtle glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 700,
          height: 300,
          top: "35%",
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ── Stats strip ── */
const stats = [
  { value: "50K+", label: "Interviews Practiced" },
  { value: "94%", label: "User Satisfaction" },
  { value: "3×", label: "Faster Offer Rate" },
  { value: "200+", label: "Job Roles Covered" },
];

/* ── Trusted-by logos (text placeholders) ── */
const companies = ["Google", "Microsoft", "Amazon", "Meta", "Stripe", "Notion"];

/* ── Word animation ── */
const words = ["HireReady", "AI", "Powered" , "Platform"];

export default function Hero() {
  const { user } = useUser();

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#060608" }}
    >
      {/* Layered background */}
      <DotGrid />
      <Orbs />

      {/* Hairline top border accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.6) 50%, transparent 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-24 pb-16 max-w-5xl mx-auto">

        {/* Eyebrow pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          style={{
            background: "rgba(59,130,246,0.08)",
            borderColor: "rgba(59,130,246,0.3)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#3b82f6" }}
          />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#60a5fa" }}>
            AI-Powered Career Prep
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6">
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.55,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block mr-3 last:mr-0"
              style={{
                color:
                  word === "AI"
                    ? "transparent"
                    : "#f1f5f9",
                background:
                  word === "AI"
                    ? "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)"
                    : undefined,
                WebkitBackgroundClip: word === "AI" ? "text" : undefined,
                WebkitTextFillColor:
                  word === "AI" ? "transparent" : undefined,
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="max-w-2xl text-lg md:text-xl leading-relaxed mb-10"
          style={{ color: "#94a3b8" }}
        >
          Accelerate your career with AI-powered guidance.
From mock interviews and resume analysis to personalized roadmaps and cover letters — everything you need to succeed, in one place.
          
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          {user ? (
            <Link href="/dashboard">
              <button
                className="relative group inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-bold text-white text-sm overflow-hidden transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  boxShadow: "0 0 28px rgba(59,130,246,0.35)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 40px rgba(59,130,246,0.55)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 28px rgba(59,130,246,0.35)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Go to Dashboard
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </Link>
          ) : (
            <Link href="/auth">
              <button
                className="group inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-bold text-white text-sm transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  boxShadow: "0 0 28px rgba(59,130,246,0.35)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 40px rgba(59,130,246,0.55)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 28px rgba(59,130,246,0.35)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Start for Free
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </Link>
          )}

          <button
            className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-semibold text-sm transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#cbd5e1",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor" />
            </svg>
            Watch Demo
          </button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.05 }}
          className="w-full grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden mb-16"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center py-5 px-4"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <span
                className="text-2xl md:text-3xl font-black mb-1"
                style={{
                  background: "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.value}
              </span>
              <span className="text-xs font-medium" style={{ color: "#64748b" }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Trusted by */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-xs tracking-widest uppercase font-semibold" style={{ color: "#334155" }}>
            Trusted by professionals from
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {companies.map((c) => (
              <span
                key={c}
                className="text-sm font-bold tracking-tight"
                style={{ color: "#334155" }}
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, #080808)",
        }}
      />

      {/* Side hairlines */}
      <div
        className="absolute inset-y-0 left-0 w-px"
        style={{
          background:
            "linear-gradient(to bottom, transparent 10%, rgba(59,130,246,0.2) 50%, transparent 90%)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-px"
        style={{
          background:
            "linear-gradient(to bottom, transparent 10%, rgba(139,92,246,0.2) 50%, transparent 90%)",
        }}
      />
    </div>
  );
}