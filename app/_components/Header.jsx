// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import React from 'react'
// import { useUser } from "../provider";
// import Image from "next/image";

// function Header() {
//     const { user } = useUser();
//     return (
//         <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
//             <div className="flex items-center gap-2">
//                 <div className="rounded-full bg-gradient-to-br from-violet-500 to-pink-500" >
//                     <Image src='/logo.png' alt='userAvatar' height='40' width='40' className='rounded-full'></Image>
//                 </div>
//                 <h1 className="text-base font-bold md:text-2xl">HireReady</h1>
//             </div>

//             <div className="item">
//                 {user ? (
//                     <div>
//                         {user&&<Image src={user?.picture} alt='userAvatar' height='40' width='40' className='rounded-full' />}
//                     </div>
//                 ) : (

//                     <Link href="./auth">
//                         <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
//                             Login
//                         </button>
//                     </Link>

//                 )}
//             </div>

//         </nav>
//     )
// }

// export default Header



// ------------------------------------------

"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useUser } from "../provider";
import Image from "next/image";

function Header() {
  const { user } = useUser();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 py-3.5 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(6,6,8,0.85)"
          : "rgba(6,6,8,0.4)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid transparent",
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 group">
        <div
          className="relative rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300"
          style={{
            boxShadow: "0 0 16px rgba(59,130,246,0.35)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 24px rgba(59,130,246,0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 0 16px rgba(59,130,246,0.35)";
          }}
        >
          <Image
            src="/logo.png"
            alt="HireReady logo"
            height={38}
            width={38}
            className="rounded-xl"
          />
        </div>

        <div className="flex flex-col leading-none">
          <span
            className="text-lg font-black tracking-tight"
            style={{
              background: "linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            HireReady
          </span>
          <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "#3b82f6" }}>
            AI Career Prep
          </span>
        </div>
      </Link>

      {/* Nav links — desktop only */}
      <div className="hidden md:flex items-center gap-7">
        {[
          { label: "Mock Interview", href: "/dashboard" },
          { label: "Cover Letter", href: "/aicoverletter/dashboard" },
          { label: "Roadmap", href: "/roadmap/dashboard" },
          { label: "Resume", href: "/resume/dashboard" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-sm font-medium transition-colors duration-200"
            style={{ color: "#64748b" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#cbd5e1")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <button
                className="hidden md:inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200"
                style={{
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.25)",
                  color: "#60a5fa",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(59,130,246,0.18)";
                  e.currentTarget.style.borderColor = "rgba(59,130,246,0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(59,130,246,0.1)";
                  e.currentTarget.style.borderColor = "rgba(59,130,246,0.25)";
                }}
              >
                Dashboard
              </button>
            </Link>

            <div
              className="relative rounded-full overflow-hidden flex-shrink-0"
              style={{
                boxShadow: "0 0 0 2px rgba(59,130,246,0.4)",
              }}
            >
              <Image
                src={user?.picture}
                alt="User avatar"
                height={36}
                width={36}
                className="rounded-full object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/auth">
              <button
                className="text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200"
                style={{ color: "#94a3b8" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f5f9")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
              >
                Log in
              </button>
            </Link>

            <Link href="/auth">
              <button
                className="inline-flex items-center gap-1.5 rounded-xl px-5 py-2 text-sm font-bold text-white transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  boxShadow: "0 0 18px rgba(59,130,246,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 28px rgba(59,130,246,0.5)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 18px rgba(59,130,246,0.3)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Get Started
                <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
}

export default Header;