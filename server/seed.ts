import { db } from "./db";
import { blogPosts } from "@shared/schema";

const seedPosts = [
  {
    slug: "why-most-smes-fail-at-digital-transformation",
    title: "Why Most SMEs Fail at Digital Transformation (And How to Fix It)",
    excerpt: "Digital transformation is more than just buying software. It requires a systematic approach to connecting your website, CRM, and marketing efforts.",
    content: `<p class="lead text-xl text-slate-300">The term "digital transformation" is thrown around constantly in boardroom meetings. Yet, despite significant investments in software and marketing, many SMEs see negligible impact on their bottom line.</p>

<p>Why? Because most businesses treat digital transformation as a procurement exercise rather than an architectural one. They buy a CRM, launch a new website, and hire an agency to run Google Ads—but none of these systems talk to each other.</p>

<h2>The "Frankenstein" Tech Stack Problem</h2>

<p>Imagine building a car by purchasing parts from five different manufacturers and expecting them to run smoothly without a central computer. That's how most SMEs approach their digital presence.</p>

<ul>
<li><strong>The Website:</strong> Built by a design agency that prioritizes aesthetics over conversion architecture.</li>
<li><strong>The Traffic:</strong> Handled by a media buyer optimizing for cheap clicks rather than qualified leads.</li>
<li><strong>The Sales:</strong> Managed in a CRM that isn't connected to the website's lead capture forms.</li>
</ul>

<p>This fragmented approach leads to data silos, dropped leads, and an inability to accurately track Return on Investment (ROI).</p>

<blockquote>"You don't need more marketing tools. You need a unified system where your traffic sources, web presence, and CRM act as one seamless growth engine."</blockquote>

<h2>The Systematic Solution: Engineering Growth</h2>

<p>To succeed in a highly competitive market, SMEs need to shift from ad-hoc marketing tactics to structural growth engineering. This involves three core pillars:</p>

<ol>
<li><strong>Unified Data Architecture:</strong> Implementing proper tracking (GA4, Meta Pixel, Conversion APIs) so you can attribute revenue back to specific campaigns.</li>
<li><strong>Conversion-Focused Web Assets:</strong> Building landing pages designed specifically for the intent of the incoming traffic.</li>
<li><strong>Automated Nurture Sequences:</strong> Setting up automated workflows to follow up with leads immediately.</li>
</ol>

<h2>Conclusion</h2>

<p>Digital transformation isn't about the tools you use; it's about how those tools are connected to create a predictable revenue pipeline. By adopting a systems-thinking approach, SMEs can finally see the ROI they were promised when they first embarked on their digital journey.</p>`,
    category: "Global Market Trends",
    author: "Alex Chen",
    readTime: "5 min read",
    imageClass: "bg-blue-900/40",
    published: true,
  },
  {
    slug: "the-anatomy-of-a-high-converting-b2b-website",
    title: "The Anatomy of a High-Converting B2B Corporate Website",
    excerpt: "Your website is your best salesperson. Learn the 7 critical elements every B2B website needs to turn cold traffic into qualified leads.",
    content: `<p class="lead text-xl text-slate-300">Your website is the single most important digital asset your company owns. It works 24/7, never takes a day off, and is the first impression for the vast majority of your potential clients.</p>

<p>Yet most B2B websites fail at their primary job: converting visitors into leads. Let's break down the anatomy of a website that actually performs.</p>

<h2>1. Clear Value Proposition Above the Fold</h2>

<p>Within 3 seconds, a visitor should understand what you do, who you serve, and why they should care. Don't waste this real estate on generic mission statements.</p>

<h2>2. Social Proof & Trust Signals</h2>

<p>Case studies, client logos, testimonials, and certifications should be prominently featured. B2B buyers need reassurance before they commit to a conversation.</p>

<h2>3. Conversion-Focused CTAs</h2>

<p>Every page should have a clear next step. Whether it's booking a call, downloading a whitepaper, or requesting a quote — the path forward should be obvious.</p>

<h2>4. Speed & Mobile Optimization</h2>

<p>A one-second delay in page load reduces conversions by 7%. Ensure your website is blazing fast on every device.</p>

<h2>5. Content That Educates</h2>

<p>B2B buyers consume an average of 13 pieces of content before making a decision. Your blog, resources, and case studies are critical pipeline tools.</p>

<h2>6. Smart Lead Capture</h2>

<p>Use multi-step forms, exit-intent popups, and gated content to capture leads at different stages of the funnel — not just the bottom.</p>

<h2>7. Analytics Integration</h2>

<p>You can't improve what you can't measure. Ensure GA4, heatmaps, and conversion tracking are properly installed from day one.</p>

<h2>Conclusion</h2>

<p>A high-converting B2B website isn't about flashy design — it's about strategic architecture that guides visitors through a logical journey from awareness to action.</p>`,
    category: "Website Optimization",
    author: "Sarah Wong",
    readTime: "7 min read",
    imageClass: "bg-indigo-900/40",
    published: true,
  },
  {
    slug: "messaging-automation-for-sales-teams",
    title: "How to Use Messaging Automation to Close Deals Faster",
    excerpt: "Business happens in real-time. Discover how to build automated sequences that nurture leads without being spammy.",
    content: `<p class="lead text-xl text-slate-300">In the age of instant communication, the businesses that respond fastest win. Studies show that responding to a lead within 5 minutes makes you 21x more likely to qualify them.</p>

<p>But how do you maintain speed without burning out your sales team? The answer is strategic messaging automation.</p>

<h2>The Speed-to-Lead Problem</h2>

<p>Most SMEs take an average of 42 hours to respond to a new lead. By then, the prospect has already spoken to your competitor, lost interest, or forgotten they even submitted a form.</p>

<h2>Building an Automated Follow-Up System</h2>

<p>Here's how to build a messaging automation system that nurtures leads without feeling robotic:</p>

<ol>
<li><strong>Instant Acknowledgment:</strong> Send an automated confirmation within 60 seconds of form submission.</li>
<li><strong>Value-First Follow-Up:</strong> Share a relevant case study or resource 2 hours later.</li>
<li><strong>Qualification Questions:</strong> Ask structured questions to segment the lead by intent and budget.</li>
<li><strong>Handoff to Sales:</strong> Route qualified leads to the right salesperson with full context.</li>
</ol>

<h2>Best Practices</h2>

<ul>
<li>Keep messages short and conversational</li>
<li>Always provide an opt-out option</li>
<li>Personalize using the data you've already collected</li>
<li>A/B test your message sequences</li>
</ul>

<h2>Conclusion</h2>

<p>Messaging automation isn't about replacing human connection — it's about ensuring no lead falls through the cracks while your team focuses on closing deals.</p>`,
    category: "Automation",
    author: "David Lim",
    readTime: "4 min read",
    imageClass: "bg-purple-900/40",
    published: true,
  },
  {
    slug: "ai-tools-for-small-marketing-teams",
    title: "5 AI Tools That Give Small Marketing Teams Superpowers",
    excerpt: "You don't need a massive team to compete with industry giants. These AI tools can 10x your output without increasing headcount.",
    content: `<p class="lead text-xl text-slate-300">Small marketing teams are the backbone of most SMEs. But with limited headcount and budget, how do you compete with companies that have entire departments dedicated to content, design, and analytics?</p>

<p>The answer lies in leveraging AI tools strategically. Here are five categories where AI can supercharge your output.</p>

<h2>1. Content Creation & Copywriting</h2>

<p>AI writing assistants can help you produce blog posts, social media captions, email sequences, and ad copy at 10x the speed. The key is to use them as starting points, then add your brand voice and expertise.</p>

<h2>2. Design & Visual Content</h2>

<p>AI-powered design tools can generate social media graphics, presentations, and even website mockups from simple prompts, making professional design accessible without a dedicated designer.</p>

<h2>3. Data Analysis & Insights</h2>

<p>AI analytics tools can process your marketing data and surface actionable insights, identifying patterns your team might miss due to time constraints.</p>

<h2>4. Customer Support & Engagement</h2>

<p>AI chatbots can handle first-line customer inquiries, qualify leads, and even schedule appointments — all while your team sleeps.</p>

<h2>5. Email Marketing Optimization</h2>

<p>AI can optimize send times, subject lines, and content personalization at a scale that would be impossible manually.</p>

<h2>The Bottom Line</h2>

<p>AI won't replace your team — but a team using AI will outperform one that doesn't. Start with one tool, master it, then expand your AI toolkit gradually.</p>`,
    category: "AI for SMEs",
    author: "Alex Chen",
    readTime: "6 min read",
    imageClass: "bg-primary/20",
    published: true,
  },
];

export async function seedBlogPosts() {
  const existing = await db.select().from(blogPosts);
  if (existing.length > 0) {
    console.log(`Blog already has ${existing.length} posts, skipping seed.`);
    return;
  }

  for (const post of seedPosts) {
    await db.insert(blogPosts).values(post);
  }
  console.log(`Seeded ${seedPosts.length} blog posts.`);
}
