import { eq, desc, sql, count, gte } from "drizzle-orm";
import { db } from "./db";
import {
  adminUsers, blogPosts, contactSubmissions, newsletterSubscribers, pageVisits, behaviorEvents,
  type AdminUser, type InsertAdminUser,
  type BlogPost, type InsertBlogPost,
  type ContactSubmission, type InsertContact,
  type NewsletterSubscriber, type InsertNewsletter,
  type PageVisit, type InsertPageVisit,
  type BehaviorEvent, type InsertBehaviorEvent,
} from "@shared/schema";

export interface IStorage {
  getAdminByUsername(username: string): Promise<AdminUser | undefined>;
  createAdmin(admin: InsertAdminUser): Promise<AdminUser>;

  getBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;

  getContactSubmissions(): Promise<ContactSubmission[]>;
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  deleteContactSubmission(id: number): Promise<boolean>;

  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  createNewsletterSubscriber(subscriber: InsertNewsletter): Promise<NewsletterSubscriber>;

  createPageVisit(visit: InsertPageVisit): Promise<PageVisit>;
  getVisitStats(days?: number): Promise<{
    totalVisits: number;
    uniqueVisitors: number;
    byCountry: { country: string; visits: number }[];
    byCity: { city: string; country: string; visits: number }[];
    byPage: { page: string; visits: number }[];
    byDate: { date: string; visits: number }[];
    byReferrer: { referrer: string; visits: number }[];
    recentVisits: Partial<PageVisit>[];
  }>;

  createBehaviorEvent(event: InsertBehaviorEvent): Promise<BehaviorEvent>;
  getBehaviorEvents(days?: number): Promise<BehaviorEvent[]>;
  getBehaviorExport(days?: number): Promise<any[]>;
}

