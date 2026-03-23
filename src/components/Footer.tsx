import Link from "next/link";
import { ArrowUpRight, Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-transparent pt-24 pb-12 transition-colors duration-500">
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-100/50 dark:bg-purple-900/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-100/50 dark:bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3 transition-colors duration-500" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col">
            <Link href="/" className="font-bold text-3xl tracking-tighter mb-6 inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500">
                TechUp
              </span>
              <span className="text-slate-900 dark:text-white transition-colors">Services</span>
            </Link>
            <p className="text-slate-600 dark:text-gray-400 max-w-sm mb-8 leading-relaxed transition-colors">
              Pioneering the next generation of digital infrastructure. We build scalable, premium AI automations and bespoke digital experiences for visionary enterprises.
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-900 dark:text-white font-semibold mb-6 transition-colors">Services</h4>
            <ul className="flex flex-col gap-4">
              {['AI Automation', 'Web Development', 'Mobile Apps', 'Digital Marketing'].map((item) => (
                <li key={item}>
                  <Link href="#services" className="text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                    {item}
                    <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-slate-900 dark:text-white font-semibold mb-6 transition-colors">Company</h4>
            <ul className="flex flex-col gap-4">
              {['About Us', 'Case Studies', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                    {item}
                    <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 flex flex-col">
            <h4 className="text-slate-900 dark:text-white font-semibold mb-6 transition-colors">Stay up to date</h4>
            <p className="text-slate-600 dark:text-gray-400 mb-6 text-sm leading-relaxed transition-colors">
              Subscribe to our newsletter for the latest insights in AI, automation, and digital excellence.
            </p>
            <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
              <Mail className="absolute left-4 text-slate-400 dark:text-gray-500" size={18} />
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full py-3.5 pl-12 pr-32 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              />
              <button 
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-6 bg-slate-900 dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-slate-800 dark:hover:opacity-90 transition-all"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors">
          <p className="text-slate-500 dark:text-gray-500 text-sm transition-colors">
            © {new Date().getFullYear()} TechUpServices. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="#" className="text-slate-500 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-slate-500 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
