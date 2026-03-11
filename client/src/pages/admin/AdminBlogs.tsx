import { useQuery, useMutation } from "@tanstack/react-query";
import { getQueryFn, apiRequest, queryClient } from "@/lib/queryClient";
import AdminLayout from "./AdminLayout";
import { Link } from "wouter";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@shared/schema";

export default function AdminBlogs() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blogs"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/blogs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blogs"] });
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, published }: { id: number; published: boolean }) => {
      await apiRequest("PUT", `/api/admin/blogs/${id}`, { published });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blogs"] });
    },
  });

  return (
    <AdminLayout title="Blog Posts">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <p className="text-slate-400">Manage your blog articles and content.</p>
        <Button asChild className="bg-primary hover:bg-primary/90 text-[#0B0F1A] font-bold rounded-xl" data-testid="button-new-post">
          <Link href="/admin/blogs/new">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Title</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider hidden sm:table-cell">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider hidden lg:table-cell">Date</th>
                  <th className="text-right px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {posts?.map((post) => (
                  <tr key={post.id} className="hover:bg-white/5 transition-colors" data-testid={`row-blog-${post.id}`}>
                    <td className="px-6 py-4">
                      <p className="text-white font-medium text-sm truncate max-w-xs">{post.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5 md:hidden">{post.category}</p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-slate-300">{post.category}</span>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className={`text-xs px-2.5 py-1 rounded-full ${post.published ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm hidden lg:table-cell">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => togglePublishMutation.mutate({ id: post.id, published: !post.published })}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                          title={post.published ? "Unpublish" : "Publish"}
                          data-testid={`button-toggle-publish-${post.id}`}
                        >
                          {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <Link
                          href={`/admin/blogs/${post.id}/edit`}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                          data-testid={`link-edit-blog-${post.id}`}
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this post?")) {
                              deleteMutation.mutate(post.id);
                            }
                          }}
                          className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-slate-400 hover:text-red-400"
                          data-testid={`button-delete-blog-${post.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {(!posts || posts.length === 0) && (
            <div className="text-center py-12">
              <p className="text-slate-500">No blog posts yet. Create your first one!</p>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