export class DatabaseStorage implements IStorage {
  async getAdminByUsername(username: string): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return admin;
  }

  async createAdmin(admin: InsertAdminUser): Promise<AdminUser> {
    const [created] = await db.insert(adminUsers).values(admin).returning();
    return created;
  }

  async getBlogPosts(publishedOnly = false): Promise<BlogPost[]> {
    if (publishedOnly) {
      return db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.createdAt));
    }
    return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [created] = await db.insert(blogPosts).values(post).returning();
    return created;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updated] = await db
      .update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updated;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return result.length > 0;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async createContactSubmission(contact: InsertContact): Promise<ContactSubmission> {
    const [created] = await db.insert(contactSubmissions).values(contact).returning();
    return created;
  }

  async deleteContactSubmission(id: number): Promise<boolean> {
    const result = await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id)).returning();
    return result.length > 0;
  }

  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.createdAt));
  }

  async createNewsletterSubscriber(subscriber: InsertNewsletter): Promise<NewsletterSubscriber> {
    const [created] = await db.insert(newsletterSubscribers).values(subscriber).returning();
    return created;
  }

  async createPageVisit(visit: InsertPageVisit): Promise<PageVisit> {
    const [created] = await db.insert(pageVisits).values(visit).returning();
    return created;
  }

  async getVisitStats(days = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const allVisits = await db
      .select()
      .from(pageVisits)
      .where(gte(pageVisits.createdAt, since))
      .orderBy(desc(pageVisits.createdAt));

    const totalVisits = allVisits.length;
    const uniqueIps = new Set(allVisits.map((v) => v.ip).filter(Boolean));
    const uniqueVisitors = uniqueIps.size || totalVisits;

    const countryMap = new Map<string, number>();
    const cityMap = new Map<string, { country: string; visits: number }>();
    const pageMap = new Map<string, number>();
    const dateMap = new Map<string, number>();
    const referrerMap = new Map<string, number>();

    for (const v of allVisits) {
      const country = v.country || "Unknown";
      countryMap.set(country, (countryMap.get(country) || 0) + 1);

      if (v.city) {
        const cityKey = `${v.city}|${country}`;
        const existing = cityMap.get(cityKey);
        cityMap.set(cityKey, { country, visits: (existing?.visits || 0) + 1 });
      }

      pageMap.set(v.page, (pageMap.get(v.page) || 0) + 1);

      const dateStr = new Date(v.createdAt).toISOString().split("T")[0];
      dateMap.set(dateStr, (dateMap.get(dateStr) || 0) + 1);

      if (v.referrer) {
        referrerMap.set(v.referrer, (referrerMap.get(v.referrer) || 0) + 1);
      }
    }

    const byCountry = Array.from(countryMap.entries())
      .map(([country, visits]) => ({ country, visits }))
      .sort((a, b) => b.visits - a.visits);

    const byCity = Array.from(cityMap.entries())
      .map(([key, val]) => ({ city: key.split("|")[0], country: val.country, visits: val.visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 20);

    const byPage = Array.from(pageMap.entries())
      .map(([page, visits]) => ({ page, visits }))
      .sort((a, b) => b.visits - a.visits);

    const byDate = Array.from(dateMap.entries())
      .map(([date, visits]) => ({ date, visits }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const byReferrer = Array.from(referrerMap.entries())
      .map(([referrer, visits]) => ({ referrer, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10);

    return {
      totalVisits,
      uniqueVisitors,
      byCountry,
      byCity,
      byPage,
      byDate,
      byReferrer,
      recentVisits: allVisits.slice(0, 50).map(({ ip, userAgent, sessionId, ...rest }) => rest),
    };
  }

  async createBehaviorEvent(event: InsertBehaviorEvent): Promise<BehaviorEvent> {
    const [created] = await db.insert(behaviorEvents).values(event).returning();
    return created;
  }

  async getBehaviorEvents(days = 30): Promise<BehaviorEvent[]> {
    const since = new Date();
    since.setDate(since.getDate() - days);
    return await db
      .select()
      .from(behaviorEvents)
      .where(gte(behaviorEvents.createdAt, since))
      .orderBy(desc(behaviorEvents.createdAt))
      .limit(500);
  }

  async getBehaviorExport(days = 30): Promise<any[]> {
    const since = new Date();
    since.setDate(since.getDate() - days);
    const events = await db
      .select()
      .from(behaviorEvents)
      .where(gte(behaviorEvents.createdAt, since))
      .orderBy(desc(behaviorEvents.createdAt));

    const visitorMap = new Map<string, {
      visitorId: string;
      totalPageViews: number;
      totalTimeOnPage: number;
      maxScrollDepth: number;
      pagesVisited: string[];
      events: string[];
      sessions: number;
      firstSeen: string;
      lastSeen: string;
    }>();

    for (const e of events) {
      const vid = e.visitorId || "unknown";
      if (!visitorMap.has(vid)) {
        visitorMap.set(vid, {
          visitorId: vid,
          totalPageViews: 0,
          totalTimeOnPage: 0,
          maxScrollDepth: 0,
          pagesVisited: [],
          events: [],
          sessions: 0,
          firstSeen: e.createdAt.toISOString(),
          lastSeen: e.createdAt.toISOString(),
        });
      }
      const v = visitorMap.get(vid)!;
      v.lastSeen = e.createdAt.toISOString();
      if (e.type === "page_exit" || e.type === "heartbeat") {
        v.totalPageViews++;
        v.totalTimeOnPage += e.timeOnPage || 0;
        v.maxScrollDepth = Math.max(v.maxScrollDepth, e.scrollDepth || 0);
        if (e.page && !v.pagesVisited.includes(e.page)) v.pagesVisited.push(e.page);
      }
      if (e.type === "demo_click" || e.type === "contact_submission" || e.type === "newsletter_signup") {
        v.events.push(e.type);
      }
      if (e.sessionId && !v.events.includes(`session:${e.sessionId}`)) {
        v.events.push(`session:${e.sessionId}`);
        v.sessions++;
      }
    }

    return Array.from(visitorMap.values()).map(v => ({
      visitorId: v.visitorId,
      totalPageViews: v.totalPageViews,
      totalTimeOnPage: v.totalTimeOnPage,
      maxScrollDepth: v.maxScrollDepth,
      pagesVisited: v.pagesVisited,
      events: v.events.filter(e => !e.startsWith("session:")),
      sessions: v.sessions,
      firstSeen: v.firstSeen,
      lastSeen: v.lastSeen,
    }));
  }
}

export const storage = new DatabaseStorage();
