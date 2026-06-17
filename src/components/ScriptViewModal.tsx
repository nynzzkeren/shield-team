"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Terminal, Copy, Check, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ScriptViewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  script: {
    title: string;
    version: string;
    banner: string;
    changelog: string;
    loadstring: string;
  } | null;
}

export default function ScriptViewModal({ isOpen, onOpenChange, script }: ScriptViewModalProps) {
  const [copied, setCopied] = useState(false);

  if (!script) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(script.loadstring);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-[#050508] border-white/5 text-white p-0 overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.15)]">
        {/* Modal Banner */}
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={script.banner} 
            className="w-full h-full object-cover" 
            alt={script.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent" />
          <div className="absolute bottom-6 left-8 flex items-end justify-between right-8">
            <div>
               <div className="flex items-center gap-2 mb-2">
                 <Badge variant="outline" className="bg-primary/20 border-primary/30 text-primary uppercase text-[10px] font-black">Stable</Badge>
                 <span className="text-zinc-400 text-xs font-mono">{script.version}</span>
               </div>
               <DialogTitle className="text-3xl font-black tracking-tight">{script.title}</DialogTitle>
            </div>
          </div>
        </div>

        <div className="p-5 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Changelog Terminal */}
          <div className="flex flex-col gap-3">
             <div className="flex items-center gap-2 text-zinc-500 text-[9px] md:text-[10px] uppercase tracking-widest font-black">
                <Terminal className="w-3 h-3" />
                System Changelogs
             </div>
             <div className="flex-1 bg-black/40 border border-white/5 rounded-xl p-4 font-mono text-[10px] md:text-xs text-zinc-400 leading-relaxed min-h-[120px] md:min-h-[150px]">
                {script.changelog.split('\n').map((line, i) => (
                  <div key={i} className="mb-1">
                    <span className="text-primary mr-2">➜</span>
                    {line}
                  </div>
                ))}
             </div>
          </div>

          {/* Loadstring Terminal */}
          <div className="flex flex-col gap-3">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-500 text-[9px] md:text-[10px] uppercase tracking-widest font-black">
                   <ShieldCheck className="w-3 h-3" />
                   Loadstring Code
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={copyToClipboard}
                  className="h-6 md:h-7 px-2 md:px-3 bg-white/5 hover:bg-white/10 text-[9px] md:text-[10px] gap-2 rounded-lg"
                >
                   {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                   {copied ? "Copied" : "Copy"}
                </Button>
             </div>
             <div className="flex-1 bg-black/60 border border-white/5 rounded-xl p-4 font-mono text-[10px] md:text-xs text-violet-400 break-all relative group min-h-[120px] md:min-h-[150px]">
                <code>{script.loadstring}</code>
                <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity">
                   <Sparkles className="w-4 h-4 text-primary" />
                </div>
             </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 md:p-6 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
           <div className="flex items-center gap-4 md:gap-6">
              <div className="flex flex-col">
                 <span className="text-[9px] md:text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Detection</span>
                 <span className="text-[10px] md:text-xs text-emerald-500 font-black uppercase">Undetected</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-[9px] md:text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Status</span>
                 <span className="text-[10px] md:text-xs text-white font-black uppercase">Working</span>
              </div>
           </div>
           <Button onClick={() => onOpenChange(false)} className="bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 px-6 md:px-8 h-9 md:h-10 text-xs md:text-sm">
              Close
           </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
