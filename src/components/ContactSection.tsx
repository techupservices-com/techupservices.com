"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, SendHorizontal, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.message) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setIsSuccess(true);
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Failed to send message. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 bg-transparent transition-colors duration-500 overflow-hidden">

      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-cyan-100/40 dark:bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/3 transition-colors duration-500" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-6 text-purple-600 dark:text-purple-400 transition-colors shadow-sm dark:shadow-none"
          >
            Let&apos;s Talk
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 transition-colors duration-500"
          >
            Start Your Transformation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-500"
          >
            Ready to integrate powerful automation into your workflow? Reach out to our team to schedule a discovery call today.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            <div className="bg-white dark:bg-[#1A1C23] p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors duration-500">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 transition-colors">Contact Information</h3>

              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 transition-colors">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 transition-colors">Email Us</h4>
                    <a href="mailto:support@techupservices.com" className="text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                      support@techupservices.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 transition-colors">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 transition-colors">Call Us</h4>
                    <a href="tel:+918237447244" className="text-slate-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      +91 82374 47244
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 transition-colors">Visit Us</h4>
                    <p className="text-slate-600 dark:text-gray-400 max-w-[200px] leading-relaxed transition-colors">
                      Office No.1, Near Main Gate, Hari Ganga Society, Yerwada. Pune - 411006
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 h-full"
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-[#1A1C23] p-10 lg:p-14 rounded-[2.5rem] border border-green-200 dark:border-green-500/20 shadow-xl shadow-green-500/10 flex flex-col items-center justify-center text-center h-full min-h-[500px] transition-colors duration-500"
              >
                <div className="w-24 h-24 bg-green-50 dark:bg-green-500/10 text-green-500 dark:text-green-400 rounded-full flex items-center justify-center mb-8">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Request Submitted Successfully!</h3>
                <p className="text-lg text-slate-600 dark:text-gray-400 mb-10 max-w-md">
                  Thank you! We have received your request and our team will get in touch with you soon.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-8 py-3 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white font-semibold transition-colors border border-slate-200 dark:border-white/10"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form
                className="bg-white dark:bg-[#1A1C23] p-8 lg:p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col gap-6 transition-colors duration-500 h-full"
                onSubmit={handleSubmit}
              >
                {error && (
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium border border-red-200 dark:border-red-500/20">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-slate-700 dark:text-gray-300 transition-colors">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-slate-700 dark:text-gray-300 transition-colors">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-gray-300 transition-colors">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-gray-300 transition-colors">How can we help? *</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full h-full min-h-[120px] bg-slate-50 dark:bg-[#12131A] border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 flex items-center justify-center gap-2 w-full py-5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-lg transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-3">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing Request...
                    </span>
                  ) : (
                    <>
                      Send Message
                      <SendHorizontal size={20} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
