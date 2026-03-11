import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { getSessionId, hasAnalyticsConsent, hasConsented } from "@/lib/cookies";
import { trackPageView, flushPageMetrics } from "@/lib/behaviorTracker";

export default function PageTracker() {
  const [location] = useLocation();
  const lastTracked = useRef("");

  useEffect(() => {
    if (location.startsWith("/admin")) return;
    if (location === lastTracked.current) return;
    lastTracked.current = location;

    if (hasConsented() && hasAnalyticsConsent()) {
      const sessionId = getSessionId();
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: location,
          referrer: document.referrer || null,
          sessionId,
        }),
      }).catch(() => {});

      trackPageView(location);
    } else if (!hasConsented()) {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: location,
          referrer: document.referrer || null,
          sessionId: null,
        }),
      }).catch(() => {});
    }
  }, [location]);

  useEffect(() => {
    return () => {
      flushPageMetrics();
    };
  }, []);

  return null;
}
