import { getVisitorId, getSessionId, hasAnalyticsConsent, isReturningVisitor } from "./cookies";
import { pushDataLayerEvent } from "./dataLayer";
import { trackGAEvent, trackFBEvent } from "./analyticsScripts";

let scrollDepthMax = 0;
let pageEntryTime = Date.now();
let currentPage = "";
let scrollHandler: (() => void) | null = null;
let flushInterval: ReturnType<typeof setInterval> | null = null;

function getScrollDepth(): number {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  );
  const winHeight = window.innerHeight;
  if (docHeight <= winHeight) return 100;
  return Math.round((scrollTop / (docHeight - winHeight)) * 100);
}

function sendBehaviorData(data: Record<string, any>): void {
  const payload = {
    visitorId: getVisitorId(),
    sessionId: getSessionId(),
    timestamp: new Date().toISOString(),
    ...data,
  };

  if (navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    navigator.sendBeacon("/api/behavior", blob);
  } else {
    fetch("/api/behavior", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }
}

export function trackPageView(page: string): void {
  if (!hasAnalyticsConsent()) return;

  if (currentPage && currentPage !== page) {
    flushPageMetrics();
  }

  currentPage = page;
  pageEntryTime = Date.now();
  scrollDepthMax = 0;

  const returning = isReturningVisitor();

  pushDataLayerEvent("PageView", { page, returning });

  if (returning) {
    pushDataLayerEvent("ReturnVisit", { page });
  }

  if (page === "/services" || page.startsWith("/services/")) {
    pushDataLayerEvent("ServicePageVisit", { page });
    trackGAEvent("view_service", "Services", page);
  }

  if (page === "/contact") {
    pushDataLayerEvent("ContactFormSubmission", { page, action: "page_visit" });
    trackGAEvent("view_contact", "Contact", page);
  }

  if (scrollHandler) {
    window.removeEventListener("scroll", scrollHandler);
  }
  scrollHandler = () => {
    const depth = getScrollDepth();
    if (depth > scrollDepthMax) {
      scrollDepthMax = depth;
      if (depth === 25 || depth === 50 || depth === 75 || depth === 90 || depth === 100) {
        pushDataLayerEvent("ScrollDepth", { page, depth });
        trackGAEvent("scroll_depth", "Engagement", `${depth}%`);
      }
    }
  };
  window.addEventListener("scroll", scrollHandler, { passive: true });

  if (flushInterval) clearInterval(flushInterval);
  flushInterval = setInterval(() => {
    sendBehaviorData({
      type: "heartbeat",
      page: currentPage,
      scrollDepth: scrollDepthMax,
      timeOnPage: Math.round((Date.now() - pageEntryTime) / 1000),
    });
  }, 30000);
}

export function flushPageMetrics(): void {
  if (!hasAnalyticsConsent() || !currentPage) return;

  const timeOnPage = Math.round((Date.now() - pageEntryTime) / 1000);
  if (timeOnPage < 1) return;

  pushDataLayerEvent("TimeOnPage", {
    page: currentPage,
    seconds: timeOnPage,
    scrollDepth: scrollDepthMax,
  });

  sendBehaviorData({
    type: "page_exit",
    page: currentPage,
    scrollDepth: scrollDepthMax,
    timeOnPage,
  });
}

export function trackDemoClick(source: string): void {
  if (!hasAnalyticsConsent()) return;
  pushDataLayerEvent("DemoRequestClick", { source, page: currentPage });
  trackGAEvent("demo_click", "CTA", source);
  trackFBEvent("Lead", { content_name: "Demo Request", source });

  sendBehaviorData({
    type: "demo_click",
    page: currentPage,
    source,
  });
}

export function trackContactSubmission(source: string): void {
  if (!hasAnalyticsConsent()) return;
  pushDataLayerEvent("ContactFormSubmission", { source, page: currentPage });
  trackGAEvent("form_submit", "Contact", source);
  trackFBEvent("Contact", { content_name: source });

  sendBehaviorData({
    type: "contact_submission",
    page: currentPage,
    source,
  });
}

export function trackNewsletterSignup(source: string): void {
  if (!hasAnalyticsConsent()) return;
  pushDataLayerEvent("NewsletterSignup", { source, page: currentPage });
  trackGAEvent("newsletter_signup", "Engagement", source);
  trackFBEvent("Subscribe", { content_name: source });

  sendBehaviorData({
    type: "newsletter_signup",
    page: currentPage,
    source,
  });
}

export function setupBeforeUnload(): void {
  window.addEventListener("beforeunload", () => flushPageMetrics());
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushPageMetrics();
  });
}
