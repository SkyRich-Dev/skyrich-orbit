import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Lock, Check } from "lucide-react";

export default function AdminSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await apiRequest("POST", "/api/admin/change-password", { currentPassword, newPassword });
      setMessage("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Current password is incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Settings">
      <div className="max-w-lg">
        <div className="glass-card p-6 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-white font-display font-bold">Change Password</h3>
              <p className="text-slate-400 text-sm">Update your admin console password</p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            {message && (
              <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm" data-testid="text-password-success">
                <Check className="w-4 h-4" />
                {message}
              </div>
            )}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm" data-testid="text-password-error">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Current Password</label>
              <input
                data-testid="input-current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-[#1A2235] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">New Password</label>
              <input
                data-testid="input-new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-[#1A2235] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">Confirm New Password</label>
              <input
                data-testid="input-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#1A2235] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-[#0B0F1A] font-bold rounded-xl"
              data-testid="button-change-password"
            >
              {loading ? "Changing..." : "Change Password"}
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
