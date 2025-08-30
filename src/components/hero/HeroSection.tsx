"use client"

import { useState, useEffect } from "react"
import { Vortex } from "@/components/ui/vortex"
import Link from "next/link"

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Vortex */}
      <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
        <Vortex
          backgroundColor="#fffff"
          particleCount={800}
          rangeY={600}
          baseHue={170}
          baseSpeed={0.15}
          rangeSpeed={1.6}
          baseRadius={0.8}
          rangeRadius={1.6}
          containerClassName="h-full w-full"
        />
      </div>

      {/* Subtle vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          boxShadow: "inset 0 0 240px rgba(0,0,0,0.6), inset 0 0 480px rgba(2,6,23,0.8)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-8 py-16 text-center">
        {/* Main Headline */}
        <div
          className={`space-y-8 transform transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <h1 className="text-balance text-5xl md:text-7xl font-light text-white leading-tight tracking-tight">
            Transparent Green
            <br />
            Hydrogen Credits
            <br />
            <span className="font-normal text-emerald-400">on Blockchain</span>
          </h1>
        </div>

        {/* Subheadline */}
        <div
          className={`mt-8 transform transition-all duration-700 delay-150 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Issue, track, and retire certified credits with immutable on-chain proof.
          </p>
        </div>

        {/* CTA Row */}
        <div
          className={`mt-12 flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-700 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <button className="px-8 py-4 bg-emerald-500 text-slate-950 font-medium tracking-wide hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 transition-colors duration-200">
            Get Started
            <span className="sr-only"> with green hydrogen credits</span>
          </button>
          
          <Link
            href="/about"
            className="px-8 py-4 border border-cyan-400 text-cyan-300 font-medium tracking-wide hover:bg-slate-900/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 transition-colors duration-200 text-center"
          >
            Learn More
          </Link>
        </div>

        {/* Trust Badges */}
        <div
          className={`mt-16 transform transition-all duration-700 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-400 font-medium">
            <span>Built on Ethereum</span>
            <span className="text-slate-700">·</span>
            <span>Audited by Authorities</span>
            <span className="text-slate-700">·</span>
            <span>Powered by Convex</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
