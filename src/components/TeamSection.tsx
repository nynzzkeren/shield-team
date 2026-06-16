"use client";

import { motion } from "framer-motion";
import { Shield, Code, Crown, User } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  category: 'Founder' | 'Developer' | 'Head Staff' | 'Staff';
}

export default function TeamSection() {
  const team: { category: string; icon: JSX.Element; members: TeamMember[] }[] = [
    {
      category: "Founder",
      icon: <Crown className="w-5 h-5 text-amber-500" />,
      members: [
        { name: "Luowis", role: "Founder", avatar: "https://cdn.discordapp.com/avatars/732657828296130560/c8a6760d36193ed28c089e35042ecc55.png?size=4096", category: "Founder" },
        { name: "Daigo", role: "Lead Founder", avatar: "https://cdn.discordapp.com/avatars/1387442406479368213/ce62486bf6fe2496000300111436ad51.png?size=4096", category: "Founder" },
      ]
    },
    {
      category: "Web Developer",
      icon: <Code className="w-5 h-5 text-blue-500" />,
      members: [
        { name: "Nynzz", role: "Full Stack Developer", avatar: "https://cdn.discordapp.com/attachments/1515588648639266966/1516363709893574738/Snapchat-1562181961.jpg?ex=6a325f41&is=6a310dc1&hm=9462cff3e893ce364332246357fde0cf4108036b9ea5db21c5363e829308607f", category: "Developer" },
      ]
    },
    {
      category: "Head Staff",
      icon: <Shield className="w-5 h-5 text-purple-500" />,
      members: [
        { name: "SeLeCe", role: "Operations Lead", avatar: "https://cdn.discordapp.com/attachments/1515588648639266966/1516364680493535242/1781599894110.png?ex=6a326028&is=6a310ea8&hm=d044430b545144d0492fe889722d70d2766bcb0dab19936fd44d5c42d395e338", category: "Head Staff" },
      ]
    },
    {
      category: "Staff",
      icon: <User className="w-5 h-5 text-zinc-500" />,
      members: [
        { name: "Kiz", role: "Moderator", avatar: "https://cdn.discordapp.com/avatars/1416759672488202314/fdd2fe491b8dbca4d5b93e25a345804b.png?size=4096", category: "Staff" },
        { name: "Cecelia", role: "Moderator", avatar: "https://cdn.discordapp.com/avatars/1436351088491106446/cd7f0116d5927187cbfe9c8c52849d6e.png?size=4096", category: "Staff" },
        { name: "Reiji", role: "Moderator", avatar: "https://cdn.discordapp.com/avatars/994109974731047063/f44ec36d7e8bd0a09504fb8cc9183959.png?size=4096", category: "Staff" },
        { name: "Nynzz", role: "Moderator", avatar: "https://cdn.discordapp.com/attachments/1515588648639266966/1516363709893574738/Snapchat-1562181961.jpg?ex=6a325f41&is=6a310dc1&hm=9462cff3e893ce364332246357fde0cf4108036b9ea5db21c5363e829308607f", category: "Staff" },
      ]
    }
  ];

  return (
    <section className="py-32 container mx-auto px-6">
      <div className="flex flex-col items-center text-center mb-20">
        <h2 className="text-4xl font-black text-white mb-6 uppercase italic tracking-tighter">The Shield Council</h2>
      </div>

      <div className="max-w-2xl mx-auto space-y-12">
        {team.map((group, i) => (
          <div key={i} className="space-y-6">
            <div className="flex items-center gap-3">
               {group.icon}
               <h3 className="text-xl font-black text-white uppercase italic tracking-widest">{group.category}</h3>
            </div>
            <div className="bg-[#0a0a12] border border-white/5 rounded-3xl p-6 space-y-4">
              {group.members.map((member, j) => (
                <div key={j} className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-4">
                    <img src={member.avatar} className="w-12 h-12 rounded-full object-cover" alt={member.name} crossOrigin="anonymous" />
                    <div>
                      <h4 className="text-white font-bold">{member.name}</h4>
                      <p className="text-zinc-500 text-xs uppercase">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
