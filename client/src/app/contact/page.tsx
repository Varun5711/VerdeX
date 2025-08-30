"use client"

import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.18, duration: 0.8, ease: "easeOut" },
  }),
}

export default function About() {
  return (
    <section
      className="relative min-h-screen bg-black text-white"
      style={{
        // System / Apple font stack (will pick SF Pro on macOS)
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />

      {/* Decorative glows */}
      <div className="absolute top-40 -left-20 w-96 h-96 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-20 -right-20 w-[28rem] h-[28rem] bg-cyan-500/20 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT: Text */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-8">
          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight"
          >
            About{" "}
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Verdex
            </motion.span>
          </motion.h2>

          <motion.p variants={fadeUp} custom={1} className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed font-light">
            We’re building the future of blockchain infrastructure — secure, scalable,
            and designed with a human-first approach. Our mission is to empower businesses
            with cutting-edge tools that feel as seamless as they are powerful.
          </motion.p>

          <motion.div variants={fadeUp} custom={2} className="flex flex-col sm:flex-row gap-6 pt-4">
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(16,185,129,0.45)" }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-black font-medium text-lg"
            >
              Get in Touch
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="#services"
              className="px-8 py-4 rounded-xl border border-slate-700 text-white font-medium text-lg hover:border-slate-500 transition-all"
            >
              Learn More
            </motion.a>
          </motion.div>
        </motion.div>

        {/* RIGHT: Animated visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="w-72 h-72 md:w-96 md:h-96 rounded-full border border-slate-700 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: [-360, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 backdrop-blur-xl flex items-center justify-center"
            >
              <h3 className="text-2xl font-medium">Innovation Hub</h3>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
