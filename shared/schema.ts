import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, boolean, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  author: text("author").notNull(),
  readTime: text("read_time").notNull(),
  imageClass: text("image_class").notNull().default("bg-blue-900/40"),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  company: text("company").notNull(),
  email: text("email").notNull(),
  jobTitle: text("job_title"),
  country: text("country"),
  websiteUrl: text("website_url"),
  businessGoal: text("business_goal"),
  budget: text("budget"),
  challenges: text("challenges"),
  source: text("source").notNull().default("contact"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  source: text("source").notNull().default("footer"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const pageVisits = pgTable("page_visits", {
  id: serial("id").primaryKey(),
  page: text("page").notNull(),
  country: text("country"),
  city: text("city"),
  region: text("region"),
  ip: text("ip"),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  sessionId: text("session_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const behaviorEvents = pgTable("behavior_events", {
  id: serial("id").primaryKey(),
  visitorId: text("visitor_id"),
  sessionId: text("session_id"),
  type: text("type").notNull(),
  page: text("page"),
  scrollDepth: integer("scroll_depth"),
  timeOnPage: integer("time_on_page"),
  source: text("source"),
  data: text("data"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({ id: true });
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true, createdAt: true, updatedAt: true });
export const insertContactSchema = createInsertSchema(contactSubmissions).omit({ id: true, createdAt: true });
export const insertNewsletterSchema = createInsertSchema(newsletterSubscribers).omit({ id: true, createdAt: true });
export const insertPageVisitSchema = createInsertSchema(pageVisits).omit({ id: true, createdAt: true });
export const insertBehaviorEventSchema = createInsertSchema(behaviorEvents).omit({ id: true, createdAt: true });

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type PageVisit = typeof pageVisits.$inferSelect;
export type InsertPageVisit = z.infer<typeof insertPageVisitSchema>;
export type BehaviorEvent = typeof behaviorEvents.$inferSelect;
export type InsertBehaviorEvent = z.infer<typeof insertBehaviorEventSchema>;
