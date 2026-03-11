import { motion } from "framer-motion";
import { Link } from "wouter";
import { Globe, Target, Zap, BarChart3, LineChart, ArrowRight } from "lucide-react";
import SEO, { BreadcrumbSchema } from "@/components/SEO";

export default function Services() {
  const services = [
    {
      id: "01",
      title: "Orbit Build",
      subtitle: "Website Development for Ambitious SMEs",
      desc: "High-performance websites and landing funnels engineered for conversion.",
      path: "/services/orbit-build",
      icon: <Globe className="w-10 h-10 text-primary" />,
      features: ["Corporate websites", "E-commerce", "Landing funnels"]
    },
    {
      id: "02",
      title: "Orbit Reach",
      subtitle: "Digital Marketing & Traffic Acquisition",
      desc: "Omnichannel traffic acquisition across Google, Meta, and SEO.",
      path: "/services/orbit-reach",
      icon: <Target className="w-10 h-10 text-blue-400" />,
      features: ["Google Ads", "Meta Ads", "LinkedIn Ads", "SEO"]
    },
    {
      id: "03",
      title: "Orbit Convert",
      subtitle: "Conversion Optimization & Funnel Systems",
      desc: "Behavioral tracking and iterative testing to maximize ROI.",
      path: "/services/orbit-convert",
      icon: <Zap className="w-10 h-10 text-indigo-400" />,
      features: ["Funnel architecture", "Landing page testing", "Offer optimization"]
    },
    {
      id: "04",
      title: "Orbit Automate",
      subtitle: "CRM & Marketing Automation for SMEs",
      desc: "CRM setups, AI chatbots, and automated email workflows.",
      path: "/services/orbit-automate",
      icon: <BarChart3 className="w-10 h-10 text-purple-400" />,
      features: ["CRM setup", "Email sequences", "Automated pipelines"]
    },
    {
      id: "05",
      title: "Orbit Insights",
      subtitle: "Digital Analytics & Performance Intelligence",
      desc: "KPI dashboards and digital analytics for predictable scaling.",
      path: "/services/orbit-insights",
      icon: <LineChart className="w-10 h-10 text-violet-400" />,
      features: ["KPI dashboards", "ROI tracking", "Growth forecasting"]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-12 pb-24">
      <SEO
        title="Digital Marketing Services - Website, SEO, Ads, Automation"
        description="Explore SkyRich Orbit's 5-module digital growth services: website development, performance marketing, conversion optimization, CRM automation, and analytics for SMEs in India, Singapore, Malaysia, Thailand, Philippines, and Cambodia."
        keywords="digital marketing services, website development agency, SEO services Singapore, Google Ads management India, Facebook Ads agency Malaysia, marketing automation Thailand, CRM integration Philippines, conversion optimization Cambodia, performance marketing Asia, SME digital services"
        canonical="/services"
        structuredData={BreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ])}
      />
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Digital Services Structured for <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Scalable Growth</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Our 5-module ecosystem is designed to solve the fragmented digital marketing problem for growing businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={idx === 4 ? "md:col-span-2 md:w-1/2 md:mx-auto" : ""}
              >
                <Link href={service.path} className="block group h-full">
                  <div className="glass-card p-8 md:p-10 rounded-3xl h-full border border-white/5 group-hover:border-primary/30 transition-all duration-500 relative overflow-hidden group-hover:-translate-y-2 group-hover:box-glow">
                    {/* Hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="flex items-start justify-between mb-8 relative z-10">
                      <div className="p-4 bg-white/5 rounded-2xl">
                        {service.icon}
                      </div>
                      <span className="text-6xl font-display font-black text-white/5 group-hover:text-primary/10 transition-colors">
                        {service.id}
                      </span>
                    </div>
                    
                    <div className="relative z-10">
                      <h2 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">{service.title}</h2>
                      <h3 className="text-primary/80 font-medium mb-4">{service.subtitle}</h3>
                      <p className="text-slate-400 mb-8 line-clamp-2">{service.desc}</p>
                      
                      <div className="space-y-3 mb-8">
                        {service.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
                            {feat}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-white font-medium gap-2 group-hover:text-primary transition-colors mt-auto">
                        Explore Service <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
