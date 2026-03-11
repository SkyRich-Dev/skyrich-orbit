import { motion } from "framer-motion";
import { Briefcase, ShoppingBag, GraduationCap, HeartPulse, Factory, Rocket } from "lucide-react";
import SEO, { BreadcrumbSchema } from "@/components/SEO";

export default function Industries() {
  const industries = [
    {
      icon: <Briefcase className="w-8 h-8 text-primary" />,
      title: "Professional Services",
      challenge: "High competition and long sales cycles making lead generation difficult.",
      solution: "We build authority-driven websites and automated LinkedIn/Search funnels to capture high-intent B2B leads and nurture them until they close."
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-blue-400" />,
      title: "E-Commerce & Retail",
      challenge: "Low conversion rates and high customer acquisition costs eating into margins.",
      solution: "We deploy optimized storefronts, aggressive cart-abandonment flows, and data-driven Meta/Google ads to lower CAC and maximize LTV."
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-indigo-400" />,
      title: "Education & Training",
      challenge: "Struggling to enroll students consistently across multiple intakes.",
      solution: "We create lead magnet funnels and webinar registration systems backed by automated email sequences to fill your cohorts predictably."
    },
    {
      icon: <HeartPulse className="w-8 h-8 text-purple-400" />,
      title: "Healthcare & Wellness",
      challenge: "Building trust while maintaining compliance in a strict digital environment.",
      solution: "We engineer HIPAA/PDPA compliant booking systems and local SEO strategies to capture patients actively searching for care in your area."
    },
    {
      icon: <Factory className="w-8 h-8 text-violet-400" />,
      title: "Manufacturing & B2B",
      challenge: "Outdated digital presence failing to attract international buyers.",
      solution: "We modernize your digital catalog, optimize for global B2B search intent, and implement CRM systems to manage complex, multi-stakeholder sales."
    },
    {
      icon: <Rocket className="w-8 h-8 text-cyan-400" />,
      title: "Tech Startups",
      challenge: "Need rapid, measurable user acquisition to prove traction for investors.",
      solution: "We implement agile growth hacking frameworks, rapid landing page testing, and scalable performance marketing to drive efficient user growth."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-12 pb-24">
      <SEO
        title="Industry Solutions - Digital Growth for Every Sector"
        description="Tailored digital marketing solutions for professional services, e-commerce, education, healthcare, manufacturing, and startups. SkyRich Orbit serves SMEs across India, Singapore, Malaysia, Thailand, Philippines, and Cambodia."
        keywords="industry digital marketing, professional services marketing, e-commerce growth agency, education marketing Singapore, healthcare digital marketing India, manufacturing B2B marketing, startup growth agency, SME digital solutions Asia Pacific, industry-specific marketing Malaysia, sector marketing Thailand"
        canonical="/industries"
        structuredData={BreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industries" },
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
              Tailored Systems for <span className="text-primary">Growing Industries</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              We understand that a manufacturer needs a vastly different digital ecosystem than an e-commerce brand.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {industries.map((ind, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/20 transition-all"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>
                
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="p-3 bg-white/5 rounded-xl">
                    {ind.icon}
                  </div>
                  <h2 className="text-2xl font-display font-bold text-white">{ind.title}</h2>
                </div>
                
                <div className="space-y-4 relative z-10">
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">The Challenge</h3>
                    <p className="text-slate-300 text-sm bg-white/5 p-4 rounded-lg border-l-2 border-destructive/50">{ind.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">The Orbit Solution</h3>
                    <p className="text-primary/90 text-sm bg-primary/5 p-4 rounded-lg border-l-2 border-primary/50">{ind.solution}</p>
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
