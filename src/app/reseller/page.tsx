"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Globe, Star, ShieldCheck, MapPin, Award, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResellerPage() {
  const resellers = [
    { name: "ShieldStore ID", region: "Indonesia", rating: 5.0, sales: "1.2k+", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop" },
    { name: "Vortex Hub", region: "United States", rating: 4.9, sales: "850+", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" },
    { name: "PurpleScripts BR", region: "Brazil", rating: 4.8, sales: "500+", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2070&auto=format&fit=crop" },
    { name: "Zenith Shop", region: "Global", rating: 5.0, sales: "2.1k+", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=2080&auto=format&fit=crop" },
  ];

  return (
    <main className="min-h-screen bg-[#050508]">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary uppercase tracking-[0.2em] px-4 py-1">Official Partners</Badge>
            <h1 className="text-5xl font-black text-white mb-6 tracking-tight">Authorized Resellers</h1>
            <p className="text-zinc-500 max-w-2xl text-lg">
              Buy Shield Premium safely from our trusted resellers in your region.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resellers.map((reseller, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0a0a12] border border-white/5 rounded-[32px] p-8 flex flex-col items-center text-center group hover:border-primary/20 transition-all"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 border border-white/10 group-hover:border-primary/40 transition-colors">
                <img src={reseller.avatar} className="w-full h-full object-cover" alt={reseller.name} />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{reseller.name}</h3>
              <div className="flex items-center gap-2 text-zinc-500 text-xs mb-4">
                <MapPin className="w-3 h-3 text-primary" />
                {reseller.region}
              </div>
              
              <div className="flex items-center gap-4 mb-8 bg-white/5 px-4 py-2 rounded-xl">
                 <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-bold">{reseller.rating}</span>
                 </div>
                 <div className="w-px h-3 bg-white/10" />
                 <div className="flex items-center gap-1 text-zinc-400">
                    <Award className="w-3 h-3" />
                    <span className="text-xs font-bold">{reseller.sales} Sales</span>
                 </div>
              </div>

              <Button className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20 rounded-xl font-bold transition-all">
                Visit Store
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Discord CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 rounded-[40px] bg-gradient-to-br from-[#0a0a12] to-primary/5 border border-white/5 flex flex-col items-center text-center"
        >
           <div className="w-16 h-16 rounded-2xl bg-[#5865F2]/10 flex items-center justify-center text-[#5865F2] mb-8 border border-[#5865F2]/20">
              <MessageSquare className="w-8 h-8" />
           </div>
           <h2 className="text-3xl font-black text-white mb-4 tracking-tight uppercase">Join Discord Shield Team Now</h2>
           <p className="text-zinc-500 max-w-xl mb-10">Get instant support, exclusive scripts, and be part of the most premium script community.</p>
           <Button size="lg" className="bg-[#5865F2] hover:bg-[#5865F2]/90 text-white rounded-2xl px-12 h-16 text-lg font-black purple-glow transition-all active:scale-95">
              JOIN OUR DISCORD
           </Button>
        </motion.div>
      </div>
    </main>
  );
}

function Badge({ children, className, variant }: any) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  )
}
