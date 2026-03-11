# SkyRich Orbit — Corporate Website

## Overview
Full-stack corporate website for SkyRich Orbit (by SkyRich Tech Solution Pte Ltd), a digital growth agency targeting ambitious SMEs globally. Features a 5-module "Orbit Framework", blog CMS, contact form with email, admin console, and comprehensive SEO optimization targeting India, Thailand, Malaysia, Singapore, Philippines, and Cambodia.

## Tech Stack
- **Frontend**: React 19 + Vite + Tailwind CSS 4 + Framer Motion + wouter routing + TanStack Query + react-helmet-async (SEO)
- **Backend**: Express 5 (Node.js) + TypeScript
- **Database**: PostgreSQL + Drizzle ORM
- **Session**: express-session + connect-pg-simple
- **Fonts**: Outfit (display/headings) + Plus Jakarta Sans (body)

## Project Structure
```
client/src/
├── App.tsx              # Router (public + admin routes), HelmetProvider wrapper
├── pages/               # Public pages: Home, About, Services, Blog, Contact, etc.
│   └── admin/           # Admin console pages
├── components/
│   ├── SEO.tsx          # SEO component (meta tags, structured data, geo-targeting)
│   ├── layout/          # Navbar, Footer, LeadModals, Layout
│   └── ui/              # shadcn/ui components
├── lib/queryClient.ts   # API helper + React Query config
server/
├── index.ts             # Express server entry
├── routes.ts            # API routes (public + admin + sitemap + robots.txt)
├── storage.ts           # Drizzle database operations
├── db.ts                # Database connection
├── seed.ts              # Blog seed data
shared/
└── schema.ts            # Drizzle schema + Zod validators
```

## Database Tables
- `admin_users` — Admin login (default: admin / skyrich2024)
- `blog_posts` — Blog articles with slug, content (HTML), category, published status
- `contact_submissions` — Contact form submissions (sent to info@skyrichorbit.com)
- `newsletter_subscribers` — Email signups from footer, modals, resources
- `page_visits` — Visitor tracking with page, country, city, region, IP, user agent, referrer, session
- `behavior_events` — User behavior tracking (scroll depth, time on page, clicks, form submissions)

## Key Routes
### Public API
- `GET /api/blogs` — Published blog posts
- `GET /api/blogs/:slug` — Single blog post
- `POST /api/contact` — Submit contact form (saves to DB + sends email)
- `POST /api/newsletter` — Subscribe to newsletter
- `POST /api/track` — Track page visit (auto-detects geo via ipwho.is)
- `POST /api/behavior` — Record behavior event (consent-gated, sends scroll/time/clicks)
- `GET /sitemap.xml` — Dynamic XML sitemap (static pages + blog posts)
- `GET /robots.txt` — Search engine crawler instructions

### Admin API (session auth required)
- `POST /api/admin/login` / `POST /api/admin/logout`
- `GET /api/admin/me` — Check auth
- `GET/POST /api/admin/blogs` — List/create blog posts
- `PUT/DELETE /api/admin/blogs/:id` — Update/delete blog posts
- `GET/DELETE /api/admin/contacts` — View/delete contacts
- `GET /api/admin/newsletter` — View subscribers
- `GET /api/admin/analytics?days=30` — Visitor analytics (country, city, page, referrer, daily traffic)
- `GET /api/admin/behavior?days=30` — Raw behavior events
- `GET /api/admin/behavior/export?days=30` — Aggregated visitor profiles for CRM export (CSV/JSON)
- `POST /api/admin/change-password`

## Admin Console
- Access at `/admin/login` (default credentials: admin / skyrich2024)
- Dashboard with 6 stat cards (blog posts, published, leads, subscribers, page views, visitors)
- Visitor Analytics page (`/admin/analytics`) with country breakdown, top cities, most visited pages, daily traffic chart, referrers, recent visits table
- Behavior Tracking page (`/admin/behavior`) with visitor profiles, raw events, CSV/JSON export for CRM lead scoring
- Blog editor with HTML content, category, publish toggle
- Contact submission viewer
- Newsletter subscriber list with CSV export
- Password change settings

## Cookie Consent & Privacy
- **Cookie Consent Banner**: GDPR/PDPA compliant popup with Accept All, Reject, and Manage Preferences
- **Cookie Categories**: Essential (always on), Analytics (opt-in), Marketing (opt-in)
- **Consent Storage**: Saved in localStorage + secure cookie (`sr_consent`)
- **Analytics Scripts**: Google Analytics (`VITE_GA_MEASUREMENT_ID`) and Meta Pixel (`VITE_FB_PIXEL_ID`) — only loaded after user consents
- **Behavior Tracking**: Scroll depth, time on page, page exits, demo clicks, contact submissions — consent-gated
- **Data Layer**: Structured `window.dataLayer` events (PageView, PricingPageVisit, DemoRequestClick, ContactFormSubmission, NewsletterSignup, ScrollDepth, TimeOnPage)
- **Event Tracking**: Contact form submissions, CTA clicks, service page visits, returning visitors tracked to data layer + backend

## SEO Implementation
- **react-helmet-async**: Dynamic per-page title, meta description, keywords, canonical URLs
- **Structured Data (JSON-LD)**: Organization, WebSite, FAQPage, Service, BlogPosting, BreadcrumbList schemas
- **Geo-targeting**: hreflang tags for IN, TH, MY, SG, PH, KH; geo.region/placename meta tags
- **Sitemap.xml**: Auto-generated with all static pages + dynamic blog posts
- **Robots.txt**: Allows crawling, blocks /admin/ and /api/, includes sitemap reference
- **Target Regions**: India, Thailand, Malaysia, Singapore, Philippines, Cambodia
- **Keywords**: Region-specific keywords on every page (e.g., "SEO services Singapore", "digital marketing India")
- **Footer**: SEO-rich geo-targeting paragraph mentioning major cities across all target countries

## Design System
- Background: `#0B0F1A` (dark navy)
- Primary: `#00E5FF` (electric blue)
- Glass cards, animated orbit rings, grid pattern backgrounds
- Logo: `attached_assets/IMG_0336_1772540646131.png`

## Email
- Contact form submissions are emailed to `info@skyrichorbit.com`
- Uses SendGrid API if `SENDGRID_API_KEY` env var is set
- Falls back to console logging if no API key configured

## Important Notes
- No WhatsApp/phone numbers anywhere on site — email only
- SEO targeting: India, Thailand, Malaysia, Singapore, Philippines, Cambodia
- All forms submit via API (contact, newsletter, lead modals, home assessment)
- Admin pages use their own layout (no Navbar/Footer), blocked from indexing via robots.txt
