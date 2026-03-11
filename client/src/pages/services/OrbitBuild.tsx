import { motion } from "framer-motion";
import { Link } from "wouter";
import { Globe, MonitorPlay, ShoppingCart, Search, LayoutTemplate, Layers, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO, { ServiceSchema, BreadcrumbSchema } from "@/components/SEO";

export default function OrbitBuild() {
  const features = [
    { icon: <Globe className="w-6 h-6 text-primary" />, title: "Corporate Websites", desc: "Fast, secure, and tailored to represent your brand authority." },
    { icon: <ShoppingCart className="w-6 h-6 text-primary" />, title: "E-commerce", desc: "Seamless shopping experiences designed for maximum AOV." },
    { icon: <LayoutTemplate className="w-6 h-6 text-primary" />, title: "Landing Funnels", desc: "Dedicated, high-converting pages for specific campaigns." },
    { icon: <MonitorPlay className="w-6 h-6 text-primary" />, title: "UX/UI Design", desc: "User-centric interfaces that guide visitors towards action." },
    { icon: <Search className="w-6 h-6 text-primary" />, title: "Technical SEO", desc: "Built from the ground up to rank on search engines." },
    { icon: <Layers className="w-6 h-6 text-primary" />, title: "CMS Integration", desc: "Easy-to-manage content systems to keep your site fresh." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Website Development for SMEs - Orbit Build"
        description="High-performance website development for ambitious SMEs. Corporate sites, e-commerce, landing funnels, and SEO-optimized web platforms. Serving India, Singapore, Malaysia, Thailand, Philippines, and Cambodia."
        keywords="website development SME, corporate website design Singapore, e-commerce development India, landing page design Malaysia, SEO website development Thailand, web development agency Philippines, responsive web design Cambodia, fast website development, Orbit Build, SkyRich web development"
        canonical="/services/orbit-build"
        structuredData={ServiceSchema("Orbit Build - Website Development", "High-performance website development including corporate sites, e-commerce platforms, and landing funnels for ambitious SMEs across Asia Pacific.", "/services/orbit-build")}
      />
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#0A0D14] border-b border-white/5">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent blur-3xl opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-6">
              <span className="text-white/50">Module 01</span>
              <span className="w-1 h-1 rounded-full bg-primary mx-1"></span>
              Orbit Build
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Website Development for <span className="text-primary">Ambitious SMEs</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Your website shouldn't just be a digital brochure. We engineer fast, SEO-optimized, and conversion-focused web assets that act as your 24/7 sales representative.
            </p>
            <Button asChild size="lg" className="h-14 px-8 bg-primary hover:bg-primary/90 text-[#0B0F1A] font-bold rounded-full button-glow">
              <Link href="/contact">Build My Website</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-[#0B0F1A]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Engineering Digital Foundations</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">We don't use generic templates. Every build is architected for your specific business goals and target audience.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-8 rounded-2xl border border-white/5 hover:border-primary/20 transition-all hover:bg-[#121929]"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Difference */}
      <section className="py-24 bg-[#0A0D14]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="glass-card rounded-3xl p-8 md:p-12 border border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="grid md:grid-cols-2 gap-12 relative z-10 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold text-white mb-6">Why SkyRich Orbit?</h2>
                <ul className="space-y-4">
                  {["Performance optimized for slow networks", "Mobile-first approach for global markets", "Integrated tracking from day one", "Scalable architecture for future growth"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#0B0F1A] rounded-2xl p-6 border border-white/5">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                  <span className="text-sm text-slate-400">Lighthouse Score</span>
                  <span className="text-primary font-bold">98/100</span>
                </div>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                  <span className="text-sm text-slate-400">Load Time</span>
                  <span className="text-primary font-bold">&lt; 1.5s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Mobile Responsive</span>
                  <span className="text-primary font-bold">100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
