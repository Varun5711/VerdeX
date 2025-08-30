"use client"
import { FaEthereum } from "react-icons/fa";
import { SiSolana } from "react-icons/si";
import { SiIpfs } from "react-icons/si";
import Link from "next/link"
import { motion } from "framer-motion"
import {
  CheckCircle2,
  ShieldCheck,
  Lock,
  Zap,
  Eye,
  ArrowRight,
  Factory,
  FileDigit,
  Network,
  Cpu,
  KeySquare,
  GitBranch,
  Recycle,
  FileCheck2,
  Workflow,
  Leaf,
  Globe,
  TrendingUp,
} from "lucide-react"

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// ---------- Enhanced Node Component ----------
function Node({
  title,
  desc,
  icon: Icon,
  className = "",
  delay = 0,
}: {
  title: string
  desc: string
  icon: React.ComponentType<any>
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      className={`group relative rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-xl p-6 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 cursor-pointer ${className}`}
      style={{
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="flex items-start gap-4">
        <motion.div 
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-3 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-emerald-300 group-hover:from-emerald-400/30 group-hover:to-cyan-400/30 transition-all"
        >
           
          <Icon className="h-6 w-6" />
        </motion.div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors">{title}</h4>
          <p className="text-sm leading-relaxed text-slate-300 mt-2 group-hover:text-slate-200 transition-colors">{desc}</p>
        </div>
      </div>
      
      {/* Animated border */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 animate-pulse" />
      </div>
      
      {/* Glow effect */}
      <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
    </motion.div>
  )
}

// ---------- Enhanced Connector ----------
function Connector({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg 
      className={`absolute ${className}`} 
      width="320" 
      height="160" 
      viewBox="0 0 320 160" 
      fill="none" 
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
    >
      <motion.path
        d="M 10 150 C 120 30 200 30 310 10"
        stroke="url(#gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: delay + 0.5, ease: "easeInOut" }}
      />
      <motion.circle
        cx="0"
        cy="0"
        r="4"
        fill="#34d399"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay }}
      >
        <animateMotion dur="3s" repeatCount="indefinite">
          <mpath href="#path" />
        </animateMotion>
      </motion.circle>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <path id="path" d="M 10 150 C 120 30 200 30 310 10" />
      </defs>
    </motion.svg>
  )
}

// ---------- Floating Background Elements ----------
function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Hydrogen molecules */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 backdrop-blur-sm" />
        </motion.div>
      ))}
    </div>
  )
}

// ---------- Hero Image Component ----------
function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="relative mx-auto w-full max-w-md h-64 rounded-3xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-blue-500/20" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          {/* Hydrogen atom visualization */}
          <div className="w-32 h-32 relative">
            <div className="absolute inset-0 rounded-full border-2 border-emerald-400/50" />
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-emerald-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2"
            />
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <p className="text-sm font-medium text-emerald-300">Clean Hydrogen Ecosystem</p>
      </div>
    </motion.div>
  )
}

