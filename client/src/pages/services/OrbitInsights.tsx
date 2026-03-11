import { motion } from "framer-motion";
import { Link } from "wouter";
import { LineChart, PieChart, Activity, TrendingUp, Presentation, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO, { ServiceSchema, BreadcrumbSchema } from "@/components/SEO";

export default function OrbitInsights() {
  const services = [
    { icon: <Presentation className="w-6 h-6 text-violet-400" />, title: "KPI Dashboards", desc: "Real-time, executive-level views of your marketing and sales performance." },
    { icon: <TrendingUp className="w-6 h-6 text-violet-400" />, title: "ROI Tracking", desc: "Clear attribution connecting marketing spend directly to revenue." },
    { icon: <Lightbulb className="w-6 h-6 text-violet-400" />, title: "Growth Forecasting", desc: "Predictive models to help you plan budget and resources." },
    { icon: <Activity className="w-6 h-6 text-violet-400" />, title: "Data Strategy", desc: "Ensuring accurate data collection across GA4, Pixel, and CRM." },
    { icon: <PieChart className="w-6 h-6 text-violet-400" />, title: "Audience Insights", desc: "Deep dives into customer demographics and behaviors." },
    { icon: <LineChart className="w-6 h-6 text-violet-400" />, title: "Custom Reporting", desc: "Automated monthly reports focusing on actionable next steps." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Digital Analytics & Performance Intelligence - Orbit Insights"
        description="Data-driven decisions with KPI dashboards, ROI tracking, growth forecasting, and custom reporting. Analytics services for SMEs in India, Singapore, Malaysia, Thailand, Philippines, and Cambodia."
        keywords="digital analytics agency, KPI dashboard setup, ROI tracking Singapore, marketing analytics India, performance reporting Malaysia, Google Analytics setup Thailand, data-driven marketing Philippines, growth forecasting Cambodia, Orbit Insights, GA4 analytics strategy"
        canonical="/services/orbit-insights"
        structuredData={ServiceSchema("Orbit Insights - Digital Analytics & Performance Intelligence", "Data-driven decisions with KPI dashboards, ROI tracking, growth forecasting, and custom reporting for SMEs across Asia Pacific.", "/services/orbit-insights")}
      />
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#0A0D14] border-b border-white/5">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-violet-500/10 to-transparent blur-3xl opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-violet-400 text-sm font-medium mb-6">
              <span className="text-white/50">Module 05</span>
              <span className="w-1 h-1 rounded-full bg-violet-400 mx-1"></span>
              Orbit Insights
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Digital Analytics & <span className="text-violet-400">Performance Intelligence</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Stop making decisions in the dark. We unify your data into clear dashboards that reveal exactly what's working and where to scale.
            </p>
            <Button asChild size="lg" className="h-14 px-8 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-full shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all">
              <Link href="/contact">Analyze My Growth</Link>
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
                className="glass-card p-8 rounded-2xl border border-white/5 hover:border-violet-500/20 transition-all hover:bg-[#121929]"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-6">
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
