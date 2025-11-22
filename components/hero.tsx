"use client";
import Image from "next/image";
import headerImg from "../public/header.jpg";
export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={headerImg}
          alt="Community"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* <div className="mb-6 inline-block">
          <span className="text-accent text-sm font-semibold tracking-wider">
            LAGUNA PROVINCE
          </span>
        </div> */}

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
         Laguna Farmers & Fisherfolks Registry Management System
        </h1>

        <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto text-balance">
          Empowering agricultural and fishery communities through comprehensive
          registry, training, and support services.
        </p>

        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition">
            Get Started
          </button>
          <button className="px-8 py-3 bg-white/10 text-white font-semibold rounded-lg border border-white/30 hover:bg-white/20 transition">
            Learn More
          </button>
        </div> */}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
