"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log("Form Submitted:", formData)
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", company: "", message: "" })
    }, 5000)
  }

  return (
    <section className="min-h-screen bg-gray-950 relative overflow-hidden font-sans">
      {/* Dark background with subtle pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />
        <div className="absolute inset-0 opacity-[0.08]">
          <svg width="100%" height="100%" className="w-full h-full">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#10b981" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Floating molecules animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`molecule-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.1, 0],
              scale: [0, 1, 0],
              x: [
                Math.random() * 100 + 50,
                Math.random() * 200 + 100,
                Math.random() * 100 + 50
              ],
              y: [
                Math.random() * 100 + 100,
                Math.random() * 200 + 200,
                Math.random() * 100 + 100
              ]
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            className="absolute w-3 h-3 rounded-full bg-green-400"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column - Hero Content */}
          <div className="lg:col-span-7 space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="space-y-12"
            >
              {/* Main heading */}
              <div className="space-y-6">
                <motion.h1 
                  className="text-7xl md:text-8xl lg:text-9xl font-thin text-white leading-[0.78] tracking-tighter"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                >
                  Let's build
                  <motion.span 
                    className="block text-green-400"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  >
                    tomorrow.
                  </motion.span>
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="w-16 h-0.5 bg-green-500"
                />
              </div>
              
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="space-y-8 max-w-xl"
              >
                <p className="text-2xl md:text-3xl text-gray-400 leading-relaxed font-light">
                  Transform green hydrogen certification with blockchain technology. 
                  Every molecule traced, every credit trusted.
                </p>
                
                {/* Key points */}
                <div className="space-y-6 pt-4">
                  {[
                    "Eliminate double counting with unique blockchain identity",
                    "Tamper-proof verification through digital signatures", 
                    "Real-time regulatory oversight and compliance",
                    "IoT-backed data authenticity"
                  ].map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-3 flex-shrink-0" />
                      <p className="text-lg text-gray-300 font-light leading-relaxed">
                        {point}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase">
                    Direct Contact
                  </p>
                  <motion.a
                    whileHover={{ x: 4 }}
                    href="mailto:hello@verdex.com"
                    className="text-lg text-gray-200 hover:text-green-400 transition-all duration-200 block font-light"
                  >
                    hello@verdex.com
                  </motion.a>
                  <motion.a
                    whileHover={{ x: 4 }}
                    href="tel:+15551234567"
                    className="text-lg text-gray-200 hover:text-green-400 transition-all duration-200 block font-light"
                  >
                    +1 (555) 123-4567
                  </motion.a>
                </div>
                
                <div className="space-y-3">
                  <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase">
                    Response Time
                  </p>
                  <p className="text-lg text-gray-300 font-light leading-relaxed">
                    Typically within 12 hours
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="sticky top-24"
            >
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    className="bg-gray-900/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-800/50"
                  >
                    <div className="space-y-10">
                      <div className="space-y-4">
                        <h2 className="text-2xl font-light text-white">
                          Start the conversation
                        </h2>
                        <p className="text-gray-400 font-light">
                          Tell us about your green hydrogen project
                        </p>
                      </div>

                      <div className="space-y-8">
                        {/* Name Field */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.6 }}
                          className="space-y-3"
                        >
                          <label className="block text-xs text-gray-500 font-semibold tracking-wider uppercase">
                            Full Name
                          </label>
                          <div className="relative">
                            <input
                             autoComplete="off"
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("name")}
                              onBlur={() => setFocusedField(null)}
                              required
                              className="w-full px-0 py-4 text-xl text-white bg-transparent border-0 border-b-2 border-gray-700 focus:outline-none focus:border-green-500 transition-all duration-300 placeholder-gray-500 font-light"
                              placeholder="Enter your full name"
                            />
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: focusedField === "name" ? 1 : 0 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="absolute bottom-0 left-0 h-0.5 w-full bg-green-500 origin-left"
                            />
                          </div>
                        </motion.div>

                        {/* Email Field */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6, duration: 0.6 }}
                          className="space-y-3"
                        >
                          <label className="block text-xs text-gray-500 font-semibold tracking-wider uppercase">
                            Email Address
                          </label>
                          <div className="relative">
                            <input
                              autoComplete="off"
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("email")}
                              onBlur={() => setFocusedField(null)}
                              required
                              className="w-full px-0 py-4 text-xl text-white bg-transparent border-0 border-b-2 border-gray-700 focus:outline-none focus:border-green-500 transition-all duration-300 placeholder-gray-500 font-light"
                              placeholder="your@company.com"
                            />
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: focusedField === "email" ? 1 : 0 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="absolute bottom-0 left-0 h-0.5 w-full bg-green-500 origin-left"
                            />
                          </div>
                        </motion.div>

                        {/* Company Field */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7, duration: 0.6 }}
                          className="space-y-3"
                        >
                          <label className="block text-xs text-gray-500 font-semibold tracking-wider uppercase">
                            Company
                          </label>
                          <div className="relative">
                            <input
                             autoComplete="off"
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("company")}
                              onBlur={() => setFocusedField(null)}
                              className="w-full px-0 py-4 text-xl text-white bg-transparent border-0 border-b-2 border-gray-700 focus:outline-none focus:border-green-500 transition-all duration-300 placeholder-gray-500 font-light"
                              placeholder="Your organization"
                            />
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: focusedField === "company" ? 1 : 0 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="absolute bottom-0 left-0 h-0.5 w-full bg-green-500 origin-left"
                            />
                          </div>
                        </motion.div>

                        {/* Message Field */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8, duration: 0.6 }}
                          className="space-y-3"
                        >
                          <label className="block text-xs text-gray-500 font-semibold tracking-wider uppercase">
                            Project Details
                          </label>
                          <div className="relative">
                            <textarea
                             autoComplete="off"
                              name="message"
                              rows={6}
                              value={formData.message}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("message")}
                              onBlur={() => setFocusedField(null)}
                              required
                              className="w-full px-0 py-4 text-xl text-white bg-transparent border-0 border-b-2 border-gray-700 focus:outline-none focus:border-green-500 transition-all duration-300 placeholder-gray-500 resize-none font-light"
                              placeholder="Describe your green hydrogen project, compliance needs, or partnership interests..."
                            />
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: focusedField === "message" ? 1 : 0 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="absolute bottom-0 left-0 h-0.5 w-full bg-green-500 origin-left"
                            />
                          </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9, duration: 0.6 }}
                          className="pt-6"
                        >
                          <motion.button
                            whileHover={{ 
                              scale: 1.02,
                              boxShadow: "0 8px 32px rgba(16, 185, 129, 0.2)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                            className="w-full py-5 px-8 bg-green-600 hover:bg-green-700 text-white font-medium text-lg rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-70 relative overflow-hidden"
                          >
                            <AnimatePresence mode="wait">
                              {isSubmitting ? (
                                <motion.span
                                  key="submitting"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="flex items-center justify-center space-x-3"
                                >
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-gray-300 border-t-white rounded-full"
                                  />
                                  <span>Sending securely</span>
                                </motion.span>
                              ) : (
                                <motion.span
                                  key="default"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                >
                                  Send message
                                </motion.span>
                              )}
                            </AnimatePresence>
                            
                            {/* Hover effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 opacity-0"
                              whileHover={{ opacity: 0.1 }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.button>
                          
                          <p className="text-xs text-gray-500 mt-4 font-light">
                            Your data is encrypted and secure. We never share your information.
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // Success State
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
                    className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-12 border border-green-500/20 text-left"
                  >
                    <div className="space-y-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center"
                      >
                        <motion.svg
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.5, duration: 1 }}
                          className="w-8 h-8 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <motion.path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </motion.svg>
                      </motion.div>
                      
                      <div className="space-y-4">
                        <h3 className="text-3xl font-light text-white">
                          Message received.
                        </h3>
                        <p className="text-xl text-gray-300 font-light leading-relaxed">
                          Thank you for your interest in VerdeX. Our team will review your message and respond within 12 hours with next steps.
                        </p>
                        
                        <div className="pt-4 space-y-2">
                          <p className="text-sm text-green-400 font-medium">
                            What happens next?
                          </p>
                          <p className="text-sm text-gray-400 font-light leading-relaxed">
                            We'll schedule a discovery call to understand your green hydrogen certification needs and explore how VerdeX can support your project.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Bottom section - Platform highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="pt-24 border-t border-gray-800 mt-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: "Blockchain Verified", 
                description: "Every certificate secured with immutable blockchain technology" 
              },
              { 
                title: "IoT Integration", 
                description: "Real sensor data backing every green hydrogen credit" 
              },
              { 
                title: "Regulatory Ready", 
                description: "Built for compliance with emerging hydrogen standards" 
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.1, duration: 0.6 }}
                className="space-y-4"
              >
                <h4 className="text-lg font-medium text-white">
                  {feature.title}
                </h4>
                <p className="text-gray-400 font-light leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.8 }}
            className="text-center pt-16"
          >
            <p className="text-2xl text-gray-500 font-extralight tracking-wide">
              Trace Every Molecule. Trust Every Credit.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle corner accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute top-8 right-8 w-2 h-2 bg-green-500 rounded-full"
      />
    </section>
  )
}

export default Contact