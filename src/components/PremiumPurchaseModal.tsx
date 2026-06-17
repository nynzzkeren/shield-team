"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, QrCode, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PremiumPurchaseModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  tier: {
    name: string;
    price: string;
    duration: string;
  } | null;
}

export default function PremiumPurchaseModal({ isOpen, onOpenChange, tier }: PremiumPurchaseModalProps) {
  const [step, setStep] = useState<"email" | "qris" | "success">("email");
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    if (isOpen) {
      setStep("email");
      setEmail("");
      setTimeLeft(24 * 60 * 60);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "qris" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleGenerateQRIS = () => {
    if (!email.includes("@")) {
      alert("Please enter a valid Gmail address");
      return;
    }
    setStep("qris");
  };

  const handleSimulatePayment = () => {
    setStep("success");
    // In real scenario, this would be an API call
    console.log(`Sending fake key to ${email}`);
  };

  if (!isOpen || !tier) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-[#0a0a12] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Purchase {tier.name}</h3>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{tier.price} {tier.duration}</p>
            </div>
            <button 
              onClick={() => onOpenChange(false)}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-10">
            {step === "email" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <label className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                    <input 
                      type="email"
                      placeholder="Enter your Gmail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#050508] border border-white/5 rounded-2xl py-6 pl-16 pr-8 text-white outline-none focus:border-primary/50 transition-all font-bold"
                    />
                  </div>
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider ml-2">
                    Your premium key will be sent to this email automatically.
                  </p>
                </div>

                <Button 
                  onClick={handleGenerateQRIS}
                  className="w-full py-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg purple-glow transition-all active:scale-95 uppercase tracking-widest gap-3"
                >
                  <QrCode className="w-6 h-6" />
                  Generate QRIS
                </Button>
              </motion.div>
            )}

            {step === "qris" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-8 group">
                  <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-white p-6 rounded-3xl shadow-2xl">
                    {/* Placeholder QRIS Image */}
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=SHIELD-TEAM-PREMIUM-PAYMENT" 
                      alt="QRIS" 
                      className="w-48 h-48"
                    />
                    <div className="absolute top-0 right-0 p-2 bg-primary text-white rounded-tr-3xl rounded-bl-3xl">
                       <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-8 flex items-center gap-4">
                  <Clock className="w-5 h-5 text-primary animate-pulse" />
                  <div className="text-left">
                    <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Expires In</div>
                    <div className="text-white font-black text-lg tracking-tighter">{formatTime(timeLeft)}</div>
                  </div>
                </div>

                <div className="space-y-4 w-full">
                   <p className="text-zinc-500 text-xs font-medium px-4">
                     Please scan the QRIS using any Indonesian e-wallet or bank app. Your key will be sent to <span className="text-white font-bold">{email}</span> instantly.
                   </p>
                   
                   <Button 
                     onClick={handleSimulatePayment}
                     variant="outline"
                     className="w-full py-4 rounded-xl border-white/5 text-zinc-500 hover:text-white hover:bg-white/5 font-black uppercase tracking-widest text-[10px]"
                   >
                     Test: Simulate Scan Success
                   </Button>
                </div>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center text-center py-10"
              >
                <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-8">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter">Payment Success</h3>
                <p className="text-zinc-500 max-w-xs font-medium mb-10">
                  Transaction verified! We've sent your Shield Premium Key to <span className="text-emerald-500 font-bold">{email}</span>. Check your inbox (or spam).
                </p>
                <Button 
                  onClick={() => onOpenChange(false)}
                  className="w-full py-6 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest transition-all"
                >
                  Return to Hub
                </Button>
              </motion.div>
            )}
          </div>

          {/* Security Footer */}
          <div className="p-6 bg-white/[0.02] border-t border-white/5 flex items-center justify-center gap-3">
             <ShieldCheck className="w-4 h-4 text-zinc-600" />
             <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Secure Checkout Powered by Shield Systems</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
