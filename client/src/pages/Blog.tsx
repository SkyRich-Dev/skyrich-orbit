import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import type { BlogPost } from "@shared/schema";
import { useState } from "react";
import SEO, { BreadcrumbSchema } from "@/components/SEO";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blogs"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const categories = ["All", ...new Set(posts?.map((p) => p.category) || [])];

  const filteredPosts = activeCategory === "All"
    ? posts
    : posts?.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen pt-12 pb-24">
      <SEO
        title="Growth Insights & Digital Marketing Blog"
        description="Expert insights on digital marketing, SEO, performance advertising, conversion optimization, and growth strategies for SMEs in India, Singapore, Malaysia, Thailand, Philippines, and Cambodia."
        keywords="digital marketing blog, SEO tips, growth marketing insights, SME marketing strategies, performance marketing guide, conversion optimization tips, marketing automation blog, Google Ads tips, Facebook Ads strategy, digital growth articles Asia Pacific"
        canonical="/blog"
        structuredData={BreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ])}
      />
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Growth Insights & <span className="text-primary">Strategies</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Actionable tactics and deep dives into building scalable digital ecosystems.
            </p>
          </motion.div>
        </div>
      </section>

      {categories.length > 1 && (
        <section className="py-8 border-y border-white/5 bg-[#0A0D14]">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCategory(cat)}
                  data-testid={`button-category-${cat.toLowerCase().replace(/\s/g, "-")}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-[#0B0F1A] shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredPosts && filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card rounded-2xl overflow-hidden border border-white/5 group hover:border-primary/30 transition-all flex flex-col h-full"
                  data-testid={`card-blog-${post.id}`}
                >
                  <div className={`h-48 w-full ${post.imageClass} relative overflow-hidden flex items-center justify-center`}>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F1523]/90"></div>
                    <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjwvcmVjdD4KPHBhdGggZD0iTTAgMEw4IDhaTTEgMEw4IDdaIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')]"></div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                      <span className="text-slate-500 text-xs">{post.readTime}</span>
                    </div>

                    <Link href={`/blog/${post.slug}`} className="block mb-4" data-testid={`link-blog-${post.slug}`}>
                      <h2 className="text-2xl font-display font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-slate-400 mb-6 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                        </div>
                      </div>

                      <Link href={`/blog/${post.slug}`} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-[#0B0F1A] transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">No articles published yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
