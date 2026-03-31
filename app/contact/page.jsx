"use client";

import React, { useState } from 'react';
import { Mail, MessageSquare, Twitter, Github, Send, AlertCircle, CheckCircle2, Copy, Check } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, success: false, error: null });
  const [copied, setCopied] = useState(false);

  const myEmail = "papandreouthodores7@gmail.com";

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(myEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      // Χρησιμοποιούμε το fetch με όλα τα απαραίτητα headers για να μην "χτυπάει"
      const response = await fetch("https://formspree.io", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.error || "Κάτι πήγε στραβά. Δοκίμασε ξανά.");
      }
    } catch (err) {
      // Αν το error είναι "Failed to fetch", εμφανίζουμε πιο κατανοητό μήνυμα
      setStatus({ 
        submitting: false, 
        success: false, 
        error: "Σφάλμα σύνδεσης. Βεβαιώσου ότι το Formspree ID είναι σωστό." 
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white transition-colors duration-300 font-sans relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-900/30 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-blue-900/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent italic tracking-tighter">
            Get in Touch
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Form Side */}
          <div className="lg:col-span-7 bg-[#111111]/80 backdrop-blur-xl border border-white/5 p-8 rounded-3xl shadow-2xl">
            {status.success ? (
              <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
                <CheckCircle2 className="text-green-400 mx-auto mb-6" size={60} />
                <h2 className="text-3xl font-bold mb-2">Sent Successfully!</h2>
                <button onClick={() => setStatus({ ...status, success: false })} className="text-purple-400 font-bold hover:underline mt-4">Send New Message</button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-8 text-xl font-bold tracking-tight uppercase italic">
                  <MessageSquare className="text-purple-500" size={24} />
                  <h2>Send a Message</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input name="name" required value={formData.name} onChange={handleChange} placeholder="NAME" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-purple-500 transition-all font-bold text-sm" />
                    <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="EMAIL" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-purple-500 transition-all font-bold text-sm" />
                  </div>
                  <input name="subject" required value={formData.subject} onChange={handleChange} placeholder="SUBJECT" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-purple-500 transition-all font-bold text-sm" />
                  <textarea name="message" rows="5" required value={formData.message} onChange={handleChange} placeholder="MESSAGE..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-purple-500 transition-all font-bold resize-none text-sm"></textarea>

                  {status.error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-center gap-2 text-xs font-bold uppercase italic">
                      <AlertCircle size={16} /> {status.error}
                    </div>
                  )}

                  <button type="submit" disabled={status.submitting} className="w-full bg-white text-black font-black py-5 rounded-xl hover:bg-purple-600 hover:text-white transition-all transform active:scale-95 shadow-xl text-xl italic tracking-tighter uppercase">
                    {status.submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/5 p-8 rounded-3xl shadow-xl">
              <div className="flex items-center gap-3 mb-8 text-xl font-bold tracking-tight uppercase italic">
                <Mail className="text-blue-500" size={24} />
                <h2>Direct Contact</h2>
              </div>
              <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex items-center justify-between group">
                <div className="overflow-hidden">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 italic">Email</p>
                  <p className="text-lg font-bold truncate italic">{myEmail}</p>
                </div>
                <button onClick={copyToClipboard} className="p-3 bg-white/10 rounded-xl hover:bg-white hover:text-black transition-all">
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
