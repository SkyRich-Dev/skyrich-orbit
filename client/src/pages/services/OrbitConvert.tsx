import { motion } from "framer-motion";
import { Link } from "wouter";
import { Zap, TestTube, MousePointerClick, Filter, Crosshair, SplitSquareHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO, { ServiceSchema, BreadcrumbSchema } from "@/components/SEO";

export default function OrbitConvert() {
  const services = [
    { icon: <SplitSquareHorizontal className="w-6 h-6 text-indigo-400" />, title: "Funnel Architecture", desc: "Designing multi-step journeys that guide users to action." },
    { icon: <TestTube className="w-6 h-6 text-indigo-400" />, title: "A/B Testing", desc: "Scientific approach to finding the highest converting variations." },
    { icon: <MousePointerClick className="w-6 h-6 text-indigo-400" />, title: "Behavioral Tracking", desc: "Heatmaps and session recordings to understand user friction." },
    { icon: <Crosshair className="w-6 h-6 text-indigo-400" />, title: "Offer Optimization", desc: "Structuring your value proposition to be irresistible." },
    { icon: <Filter className="w-6 h-6 text-indigo-400" />, title: "Lead Qualification", desc: "Filtering out noise to deliver sales-ready prospects." },
    { icon: <Zap className="w-6 h-6 text-indigo-400" />, title: "Speed Optimization", desc: "Reducing bounce rates through hyper-fast page loads." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Conversion Optimization & Funnel Systems - Orbit Convert"
        description="Maximize conversions with A/B testing, behavioral tracking, funnel architecture, and speed optimization. CRO services for SMEs in India, Singapore, Malaysia, Thailand, Philippines, and Cambodia."
        keywords="conversion rate optimization, A/B testing agency, funnel optimization Singapore, CRO services India, landing page optimization Malaysia, heatmap analysis Thailand, conversion funnel Philippines, user behavior analytics Cambodia, Orbit Convert, lead qualification system"
        canonical="/services/orbit-convert"
        structuredData={ServiceSchema("Orbit Convert - Conversion Optimization", "Maximize conversions with A/B testing, behavioral tracking, funnel architecture, and speed optimization for SMEs across Asia Pacific.", "/services/orbit-convert")}
      />
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#0A0D14] border-b border-white/5">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent blur-3xl opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-sm font-medium mb-6">
              <span className="text-white/50">Module 03</span>
              <span className="w-1 h-1 rounded-full bg-indigo-400 mx-1"></span>
              Orbit Convert
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Conversion Optimization & <span className="text-indigo-400">Funnel Systems</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Traffic is useless if it doesn't convert. We continuously optimize the user journey to turn more clicks into qualified leads and revenue.
            </p>
            <Button asChild size="lg" className="h-14 px-8 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all">
              <Link href="/contact">Improve My Conversions</Link>
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
                className="glass-card p-8 rounded-2xl border border-white/5 hover:border-indigo-500/20 transition-all hover:bg-[#121929]"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6">
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
