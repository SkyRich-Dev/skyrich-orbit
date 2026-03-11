import { motion } from "framer-motion";
import { Link } from "wouter";
import { BarChart3, Bot, Mail, Database, MessageSquare, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO, { ServiceSchema, BreadcrumbSchema } from "@/components/SEO";

export default function OrbitAutomate() {
  const services = [
    { icon: <Database className="w-6 h-6 text-purple-400" />, title: "CRM Setup & Integration", desc: "Centralize your customer data with customized HubSpot or similar setups." },
    { icon: <MessageSquare className="w-6 h-6 text-purple-400" />, title: "Messaging Automation", desc: "Automated follow-ups and notifications for your favorite apps." },
    { icon: <Mail className="w-6 h-6 text-purple-400" />, title: "Email Workflows", desc: "Nurture sequences to keep leads warm until they are ready to buy." },
    { icon: <Bot className="w-6 h-6 text-purple-400" />, title: "AI Chatbot Integration", desc: "Provide 24/7 basic support and lead qualification." },
    { icon: <Workflow className="w-6 h-6 text-purple-400" />, title: "Zapier / Make Connectors", desc: "Connect disjointed tools to eliminate manual data entry." },
    { icon: <BarChart3 className="w-6 h-6 text-purple-400" />, title: "Sales Handoff", desc: "Automate the transition of qualified leads to your sales team." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="CRM & Marketing Automation - Orbit Automate"
        description="Streamline operations with CRM setup, email workflows, chatbot integration, and sales automation. Marketing automation for SMEs in India, Singapore, Malaysia, Thailand, Philippines, and Cambodia."
        keywords="CRM setup HubSpot, marketing automation agency, email workflow automation Singapore, chatbot integration India, sales automation Malaysia, CRM integration Thailand, lead nurturing Philippines, Zapier automation Cambodia, Orbit Automate, marketing pipeline automation"
        canonical="/services/orbit-automate"
        structuredData={ServiceSchema("Orbit Automate - CRM & Marketing Automation", "Streamline operations with CRM setup, email workflows, chatbot integration, and sales automation for SMEs across Asia Pacific.", "/services/orbit-automate")}
      />
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#0A0D14] border-b border-white/5">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-purple-500/10 to-transparent blur-3xl opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-400 text-sm font-medium mb-6">
              <span className="text-white/50">Module 04</span>
              <span className="w-1 h-1 rounded-full bg-purple-400 mx-1"></span>
              Orbit Automate
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              CRM & Marketing <span className="text-purple-400">Automation</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Scale without adding headcount. We implement smart automation and CRM systems to nurture leads, eliminate manual work, and ensure no prospect falls through the cracks.
            </p>
            <Button asChild size="lg" className="h-14 px-8 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">
              <Link href="/contact">Automate My Business</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0B0F1A]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((feat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-8 rounded-2xl border border-white/5 hover:border-purple-500/20 transition-all hover:bg-[#121929]"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
