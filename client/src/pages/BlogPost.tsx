import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, Calendar, User, Twitter, Linkedin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import type { BlogPost as BlogPostType } from "@shared/schema";
import SEO, { BlogPostSchema, BreadcrumbSchema } from "@/components/SEO";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery<BlogPostType>({
    queryKey: [`/api/blogs/${params.slug}`],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: !!params.slug,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen pt-24 pb-24 bg-[#0A0D14]">
        <div className="container mx-auto px-6 max-w-4xl flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col min-h-screen pt-24 pb-24 bg-[#0A0D14]">
        <SEO title="Article Not Found" description="This article does not exist." noindex={true} />
        <div className="container mx-auto px-6 max-w-4xl text-center py-20">
          <h1 className="text-3xl font-display font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-slate-400 mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link href="/blog" className="text-primary hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-24 bg-[#0A0D14]">
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={`${post.category}, digital marketing, SME growth, SkyRich Orbit blog, ${post.title.toLowerCase().split(' ').slice(0, 5).join(', ')}`}
        canonical={`/blog/${post.slug}`}
        ogType="article"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            BlogPostSchema({
              title: post.title,
              excerpt: post.excerpt,
              author: post.author,
              slug: post.slug,
              createdAt: new Date(post.createdAt).toISOString(),
              updatedAt: new Date(post.updatedAt || post.createdAt).toISOString(),
              category: post.category,
            }),
            BreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Blog", url: "/blog" },
              { name: post.title, url: `/blog/${post.slug}` },
            ]),
          ]
        }}
      />
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-primary transition-colors mb-10" data-testid="link-back-blog">
          <ArrowLeft className="w-4 h-4" /> Back to all articles
        </Link>

        <article>
          <header className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6">
              {post.category}
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight" data-testid="text-blog-title">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 border-b border-white/10 pb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {post.author.charAt(0)}
                </div>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              </div>
              <div>{post.readTime}</div>

              <div className="ml-auto flex items-center gap-3">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500 mr-2">Share</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  data-testid="link-share-twitter"
                >
                  <Twitter className="w-4 h-4 text-slate-300" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  data-testid="link-share-linkedin"
                >
                  <Linkedin className="w-4 h-4 text-slate-300" />
                </a>
              </div>
            </div>
          </header>

          <div className={`w-full h-64 md:h-96 ${post.imageClass} rounded-2xl mb-12 border border-white/10 relative overflow-hidden flex items-center justify-center`}>
            <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
            <span className="text-white/10 text-4xl md:text-6xl font-display font-black text-center px-8 uppercase">{post.category}</span>
          </div>

          <div
            className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:border prose-img:border-white/10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-16 p-8 bg-gradient-to-br from-[#0F1523] to-[#161F33] rounded-2xl border border-primary/20 text-center">
            <h3 className="text-2xl font-display font-bold text-white mb-4">Stop Guessing. Start Systematizing.</h3>
            <p className="text-slate-300 mb-6 max-w-lg mx-auto">Get a comprehensive audit of your current digital ecosystem and a roadmap for structured growth.</p>
            <Link href="/contact" className="inline-flex items-center justify-center h-12 px-8 bg-primary hover:bg-primary/90 text-[#0B0F1A] font-bold rounded-full button-glow transition-all" data-testid="link-request-audit">
              Request Your Audit
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
