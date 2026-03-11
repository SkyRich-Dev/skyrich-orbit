import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getQueryFn, apiRequest, queryClient } from "@/lib/queryClient";
import { useLocation, useParams } from "wouter";
import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft, Eye } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function AdminBlogEditor() {
  const params = useParams<{ id: string }>();
  const isEditing = !!params.id;
  const [, navigate] = useLocation();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    readTime: "5 min read",
    imageClass: "bg-blue-900/40",
    published: false,
  });

  const { data: existingPost } = useQuery<BlogPost>({
    queryKey: [`/api/admin/blogs`],
    queryFn: async () => {
      const res = await fetch(`/api/admin/blogs`, { credentials: "include" });
      const posts = await res.json();
      return posts.find((p: BlogPost) => p.id === parseInt(params.id!));
    },
    enabled: isEditing,
  });

  useEffect(() => {
    if (existingPost) {
      setForm({
        title: existingPost.title,
        slug: existingPost.slug,
        excerpt: existingPost.excerpt,
        content: existingPost.content,
        category: existingPost.category,
        author: existingPost.author,
        readTime: existingPost.readTime,
        imageClass: existingPost.imageClass,
        published: existingPost.published,
      });
    }
  }, [existingPost]);

  const saveMutation = useMutation({
    mutationFn: async (data: typeof form) => {
      if (isEditing) {
        await apiRequest("PUT", `/api/admin/blogs/${params.id}`, data);
      } else {
        await apiRequest("POST", "/api/admin/blogs", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blogs"] });
      navigate("/admin/blogs");
    },
  });

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug : slugify(title),
    }));
  };

  const categories = ["Digital Marketing", "Website Optimization", "Automation", "AI for SMEs", "Global Market Trends", "Growth Strategy"];
  const imageOptions = [
    { label: "Blue", value: "bg-blue-900/40" },
    { label: "Indigo", value: "bg-indigo-900/40" },
    { label: "Purple", value: "bg-purple-900/40" },
    { label: "Cyan", value: "bg-primary/20" },
    { label: "Green", value: "bg-emerald-900/40" },
    { label: "Red", value: "bg-rose-900/40" },
  ];

  return (
    <AdminLayout title={isEditing ? "Edit Post" : "New Post"}>
      <div className="mb-6">
        <Link href="/admin/blogs" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors" data-testid="link-back-blogs">
          <ArrowLeft className="w-4 h-4" /> Back to Blog Posts
        </Link>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveMutation.mutate(form);
        }}
        className="max-w-4xl space-y-6"
      >
        <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Title *</label>
            <input
              data-testid="input-blog-title"
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full bg-[#1A2235] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-lg"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Slug</label>
            <input
              data-testid="input-blog-slug"
              type="text"
              value={form.slug}
              onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
              className="w-full bg-[#1A2235] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Excerpt *</label>
            <textarea
              data-testid="input-blog-excerpt"
              rows={3}
              value={form.excerpt}
              onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
              className="w-full bg-[#1A2235] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">
              Content * <span className="text-slate-500 normal-case">(HTML supported)</span>
            </label>
            <textarea
              data-testid="input-blog-content"
              rows={15}
              value={form.content}
              onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
              className="w-full bg-[#1A2235] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-y font-mono text-sm"
              required
            />
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/5">
          <h3 className="text-white font-display font-bold mb-4">Post Settings</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Category *</label>
              <select
                data-testid="select-blog-category"
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full bg-[#1A2235] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all appearance-none"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Author *</label>
              <input
                data-testid="input-blog-author"
                type="text"
                value={form.author}
                onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
                className="w-full bg-[#1A2235] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Read Time</label>
              <input
                data-testid="input-blog-readtime"
                type="text"
                value={form.readTime}
                onChange={(e) => setForm((prev) => ({ ...prev, readTime: e.target.value }))}
                className="w-full bg-[#1A2235] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Header Color</label>
              <select
                data-testid="select-blog-image"
                value={form.imageClass}
                onChange={(e) => setForm((prev) => ({ ...prev, imageClass: e.target.value }))}
                className="w-full bg-[#1A2235] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all appearance-none"
              >
                {imageOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                data-testid="toggle-published"
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((prev) => ({ ...prev, published: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
            <span className="text-sm text-slate-300">Publish immediately</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button
            type="submit"
            disabled={saveMutation.isPending}
            className="w-full sm:w-auto h-12 px-8 bg-primary hover:bg-primary/90 text-[#0B0F1A] font-bold rounded-xl"
            data-testid="button-save-post"
          >
            <Save className="w-4 h-4 mr-2" />
            {saveMutation.isPending ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
          </Button>

          {saveMutation.isError && (
            <p className="text-red-400 text-sm">Failed to save. Please check all required fields.</p>
          )}
        </div>
      </form>
    </AdminLayout>
  );
}
