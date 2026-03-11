import { motion } from "framer-motion";
import { Link } from "wouter";
import { Target, Search, Facebook, Linkedin, FileText, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO, { ServiceSchema, BreadcrumbSchema } from "@/components/SEO";

export default function OrbitReach() {
  const services = [
    { icon: <Search className="w-6 h-6 text-blue-400" />, title: "Google Ads", desc: "Capture high-intent search traffic ready to convert." },
    { icon: <Facebook className="w-6 h-6 text-blue-400" />, title: "Meta Ads", desc: "Build awareness and retarget audiences across FB & IG." },
    { icon: <Linkedin className="w-6 h-6 text-blue-400" />, title: "LinkedIn Ads", desc: "B2B lead generation targeting specific roles and companies." },
    { icon: <Search className="w-6 h-6 text-blue-400" />, title: "SEO Strategy", desc: "Long-term organic visibility for sustainable traffic." },
    { icon: <FileText className="w-6 h-6 text-blue-400" />, title: "Content Marketing", desc: "Authority-building assets that educate and engage." },
    { icon: <Megaphone className="w-6 h-6 text-blue-400" />, title: "Omnichannel Campaigns", desc: "Unified messaging across all digital touchpoints." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Performance Marketing & SEO - Orbit Reach"
        description="Drive qualified traffic with Google Ads, Meta Ads, LinkedIn Ads, SEO strategy, and omnichannel campaigns. Digital marketing for SMEs in India, Singapore, Malaysia, Thailand, Philippines, and Cambodia."
        keywords="Google Ads management, Facebook Ads agency, LinkedIn Ads B2B, SEO strategy Singapore, performance marketing India, PPC management Malaysia, digital advertising Thailand, paid media Philippines, search engine optimization Cambodia, Orbit Reach, SEM agency Asia"
        canonical="/services/orbit-reach"
        structuredData={ServiceSchema("Orbit Reach - Performance Marketing & SEO", "Drive qualified traffic with Google Ads, Meta Ads, LinkedIn Ads, and comprehensive SEO strategy for SMEs across Asia Pacific.", "/services/orbit-reach")}
      />
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#0A0D14] border-b border-white/5">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent blur-3xl opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-medium mb-6">
              <span className="text-white/50">Module 02</span>
              <span className="w-1 h-1 rounded-full bg-blue-400 mx-1"></span>
              Orbit Reach
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Digital Marketing & <span className="text-blue-400">Traffic Acquisition</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Stop relying on "spray and pray" marketing. We build targeted, data-driven traffic engines to consistently acquire high-quality leads across multiple channels.
            </p>
            <Button asChild size="lg" className="h-14 px-8 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all">
              <Link href="/contact">Launch My Campaign</Link>
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
                className="glass-card p-8 rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all hover:bg-[#121929]"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
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
