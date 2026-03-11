import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Activity, Download, Clock, MousePointer, ArrowUpDown, Users } from "lucide-react";

interface BehaviorEvent {
  id: number;
  visitorId: string | null;
  sessionId: string | null;
  type: string;
  page: string | null;
  scrollDepth: number | null;
  timeOnPage: number | null;
  source: string | null;
  data: string | null;
  createdAt: string;
}

interface VisitorExport {
  visitorId: string;
  totalPageViews: number;
  totalTimeOnPage: number;
  maxScrollDepth: number;
  pagesVisited: string[];
  events: string[];
  sessions: number;
  firstSeen: string;
  lastSeen: string;
}

export default function AdminBehavior() {
  const [events, setEvents] = useState<BehaviorEvent[]>([]);
  const [exportData, setExportData] = useState<VisitorExport[]>([]);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"events" | "visitors">("visitors");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/admin/behavior?days=${days}`, { credentials: "include" }).then(r => r.json()),
      fetch(`/api/admin/behavior/export?days=${days}`, { credentials: "include" }).then(r => r.json()),
    ]).then(([evts, exp]) => {
      setEvents(evts);
      setExportData(exp);
    }).finally(() => setLoading(false));
  }, [days]);

  const handleExportCSV = () => {
    const headers = ["Visitor ID", "Page Views", "Time on Page (s)", "Max Scroll %", "Sessions", "Pages Visited", "Events", "First Seen", "Last Seen"];
    const rows = exportData.map(v => [
      v.visitorId,
      v.totalPageViews,
      v.totalTimeOnPage,
      v.maxScrollDepth,
      v.sessions,
      v.pagesVisited.join("; "),
      v.events.join("; "),
      new Date(v.firstSeen).toLocaleString(),
      new Date(v.lastSeen).toLocaleString(),
    ]);
    const csv = [headers.join(","), ...rows.map(r => r.map(c => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `behavior-export-${days}d-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `behavior-export-${days}d-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const eventTypeCounts = events.reduce<Record<string, number>>((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1;
    return acc;
  }, {});

  const avgScrollDepth = events.filter(e => e.scrollDepth !== null).length > 0
    ? Math.round(events.filter(e => e.scrollDepth !== null).reduce((s, e) => s + (e.scrollDepth || 0), 0) / events.filter(e => e.scrollDepth !== null).length)
    : 0;

  const avgTimeOnPage = events.filter(e => e.timeOnPage !== null).length > 0
    ? Math.round(events.filter(e => e.timeOnPage !== null).reduce((s, e) => s + (e.timeOnPage || 0), 0) / events.filter(e => e.timeOnPage !== null).length)
    : 0;

  return (
    <AdminLayout title="Behavior Tracking">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-white" data-testid="text-behavior-title">Behavior Tracking</h1>
            <p className="text-slate-400 text-sm mt-1">User behavior data for CRM lead scoring and analytics</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              data-testid="select-behavior-days"
            >
              <option value={7}>Last 7 days</option>
              <option value={14}>Last 14 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm hover:bg-primary/20 transition"
              data-testid="button-export-csv"
            >
              <Download className="w-4 h-4" />CSV
            </button>
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm hover:bg-white/10 transition"
              data-testid="button-export-json"
            >
              <Download className="w-4 h-4" />JSON
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard icon={<Users className="w-5 h-5" />} label="Unique Visitors" value={exportData.length} />
          <StatCard icon={<Activity className="w-5 h-5" />} label="Total Events" value={events.length} />
          <StatCard icon={<ArrowUpDown className="w-5 h-5" />} label="Avg. Scroll Depth" value={`${avgScrollDepth}%`} />
          <StatCard icon={<Clock className="w-5 h-5" />} label="Avg. Time on Page" value={`${avgTimeOnPage}s`} />
        </div>

        {Object.keys(eventTypeCounts).length > 0 && (
          <div className="bg-white/[0.03] rounded-xl border border-white/10 p-6">
            <h3 className="text-sm font-medium text-slate-300 mb-4">Event Breakdown</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(eventTypeCounts).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
                <div key={type} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-xs text-slate-400">{type.replace(/_/g, " ")}</span>
                  <span className="text-sm font-semibold text-primary">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 border-b border-white/10">
          <button
            onClick={() => setTab("visitors")}
            className={`px-4 py-2.5 text-sm font-medium transition border-b-2 -mb-px ${tab === "visitors" ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-white"}`}
            data-testid="tab-visitors"
          >
            Visitor Profiles ({exportData.length})
          </button>
          <button
            onClick={() => setTab("events")}
            className={`px-4 py-2.5 text-sm font-medium transition border-b-2 -mb-px ${tab === "events" ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-white"}`}
            data-testid="tab-events"
          >
            Raw Events ({events.length})
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : tab === "visitors" ? (
          <div className="bg-white/[0.03] rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-testid="table-visitor-profiles">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-slate-400 font-medium">Visitor</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Views</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Time (s)</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Scroll %</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Sessions</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Pages</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Actions</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Last Seen</th>
                  </tr>
                </thead>
                <tbody>
                  {exportData.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-500">No behavior data yet. Visitors with analytics consent will appear here.</td>
                    </tr>
                  ) : (
                    exportData.map((v, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]" data-testid={`row-visitor-${i}`}>
                        <td className="p-4 text-slate-300 font-mono text-xs">{v.visitorId.substring(0, 16)}...</td>
                        <td className="p-4 text-white font-medium">{v.totalPageViews}</td>
                        <td className="p-4 text-slate-300">{v.totalTimeOnPage}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${v.maxScrollDepth}%` }} />
                            </div>
                            <span className="text-xs text-slate-400">{v.maxScrollDepth}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-slate-300">{v.sessions}</td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {v.pagesVisited.slice(0, 3).map((p, j) => (
                              <span key={j} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400">{p}</span>
                            ))}
                            {v.pagesVisited.length > 3 && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500">+{v.pagesVisited.length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {v.events.map((e, j) => (
                              <span key={j} className={`text-[10px] px-1.5 py-0.5 rounded ${e.includes("contact") ? "bg-green-500/10 text-green-400" : e.includes("demo") ? "bg-blue-500/10 text-blue-400" : "bg-white/5 text-slate-400"}`}>{e.replace(/_/g, " ")}</span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 text-xs text-slate-400">{new Date(v.lastSeen).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white/[0.03] rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-testid="table-raw-events">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-slate-400 font-medium">Type</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Page</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Scroll</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Time</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Visitor</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {events.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500">No events recorded yet.</td>
                    </tr>
                  ) : (
                    events.map((e, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]" data-testid={`row-event-${i}`}>
                        <td className="p-4">
                          <span className={`text-xs px-2 py-1 rounded ${e.type === "contact_submission" ? "bg-green-500/10 text-green-400" : e.type === "demo_click" ? "bg-blue-500/10 text-blue-400" : "bg-white/5 text-slate-300"}`}>
                            {e.type.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td className="p-4 text-slate-300 text-xs">{e.page || "–"}</td>
                        <td className="p-4 text-slate-300">{e.scrollDepth !== null ? `${e.scrollDepth}%` : "–"}</td>
                        <td className="p-4 text-slate-300">{e.timeOnPage !== null ? `${e.timeOnPage}s` : "–"}</td>
                        <td className="p-4 text-slate-400 font-mono text-xs">{e.visitorId?.substring(0, 12) || "–"}</td>
                        <td className="p-4 text-xs text-slate-400">{new Date(e.createdAt).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="bg-white/[0.03] rounded-xl border border-white/10 p-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-primary">{icon}</div>
        <span className="text-xs text-slate-400 uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-2xl font-display font-bold text-white">{value}</p>
    </div>
  );
}
