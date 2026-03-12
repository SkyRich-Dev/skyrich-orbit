import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema, insertContactSchema, insertNewsletterSchema } from "@shared/schema";
import crypto from "crypto";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function adminAuth(req: Request, res: Response, next: NextFunction) {
  if (!(req as any).session?.adminId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

async function sendContactEmail(data: {
  fullName: string;
  company: string;
  email: string;
  jobTitle?: string | null;
  country?: string | null;
  websiteUrl?: string | null;
  businessGoal?: string | null;
  budget?: string | null;
  challenges?: string | null;
  source: string;
}) {
  const sgApiKey = process.env.SENDGRID_API_KEY;

  const emailBody = `
New Contact Form Submission

Name: ${data.fullName}
Company: ${data.company}
Email: ${data.email}
Job Title: ${data.jobTitle || "N/A"}
Country: ${data.country || "N/A"}
Website: ${data.websiteUrl || "N/A"}
Business Goal: ${data.businessGoal || "N/A"}
Budget: ${data.budget || "N/A"}
Source: ${data.source}

Challenges:
${data.challenges || "N/A"}
  `.trim();

  if (sgApiKey) {
    try {
      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${sgApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: "info@skyrichorbit.com" }] }],
          from: { email: "noreply@skyrichorbit.com", name: "SkyRich Orbit Website" },
          subject: `New Lead: ${data.fullName} from ${data.company}`,
          content: [{ type: "text/plain", value: emailBody }],
        }),
      });
      if (!response.ok) {
        console.error("SendGrid error:", await response.text());
      }
    } catch (error) {
      console.error("Email send error:", error);
    }
  } else {
    console.log("No SENDGRID_API_KEY set. Email would be sent to info@skyrichorbit.com:");
    console.log(emailBody);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  const session = (await import("express-session")).default;
  
  let sessionStore: any;
  
  try {
    const connectPgSimple = (await import("connect-pg-simple")).default;
    const PgStore = connectPgSimple(session);
    sessionStore = new PgStore({ 
      conString: process.env.DATABASE_URL, 
      createTableIfMissing: true,
      pool: undefined, // Let it create its own pool
      ttl: 24 * 60 * 60 // 24 hours
    });
    console.log("Using PostgreSQL session store");
  } catch (error) {
    console.warn("PostgreSQL session store failed:", error instanceof Error ? error.message : error);
    console.log("Falling back to MemoryStore");
    const MemoryStore = (await import("memorystore")).default;
    sessionStore = new MemoryStore({ checkPeriod: 86400000 }); // prune every 24h
  }

  app.use(
    session({
      store: sessionStore,
      secret: process.env.SESSION_SECRET || "skyrich-orbit-admin-secret-2024",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000, httpOnly: true },
    })
  );

  async function ensureDefaultAdmin() {
    const existing = await storage.getAdminByUsername("admin");
    if (!existing) {
      await storage.createAdmin({
        username: "admin",
        password: hashPassword("skyrich2024"),
      });
      console.log("Default admin created (admin / skyrich2024)");
    }
  }
  await ensureDefaultAdmin();

  const { seedBlogPosts } = await import("./seed");
  await seedBlogPosts();

  app.post("/api/admin/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }
      const admin = await storage.getAdminByUsername(username);
      if (!admin || admin.password !== hashPassword(password)) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      (req as any).session.adminId = admin.id;
      (req as any).session.save((err: any) => {
        if (err) {
          console.error("Session save error:", err);
          return res.status(500).json({ message: "Login failed", error: err.message });
        }
        return res.json({ id: admin.id, username: admin.username });
      });
    } catch (error) {
      return res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/admin/logout", (req: Request, res: Response) => {
    (req as any).session.destroy(() => {
      res.json({ message: "Logged out" });
    });
  });

  app.get("/api/admin/me", adminAuth, async (req: Request, res: Response) => {
    const admin = await storage.getAdminByUsername("admin");
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    return res.json({ id: admin.id, username: admin.username });
  });

  app.get("/api/blogs", async (_req: Request, res: Response) => {
    const posts = await storage.getBlogPosts(true);
    return res.json(posts);
  });

  app.get("/api/blogs/:slug", async (req: Request, res: Response) => {
    const post = await storage.getBlogPostBySlug(req.params.slug);
    if (!post || !post.published) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json(post);
  });

  app.get("/api/admin/blogs", adminAuth, async (_req: Request, res: Response) => {
    const posts = await storage.getBlogPosts(false);
    return res.json(posts);
  });

  app.post("/api/admin/blogs", adminAuth, async (req: Request, res: Response) => {
    try {
      const parsed = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(parsed);
      return res.status(201).json(post);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Invalid data" });
    }
  });

  app.put("/api/admin/blogs/:id", adminAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.updateBlogPost(id, req.body);
      if (!post) return res.status(404).json({ message: "Post not found" });
      return res.json(post);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Invalid data" });
    }
  });

  app.delete("/api/admin/blogs/:id", adminAuth, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const deleted = await storage.deleteBlogPost(id);
    if (!deleted) return res.status(404).json({ message: "Post not found" });
    return res.json({ message: "Deleted" });
  });

  app.get("/api/admin/contacts", adminAuth, async (_req: Request, res: Response) => {
    const contacts = await storage.getContactSubmissions();
    return res.json(contacts);
  });

  app.delete("/api/admin/contacts/:id", adminAuth, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const deleted = await storage.deleteContactSubmission(id);
    if (!deleted) return res.status(404).json({ message: "Submission not found" });
    return res.json({ message: "Deleted" });
  });

  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const parsed = insertContactSchema.parse(req.body);
      const submission = await storage.createContactSubmission(parsed);
      await sendContactEmail(parsed);
      return res.status(201).json({ message: "Submission received", id: submission.id });
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Invalid data" });
    }
  });

  app.post("/api/newsletter", async (req: Request, res: Response) => {
    try {
      const parsed = insertNewsletterSchema.parse(req.body);
      const subscriber = await storage.createNewsletterSubscriber(parsed);
      return res.status(201).json({ message: "Subscribed successfully", id: subscriber.id });
    } catch (error: any) {
      if (error.message?.includes("unique")) {
        return res.status(200).json({ message: "Already subscribed" });
      }
      return res.status(400).json({ message: error.message || "Invalid data" });
    }
  });

  app.get("/api/admin/newsletter", adminAuth, async (_req: Request, res: Response) => {
    const subscribers = await storage.getNewsletterSubscribers();
    return res.json(subscribers);
  });

  app.post("/api/track", async (req: Request, res: Response) => {
    try {
      const { page, referrer, sessionId } = req.body;
      if (!page || typeof page !== "string") return res.status(400).json({ message: "Page is required" });

      const cleanPage = page.substring(0, 200);
      const cleanReferrer = referrer ? String(referrer).substring(0, 500) : null;
      const cleanSession = sessionId ? String(sessionId).substring(0, 100) : null;

      const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim()
        || req.socket.remoteAddress
        || "";

      let country: string | null = null;
      let city: string | null = null;
      let region: string | null = null;

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        const geoRes = await fetch(`https://ipwho.is/${ip}`, { signal: controller.signal });
        clearTimeout(timeout);
        const geoData = await geoRes.json() as any;
        if (geoData.success !== false) {
          country = geoData.country || null;
          city = geoData.city || null;
          region = geoData.region || null;
        }
      } catch {
        // geo lookup failed, continue without it
      }

      await storage.createPageVisit({
        page: cleanPage,
        country,
        city,
        region,
        ip,
        userAgent: ((req.headers["user-agent"] as string) || "").substring(0, 500) || null,
        referrer: cleanReferrer,
        sessionId: cleanSession,
      });

      return res.status(201).json({ message: "Tracked" });
    } catch {
      return res.status(500).json({ message: "Tracking failed" });
    }
  });

  app.get("/api/admin/analytics", adminAuth, async (req: Request, res: Response) => {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const stats = await storage.getVisitStats(days);
      return res.json(stats);
    } catch {
      return res.status(500).json({ message: "Failed to load analytics" });
    }
  });

  app.post("/api/behavior", async (req: Request, res: Response) => {
    try {
      const { visitorId, sessionId, type, page, scrollDepth, timeOnPage, source, ...rest } = req.body;
      if (!type || typeof type !== "string") return res.status(400).json({ message: "Type required" });

      const allowedTypes = ["page_exit", "heartbeat", "demo_click", "contact_submission", "newsletter_signup"];
      if (!allowedTypes.includes(type)) return res.status(400).json({ message: "Invalid type" });

      await storage.createBehaviorEvent({
        visitorId: visitorId ? String(visitorId).substring(0, 100) : null,
        sessionId: sessionId ? String(sessionId).substring(0, 100) : null,
        type: type.substring(0, 50),
        page: page ? String(page).substring(0, 200) : null,
        scrollDepth: typeof scrollDepth === "number" ? Math.min(scrollDepth, 100) : null,
        timeOnPage: typeof timeOnPage === "number" ? Math.min(timeOnPage, 86400) : null,
        source: source ? String(source).substring(0, 100) : null,
        data: Object.keys(rest).length > 0 ? JSON.stringify(rest).substring(0, 500) : null,
      });

      return res.status(201).json({ message: "Recorded" });
    } catch {
      return res.status(500).json({ message: "Failed" });
    }
  });

  app.get("/api/admin/behavior", adminAuth, async (req: Request, res: Response) => {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const events = await storage.getBehaviorEvents(days);
      return res.json(events);
    } catch {
      return res.status(500).json({ message: "Failed to load behavior data" });
    }
  });

  app.get("/api/admin/behavior/export", adminAuth, async (req: Request, res: Response) => {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const data = await storage.getBehaviorExport(days);
      return res.json(data);
    } catch {
      return res.status(500).json({ message: "Failed to export behavior data" });
    }
  });

  app.post("/api/admin/change-password", adminAuth, async (req: Request, res: Response) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const adminId = (req as any).session.adminId;
      const admin = await storage.getAdminByUsername("admin");
      if (!admin || admin.password !== hashPassword(currentPassword)) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }
      const { db } = await import("./db");
      const { adminUsers } = await import("@shared/schema");
      const { eq } = await import("drizzle-orm");
      await db.update(adminUsers).set({ password: hashPassword(newPassword) }).where(eq(adminUsers.id, adminId));
      return res.json({ message: "Password changed successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Failed to change password" });
    }
  });

  app.get("/sitemap.xml", async (_req: Request, res: Response) => {
    const baseUrl = `${_req.protocol}://${_req.get("host")}`;
    const blogs = await storage.getBlogPosts(true);

    const staticPages = [
      { url: "/", priority: "1.0", changefreq: "weekly" },
      { url: "/about", priority: "0.8", changefreq: "monthly" },
      { url: "/services", priority: "0.9", changefreq: "monthly" },
      { url: "/services/orbit-build", priority: "0.8", changefreq: "monthly" },
      { url: "/services/orbit-reach", priority: "0.8", changefreq: "monthly" },
      { url: "/services/orbit-convert", priority: "0.8", changefreq: "monthly" },
      { url: "/services/orbit-automate", priority: "0.8", changefreq: "monthly" },
      { url: "/services/orbit-insights", priority: "0.8", changefreq: "monthly" },
      { url: "/industries", priority: "0.7", changefreq: "monthly" },
      { url: "/framework", priority: "0.7", changefreq: "monthly" },
      { url: "/blog", priority: "0.8", changefreq: "daily" },
      { url: "/resources", priority: "0.6", changefreq: "monthly" },
      { url: "/contact", priority: "0.9", changefreq: "monthly" },
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    for (const page of staticPages) {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    for (const blog of blogs) {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/blog/${blog.slug}</loc>\n`;
      xml += `    <lastmod>${new Date(blog.updatedAt || blog.createdAt).toISOString().split("T")[0]}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `  </url>\n`;
    }

    xml += `</urlset>`;

    res.set("Content-Type", "application/xml");
    res.send(xml);
  });

  app.get("/robots.txt", (_req: Request, res: Response) => {
    const baseUrl = `${_req.protocol}://${_req.get("host")}`;
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;
    res.set("Content-Type", "text/plain");
    res.send(robotsTxt);
  });

  return httpServer;
}
