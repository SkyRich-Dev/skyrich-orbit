import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Cookie, BarChart3, Megaphone, ChevronDown, ChevronUp } from "lucide-react";
import { getConsent, setConsent, type CookieConsent as ConsentType } from "@/lib/cookies";
import { initDataLayer } from "@/lib/dataLayer";
import { loadGoogleAnalytics, loadMetaPixel } from "@/lib/analyticsScripts";
import { setupBeforeUnload } from "@/lib/behaviorTracker";

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";
const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID || "";

function activateConsent(consent: ConsentType): void {
  initDataLayer();
  if (consent.analytics) {
    if (GA_ID) loadGoogleAnalytics(GA_ID);
    setupBeforeUnload();
  }
  if (consent.marketing) {
    if (FB_PIXEL_ID) loadMetaPixel(FB_PIXEL_ID);
  }
}

export function initConsentOnLoad(): void {
  const consent = getConsent();
  if (consent) activateConsent(consent);
}

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    const existing = getConsent();
    if (!existing) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent: ConsentType = { essential: true, analytics: true, marketing: true, timestamp: Date.now() };
    setConsent(consent);
    activateConsent(consent);
    setVisible(false);
  };

  const handleReject = () => {
    const consent: ConsentType = { essential: true, analytics: false, marketing: false, timestamp: Date.now() };
    setConsent(consent);
    activateConsent(consent);
    setVisible(false);
  };

  const handleSavePrefs = () => {
    const consent: ConsentType = { essential: true, analytics, marketing, timestamp: Date.now() };
    setConsent(consent);
    activateConsent(consent);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
          data-testid="cookie-consent-banner"
        >
          <div className="max-w-4xl mx-auto rounded-2xl border border-[#00E5FF]/20 bg-[#0D1321]/95 backdrop-blur-xl shadow-2xl shadow-[#00E5FF]/5">
            <div className="p-5 md:p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Cookie className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white font-[Outfit] mb-1">We value your privacy</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    We use cookies to enhance your browsing experience, serve personalized content,
                    and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                    Read our <a href="/resources" className="text-[#00E5FF] hover:underline">Privacy Policy</a> for more details.
                  </p>
                </div>
              </div>

              <AnimatePresence>
                {showPrefs && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/10 pt-4 mb-4 space-y-3">
                      <CookieCategory
                        icon={<Shield className="w-4 h-4" />}
                        title="Essential Cookies"
                        description="Required for core website functionality including security, navigation, and session management."
                        checked={true}
                        disabled={true}
                        testId="cookie-essential"
                      />
                      <CookieCategory
                        icon={<BarChart3 className="w-4 h-4" />}
                        title="Analytics Cookies"
                        description="Track page views, sessions, scroll depth, and time spent to help us improve the website."
                        checked={analytics}
                        onChange={setAnalytics}
                        testId="cookie-analytics"
                      />
                      <CookieCategory
                        icon={<Megaphone className="w-4 h-4" />}
                        title="Marketing Cookies"
                        description="Used for retargeting campaigns and advertising analytics through Google and Meta platforms."
                        checked={marketing}
                        onChange={setMarketing}
                        testId="cookie-marketing"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => setShowPrefs(!showPrefs)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 text-sm text-[#94A3B8] hover:text-white hover:border-white/20 transition-all"
                  data-testid="button-manage-cookies"
                >
                  {showPrefs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  {showPrefs ? "Hide Preferences" : "Manage Preferences"}
                </button>

                <div className="flex-1" />

                {showPrefs ? (
                  <button
                    onClick={handleSavePrefs}
                    className="px-5 py-2.5 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-sm font-medium hover:bg-[#00E5FF]/20 transition-all"
                    data-testid="button-save-cookie-prefs"
                  >
                    Save Preferences
                  </button>
                ) : (
                  <button
                    onClick={handleReject}
                    className="px-5 py-2.5 rounded-lg border border-white/10 text-sm text-[#94A3B8] hover:text-white hover:border-white/20 transition-all"
                    data-testid="button-reject-cookies"
                  >
                    Reject Non-Essential
                  </button>
                )}

                <button
                  onClick={handleAcceptAll}
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#00E5FF] to-[#00B4D8] text-[#0B0F1A] text-sm font-semibold hover:shadow-lg hover:shadow-[#00E5FF]/25 transition-all"
                  data-testid="button-accept-cookies"
                >
                  Accept All Cookies
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface CookieCategoryProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (val: boolean) => void;
  testId: string;
}

function CookieCategory({ icon, title, description, checked, disabled, onChange, testId }: CookieCategoryProps) {
  return (
    <label
      className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
        checked
          ? "border-[#00E5FF]/20 bg-[#00E5FF]/5"
          : "border-white/5 bg-white/[0.02]"
      } ${disabled ? "opacity-80" : "cursor-pointer hover:border-[#00E5FF]/30"}`}
      data-testid={testId}
    >
      <div className="flex items-center mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="sr-only"
          data-testid={`${testId}-toggle`}
        />
        <div
          className={`w-9 h-5 rounded-full transition-colors flex items-center ${
            checked ? "bg-[#00E5FF]" : "bg-white/20"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform mx-0.5 ${
              checked ? "translate-x-3.5" : "translate-x-0"
            }`}
          />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[#00E5FF]">{icon}</span>
          <span className="text-sm font-medium text-white">{title}</span>
          {disabled && (
            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#00E5FF]/10 text-[#00E5FF]">
              Required
            </span>
          )}
        </div>
        <p className="text-xs text-[#64748B] mt-0.5">{description}</p>
      </div>
    </label>
  );
}
