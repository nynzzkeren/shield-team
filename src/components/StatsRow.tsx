"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Key, Star, Rocket, FileText, Users } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
}

function StatItem({ icon, label, value, suffix = "" }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all duration-500 group">
      <div className="p-3 rounded-xl bg-primary/5 text-primary mb-4 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <div className="text-3xl font-bold text-white mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
        {label}
      </div>
    </div>
  );
}

export default function StatsRow() {
  const [memberCount, setMemberCount] = useState(5400);

  useEffect(() => {
    // Replace 'YOUR_SERVER_ID' with actual ID
    fetch(`https://discord.com/api/guilds/1408464552940539996/widget.json`)
      .then(res => res.json())
      .then(data => {
        if (data.presence_count) {
          setMemberCount(data.presence_count);
        }
      })
      .catch(err => console.log("Discord Widget not enabled"));
  }, []);

  const stats = [
    { icon: <Key className="w-5 h-5" />, label: "Keys Generated", value: 12540 },
    { icon: <Star className="w-5 h-5" />, label: "Premium Users", value: 850 },
    { icon: <Rocket className="w-5 h-5" />, label: "Total Executes", value: 45000, suffix: "+" },
    { icon: <FileText className="w-5 h-5" />, label: "Scripts Available", value: 120 },
    { icon: <Users className="w-5 h-5" />, label: "Online Members", value: memberCount },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <StatItem {...stat} />
        </motion.div>
      ))}
    </div>
  );
}
