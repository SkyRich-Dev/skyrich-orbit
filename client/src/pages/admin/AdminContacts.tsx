import { useQuery, useMutation } from "@tanstack/react-query";
import { getQueryFn, apiRequest, queryClient } from "@/lib/queryClient";
import AdminLayout from "./AdminLayout";
import { Trash2, Mail, Building2, Globe, Target, DollarSign } from "lucide-react";
import type { ContactSubmission } from "@shared/schema";

export default function AdminContacts() {
  const { data: contacts, isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/contacts"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/contacts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contacts"] });
    },
  });

  return (
    <AdminLayout title="Contact Submissions">
      <p className="text-slate-400 mb-6">View and manage contact form submissions from your website.</p>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts?.map((contact) => (
            <div key={contact.id} className="glass-card p-6 rounded-2xl border border-white/5" data-testid={`card-contact-${contact.id}`}>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <h3 className="text-white font-bold text-lg">{contact.fullName}</h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 w-fit">
                      {contact.source}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Mail className="w-4 h-4 text-primary shrink-0" />
                      <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors truncate">{contact.email}</a>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="truncate">{contact.company}</span>
                    </div>
                    {contact.jobTitle && (
                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="truncate">{contact.jobTitle}</span>
                      </div>
                    )}
                    {contact.country && (
                      <div className="flex items-center gap-2 text-slate-400">
                        <Globe className="w-4 h-4 text-green-400 shrink-0" />
                        <span>{contact.country}</span>
                      </div>
                    )}
                    {contact.businessGoal && (
                      <div className="flex items-center gap-2 text-slate-400">
                        <Target className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span>{contact.businessGoal}</span>
                      </div>
                    )}
                    {contact.budget && (
                      <div className="flex items-center gap-2 text-slate-400">
                        <DollarSign className="w-4 h-4 text-yellow-400 shrink-0" />
                        <span>{contact.budget}</span>
                      </div>
                    )}
                  </div>

                  {contact.challenges && (
                    <div className="mt-2 p-3 rounded-xl bg-white/5 text-slate-300 text-sm">
                      {contact.challenges}
                    </div>
                  )}

                  {contact.websiteUrl && (
                    <a href={contact.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline">
                      {contact.websiteUrl}
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-slate-500">
                    {new Date(contact.createdAt).toLocaleDateString()} {new Date(contact.createdAt).toLocaleTimeString()}
                  </span>
                  <button
                    onClick={() => {
                      if (confirm("Delete this submission?")) {
                        deleteMutation.mutate(contact.id);
                      }
                    }}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
                    data-testid={`button-delete-contact-${contact.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {(!contacts || contacts.length === 0) && (
            <div className="glass-card p-12 rounded-2xl border border-white/5 text-center">
              <p className="text-slate-500">No contact submissions yet. They'll appear here when visitors fill out the contact form.</p>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