// ---------- Stats Counter ----------
function StatCounter({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <motion.div
        initial={{ textContent: "0" }}
        whileInView={{ textContent: value.toString() }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-bold text-emerald-400"
      >
        {value}{suffix}
      </motion.div>
      <p className="text-slate-300 text-sm mt-1">{label}</p>
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-200 overflow-hidden font-['Inter',sans-serif]">
      <FloatingElements />
      
      {/* Enhanced floating decor */}
      <div className="pointer-events-none fixed -top-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 blur-3xl animate-pulse" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-[32rem] w-[32rem] rounded-full bg-gradient-to-l from-blue-500/10 to-purple-500/10 blur-3xl" />

      {/* ENHANCED HERO */}
      <section className="relative flex flex-col items-center justify-center px-6 md:px-12 pt-16 pb-5">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-6xl"
        >
          <h1 className="text-6xl md:text-8xl font-extralight tracking-tight leading-tight">
            Verde<span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent font-medium">X</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-2 text-xl md:text-2xl text-slate-300 font-light"
          >
            Trace Every Molecule. Trust Every Credit.
          </motion.p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-6"
        >
        </motion.div>

        {/* Enhanced hero chips */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-5 flex flex-wrap justify-center gap-4"
        >
          {[
            { text: "Blockchain", icon: Network },
            { text: "Smart Contracts", icon: Cpu },
            { text: "IPFS", icon: GitBranch },
            { text: "Digital Identity", icon: KeySquare },
            { text: "Regulatory Portal", icon: Eye }
          ].map((item) => (
            <motion.span
              key={item.text}
              variants={itemVariants}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 197, 94, 0.1)" }}
              className="flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm px-4 py-2 text-sm text-slate-300 transition-all hover:border-emerald-500/50 hover:text-emerald-300"
            >
              <item.icon className="h-4 w-4" />
              {item.text}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* ENHANCED PROBLEM SECTION */}
      <section className="relative px-6 md:px-12 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            The Current Crisis
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Green hydrogen certification today lacks transparency, enabling fraud and undermining market confidence
          </p>
        </motion.div>

        {/* Problem visualization */}
        <div className="relative max-w-7xl mx-auto">
          {/* Center problem core */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-fit mb-12"
          >
            <div className="relative rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-900/20 to-orange-900/20 backdrop-blur-xl px-8 py-6 text-center shadow-red-500/20 shadow-2xl">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-500/10 to-orange-500/10 animate-pulse" />
              <p className="relative text-lg text-slate-200 font-medium">
                Broken trust: <span className="text-red-400">double counting</span>, 
                <span className="text-orange-400"> fraud</span>, and 
                <span className="text-red-400"> unverifiable claims</span>
              </p>
            </div>
          </motion.div>

          {/* Problem nodes */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <Node 
              icon={Lock} 
              title="Double Counting Crisis" 
              desc="Same production claimed multiple times across markets. No unique identifiers create market chaos."
              className="border-red-500/30 hover:border-red-400/50"
            />
            <Node 
              icon={ShieldCheck} 
              title="Fraudulent Certificates" 
              desc="Forged or altered credentials with no tamper-proof verification. Trust erodes quickly."
              className="border-orange-500/30 hover:border-orange-400/50"
            />
            <Node 
              icon={FileDigit} 
              title="Data Black Holes" 
              desc="No independent verification of meter readings or production data. Opacity enables manipulation."
              className="border-red-500/30 hover:border-red-400/50"
            />
            <Node 
              icon={Workflow} 
              title="Compliance Nightmare" 
              desc="Manual, slow verification processes. Cross-border validation takes months, not minutes."
              className="border-orange-500/30 hover:border-orange-400/50"
            />
          </motion.div>
        </div>
      </section>

      {/* ENHANCED SOLUTION SECTION */}
      <section className="relative px-6 md:px-12 py-10 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            VerdeX Solution
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            A blockchain-powered ecosystem that makes every hydrogen credit traceable, verifiable, and fraud-proof
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Solution Architecture */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16"
          >
            {/* Left: Data Layer */}
            <div className="space-y-6">
              <motion.h3
                variants={itemVariants}
                className="text-xl font-semibold text-cyan-400 text-center mb-4"
              >
                Data Layer
              </motion.h3>
              <Node icon={Factory} title="IoT Integration" desc="Real-time data from production facilities via secure IoT sensors." />
              <Node icon={GitBranch} title="IPFS Storage" desc="Decentralized certificate storage with cryptographic hashes preventing tampering." />
            </div>

            {/* Center: Blockchain Core */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="h-full rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 to-cyan-900/20 backdrop-blur-xl p-8 flex flex-col justify-center text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="mx-auto mb-6 w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center justify-center"
                >
                  <Network className="h-8 w-8 text-slate-900" />
                </motion.div>
                <h3 className="text-2xl font-semibold text-emerald-400 mb-4">Blockchain Core</h3>
                <ul className="space-y-3 text-slate-300 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Immutable credit ledger
                  </li>
                  <li className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-cyan-400" />
                    Smart contract automation
                  </li>
                  <li className="flex items-center gap-2">
                    <KeySquare className="h-4 w-4 text-blue-400" />
                    Digital identity verification
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right: Interface Layer */}
            <div className="space-y-6">
              <motion.h3
                variants={itemVariants}
                className="text-xl font-semibold text-blue-400 text-center mb-4"
              >
                Interface Layer
              </motion.h3>
              <Node icon={Eye} title="Regulator Dashboard" desc="Real-time monitoring with automated alerts for suspicious activities and compliance." />
              <Node icon={TrendingUp} title="Integration Overview" desc="Manage all connected services in one place. Simplify integration work flows and ensure everthing stays synchronized" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ENHANCED LIFECYCLE */}
      <section className="relative px-6 md:px-12 py-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-4xl md:text-5xl font-light mb-16 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Credit Lifecycle Journey
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          {/* Process flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Factory, title: "Production", desc: "Renewable energy → H₂. IoT sensors capture real-time data with timestamps.", step: "01" },
              { icon: FileCheck2, title: "Certification", desc: "Independent validation of energy source, volume, and production method.", step: "02" },
              { icon: GitBranch, title: "Tokenization", desc: "Smart contracts mint unique credits with IPFS certificate links.", step: "03" },
              { icon: ArrowRight, title: "Trading", desc: "Secure peer-to-peer transfers with full provenance tracking.", step: "04" },
              { icon: Recycle, title: "Retirement", desc: "Credits burned for compliance use with permanent audit trail.", step: "05" },
              { icon: Eye, title: "Monitoring", desc: "Real-time regulator oversight prevents fraud and double counting.", step: "06" },
              { icon: ShieldCheck, title: "Compliance", desc: "Automated reporting and cross-border verification for global trade.", step: "07" },
              { icon: Globe, title: "Impact", desc: "Verified environmental benefits drive sustainable hydrogen adoption.", step: "08" }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-900 text-xs font-bold z-10">
                  {item.step}
                </div>
                
                <div className="rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl p-6 h-full shadow-2xl group-hover:shadow-emerald-500/20 transition-all duration-500">
                  <div className="flex flex-col items-center text-center h-full">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="rounded-2xl p-4 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-emerald-300 mb-4"
                    >
                      <item.icon className="h-6 w-6" />
                    </motion.div>
                    <h4 className="text-lg font-semibold text-slate-100 mb-3 group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed flex-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
                
                {/* Connection line to next step */}
                {index < 7 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-emerald-500/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ENHANCED STAKEHOLDERS */}
      <section className="relative px-6 md:px-12 py-20 bg-gradient-to-r from-slate-900/30 to-slate-800/30">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-4xl md:text-5xl font-light mb-16"
        >
          Ecosystem Stakeholders
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <Node 
            icon={Factory} 
            title="H₂ Producers" 
            desc="Electrolysis facilities earn premium pricing through verified green credentials and faster market access."
            className="hover:border-emerald-500/50"
          />
          <Node 
            icon={Eye} 
            title="Regulators" 
            desc="Authorities gain real-time oversight with automated compliance monitoring and fraud detection."
            className="hover:border-blue-500/50"
          />
          <Node 
            icon={ShieldCheck} 
            title="Industries" 
            desc="Steel, chemicals, and transport sectors prove ESG compliance with auditable green hydrogen consumption."
            className="hover:border-purple-500/50"
          />
          <Node 
            icon={TrendingUp} 
            title="Investors" 
            desc="Fund authentic green projects with transparent performance metrics and verified environmental impact."
            className="hover:border-cyan-500/50"
          />
        </motion.div>
      </section>

      {/* ENHANCED ADVANTAGES */}
      <section className="relative px-6 md:px-12 py-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-4xl md:text-5xl font-light mb-16 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
        >
          VerdeX Advantages
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <Node 
            icon={Lock} 
            title="Immutable Transparency" 
            desc="Every transaction permanently recorded on blockchain. No edits, only verifiable append-only history creating unshakeable trust."
            className="hover:shadow-emerald-500/30"
          />
          <Node 
            icon={Zap} 
            title="Automated Execution" 
            desc="Smart contracts eliminate manual processes. Instant verification, transfer, and retirement with rule-based enforcement."
            className="hover:shadow-cyan-500/30"
          />
          <Node 
            icon={Globe} 
            title="Global Interoperability" 
            desc="Standards-compliant design enables seamless cross-border trading with universal certificate recognition."
            className="hover:shadow-blue-500/30"
          />
          <Node 
            icon={KeySquare} 
            title="Identity & Access Control" 
            desc="Role-based permissions ensure only authority can issue credits. Multi-signature security protocols."
            className="hover:shadow-purple-500/30"
          />
        </motion.div>
      </section>

      {/* ENHANCED CTA */}
      <section className="relative px-6 md:px-12 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Mission statement with enhanced styling */}
          <div className="relative rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 via-cyan-900/20 to-blue-900/20 backdrop-blur-xl p-12 mb-12 shadow-2xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-blue-500/5 animate-pulse" />
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative"
            >
              <h3 className="text-2xl md:text-3xl font-medium text-emerald-300 mb-4">
                Building Trust in the Hydrogen Economy
              </h3>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-6">
                VerdeX transforms green hydrogen from a commodity plagued by fraud into a trustworthy asset that powers global decarbonization.
              </p>
              <div className="flex items-center justify-center gap-8 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-emerald-400" />
                  <span>Carbon Neutral</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* <Shield className="h-5 w-5 text-cyan-400" /> */}
                  <span>Fraud Proof</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-400" />
                  <span>Globally Traded</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 font-semibold text-slate-950 shadow-2xl transition-all hover:shadow-emerald-500/50 hover:from-emerald-400 hover:to-cyan-400"
              >
                <span>Explore Platform</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="#lifecycle"
                className="group inline-flex items-center gap-3 rounded-2xl border border-cyan-400/50 bg-slate-900/40 backdrop-blur-sm px-8 py-4 font-semibold text-cyan-300 transition-all hover:bg-slate-800/60 hover:border-cyan-400"
              >
                <span>View Demo</span>
                <Eye className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </motion.div>
          </motion.div>

          {/* Technology stack showcase */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-0 pt-12 border-t border-slate-800/50"
          >
            <p className="text-center text-slate-400 mb-8 text-sm uppercase tracking-wider">
              Powered By Leading Technologies
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              
               
               
           
                <motion.div
                //   key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + 1 * 0.1, duration: 0.6 }}
                  className="text-center group hover:opacity-100 transition-opacity"
                >
                  <div className="w-16 h-16 mx-auto mb-2 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                    {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20" /> */}
                    <FaEthereum />
                  </div>
                  <p className="text-xs font-medium text-slate-300">Ethereum</p>
                  <p className="text-xs text-slate-500">Smart Contracts</p>
                </motion.div>
                 <motion.div
                //   key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + 2 * 0.1, duration: 0.6 }}
                  className="text-center group hover:opacity-100 transition-opacity"
                >
                  <div className="w-16 h-16 mx-auto mb-2 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                    {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20" /> */}
                    <SiIpfs />
                  </div>
                  <p className="text-xs font-medium text-slate-300">IPFS</p>
                  <p className="text-xs text-slate-500">Decentralized Storage</p>
                </motion.div>
                 <motion.div
                //   key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + 3 * 0.1, duration: 0.6 }}
                  className="text-center group hover:opacity-100 transition-opacity"
                >
                  <div className="w-16 h-16 mx-auto mb-2 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                    {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20" /> */}
                    <SiSolana />
                  </div>
                  <p className="text-xs font-medium text-slate-300">Solana</p>
                  <p className="text-xs text-slate-500">Proof of History</p>
                </motion.div>
             
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-emerald-500/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-emerald-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </main>
  )
}
