import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import InfiniteMovingCardDemo from './_components/InfiniteImage'
import {SparklesPreview} from './_components/SparkleEffect'


export default function Home() {
  
  // Landing Page
  return (
    <main className="w-full">

      {/* Full Screen Hero */}
      <section className="min-h-screen w-full">
        <Header />
        <Hero />
        
      </section>

      {/* Scrolling Testimonials */}
      <section className="w-full  flex justify-center items-center">
        <InfiniteMovingCardDemo />
      </section>

    </main>
  );
}
