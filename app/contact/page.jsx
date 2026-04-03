"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Send, CheckCircle2, AlertCircle, PartyPopper, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  // Validation Logic
  const isEmailValid = useMemo(() => formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), [formData.email]);
  const isFormValid = useMemo(() => formData.name.trim().length >= 3 && isEmailValid && formData.message.trim().length >= 10, [formData, isEmailValid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Προσομοίωση αποστολής (delay 1.5s)
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center py-20 px-4 overflow-hidden">
      
      {/* BACKGROUND IMAGE ANIMATION */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://unsplash.com')` }}
      >
        <div className="absolute inset-0 bg-black/85 backdrop-blur-[4px]" />
      </motion.div>

      <div className="container relative z-10 mx-auto max-w-6xl">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div 
              key="form"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              {/* LEFT SIDE: TITLES */}
              <div className="space-y-8 text-center lg:text-left">
                <motion.h1 
                  initial={{ x: -50 }} animate={{ x: 0 }}
                  className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none"
                >
                  Contact <span className="text-blue-500">Us</span>
                </motion.h1>
                <div className="space-y-4">
                  {['Name (min 3 chars)', 'Valid Email Address', 'Message (min 10 chars)'].map((text, i) => (
                    <motion.p 
                      key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 * i }}
                      className="flex items-center gap-3 justify-center lg:justify-start text-zinc-400 text-lg"
                    >
                      <CheckCircle2 className={(i===0 && formData.name.length >= 3) || (i===1 && isEmailValid) || (i===2 && formData.message.length >= 10) ? "text-green-500" : "text-zinc-700"} size={22} />
                      {text}
                    </motion.p>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE: FORM CARD */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-zinc-900/60 backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] shadow-2xl"
              >
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-2">Your Name</label>
                    <input 
                      name="name" type="text" placeholder="Enter your name" 
                      className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 text-white outline-none focus:border-blue-500 transition-all"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-2">Email Address</label>
                    <input 
                      name="email" type="email" placeholder="name@domain.com" 
                      className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 text-white outline-none focus:border-blue-500 transition-all"
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-2">Message</label>
                    <textarea 
                      name="message" rows="4" placeholder="How can we help you?" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white outline-none focus:border-blue-500 transition-all resize-none"
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>

                  <Button 
                    disabled={!isFormValid || loading}
                    className={`w-full h-16 font-black text-lg uppercase tracking-widest rounded-2xl transition-all gap-3 ${isFormValid ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20' : 'bg-zinc-800 text-zinc-500 opacity-50'}`}
                  >
                    {loading ? <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (isFormValid ? <Send size={20} /> : <AlertCircle size={20} />)}
                    {loading ? "Sending..." : (isFormValid ? "Send Message" : "Locked")}
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          ) : (
            /* SUCCESS MESSAGE CARD */
            <motion.div 
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-md mx-auto text-center space-y-8 bg-blue-600 p-12 rounded-[3.5rem] shadow-[0_20px_80px_rgba(37,99,235,0.4)]"
            >
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl"
              >
                <PartyPopper className="text-blue-600 w-12 h-12" />
              </motion.div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black uppercase text-white tracking-tighter italic">Message Sent!</h2>
                <p className="text-blue-100 font-medium">Thanks for reaching out, <span className="font-black underline">{formData.name}</span>. Our team will get back to you within 24 hours.</p>
              </div>
              <Link href="/">
                <Button variant="outline" className="mt-4 w-full h-14 rounded-2xl bg-white text-blue-600 border-none font-black hover:bg-zinc-100 transition-all uppercase tracking-widest gap-2">
                  <ArrowLeft size={18} /> Back to Home
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
