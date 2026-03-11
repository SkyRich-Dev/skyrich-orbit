import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Mail, MapPin, Check } from "lucide-react";
import logoImage from "@assets/IMG_0336_1772540646131.png";
import { apiRequest } from "@/lib/queryClient";
import { trackNewsletterSignup } from "@/lib/behaviorTracker";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiRequest("POST", "/api/newsletter", { email, source: "footer" });
      setSubscribed(true);
      trackNewsletterSignup("footer");
    } catch { }
  };

  return (
    <footer className="bg-[#0A0D14] border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group mb-6 inline-flex">
              <img src={logoImage} alt="SkyRich Tech Solutions" className="h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="font-display font-bold text-xl tracking-tight text-white border-l border-white/20 pl-3">
                Orbit
              </span>
            </Link>
            <p className="text-slate-400 mb-8 max-w-md">
              Structured digital ecosystems combining website engineering, performance marketing, automation, and analytics for growing businesses.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>SkyRich Tech Solution Pte Ltd<br/>Global</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@skyrichorbit.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-6">Orbit Framework</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/services/orbit-build" className="hover:text-primary transition-colors">Orbit Build</Link></li>
              <li><Link href="/services/orbit-reach" className="hover:text-primary transition-colors">Orbit Reach</Link></li>
              <li><Link href="/services/orbit-convert" className="hover:text-primary transition-colors">Orbit Convert</Link></li>
              <li><Link href="/services/orbit-automate" className="hover:text-primary transition-colors">Orbit Automate</Link></li>
              <li><Link href="/services/orbit-insights" className="hover:text-primary transition-colors">Orbit Insights</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/framework" className="hover:text-primary transition-colors">Our Approach</Link></li>
              <li><Link href="/industries" className="hover:text-primary transition-colors">Industries</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Insights & Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-6">Stay Updated</h4>
            <p className="text-xs text-slate-400 mb-4">Get the latest growth insights for ambitious SMEs.</p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-green-400 text-sm" data-testid="text-footer-subscribed">
                <Check className="w-4 h-4" />
                Subscribed!
              </div>
            ) : (
              <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
                <input
                  data-testid="input-footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                  required
                />
                <button
                  type="submit"
                  data-testid="button-footer-subscribe"
                  className="bg-white/10 hover:bg-white/20 text-white rounded-lg px-4 py-2 text-sm font-medium transition-all flex items-center justify-center gap-2 group"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} SkyRich Tech Solution Pte Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300">Terms of Service</Link>
            <a href="/sitemap.xml" className="hover:text-slate-300" target="_blank" rel="noopener">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
