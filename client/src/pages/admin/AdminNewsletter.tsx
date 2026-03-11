import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import AdminLayout from "./AdminLayout";
import { Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NewsletterSubscriber } from "@shared/schema";

export default function AdminNewsletter() {
  const { data: subscribers, isLoading } = useQuery<NewsletterSubscriber[]>({
    queryKey: ["/api/admin/newsletter"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const exportCSV = () => {
    if (!subscribers || subscribers.length === 0) return;
    const csv = "Email,Source,Date\n" + subscribers.map((s) =>
      `${s.email},${s.source},${new Date(s.createdAt).toLocaleDateString()}`
    ).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter_subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout title="Newsletter Subscribers">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <p className="text-slate-400">View email subscribers collected from your website.</p>
        {subscribers && subscribers.length > 0 && (
          <Button onClick={exportCSV} className="bg-white/10 hover:bg-white/20 text-white rounded-xl" data-testid="button-export-csv">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        )}
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
                  <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Email</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider hidden sm:table-cell">Source</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider hidden sm:table-cell">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {subscribers?.map((sub) => (
                  <tr key={sub.id} className="hover:bg-white/5 transition-colors" data-testid={`row-subscriber-${sub.id}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-white text-sm">{sub.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-slate-300">{sub.source}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm hidden sm:table-cell">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {(!subscribers || subscribers.length === 0) && (
            <div className="text-center py-12">
              <p className="text-slate-500">No subscribers yet.</p>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
