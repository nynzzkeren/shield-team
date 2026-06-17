"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ScriptViewModal from "@/components/ScriptViewModal";
import PremiumPurchaseModal from "@/components/PremiumPurchaseModal";
import TeamSection from "@/components/TeamSection";
import { Lock, Eye, MessageSquare, ShieldCheck, Shield, Users, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Stats Component ---
function StatsDisplay() {
  const [stats, setStats] = useState({ totalMembers: 0, premiumUsers: 0 });

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  return (
    <div className="flex justify-center gap-8 mb-16">
      <div className="bg-[#0a0a12] border border-white/5 p-6 rounded-2xl flex items-center gap-4">
        <Users className="w-8 h-8 text-primary" />
        <div>
          <div className="text-2xl font-black text-white">{stats.totalMembers}</div>
          <div className="text-xs text-zinc-500 uppercase tracking-widest">Total Members</div>
        </div>
      </div>
      <div className="bg-[#0a0a12] border border-white/5 p-6 rounded-2xl flex items-center gap-4">
        <Crown className="w-8 h-8 text-amber-500" />
        <div>
          <div className="text-2xl font-black text-white">{stats.premiumUsers}</div>
          <div className="text-xs text-zinc-500 uppercase tracking-widest">Premium Users</div>
        </div>
      </div>
    </div>
  );
}

interface Script {
  title: string;
  isPremium: boolean;
  version: string;
  banner: string;
  desc: string;
  tags: string[];
  changelog: string;
  loadstring: string;
}

export default function Home() {
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<{name: string, price: string, duration: string} | null>(null);
  const [premiumKey, setPremiumKey] = useState("");
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);

  const handleUnlockPremium = () => {
    if (premiumKey === "test") {
      setPremiumUnlocked(true);
      alert("Premium Unlocked!");
    } else {
      alert("Invalid Key");
    }
  };

  const handleBuyPremium = (tier: {name: string, price: string, duration: string}) => {
    setSelectedTier(tier);
    setIsPurchaseModalOpen(true);
  };

  const scripts: Script[] = [
    { 
      title: "Fich", 
      isPremium: true, 
      version: "v1.0.0", 
      banner: "https://cdn.discordapp.com/attachments/1515588648639266966/1516149716205703259/Screenshot_20260616_013401_Chrome.jpg?ex=6a3197f5&is=6a304675&hm=075afc88c7b3ead46daf828f48d0b1d3ccf120d92519ac4e4fdc521462836068&", 
      desc: "Premium multi-tool for Fich. Dominate the leaderboards effortlessly.", 
      tags: ["BEST", "HOT"], 
      changelog: "Initial Release\nAuto-farm enabled\nAnti-ban v1", 
      loadstring: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/KAN-FISCH/tesss/refs/heads/main/allscript.lua"))()' 
    },
    { 
      title: "Blox Fruits", 
      isPremium: true, 
      version: "v2.5.0", 
      banner: "https://cdn.discordapp.com/attachments/1515588648639266966/1516149716663009361/Screenshot_20260616_013446_Chrome.jpg?ex=6a3197f5&is=6a304675&hm=5a70562e954315945964d3ee0d2b23e08c778e101949401601ac20cc90f90b3a&", 
      desc: "The ultimate Blox Fruits powerhouse. Level up while you sleep.", 
      tags: ["OP", "SAFE"], 
      changelog: "Updated for New Update\nBetter Leviathan farm\nFixed Sea 3 crashes", 
      loadstring: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/KAN-FISCH/tesss/refs/heads/main/allscript.lua"))()' 
    },
    { 
      title: "Sailor Piece", 
      isPremium: true, 
      version: "v1.2.0", 
      banner: "https://cdn.discordapp.com/attachments/1515588648639266966/1516149717019398305/Screenshot_20260616_013525_Chrome.jpg?ex=6a3197f5&is=6a304675&hm=34f6d21c34b5d952799552cb434264e8734ff2cea8a4b985eb7a8dbba96777de&", 
      desc: "Complete dominance in Sailor Piece. Auto-quest and Boss-kill features.", 
      tags: ["NEW", "OP"], 
      changelog: "Added Auto-quest\nBoss notifier fixed\nPerformance boost", 
      loadstring: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/KAN-FISCH/tesss/refs/heads/main/allscript.lua"))()' 
    },
    { 
      title: "Violence District", 
      isPremium: true, 
      version: "v3.0.1", 
      banner: "https://cdn.discordapp.com/attachments/1515588648639266966/1516149717363589372/Screenshot_20260616_013557_Chrome.jpg?ex=6a3197f5&is=6a304675&hm=c34e68356943bcda0aad07607b3b2abcec1e15e93b19210ffc6cd7a805497e72&", 
      desc: "Crush the competition with precision aim and wallhacks.", 
      tags: ["RAGE", "TOP"], 
      changelog: "New Aimbot logic\nESP overhaul\nSpeedhack bypass", 
      loadstring: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/KAN-FISCH/tesss/refs/heads/main/allscript.lua"))()' 
    },
    { 
      title: "Sambung Kata", 
      isPremium: false, 
      version: "v1.0.0", 
      banner: "https://cdn.discordapp.com/attachments/1515588648639266966/1516149717753401364/Screenshot_20260616_013641_Chrome.jpg?ex=6a3197f5&is=6a304675&hm=313a0ddc6a22dcdc69c6525732e76ee0d72e4eb1abc627c53c8b0f2284e877e4&", 
      desc: "Never lose a word game again. Instant dictionary lookups.", 
      tags: ["FUN", "AUTO"], 
      changelog: "Added ID dictionary\nSpeed settings\nWord filtering", 
      loadstring: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/KAN-FISCH/tesss/refs/heads/main/allscript.lua"))()' 
    },
    { 
      title: "Grow a Garden 2", 
      isPremium: false, 
      version: "v1.1.5", 
      banner: "https://cdn.discordapp.com/attachments/1515588648639266966/1516149718202319019/Screenshot_20260616_013716_Chrome.jpg?ex=6a3197f5&is=6a304675&hm=c7cc9383721c4d45a6a9e0e9c3575ad1046fea65c5e9c90d7b8fc18439ba5801&", 
      desc: "The perfect garden companion. Auto-water and instant grow.", 
      tags: ["FREE", "SAFE"], 
      changelog: "Auto-water fixed\nAdded item buyer\nMap TP added", 
      loadstring: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/KAN-FISCH/tesss/refs/heads/main/allscript.lua"))()' 
    },
  ];

  const handleViewScript = (script: Script) => {
    setSelectedScript(script);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Scripts Arsenal Section */}
      <section id="freemium" className="py-32 container mx-auto px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="flex flex-col items-center text-center mb-20">
          <StatsDisplay />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-white mb-6 tracking-tight uppercase italic">Script Freemium & Premium</h2>
            <p className="text-zinc-500 max-w-xl text-lg font-medium">
              Unlock the full potential of your favorite games. High performance, zero lag, total control.
            </p>
          </motion.div>
        </div>
        
        <div className="flex justify-center mb-8">
            <div className="bg-[#0a0a12] border border-white/5 p-2 rounded-2xl flex gap-2">
                <input 
                    type="text" 
                    placeholder="Enter Premium Key"
                    value={premiumKey}
                    onChange={(e) => setPremiumKey(e.target.value)}
                    className="bg-transparent text-white px-4 outline-none text-sm w-48"
                />
                <button onClick={handleUnlockPremium} className="bg-primary text-white px-6 py-2 rounded-xl font-bold uppercase text-xs hover:bg-primary/90 transition-colors">
                    Generate
                </button>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scripts.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative p-[1px] rounded-3xl overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${item.isPremium ? 'from-amber-500/20 to-transparent group-hover:from-amber-500/40' : 'from-primary/20 to-transparent group-hover:from-primary/40'}`} />
              <div className="relative bg-[#0a0a12] p-6 rounded-3xl h-full border border-white/5 flex flex-col">
                <div className="h-48 bg-[#050508] rounded-2xl mb-4 overflow-hidden relative border border-white/5 group-hover:border-primary/20 transition-colors">
                   <img src={item.banner} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-700" alt={item.title} />
                   {item.isPremium && (
                     <div className="absolute top-3 right-3 p-2 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-500 backdrop-blur-md">
                        <Lock className="w-4 h-4" />
                     </div>
                   )}
                </div>
                <div className="flex gap-2 mb-3">
                  {item.tags.map(tag => (
                    <span key={tag} className={`text-[9px] font-black px-2 py-0.5 rounded-md border uppercase ${item.isPremium ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-black text-white mb-2 italic tracking-tighter uppercase">{item.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed flex-1 mb-6 font-medium">
                  {item.desc}
                </p>
                
                {item.isPremium && !premiumUnlocked ? (
                  <div className="flex gap-2">
                    <button className="flex-1 py-4 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-white text-xs font-black transition-all border border-amber-500/20 uppercase tracking-widest flex items-center justify-center gap-2">
                      <Lock className="w-3 h-3" />
                      Unlock Premium
                    </button>
                    <button 
                      onClick={() => handleViewScript(item)}
                      className="flex-1 py-4 rounded-xl bg-white/[0.03] hover:bg-primary text-white text-xs font-black transition-all border border-white/5 hover:border-primary purple-glow uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                      <Eye className="w-3 h-3" />
                      View Free
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleViewScript(item)}
                    className="w-full py-4 rounded-xl bg-white/[0.03] hover:bg-primary text-white text-xs font-black transition-all border border-white/5 hover:border-primary purple-glow uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <Eye className="w-3 h-3" />
                    {item.isPremium ? "Run Premium Script" : "Run Script"}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <ScriptViewModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        script={selectedScript} 
      />

      {/* Access Protocol Section */}
      <section id="key" className="py-32 bg-[#050508] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-black text-white mb-8 tracking-tighter uppercase italic">Get Key Freemium</h2>
              <p className="text-zinc-400 text-lg mb-12 leading-relaxed font-medium">
                Our tools are free and always updated. A quick checkpoint is all it takes to keep the project alive.
              </p>
              
              <div className="space-y-8">
                {[
                  { step: "01", title: "Initialize", desc: "Launch the loader and click 'Get Key'." },
                  { step: "02", title: "Verify", desc: "Navigate through our secure checkpoints." },
                  { step: "03", title: "Execute", desc: "Copy your unique key and start dominating." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black group-hover:scale-110 transition-transform text-xl">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-white text-xl font-black mb-1 uppercase tracking-tight italic">{item.title}</h4>
                      <p className="text-zinc-500 text-sm font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-30 animate-pulse" />
              <div className="relative bg-[#0a0a12] border border-white/5 rounded-[40px] p-12 overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="flex flex-col items-center text-center">
                   <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-8 border border-primary/20">
                      <ShieldCheck className="w-12 h-12" />
                   </div>
                   <h3 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter">Ready for Action?</h3>
                   <p className="text-zinc-500 text-sm mb-8 font-medium">Grab your 24h key and bypass all limits.</p>
                   <Button 
                     onClick={() => window.open('https://key.shieldteam.asia/', '_blank')}
                     className="w-full py-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-xl purple-glow transition-all active:scale-95 uppercase tracking-widest">
                     Initialize Key System
                   </Button>
                   <p className="mt-6 text-zinc-600 text-[10px] uppercase tracking-widest font-black">Authentication expires in 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* God Mode Section */}
      <section id="premium" className="py-32 container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-5xl font-black text-white mb-6 tracking-tighter uppercase italic">Premium Access</h2>
          <p className="text-zinc-500 max-w-xl text-lg font-medium">
            Support the elite and unlock absolute freedom with Shield Premium.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          <div className="bg-[#0a0a12]/50 border border-white/5 p-12 rounded-[32px] hover:bg-[#0a0a12] transition-colors group flex flex-col shadow-xl">
             <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tight">Recruit</h3>
             <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black text-white">$0</span>
                <span className="text-zinc-500 text-sm font-bold uppercase">/ Life</span>
             </div>
             <ul className="space-y-4 mb-12 flex-1">
                {["Public Script Library", "Standard Key System", "Discord Community", "Regular Updates"].map(feat => (
                  <li key={feat} className="flex items-center gap-3 text-sm text-zinc-400 font-bold uppercase tracking-tight">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                    {feat}
                  </li>
                ))}
             </ul>
             <Button variant="outline" className="w-full py-7 rounded-xl border border-white/10 text-white font-black hover:bg-white/5 transition-all uppercase tracking-widest cursor-default">
                Active Tier
             </Button>
          </div>

          <div className="relative p-[2px] rounded-[32px] overflow-hidden group h-full flex flex-col shadow-2xl">
             <div className="absolute inset-0 bg-white/5 group-hover:bg-primary/20 transition-colors" />
             <div className="relative bg-[#0a0a12] p-12 rounded-[31px] h-full flex flex-col border border-white/5">
                <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tight">The Elite</h3>
                <div className="flex items-baseline gap-1 mb-8">
                   <span className="text-5xl font-black text-white">$5.99</span>
                   <span className="text-zinc-500 text-sm font-bold uppercase">/ Month</span>
                </div>
                <ul className="space-y-4 mb-12 flex-1">
                   {[
                     "Zero Key System",
                     "Early Alpha Access",
                     "VIP Discord HQ",
                     "Direct Dev Support",
                     "Hidden Features"
                   ].map(feat => (
                     <li key={feat} className="flex items-center gap-3 text-sm text-zinc-100 font-black uppercase tracking-tight">
                       <div className="w-2 h-2 rounded-full bg-primary" />
                       {feat}
                     </li>
                   ))}
                </ul>
                <Button 
                  onClick={() => handleBuyPremium({ name: "The Elite", price: "$5.99", duration: "/ Month" })}
                  className="w-full py-8 rounded-xl bg-white/5 hover:bg-primary text-white font-black transition-all uppercase tracking-widest text-lg border border-white/10 hover:border-primary">
                   Buy Premium Now!
                </Button>
             </div>
          </div>

          <div className="relative p-[2px] rounded-[32px] overflow-hidden group h-full flex flex-col shadow-2xl">
             <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-pink-500 animate-gradient-x" />
             <div className="relative bg-[#0a0a12] p-12 rounded-[31px] h-full flex flex-col">
                <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-[10px] font-black text-primary uppercase tracking-widest">
                   Best Value
                </div>
                <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tight">Immortal</h3>
                <div className="flex items-baseline gap-1 mb-8">
                   <span className="text-5xl font-black text-white">$xx.xx</span>
                   <span className="text-zinc-500 text-sm font-bold uppercase">/ Life</span>
                </div>
                <ul className="space-y-4 mb-12 flex-1">
                   {[
                     "Everything in Elite",
                     "Permanent Access",
                     "Special Discord Role",
                     "Custom Script Request",
                     "Shield Team Insider"
                   ].map(feat => (
                     <li key={feat} className="flex items-center gap-3 text-sm text-zinc-100 font-black uppercase tracking-tight">
                       <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                       {feat}
                     </li>
                   ))}
                </ul>
                <Button 
                  onClick={() => handleBuyPremium({ name: "Immortal", price: "$xx.xx", duration: "/ Lifetime" })}
                  className="w-full py-8 rounded-xl bg-primary text-white font-black purple-glow hover:bg-primary/90 transition-all uppercase tracking-widest text-lg">
                   Get Lifetime Now!
                </Button>
             </div>
          </div>
        </div>
      </section>

      <ScriptViewModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        script={selectedScript} 
      />

      <PremiumPurchaseModal 
        isOpen={isPurchaseModalOpen}
        onOpenChange={setIsPurchaseModalOpen}
        tier={selectedTier}
      />

      {/* Status Report Section */}
      <section id="executors" className="py-32 bg-[#0a0a12]/50 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase italic">Support Executor</h2>
            <p className="text-zinc-500 max-w-xl font-medium">
              Daily diagnostic checks across all major executors. We stay operational while others fail.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
             {[
               { name: "Bunni", status: "Support", color: "text-emerald-500", downloadUrl: "#" },
               { name: "Wave", status: "Support", color: "text-emerald-500", downloadUrl: "#" },
               { name: "Pottasium", status: "Support", color: "text-emerald-500", downloadUrl: "#" },
               { name: "Synapse Z", status: "Support", color: "text-emerald-500", downloadUrl: "#" },
               { name: "Delta", status: "Support", color: "text-emerald-500", downloadUrl: "#" },
               { name: "Cosmic", status: "Support", color: "text-emerald-500", downloadUrl: "#" },
               { name: "Ronix", status: "Support", color: "text-emerald-500", downloadUrl: "#" },
               { name: "Selliware", status: "Support", color: "text-emerald-500", downloadUrl: "#" },
             ].map((exec, i) => (
               <div key={i} className="bg-[#050508] border border-white/5 p-5 rounded-2xl flex flex-col items-center gap-3 group hover:border-primary/20 transition-all shadow-lg">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-white font-black uppercase tracking-tight group-hover:text-primary transition-colors italic">{exec.name}</span>
                    <div className="flex items-center gap-1.5">
                       <div className={`w-1.5 h-1.5 rounded-full ${exec.color.replace('text', 'bg')} animate-pulse shadow-[0_0_8px_currentColor]`} />
                       <span className={`text-[9px] font-black uppercase tracking-widest ${exec.color}`}>{exec.status}</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => window.open(exec.downloadUrl, '_blank')}
                    className="w-full h-8 bg-white/5 hover:bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all border border-white/5 hover:border-primary">
                    Download
                  </Button>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Discord HQ CTA */}
      <section className="py-40 bg-[#050508] relative overflow-hidden">
         <div className="absolute inset-0 bg-primary/5 opacity-30 blur-[100px]" />
         <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10">
            <h2 className="text-6xl font-black text-white mb-6 tracking-tighter uppercase italic">Secure Your Spot</h2>
            <p className="text-zinc-500 max-w-2xl text-xl mb-12 font-medium">
               Join the inner circle. Get instant updates, VIP scripts, and direct access to the team.
            </p>
            <Button 
              size="lg" 
              onClick={() => window.open('https://discord.gg/4tpJzxfY', '_blank')}
              className="bg-[#5865F2] hover:bg-[#5865F2]/90 text-white rounded-2xl px-20 h-24 text-2xl font-black shadow-[0_15px_50px_rgba(88,101,242,0.4)] hover:shadow-[#5865F2]/60 transition-all active:scale-95 uppercase italic tracking-widest gap-4"
            >
               <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.97.077.077 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.126 10.293 10.293 0 0 0 .372-.29.077.077 0 0 1 .077-.01 12.35 12.35 0 0 0 10.74 0 .077.077 0 0 1 .078.01 10.706 10.706 0 0 0 .372.29.077.077 0 0 1-.006.126 12.91 12.91 0 0 1-1.873.892.077.077 0 0 0-.04.106c.394.69.835 1.35 1.225 1.97a.078.078 0 0 0 .084.028 19.9 19.9 0 0 0 5.994-3.03.077.077 0 0 0 .032-.057c.504-5.385-.88-10.02-3.86-13.66a.07.07 0 0 0-.032-.027zM8.02 15.332c-1.185 0-2.158-1.087-2.158-2.427 0-1.34.955-2.427 2.158-2.427 1.22 0 2.175 1.087 2.158 2.427 0 1.34-.955 2.427-2.158 2.427zm7.974 0c-1.185 0-2.158-1.087-2.158-2.427 0-1.34.955-2.427 2.158-2.427 1.22 0 2.175 1.087 2.158 2.427 0 1.34-.954 2.427-2.158 2.427z"/></svg>
               Join Community
            </Button>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10">
               <img 
                 src="https://cdn.discordapp.com/attachments/1515588648639266966/1516436635988791447/IMG-20260615-WA0070.jpg?ex=6a32a32c&is=6a3151ac&hm=abcedd356fd74f7d6f4641a8f6ec76656e753b84bde155ef2f5b1b964925bc36&" 
                 className="w-full h-full object-cover" 
                 alt="Shield Team" 
               />
            </div>
            <span className="font-black text-xl text-white uppercase italic tracking-tighter">Shield Team</span>
          </div>
          
          <div className="flex gap-10 text-xs font-black uppercase tracking-widest text-zinc-500">
             <a href="#" className="hover:text-white transition-colors">Rules</a>
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          
          <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
            © 2026 Shield Team Operations.
          </p>
        </div>
      </footer>
    </main>
  );
}
