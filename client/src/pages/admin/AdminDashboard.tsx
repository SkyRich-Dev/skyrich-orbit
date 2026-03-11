import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import AdminLayout from "./AdminLayout";
import { FileText, Mail, Users, TrendingUp, BarChart3, Eye } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost, ContactSubmission, NewsletterSubscriber } from "@shared/schema";

interface VisitStats {
  totalVisits: number;
  uniqueVisitors: number;
  byCountry: { country: string; visits: number }[];
}

export default function AdminDashboard() {
  const { data: blogs } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blogs"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const { data: contacts } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/contacts"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const { data: subscribers } = useQuery<NewsletterSubscriber[]>({
    queryKey: ["/api/admin/newsletter"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const { data: visitStats } = useQuery<VisitStats>({
    queryKey: ["/api/admin/analytics", 30],
    queryFn: async () => {
      const res = await fetch("/api/admin/analytics?days=30", { credentials: "include" });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const stats = [
    { label: "Blog Posts", value: blogs?.length ?? 0, icon: FileText, color: "text-primary", bg: "bg-primary/10", href: "/admin/blogs" },
    { label: "Published", value: blogs?.filter((b) => b.published).length ?? 0, icon: TrendingUp, color: "text-green-400", bg: "bg-green-400/10", href: "/admin/blogs" },
    { label: "Contact Leads", value: contacts?.length ?? 0, icon: Mail, color: "text-blue-400", bg: "bg-blue-400/10", href: "/admin/contacts" },
    { label: "Subscribers", value: subscribers?.length ?? 0, icon: Users, color: "text-purple-400", bg: "bg-purple-400/10", href: "/admin/newsletter" },
    { label: "Page Views", value: visitStats?.totalVisits ?? 0, icon: Eye, color: "text-orange-400", bg: "bg-orange-400/10", href: "/admin/analytics" },
    { label: "Visitors", value: visitStats?.uniqueVisitors ?? 0, icon: BarChart3, color: "text-pink-400", bg: "bg-pink-400/10", href: "/admin/analytics" },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="block" data-testid={`card-stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
            <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-3xl font-display font-bold text-white" data-testid={`text-stat-value-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>{stat.value}</p>
              <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display font-bold text-white">Recent Contacts</h3>
            <Link href="/admin/contacts" className="text-sm text-primary hover:underline" data-testid="link-view-all-contacts">View All</Link>
          </div>
          <div className="space-y-3">
            {contacts?.slice(0, 5).map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div>
                  <p className="text-white text-sm font-medium">{contact.fullName}</p>
                  <p className="text-slate-400 text-xs">{contact.company} &middot; {contact.email}</p>
                </div>
                <span className="text-xs text-slate-500">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
            {(!contacts || contacts.length === 0) && (
              <p className="text-slate-500 text-sm text-center py-4">No contact submissions yet</p>
            )}
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display font-bold text-white">Recent Posts</h3>
            <Link href="/admin/blogs" className="text-sm text-primary hover:underline" data-testid="link-view-all-blogs">View All</Link>
          </div>
          <div className="space-y-3">
            {blogs?.slice(0, 5).map((post) => (
              <div key={post.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{post.title}</p>
                  <p className="text-slate-400 text-xs">{post.category}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${post.published ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>
            ))}
            {(!blogs || blogs.length === 0) && (
              <p className="text-slate-500 text-sm text-center py-4">No blog posts yet</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
