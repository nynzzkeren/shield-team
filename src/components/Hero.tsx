"use client";

import { motion, useScroll } from "framer-motion";
import { CheckCircle, Copy, Check, Rocket as RocketIcon, Play, Pause, SkipForward } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import ChangelogModal from "./ChangelogModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { scrollY } = useScroll();
  const bannerRef = useRef(null);
  
  // Music Player
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tracks = [
    {
       name: "Bye - Altera (Slowed)",
      url: "https://files.catbox.moe/pxr2qd.mp3",
      art: "https://cdn.discordapp.com/attachments/1515588648639266966/1516322123088658432/Screenshot_20260616_130203_Chrome.jpg?ex=6a323886&is=6a30e706&hm=114c2649dc58068206f93eef73728b65292ea0b63e16e47098706a94732b8078&"
    },
    {
      name: "Mood - Yagi Mael (Slowed)",
      url: "https://files.catbox.moe/m7vo05.mp3",
      art: "https://cdn.discordapp.com/attachments/1515588648639266966/1516322123088658432/Screenshot_20260616_130203_Chrome.jpg?ex=6a323886&is=6a30e706&hm=114c2649dc58068206f93eef73728b65292ea0b63e16e47098706a94732b8078&"
    }
  ];

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    // Autoplay attempt
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(e => console.log("Autoplay blocked, user interaction required"));
      setIsPlaying(true);
    }
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const BANNER_IMAGE = "https://cdn.discordapp.com/attachments/1515588865468137542/1516049983814631584/IMG-20260615-WA0075.jpg?ex=6a313b12&is=6a2fe992&hm=0fdbda1e5b930c013ba001265eb147353386281254220f46caee114207279e03&"; 
  const PROFILE_IMAGE = "https://cdn.discordapp.com/attachments/1515588865468137542/1516040284843282622/IMG-20260615-WA0070.jpg?ex=6a31320a&is=6a2fe08a&hm=bcd087218b68961db5ef992269b53ef7803e5b76c981a5a4ff7089d630cab767&"; 

  useEffect(() => {
    if (bannerRef.current) {
      gsap.to(bannerRef.current, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }, []);

  const [copied, setCopied] = useState(false);
  const loaderScript = `loadstring(game:HttpGet("https://shieldteam.vercel.app/loader"))()`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(loaderScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative pt-20">
      {/* Banner Area */}
      <div className="relative h-[550px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center border-b border-white/5">
          <img 
            ref={bannerRef}
            src={BANNER_IMAGE} 
            className="w-full h-[120%] object-cover object-center absolute -top-[10%]" 
            alt="Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
        </div>
      </div>

      {/* Profile & Content Area */}
      <div className="container mx-auto px-6 -mt-20 relative z-20 pb-20">
        
        {/* Top Stats & Music Player */}
        <div className="flex justify-between items-center mb-8 gap-4">
            <div className="flex gap-4">
                {[
                    { label: "Total Executes", value: "50,000+" },
                    { label: "Total Scripts", value: "6" },
                    { label: "Keys Generated", value: "15,000+" }
                ].map((stat, i) => (
                    <div key={i} className="bg-[#0a0a12]/80 backdrop-blur border border-white/5 px-6 py-3 rounded-2xl">
                        <div className="text-primary font-black text-xl">{stat.value}</div>
                        <div className="text-zinc-500 text-[10px] uppercase tracking-widest">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Music Player */}
            <div className="bg-[#0a0a12]/80 backdrop-blur border border-white/5 p-3 rounded-full flex items-center gap-4">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                    <img src={currentTrack.art} className="w-full h-full object-cover" alt="Album Art" />
                </motion.div>
                <div className="flex flex-col">
                  <div className="text-xs text-white font-bold truncate max-w-[150px]">{currentTrack.name}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={nextTrack} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
                <audio ref={audioRef} src={currentTrack.url} loop onEnded={nextTrack} autoPlay />
            </div>
        </div>

        <div className="flex flex-col md:flex-row items-end gap-6 mb-12">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-40 h-40 rounded-3xl bg-[#0a0a12] border-4 border-[#050508] relative group overflow-hidden flex items-center justify-center purple-glow"
          >
            <img src={PROFILE_IMAGE} className="w-full h-full object-cover" alt="Profile" />
          </motion.div>

          {/* Info */}
          <div className="flex-1 pb-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-2"
            >
              <h1 className="text-5xl font-black tracking-tighter text-white flex items-center gap-3 uppercase italic">
                Shield Team
                <CheckCircle className="w-8 h-8 text-primary fill-primary/10" />
              </h1>
              <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-widest">
                Elite Status
              </span>
            </motion.div>
            <p className="text-zinc-400 max-w-2xl mb-6 text-lg font-medium italic">
              UNSTOPPABLE DOMINANCE. The ultimate arsenal for Roblox exploitation. 
              Encrypted, Undetected, and Lethal.
            </p>
            
            {/* Join Discord with Icon */}
            <Button 
                onClick={() => window.open('https://discord.gg/4tpJzxfY', '_blank')}
                className="bg-[#5865F2] hover:bg-[#5865F2]/90 text-white rounded-xl gap-2 px-6"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.97.077.077 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.126 10.293 10.293 0 0 0 .372-.29.077.077 0 0 1 .077-.01 12.35 12.35 0 0 0 10.74 0 .077.077 0 0 1 .078.01 10.706 10.706 0 0 0 .372.29.077.077 0 0 1-.006.126 12.91 12.91 0 0 1-1.873.892.077.077 0 0 0-.04.106c.394.69.835 1.35 1.225 1.97a.078.078 0 0 0 .084.028 19.9 19.9 0 0 0 5.994-3.03.077.077 0 0 0 .032-.057c.504-5.385-.88-10.02-3.86-13.66a.07.07 0 0 0-.032-.027zM8.02 15.332c-1.185 0-2.158-1.087-2.158-2.427 0-1.34.955-2.427 2.158-2.427 1.22 0 2.175 1.087 2.158 2.427 0 1.34-.955 2.427-2.158 2.427zm7.974 0c-1.185 0-2.158-1.087-2.158-2.427 0-1.34.955-2.427 2.158-2.427 1.22 0 2.175 1.087 2.158 2.427 0 1.34-.954 2.427-2.158 2.427z"/></svg>
                Join Discord
            </Button>
          </div>

          {/* Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ChangelogModal />
          </motion.div>
        </div>

        {/* Loader Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-purple-600/50 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-[#0a0a12] border border-white/5 rounded-2xl p-8 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <RocketIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Execute Script</h2>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest">Universal Loader</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-600 font-mono">LUA</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              </div>

              <div className="relative">
                <div className="absolute top-4 right-4 z-10">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="h-9 px-4 bg-white/5 hover:bg-white/10 text-zinc-300 gap-2 border border-white/5 rounded-lg backdrop-blur-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span className="text-emerald-500">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Loader</span>
                      </>
                    )}
                  </Button>
                </div>
                <pre className="bg-[#050508] p-6 rounded-xl border border-white/5 font-mono text-sm text-violet-400 overflow-x-auto">
                  <code>
                    <span className="text-zinc-500">-- Shield Team | Execute Script</span>
                    {"\n"}
                    <span className="text-violet-400">loadstring</span>(game:<span className="text-blue-400">HttpGet</span>(<span className="text-emerald-400">&quot;https://shieldteam.vercel.app/loader&quot;</span>))()
                  </code>
                </pre>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Status</span>
                    <span className="text-xs text-emerald-500 font-bold uppercase">Undetected</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Updated</span>
                    <span className="text-xs text-white font-bold uppercase">15 Jun 2026</span>
                  </div>
                </div>
                <p className="text-zinc-500 text-[10px] italic">Supported on most major executors</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
