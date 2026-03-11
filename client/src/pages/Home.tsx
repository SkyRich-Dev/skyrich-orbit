import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, BarChart3, Globe, Zap, Target, LineChart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import SEO, { OrganizationSchema, WebSiteSchema, FAQSchema } from "@/components/SEO";
import { trackContactSubmission, trackDemoClick } from "@/lib/behaviorTracker";

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const handleAssessmentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      await apiRequest("POST", "/api/contact", {
        fullName: fd.get("name"),
        company: fd.get("company"),
        email: fd.get("email"),
        jobTitle: fd.get("jobTitle") || null,
        country: fd.get("country") || null,
        source: "home-assessment",
      });
      setFormSubmitted(true);
      trackContactSubmission("home-assessment");
    } catch { }
    setFormLoading(false);
  };

  const homeFaqs = [
    { question: "What is SkyRich Orbit?", answer: "SkyRich Orbit is a digital growth agency by SkyRich Tech Solution Pte Ltd that engineers scalable marketing systems for ambitious SMEs across India, Singapore, Malaysia, Thailand, Philippines, and Cambodia." },
    { question: "What services does SkyRich Orbit offer?", answer: "SkyRich Orbit offers 5 core services: Orbit Build (website development), Orbit Reach (performance marketing & SEO), Orbit Convert (conversion optimization), Orbit Automate (CRM & marketing automation), and Orbit Insights (digital analytics & reporting)." },
    { question: "Which countries does SkyRich Orbit serve?", answer: "SkyRich Orbit serves SMEs across Asia Pacific including India, Singapore, Malaysia, Thailand, Philippines, and Cambodia with digital growth systems." },
    { question: "What is the Orbit Framework?", answer: "The Orbit Framework is a 5-phase methodology — Diagnose, Architect, Deploy, Optimize, and Scale — designed to build predictable digital growth systems for SMEs." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="SkyRich Orbit | Digital Growth Systems for Ambitious SMEs"
        description="SkyRich Orbit engineers scalable digital growth systems for ambitious SMEs across India, Singapore, Malaysia, Thailand, Philippines, and Cambodia. Website development, performance marketing, SEO, automation, and analytics under one roof."
        keywords="digital marketing agency Singapore, SME growth system, website development India, SEO services Malaysia, performance marketing Thailand, marketing automation Philippines, digital growth Cambodia, SkyRich Orbit, Orbit Framework, digital agency Asia Pacific, lead generation SME, conversion optimization, CRM integration, Google Ads management, Facebook Ads agency"
        canonical="/"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [OrganizationSchema(), WebSiteSchema(), FAQSchema(homeFaqs)]
        }}
      />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden bg-grid-pattern">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5 opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/10 border-t-primary/30 animate-spin opacity-60" style={{ animationDuration: '20s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/10 border-b-primary/50 animate-spin opacity-80" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-primary/20 bg-primary/5 animate-pulse"></div>
          
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent blur-3xl opacity-50 mix-blend-screen"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-900/20 to-transparent blur-3xl mix-blend-screen"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-8 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Engineering Growth for Businesses
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-[1.1] tracking-tight"
            >
              Digital Growth Systems <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 text-glow">for Ambitious SMEs</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
            >
              SkyRich Orbit builds structured digital ecosystems combining website engineering, performance marketing, automation, and analytics to help growing businesses scale predictably.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button asChild size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-primary hover:bg-primary/90 text-[#0B0F1A] font-bold rounded-full button-glow transition-all" onClick={() => trackDemoClick("hero-cta")}>
                <Link href="/contact">Get Your Growth Strategy</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border-white/20 hover:bg-white/5 text-white rounded-full bg-white/5 backdrop-blur-sm transition-all group">
                <Link href="/services">
                  Explore Our Ecosystem
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-[#0A0D14] relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              Most SMEs Don't Need More Marketing — <span className="text-primary">They Need a System</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Throwing money at disconnected tools, fragmented data, and isolated marketing campaigns leads to unpredictable results. SkyRich Orbit solves this by engineering a cohesive digital ecosystem where every touchpoint is designed to attract, convert, and retain.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Fragmented Tools",
                desc: "Your website, CRM, and ads don't talk to each other, losing valuable lead data in the gaps.",
                icon: <Zap className="w-6 h-6 text-destructive" />
              },
              {
                title: "Unpredictable Leads",
                desc: "Relying on random acts of marketing instead of a structured, scalable acquisition funnel.",
                icon: <Target className="w-6 h-6 text-destructive" />
              },
              {
                title: "Blind ROI",
                desc: "Spending budget without clear attribution on which campaigns actually drive revenue.",
                icon: <LineChart className="w-6 h-6 text-destructive" />
              }
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-destructive/20 transition-all"></div>
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Orbit Framework */}
      <section className="py-32 relative bg-[#0B0F1A]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">The Orbit Framework</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">A 5-module structured approach to transform your digital presence into an automated growth engine.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { id: "01", title: "Orbit Build", desc: "High-performance websites and landing funnels engineered for conversion.", path: "/services/orbit-build", icon: <Globe className="w-8 h-8 text-primary" /> },
              { id: "02", title: "Orbit Reach", desc: "Omnichannel traffic acquisition across Google, Meta, and SEO.", path: "/services/orbit-reach", icon: <Target className="w-8 h-8 text-blue-400" /> },
              { id: "03", title: "Orbit Convert", desc: "Conversion rate optimization and behavioral tracking.", path: "/services/orbit-convert", icon: <Zap className="w-8 h-8 text-indigo-400" /> },
              { id: "04", title: "Orbit Automate", desc: "CRM setups, AI chatbots, and email workflows.", path: "/services/orbit-automate", icon: <BarChart3 className="w-8 h-8 text-purple-400" /> },
              { id: "05", title: "Orbit Insights", desc: "KPI dashboards and digital analytics for predictable scaling.", path: "/services/orbit-insights", icon: <LineChart className="w-8 h-8 text-violet-400" /> },
            ].map((module, idx) => (
              <Link key={idx} href={module.path} className={`block group ${idx === 3 ? "md:col-span-1 lg:col-start-2" : ""} ${idx === 4 ? "md:col-span-1" : ""}`}>
                <div className="h-full glass-card p-8 rounded-2xl border-white/5 hover:border-primary/50 transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1 hover:box-glow">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary/20 transition-colors"></div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-white/5 rounded-xl text-primary group-hover:scale-110 transition-transform">
                      {module.icon}
                    </div>
                    <span className="text-4xl font-display font-bold text-white/10 group-hover:text-primary/20 transition-colors">{module.id}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 font-display group-hover:text-primary transition-colors">{module.title}</h3>
                  <p className="text-slate-400 mb-6">{module.desc}</p>
                  
                  <div className="flex items-center text-primary font-medium text-sm gap-2">
                    Explore Module <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Assessment Form */}
      <section className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0D14] to-[#0B0F1A] z-0"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-primary/5 blur-[120px] pointer-events-none rounded-full"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-[#0F1523] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Ready to Architect Your Growth Engine?
              </h2>
              <p className="text-slate-400 mb-8 text-lg">
                Get a free assessment of your current digital ecosystem and a structured roadmap for predictable scaling.
              </p>
              
              <div className="space-y-4">
                {[
                  "Comprehensive Digital Audit",
                  "Funnel Architecture Blueprint",
                  "Growth Budget Allocation Strategy"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Zap className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full glass-card p-6 md:p-8 rounded-2xl relative">
              <div className="absolute inset-0 border border-primary/20 rounded-2xl pointer-events-none box-glow"></div>
              {formSubmitted ? (
                <div className="text-center py-8 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2" data-testid="text-home-success">Thank You!</h3>
                  <p className="text-slate-300 text-sm">We'll be in touch within 24 hours.</p>
                </div>
              ) : (
                <form className="flex flex-col gap-4" onSubmit={handleAssessmentSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300 ml-1">Name</label>
                      <input data-testid="input-home-name" name="name" required type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300 ml-1">Company</label>
                      <input data-testid="input-home-company" name="company" required type="text" placeholder="Company Ltd" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300 ml-1">Email</label>
                      <input data-testid="input-home-email" name="email" required type="email" placeholder="john@company.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300 ml-1">Job Title</label>
                      <input data-testid="input-home-jobtitle" name="jobTitle" type="text" placeholder="Marketing Director" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300 ml-1">Country</label>
                    <select name="country" className="w-full bg-[#1A2235] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all appearance-none">
                      <option value="">Select Country</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <Button
                    data-testid="button-home-submit"
                    type="submit"
                    disabled={formLoading}
                    className="w-full mt-4 h-12 bg-primary hover:bg-primary/90 text-[#0B0F1A] font-bold text-lg rounded-xl button-glow"
                  >
                    {formLoading ? "Submitting..." : "Start My Assessment"}
                  </Button>
                </form>
              )}
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
