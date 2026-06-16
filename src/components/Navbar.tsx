"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, MessageSquare, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", updateScrolled);
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  const navLinks = [
    { name: "Freemium", href: "#freemium" },
    { name: "Key System", href: "#key" },
    { name: "Premium", href: "#premium" },
    { name: "Executors", href: "#executors" },
    { name: "Reseller", href: "/reseller" },
  ];

  return (
    <motion.nav
      style={{
        backgroundColor: `rgba(0, 0, 0, ${isScrolled ? 0.8 : 0.4})`,
        backdropFilter: `blur(${isScrolled ? "16px" : "8px"})`,
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled ? "border-purple-500/20 py-3" : "border-white/5 py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="relative">
            <Shield className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-colors" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 group-hover:to-white transition-all duration-500">
            Shield Team
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
              Web : UP
            </span>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-[#0a0a12] border-t border-white/5"
      >
        <div className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-black text-zinc-400 hover:text-white transition-colors uppercase italic"
            >
              {link.name}
            </a>
          ))}
          <hr className="border-white/5 my-2" />
          <Button 
            onClick={() => window.open('https://discord.gg/YvGFfBsY', '_blank')}
            className="w-full bg-primary text-white gap-2 font-black uppercase tracking-widest"
          >
            <MessageSquare className="w-4 h-4" />
            Join HQ
          </Button>
        </div>
      </motion.div>
    </motion.nav>
  );
}
