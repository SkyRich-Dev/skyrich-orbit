declare global {
  interface Window {
    dataLayer: Record<string, any>[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}

export type DataLayerEvent =
  | "PageView"
  | "PricingPageVisit"
  | "DemoRequestClick"
  | "ContactFormSubmission"
  | "NewsletterSignup"
  | "ServicePageVisit"
  | "ReturnVisit"
  | "ScrollDepth"
  | "TimeOnPage";

export function pushDataLayerEvent(event: DataLayerEvent, data: Record<string, any> = {}): void {
  if (!window.dataLayer) window.dataLayer = [];
  window.dataLayer.push({
    event,
    timestamp: new Date().toISOString(),
    ...data,
  });
}

export function initDataLayer(): void {
  if (!window.dataLayer) window.dataLayer = [];
}
