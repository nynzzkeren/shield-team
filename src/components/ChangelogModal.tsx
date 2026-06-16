"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Info, Sparkles, Wrench, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChangelogModal() {
  const statusItems = [
    { name: "API", status: "Online", color: "bg-emerald-500" },
    { name: "Key System", status: "Online", color: "bg-emerald-500" },
    { name: "Script Loader", status: "Online", color: "bg-emerald-500" },
  ];

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white gap-2 purple-glow rounded-xl h-14 px-8 text-lg font-bold group">
            <ShieldCheck className="w-6 h-6 group-hover:scale-110 transition-transform" />
            Check System Status
          </Button>
        }
      />
      <DialogContent className="max-w-2xl bg-[#0a0a12] border-white/5 text-white p-0 overflow-hidden">
        <div className="bg-gradient-to-b from-primary/10 to-transparent p-8 border-b border-white/5">
          <DialogHeader>
            <div className="flex items-center justify-between mb-4">
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                System Status & Changelogs
              </DialogTitle>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                  All Systems Operational
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-zinc-500 text-xs">
              <Clock className="w-3 h-3" />
              Updated 2 minutes ago
            </div>
          </DialogHeader>
        </div>

        <div className="p-6">
          <Accordion className="space-y-4">
            {/* Current Status */}
            <AccordionItem value="status" className="border-white/5 bg-white/[0.02] rounded-xl px-4 overflow-hidden">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Info className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">Current Status</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {statusItems.map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/5">
                      <span className="text-zinc-400 text-sm">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${item.color}`} />
                        <span className="text-xs font-medium">{item.status}</span>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/5">
                    <span className="text-zinc-400 text-sm">Uptime</span>
                    <span className="text-xs font-medium text-emerald-500">99.9%</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Recent Updates */}
            <AccordionItem value="updates" className="border-white/5 bg-white/[0.02] rounded-xl px-4">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">Recent Updates</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4 space-y-4">
                {[
                  { version: "v1.0.0", date: "2026-06-15", type: "Initial Release", icon: "🟣", desc: "Initial release of Shield Team Hub with premium dark theme." },
                  { version: "v0.9.5", date: "2026-06-10", type: "Bug Fixes", icon: "🔧", desc: "Fixed issues with script loading on certain executors." },
                  { version: "v0.9.0", date: "2026-06-01", type: "New Features", icon: "✨", desc: "Added 5 new scripts for popular games." },
                ].map((update) => (
                  <div key={update.version} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-primary/30 text-primary">{update.version}</Badge>
                        <span className="text-[10px] text-zinc-500">{update.date}</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">{update.type}</span>
                    </div>
                    <p className="text-sm text-zinc-300 flex items-start gap-2">
                      <span className="mt-1">{update.icon}</span>
                      {update.desc}
                    </p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Known Issues */}
            <AccordionItem value="issues" className="border-white/5 bg-white/[0.02] rounded-xl px-4">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">Known Issues</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <p className="text-sm text-amber-200/70">Some scripts may experience delay on low-end executors.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Upcoming */}
            <AccordionItem value="upcoming" className="border-white/5 bg-white/[0.02] rounded-xl px-4">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">Upcoming Features</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4 space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-sm text-zinc-300">Custom Script Cloud</span>
                  <Badge variant="secondary" className="text-[10px]">COMING SOON</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-sm text-zinc-300">Advanced Executor Detection</span>
                  <Badge variant="secondary" className="text-[10px]">IN PROGRESS</Badge>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}
