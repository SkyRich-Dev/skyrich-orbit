import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, ArrowRight, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import SEO, { BreadcrumbSchema } from "@/components/SEO";
import { trackContactSubmission } from "@/lib/behaviorTracker";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await apiRequest("POST", "/api/contact", {
        fullName: formData.get("fullName"),
        company: formData.get("company"),
        email: formData.get("email"),
        jobTitle: formData.get("jobTitle") || null,
        country: formData.get("country") || null,
        websiteUrl: formData.get("websiteUrl") || null,
        businessGoal: formData.get("businessGoal") || null,
        budget: formData.get("budget") || null,
        challenges: formData.get("challenges") || null,
        source: "contact",
      });
      setSubmitted(true);
      trackContactSubmission("contact");
    } catch (err) {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-12 pb-24">
      <SEO
        title="Contact SkyRich Orbit - Get Your Free Growth Strategy"
        description="Contact SkyRich Orbit for a free digital growth assessment. We help SMEs in India, Singapore, Malaysia, Thailand, Philippines, and Cambodia build scalable marketing systems. Email: info@skyrichorbit.com"
        keywords="contact digital marketing agency, free growth strategy, digital marketing consultation Singapore, SEO consultation India, marketing agency contact Malaysia, growth assessment Thailand, digital agency Philippines, marketing consultation Cambodia, SkyRich Orbit contact, info@skyrichorbit.com"
        canonical="/contact"
        structuredData={BreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
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
              Let's Architect Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Growth Engine</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Request a free strategy session to see how the Orbit Framework applies to your specific business model.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="glass-card p-8 rounded-3xl border border-white/5 h-full">
                <h2 className="text-2xl font-display font-bold text-white mb-6">Direct Contact</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Email Us</h3>
                      <a href="mailto:info@skyrichorbit.com" className="text-white hover:text-primary transition-colors font-medium" data-testid="link-email">info@skyrichorbit.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">HQ</h3>
                      <p className="text-white font-medium">SkyRich Tech Solution Pte Ltd<br />Global</p>
                    </div>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4">What happens next?</h3>
                  <ul className="space-y-3">
                    {["We review your current website & metrics", "Identify immediate revenue leaks", "Propose a structured growth map"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                        <Zap className="w-4 h-4 text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className="glass-card p-8 md:p-10 rounded-3xl border border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

                {submitted ? (
                  <div className="text-center py-12 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                      <Check className="w-8 h-8 text-green-400" />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-white mb-4" data-testid="text-success-title">Thank You!</h2>
                    <p className="text-slate-300 max-w-md mx-auto">
                      Your submission has been received. Our team will review your information and get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl font-display font-bold text-white mb-2">Start Your Assessment</h2>
                    <p className="text-slate-400 mb-8">Fill out the form below and our lead engineer will be in touch within 24 hours.</p>

                    {error && (
                      <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm mb-6" data-testid="text-form-error">
                        {error}
                      </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Full Name *</label>
                          <input data-testid="input-fullname" name="fullName" required type="text" className="w-full bg-[#1A2235] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Company Name *</label>
                          <input data-testid="input-company" name="company" required type="text" className="w-full bg-[#1A2235] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Work Email *</label>
                          <input data-testid="input-email" name="email" required type="email" className="w-full bg-[#1A2235] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Job Title</label>
                          <input data-testid="input-jobtitle" name="jobTitle" type="text" className="w-full bg-[#1A2235] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Country *</label>
                          <select data-testid="select-country" name="country" required className="w-full bg-[#1A2235] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all appearance-none">
                            <option value="">Select Country</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="India">India</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Current Website URL</label>
                          <input data-testid="input-website" name="websiteUrl" type="url" placeholder="https://" className="w-full bg-[#1A2235] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Primary Business Goal *</label>
                          <select data-testid="select-goal" name="businessGoal" required className="w-full bg-[#1A2235] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all appearance-none">
                            <option value="">Select Goal</option>
                            <option value="Generate More Leads">Generate More Leads</option>
                            <option value="Increase E-Commerce Sales">Increase E-Commerce Sales</option>
                            <option value="Automate Sales Processes">Automate Sales Processes</option>
                            <option value="New Website Build">New Website Build</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Monthly Marketing Budget</label>
                          <select data-testid="select-budget" name="budget" className="w-full bg-[#1A2235] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all appearance-none">
                            <option value="">Select Range</option>
                            <option value="Less than $1,000">Less than $1,000</option>
                            <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                            <option value="$3,000 - $10,000">$3,000 - $10,000</option>
                            <option value="$10,000+">$10,000+</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Tell us a bit about your current challenges</label>
                        <textarea data-testid="input-challenges" name="challenges" rows={4} className="w-full bg-[#1A2235] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none"></textarea>
                      </div>

                      <Button
                        data-testid="button-submit-contact"
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 bg-primary hover:bg-primary/90 text-[#0B0F1A] font-bold text-lg rounded-xl button-glow group"
                      >
                        {loading ? "Submitting..." : "Submit Application"}
                        {!loading && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
