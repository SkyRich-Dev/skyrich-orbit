export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

const CONSENT_KEY = "sr_cookie_consent";
const VISITOR_KEY = "sr_visitor_id";

export function getConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setConsent(consent: CookieConsent): void {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));

  document.cookie = `sr_consent=${encodeURIComponent(JSON.stringify({
    analytics: consent.analytics,
    marketing: consent.marketing,
  }))};path=/;max-age=${365 * 24 * 60 * 60};SameSite=Lax;Secure`;
}

export function hasConsented(): boolean {
  return getConsent() !== null;
}

export function hasAnalyticsConsent(): boolean {
  return getConsent()?.analytics === true;
}

export function hasMarketingConsent(): boolean {
  return getConsent()?.marketing === true;
}

export function getVisitorId(): string {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = "v_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

export function getSessionId(): string {
  let id = sessionStorage.getItem("sr_session_id");
  if (!id) {
    id = "s_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem("sr_session_id", id);
  }
  return id;
}

export function isReturningVisitor(): boolean {
  const firstVisit = localStorage.getItem("sr_first_visit");
  if (!firstVisit) {
    localStorage.setItem("sr_first_visit", new Date().toISOString());
    return false;
  }
  return true;
}
