"use client";

import { SignIn } from "@clerk/nextjs";
import { useState, useEffect } from "react";

// Vortex component placeholder - replace with your actual Vortex component
const Vortex = ({ backgroundColor, particleCount, rangeY, baseHue, baseSpeed, rangeSpeed, baseRadius, rangeRadius, containerClassName }) => {
  return (
    <div className={containerClassName}>
      {/* Animated particles effect */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
        {[...Array(30)].map((_, i) => (
          <div
            key={`cyan-${i}`}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function Page() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Vortex */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <Vortex
          backgroundColor="#020617" // slate-950 background for deep space feel
          particleCount={800}
          rangeY={600}
          baseHue={170} // between emerald and cyan for aurora effect
          baseSpeed={0.15}
          rangeSpeed={1.6}
          baseRadius={0.8}
          rangeRadius={1.6}
          containerClassName="h-full w-full"
        />
      </div>

      {/* Subtle vignette to focus the content */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          boxShadow:
            "inset 0 0 240px rgba(0,0,0,0.6), inset 0 0 480px rgba(2,6,23,0.8)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-20 w-full max-w-2xl mx-auto px-8 py-0">
        {/* Main Headline */}
        <div
          className={`text-center mb-12 space-y-6 transform transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          {/* <h1 className="text-balance text-4xl md:text-6xl font-light text-white leading-tight tracking-tight">
            Welcome to
            <br />
            <span className="font-normal text-emerald-400">Transparent Green</span>
            <br />
            Hydrogen Credits
          </h1> */}
          {/* <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Sign in to access your blockchain-verified hydrogen credit portfolio
          </p> */}
        </div>

        {/* Signup form container with enhanced glass effect */}
        <div
          className={`bg-slate-900/40 backdrop-blur-2xl border border-slate-700/50 rounded-3xl pb-5 shadow-2xl max-w-lg mx-auto transform transition-all duration-700 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          style={{
            boxShadow: "0 0 80px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
          }}
        >
          <SignIn
            appearance={{
              elements: {
                // Root container
                rootBox: "mx-auto",
                card: "bg-transparent shadow-none border-none",
                
                // Header elements
                headerTitle: "text-white text-2xl font-light mb-2",
                headerSubtitle: "text-slate-400 text-base font-light",
                
                // Form elements
                formFieldInput: 
                  "bg-slate-800/60 border-slate-600/60 text-white placeholder-slate-400 " +
                  "focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl h-14 text-base " +
                  "backdrop-blur-sm transition-all duration-200",
                formFieldLabel: "text-slate-300 font-medium text-base mb-2",
                
                // Primary button
                formButtonPrimary: 
                  "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium rounded-xl " +
                  "shadow-lg transform transition-all duration-200 hover:scale-105 " +
                  "focus:ring-4 focus:ring-emerald-500/25 h-14 text-base tracking-wide",
                
                // Secondary elements
                formButtonSecondary: 
                  "text-slate-400 hover:text-white border-slate-600/60 hover:border-slate-500 " +
                  "rounded-xl transition-all duration-200 h-12 backdrop-blur-sm",
                
                // Links
                footerActionLink: "text-emerald-400 hover:text-emerald-300 font-medium",
                identityPreviewText: "text-slate-300",
                identityPreviewEditButton: "text-emerald-400 hover:text-emerald-300",
                
                // Divider
                dividerLine: "bg-slate-600/60",
                dividerText: "text-slate-400 font-light",
                
                // Social buttons
                socialButtonsBlockButton: 
                  "bg-slate-800/60 border-slate-600/60 text-white hover:bg-slate-700/60 " +
                  "rounded-xl transition-all duration-200 h-12 backdrop-blur-sm",
                socialButtonsBlockButtonText: "text-white font-medium",
                
                // Footer
                footer: "hidden",
                
                // Form container
                form: "space-y-8",
                
                // Error states
                formFieldError: "text-red-400",
                alert: "bg-red-900/20 border-red-500/30 text-red-400 rounded-xl backdrop-blur-sm",
                
                // Loading states
                formFieldInputShowPasswordButton: "text-slate-400 hover:text-white",
                
                // OTP and verification
                formFieldSuccessText: "text-emerald-400",
                otpCodeFieldInput: 
                  "bg-slate-800/60 border-slate-600/60 text-white " +
                  "focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl text-center h-14 text-lg",
              },
              layout: {
                socialButtonsPlacement: "top",
                showOptionalFields: false,
              },
              variables: {
                colorPrimary: "#10b981", // Emerald
                colorSuccess: "#10b981", // Emerald
                colorWarning: "#f59e0b", // Amber
                colorDanger: "#ef4444",  // Red
                colorNeutral: "#64748b", // Slate
                colorText: "#ffffff",
                colorTextSecondary: "#94a3b8",
                colorBackground: "transparent",
                colorInputBackground: "rgba(30, 41, 59, 0.6)",
                colorInputText: "#ffffff",
                borderRadius: "0.75rem",
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: "16px",
                spacingUnit: "1.5rem",
              },
            }}
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
          />
        </div>

        {/* Footer text with enhanced styling */}
        <div
          className={`text-center mt-10 transform transition-all duration-700 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
         
          
        
        </div>
      </div>
    </section>
  );
}