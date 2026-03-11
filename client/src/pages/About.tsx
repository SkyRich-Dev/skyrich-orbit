import { motion } from "framer-motion";
import { Zap, Target, Globe, BarChart3 } from "lucide-react";
import SEO, { BreadcrumbSchema } from "@/components/SEO";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen pt-12 pb-24">
      <SEO
        title="About SkyRich Orbit - Digital Growth Agency for SMEs"
        description="SkyRich Orbit by SkyRich Tech Solution Pte Ltd engineers scalable growth systems for ambitious SMEs across India, Singapore, Malaysia, Thailand, Philippines and Cambodia. System-based approach to digital marketing."
        keywords="about SkyRich Orbit, digital growth agency, SkyRich Tech Solution Pte Ltd, SME marketing agency Singapore, growth engineering, digital marketing company Asia, marketing agency India, SEO company Southeast Asia"
        canonical="/about"
        structuredData={BreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ])}
      />
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">SkyRich Orbit</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              We engineer scalable growth systems for ambitious SMEs, transforming fragmented marketing efforts into unified, high-converting digital ecosystems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Philosophy */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">The Growth Engineering Mindset</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                Most agencies focus on isolated metrics—clicks, likes, or traffic. We focus on the entire architecture of growth.
              </p>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                By combining technical website development, performance marketing, behavioral analytics, and automation, we build predictable pipelines that generate leads and close sales automatically.
              </p>
              
              <div className="space-y-4">
                {[
                  "System-Based Approach over ad-hoc campaigns",
                  "Data-Driven Decisions over gut feelings",
                  "Seamless Integration of all digital touchpoints"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Zap className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-slate-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl blur-2xl"></div>
              <div className="glass-card p-8 rounded-2xl relative border border-white/10 z-10">
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-[#0B0F1A] rounded-xl border border-white/5 text-center">
                    <h3 className="text-4xl font-display font-bold text-primary mb-2">Global</h3>
                    <p className="text-sm text-slate-400">Markets</p>
                  </div>
                  <div className="p-6 bg-[#0B0F1A] rounded-xl border border-white/5 text-center">
                    <h3 className="text-4xl font-display font-bold text-primary mb-2">5</h3>
                    <p className="text-sm text-slate-400">Core Orbit Modules</p>
                  </div>
                  <div className="p-6 bg-[#0B0F1A] rounded-xl border border-white/5 text-center col-span-2">
                    <h3 className="text-2xl font-display font-bold text-white mb-2">SME Focused</h3>
                    <p className="text-sm text-slate-400">Tailored strategies for growing businesses globally.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
