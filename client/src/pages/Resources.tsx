import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, CheckCircle, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import SEO, { BreadcrumbSchema } from "@/components/SEO";
import { trackNewsletterSignup } from "@/lib/behaviorTracker";

export default function Resources() {
  const [resourceEmail, setResourceEmail] = useState("");
  const [resourceSubscribed, setResourceSubscribed] = useState(false);
  const resources = [
    {
      title: "Digital Growth Checklist",
      desc: "A comprehensive 40-point checklist to audit your current digital presence, covering SEO, UX, and conversion readiness.",
      tag: "Checklist",
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      color: "from-blue-500/20 to-transparent"
    },
    {
      title: "Website Conversion Audit Template",
      desc: "The exact framework we use to identify leaks in our clients' sales funnels and landing pages.",
      tag: "Template",
      icon: <FileText className="w-8 h-8 text-indigo-400" />,
      color: "from-indigo-500/20 to-transparent"
    },
    {
      title: "Marketing Budget Planner 2024",
      desc: "A spreadsheet calculator to help you allocate your ad spend efficiently across Google, Meta, and SEO.",
      tag: "Calculator",
      icon: <FileText className="w-8 h-8 text-purple-400" />,
      color: "from-purple-500/20 to-transparent"
    },
    {
      title: "CRM Setup Guide for HubSpot",
      desc: "Step-by-step instructions on setting up pipelines, properties, and basic automation for service businesses.",
      tag: "Guide",
      icon: <FileText className="w-8 h-8 text-violet-400" />,
      color: "from-violet-500/20 to-transparent"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-12 pb-24">
      <SEO
        title="Free Marketing Resources - Templates, Checklists & Guides"
        description="Download free digital marketing resources: growth checklists, marketing budget planners, CRM setup guides, and more. Practical tools for SMEs in India, Singapore, Malaysia, Thailand, Philippines, and Cambodia."
        keywords="free marketing resources, digital marketing templates, marketing budget planner, CRM setup guide, growth checklist, SEO audit template, marketing tools download, SME marketing resources, digital growth templates, free marketing guides"
        canonical="/resources"
        structuredData={BreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
        ])}
      />
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Growth Engineering <span className="text-primary">Resources</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Free tools, templates, and frameworks to help you systematize your marketing and operations.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {resources.map((res, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-2xl border border-white/5 overflow-hidden flex flex-col sm:flex-row relative group"
              >
                <div className={`w-full sm:w-1/3 bg-gradient-to-br ${res.color} bg-[#0A0D14] flex flex-col items-center justify-center p-8 border-r border-white/5`}>
                  <div className="mb-4">{res.icon}</div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-white/5 px-3 py-1 rounded-full">{res.tag}</span>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-3 font-display">{res.title}</h3>
                  <p className="text-slate-400 text-sm mb-6 flex-grow">{res.desc}</p>
                  
                  <div className="flex items-center gap-2 text-primary font-medium text-sm mt-auto group-hover:underline cursor-pointer">
                    <Lock className="w-4 h-4" /> Download via Email
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gated Download Form Modal Simulation */}
      <section className="py-24 bg-[#0A0D14] border-t border-white/5 mt-12">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-6">Unlock The Full Growth Vault</h2>
          <p className="text-slate-400 mb-8">Join 2,000+ business owners receiving our weekly engineering teardowns and get access to all resources instantly.</p>
          
          {resourceSubscribed ? (
            <div className="flex items-center justify-center gap-2 text-green-400 text-lg" data-testid="text-resource-subscribed">
              <Check className="w-5 h-5" /> You now have access!
            </div>
          ) : (
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={async (e) => {
              e.preventDefault();
              try {
                await apiRequest("POST", "/api/newsletter", { email: resourceEmail, source: "resources" });
                setResourceSubscribed(true);
                trackNewsletterSignup("resources");
              } catch { }
            }}>
              <input
                data-testid="input-resource-email"
                type="email"
                value={resourceEmail}
                onChange={(e) => setResourceEmail(e.target.value)}
                placeholder="Enter your work email"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                required
              />
              <Button type="submit" className="h-12 px-6 bg-primary hover:bg-primary/90 text-[#0B0F1A] font-bold rounded-xl button-glow" data-testid="button-resource-submit">
                Get Instant Access
              </Button>
            </form>
          )}
          <p className="text-xs text-slate-500 mt-4">We respect your privacy. No spam, ever.</p>
        </div>
      </section>
    </div>
  );
}
