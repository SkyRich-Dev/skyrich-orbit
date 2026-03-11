import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { trackNewsletterSignup } from "@/lib/behaviorTracker";

export default function LeadModals() {
  const [showExitModal, setShowExitModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [hasShownExit, setHasShownExit] = useState(false);
  const [hasShownTime, setHasShownTime] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasShownTime && !showExitModal) {
        setShowTimeModal(true);
        setHasShownTime(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [hasShownTime, showExitModal]);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExit && !showTimeModal) {
        setShowExitModal(true);
        setHasShownExit(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShownExit, showTimeModal]);

  const closeModal = () => {
    setShowExitModal(false);
    setShowTimeModal(false);
    setSubmitted(false);
    setEmail("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiRequest("POST", "/api/newsletter", {
        email,
        source: showExitModal ? "exit-intent" : "timed-popup",
      });
      setSubmitted(true);
      trackNewsletterSignup(showExitModal ? "exit-intent" : "timed-popup");
      setTimeout(closeModal, 2000);
    } catch { }
  };

  const isVisible = showExitModal || showTimeModal;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#0B0F1A]/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg glass-card border border-primary/20 rounded-3xl p-8 overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none -mt-20 -mr-20"></div>

            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-10"
              data-testid="button-close-modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative z-10 text-center">
              {submitted ? (
                <div className="py-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-white" data-testid="text-modal-success">Thank you!</h2>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    {showExitModal ? (
                      <Zap className="w-8 h-8 text-primary" />
                    ) : (
                      <Mail className="w-8 h-8 text-primary" />
                    )}
                  </div>

                  <h2 className="text-3xl font-display font-bold text-white mb-3">
                    {showExitModal ? "Wait! Before you leave..." : "Get Our Weekly Growth Insights"}
                  </h2>

                  <p className="text-slate-300 mb-8">
                    {showExitModal
                      ? "Don't miss out on your free digital ecosystem assessment. Let us find the revenue leaks in your current strategy."
                      : "Join 2,000+ business owners receiving our top engineering teardowns and marketing automation strategies."}
                  </p>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                      data-testid="input-modal-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your work email"
                      required
                      className="w-full bg-[#1A2235] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-center"
                    />
                    <Button type="submit" className="w-full h-14 bg-primary hover:bg-primary/90 text-[#0B0F1A] font-bold text-lg rounded-xl button-glow" data-testid="button-modal-submit">
                      {showExitModal ? "Claim My Free Assessment" : "Subscribe Now"}
                    </Button>
                  </form>

                  <p className="text-xs text-slate-500 mt-4">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
