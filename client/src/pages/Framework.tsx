import { motion } from "framer-motion";
import { Search, PenTool, Rocket, Zap, TrendingUp, CheckCircle } from "lucide-react";
import SEO, { BreadcrumbSchema } from "@/components/SEO";

export default function Framework() {
  const phases = [
    {
      id: "01",
      title: "Diagnose",
      subtitle: "Find the leaks in your funnel",
      icon: <Search className="w-8 h-8 text-slate-300" />,
      color: "from-slate-700 to-slate-900",
      content: "We don't guess. We audit your current analytics, technical SEO, and conversion paths to find exactly where you are losing revenue."
    },
    {
      id: "02",
      title: "Architect",
      subtitle: "Build the blueprint",
      icon: <PenTool className="w-8 h-8 text-blue-400" />,
      color: "from-blue-600 to-blue-900",
      content: "We design a custom ecosystem structure detailing the exact web pages, marketing channels, and automated workflows needed to reach your goals."
    },
    {
      id: "03",
      title: "Deploy",
      subtitle: "Launch the engine",
      icon: <Rocket className="w-8 h-8 text-primary" />,
      color: "from-primary to-blue-600",
      content: "Our engineers and media buyers build the assets and launch the campaigns simultaneously to ensure all parts of the system work together from day one."
    },
    {
      id: "04",
      title: "Optimize",
      subtitle: "Iterative improvements",
      icon: <Zap className="w-8 h-8 text-indigo-400" />,
      color: "from-indigo-600 to-indigo-900",
      content: "We use behavioral data and A/B testing to refine messaging, adjust bids, and tweak landing pages for maximum ROI."
    },
    {
      id: "05",
      title: "Scale",
      subtitle: "Predictable growth",
      icon: <TrendingUp className="w-8 h-8 text-purple-400" />,
      color: "from-purple-600 to-purple-900",
      content: "Once the system proves its profitability, we scale budgets confidently knowing the underlying architecture can handle the increased volume."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-12 pb-24">
      <SEO
        title="The Orbit Growth Framework - 5-Phase Digital Growth Methodology"
        description="Discover SkyRich Orbit's proprietary 5-phase growth framework: Diagnose, Architect, Deploy, Optimize, and Scale. A proven methodology for building predictable digital growth systems for SMEs in Asia Pacific."
        keywords="growth framework, digital marketing methodology, Orbit Framework, 5-phase growth system, marketing strategy framework, SME growth methodology, digital transformation framework, marketing funnel optimization, growth engineering process, systematic marketing approach"
        canonical="/framework"
        structuredData={BreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Framework", url: "/framework" },
        ])}
      />
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              The Orbit Growth <span className="text-primary">Framework</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Our proprietary 5-step methodology to turn fragmented marketing into a predictable revenue engine.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-12">
            {phases.map((phase, idx) => (
              <motion.div 
                key={phase.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="relative pl-8 md:pl-0"
              >
                {/* Connecting Line (desktop) */}
                {idx !== phases.length - 1 && (
                  <div className="hidden md:block absolute left-[3.25rem] top-24 bottom-[-3rem] w-px bg-white/10 z-0"></div>
                )}
                
                {/* Connecting Line (mobile) */}
                {idx !== phases.length - 1 && (
                  <div className="md:hidden absolute left-4 top-16 bottom-[-3rem] w-px bg-white/10 z-0"></div>
                )}

                <div className="flex flex-col md:flex-row gap-6 md:gap-12 relative z-10">
                  <div className="hidden md:flex flex-col items-center shrink-0 w-28">
                    <div className="text-5xl font-display font-black text-white/5 mb-4">{phase.id}</div>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${phase.color} shadow-lg shadow-black/50 border border-white/10`}>
                      {phase.icon}
                    </div>
                  </div>
                  
                  {/* Mobile timeline marker */}
                  <div className="md:hidden absolute left-[-1.15rem] top-6 w-8 h-8 rounded-full flex items-center justify-center bg-[#0B0F1A] border border-white/20 z-10">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                  </div>

                  <div className="glass-card flex-1 p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
                    <div className={`absolute top-0 right-0 w-full h-1 bg-gradient-to-r ${phase.color}`}></div>
                    
                    <h2 className="text-3xl font-display font-bold text-white mb-2">{phase.title}</h2>
                    <h3 className="text-lg font-medium text-slate-400 mb-6">{phase.subtitle}</h3>
                    <p className="text-slate-300 leading-relaxed">{phase.content}</p>
                    
                    <div className="mt-8 flex items-center gap-2 text-sm text-slate-500 font-medium">
                      <CheckCircle className="w-4 h-4 text-primary" /> Phase completed
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
