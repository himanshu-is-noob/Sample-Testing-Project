"use client";

import React from "react";
import { InfiniteMovingCards } from "../../components/infinite-moving-cards";

const testimonials = [
  {
    quote:
      "With AI, you can now practice personalized mock interviews and get real-time feedback to crack your dream job.",
    name: "AI Interviewer",
    title: "Smart Hiring Assistant",
  },
  {
    quote:
      "Prepare faster, identify weak areas, and improve your confidence before the real interview.",
    name: "Career Coach",
    title: "AI Powered",
  },
  {
    quote:
      "Designed specially for on-campus and off-campus placement preparation.",
    name: "Placement Ready",
    title: "Interview AI",
  },
];

export default function InfiniteImage() {
  return (
    <div className="relative py-20">
      <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
    </div>
  );
}
