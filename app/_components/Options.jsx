"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const modules = [
  {
    id: 1,
    title: "AI Mock Interview",
    tagline: "Practice. Refine. Ace It.",
    description:
      "Simulate real interview scenarios with AI-driven questions tailored to your role. Get instant, detailed feedback on your answers and communication style.",
    path: "/dashboard",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="4" y="8" width="40" height="28" rx="4" fill="currentColor" opacity="0.15" />
        <rect x="4" y="8" width="40" height="28" rx="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="22" r="6" stroke="currentColor" strokeWidth="2" />
        <path d="M8 36c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 18h6M32 23h4M32 28h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="16" y="36" width="16" height="3" rx="1.5" fill="currentColor" opacity="0.4" />
        <rect x="20" y="39" width="8" height="1.5" rx="0.75" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    accent: "#3b82f6",
    accentDim: "rgba(59,130,246,0.12)",
    accentBorder: "rgba(59,130,246,0.35)",
    badge: "Most Popular",
    features: ["Role-specific questions", "Instant feedback", "Confidence scoring"],
  },
  {
    id: 2,
    title: "AI Cover Letter Generator",
    tagline: "Write Once. Impress Always.",
    description:
      "Generate compelling, personalized cover letters in seconds. Tailored to each job posting to maximize your chances of landing an interview.",
    path: "/aicoverletter/dashboard",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="8" y="4" width="28" height="36" rx="3" fill="currentColor" opacity="0.15" />
        <rect x="8" y="4" width="28" height="36" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M14 14h16M14 20h16M14 26h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="36" cy="36" r="8" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2" />
        <path d="M33 36l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "#8b5cf6",
    accentDim: "rgba(139,92,246,0.12)",
    accentBorder: "rgba(139,92,246,0.35)",
    badge: null,
    features: ["Job-tailored content", "ATS-optimized", "Multiple tone styles"],
  },
  {
    id: 3,
    title: "AI Roadmap Generator",
    tagline: "Your Career, Mapped Out.",
    description:
      "Get a personalized learning roadmap to reach your career goals. Know exactly what skills to build, in what order, and how long it takes.",
    path: "/roadmap/dashboard",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <circle cx="10" cy="38" r="4" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="2" />
        <circle cx="38" cy="10" r="4" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="2" />
        <path d="M13.5 35L20.5 27M27.5 21L34.5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
        <circle cx="10" cy="38" r="2" fill="currentColor" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
        <circle cx="38" cy="10" r="2" fill="currentColor" />
        <path d="M6 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    accent: "#10b981",
    accentDim: "rgba(16,185,129,0.12)",
    accentBorder: "rgba(16,185,129,0.35)",
    badge: "New",
    features: ["Skill gap analysis", "Timeline estimates", "Resource curation"],
  },
  {
    id: 4,
    title: "Resume Analyser",
    tagline: "Get Seen. Get Hired.",
    description:
      "Upload your resume and get a comprehensive AI-powered analysis. Identify weaknesses, optimize for ATS systems, and stand out to recruiters.",
    path: "/resume/dashboard",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="8" y="4" width="26" height="34" rx="3" fill="currentColor" opacity="0.15" />
        <rect x="8" y="4" width="26" height="34" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M14 13h14M14 19h14M14 25h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="35" cy="35" r="9" fill="currentColor" opacity="0.15" />
        <circle cx="35" cy="35" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M32 35l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="35" cy="35" r="4" fill="currentColor" opacity="0.15" />
      </svg>
    ),
    accent: "#f59e0b",
    accentDim: "rgba(245,158,11,0.12)",
    accentBorder: "rgba(245,158,11,0.35)",
    badge: null,
    features: ["ATS score check", "Keyword optimization", "Section-by-section feedback"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function ModuleCard({ module, index }) {
  return (
    <motion.div variants={cardVariants}>
      <Link href={module.path} className="group block h-full">
        <div
          className="relative h-full rounded-2xl border p-6 flex flex-col gap-4 cursor-pointer transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, #0f0f0f 0%, #111111 100%)`,
            borderColor: module.accentBorder,
            boxShadow: `0 0 0 0 ${module.accent}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 0 32px -8px ${module.accent}55`;
            e.currentTarget.style.borderColor = module.accent;
            e.currentTarget.style.transform = "translateY(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 0 0 0 ${module.accent}`;
            e.currentTarget.style.borderColor = module.accentBorder;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {/* Badge */}
          {module.badge && (
            <span
              className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: module.accentDim,
                color: module.accent,
                border: `1px solid ${module.accentBorder}`,
                letterSpacing: "0.04em",
              }}
            >
              {module.badge}
            </span>
          )}

          {/* Icon */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: module.accentDim,
              color: module.accent,
              border: `1px solid ${module.accentBorder}`,
            }}
          >
            {module.icon}
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1.5 flex-1">
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: module.accent }}>
              {module.tagline}
            </p>
            <h3 className="text-xl font-bold text-white leading-tight">{module.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>
              {module.description}
            </p>
          </div>

          {/* Features */}
          <ul className="flex flex-col gap-2 mt-1">
            {module.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "#6b7280" }}>
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: module.accent }}
                />
                {f}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div
            className="mt-2 flex items-center gap-2 text-sm font-semibold transition-all duration-200"
            style={{ color: module.accent }}
          >
            Get Started
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `linear-gradient(90deg, transparent, ${module.accent}, transparent)` }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

export default function Options() {
  return (
    <section className="w-full px-4 py-20 md:py-28" style={{ background: "#080808" }}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14 max-w-2xl mx-auto"
      >
        <span
          className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
          style={{
            background: "rgba(255,255,255,0.05)",
            color: "#9ca3af",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Everything You Need
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Your Complete Career{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Toolkit
          </span>
        </h2>
        <p className="text-base" style={{ color: "#6b7280" }}>
          Four powerful AI tools designed to take you from preparation to placement — faster than ever before.
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto"
      >
        {modules.map((mod, i) => (
          <ModuleCard key={mod.id} module={mod} index={i} />
        ))}
      </motion.div>
    </section>
  );
}