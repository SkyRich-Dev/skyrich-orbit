import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import AdminLayout from "./AdminLayout";
import { Globe, MapPin, Eye, Users, FileText, ExternalLink, TrendingUp, Activity } from "lucide-react";
import { useState } from "react";

interface VisitStats {
  totalVisits: number;
  uniqueVisitors: number;
  byCountry: { country: string; visits: number }[];
  byCity: { city: string; country: string; visits: number }[];
  byPage: { page: string; visits: number }[];
  byDate: { date: string; visits: number }[];
  byReferrer: { referrer: string; visits: number }[];
  recentVisits: {
    id: number;
    page: string;
    country: string | null;
    city: string | null;
    region: string | null;
    referrer: string | null;
    createdAt: string;
  }[];
}

const PAGE_LABELS: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/services": "Services",
  "/services/orbit-build": "Orbit Build",
  "/services/orbit-reach": "Orbit Reach",
  "/services/orbit-convert": "Orbit Convert",
  "/services/orbit-automate": "Orbit Automate",
  "/services/orbit-insights": "Orbit Insights",
  "/industries": "Industries",
  "/framework": "Framework",
  "/blog": "Blog",
  "/resources": "Resources",
  "/contact": "Contact",
};

const COUNTRY_FLAGS: Record<string, string> = {
  India: "\u{1F1EE}\u{1F1F3}",
  Singapore: "\u{1F1F8}\u{1F1EC}",
  Malaysia: "\u{1F1F2}\u{1F1FE}",
  Thailand: "\u{1F1F9}\u{1F1ED}",
  Philippines: "\u{1F1F5}\u{1F1ED}",
  Cambodia: "\u{1F1F0}\u{1F1ED}",
  "United States": "\u{1F1FA}\u{1F1F8}",
  "United Kingdom": "\u{1F1EC}\u{1F1E7}",
  Australia: "\u{1F1E6}\u{1F1FA}",
  Japan: "\u{1F1EF}\u{1F1F5}",
  Germany: "\u{1F1E9}\u{1F1EA}",
  France: "\u{1F1EB}\u{1F1F7}",
  Indonesia: "\u{1F1EE}\u{1F1E9}",
  Vietnam: "\u{1F1FB}\u{1F1F3}",
  China: "\u{1F1E8}\u{1F1F3}",
};

export default function AdminAnalytics() {
  const [days, setDays] = useState(30);

  const { data: stats, isLoading } = useQuery<VisitStats>({
    queryKey: ["/api/admin/analytics", days],
    queryFn: async () => {
      const res = await fetch(`/api/admin/analytics?days=${days}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load");
      return res.json();
    },
  });

  const maxCountryVisits = stats?.byCountry?.[0]?.visits || 1;
  const maxPageVisits = stats?.byPage?.[0]?.visits || 1;
  const maxDateVisits = Math.max(...(stats?.byDate?.map(d => d.visits) || [1]));

  return (
    <AdminLayout title="Visitor Analytics">
      <div className="flex items-center justify-between mb-6">
        <p className="text-slate-400 text-sm">Track where your visitors come from and which pages they visit most.</p>
        <div className="flex items-center gap-2">
          {[7, 14, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              data-testid={`button-days-${d}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                days === d
                  ? "bg-primary text-[#0B0F1A]"
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={Eye}
          label="Total Page Views"
          value={stats?.totalVisits ?? 0}
          color="text-primary"
          bg="bg-primary/10"
          loading={isLoading}
        />
        <StatCard
          icon={Users}
          label="Unique Visitors"
          value={stats?.uniqueVisitors ?? 0}
          color="text-green-400"
          bg="bg-green-400/10"
          loading={isLoading}
        />
        <StatCard
          icon={Globe}
          label="Countries"
          value={stats?.byCountry?.length ?? 0}
          color="text-blue-400"
          bg="bg-blue-400/10"
          loading={isLoading}
        />
        <StatCard
          icon={FileText}
          label="Pages Visited"
          value={stats?.byPage?.length ?? 0}
          color="text-purple-400"
          bg="bg-purple-400/10"
          loading={isLoading}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : !stats || stats.totalVisits === 0 ? (
        <div className="glass-card p-12 rounded-2xl border border-white/5 text-center">
          <Activity className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-display font-bold text-white mb-2">No Visit Data Yet</h3>
          <p className="text-slate-400 max-w-md mx-auto">
            Visitor tracking is now active. As people visit your website, their location data and page views will appear here with real numbers.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-display font-bold text-white">Visitors by Country</h3>
            </div>
            <div className="space-y-3">
              {stats.byCountry.map((item, i) => (
                <div key={item.country} data-testid={`row-country-${i}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{COUNTRY_FLAGS[item.country] || "\u{1F310}"}</span>
                      <span className="text-sm font-medium text-white">{item.country}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-white" data-testid={`text-country-visits-${i}`}>{item.visits}</span>
                      <span className="text-xs text-slate-500 w-12 text-right">
                        {((item.visits / stats.totalVisits) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-500"
                      style={{ width: `${(item.visits / maxCountryVisits) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              {stats.byCountry.length === 0 && (
                <p className="text-slate-500 text-sm text-center py-4">No country data available</p>
              )}
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-display font-bold text-white">Top Cities</h3>
            </div>
            <div className="space-y-2">
              {stats.byCity.slice(0, 12).map((item, i) => (
                <div
                  key={`${item.city}-${item.country}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/[0.07] transition-colors"
                  data-testid={`row-city-${i}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-5 text-right font-mono">{i + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-white">{item.city}</p>
                      <p className="text-xs text-slate-500">{item.country}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-green-400" data-testid={`text-city-visits-${i}`}>{item.visits}</span>
                </div>
              ))}
              {stats.byCity.length === 0 && (
                <p className="text-slate-500 text-sm text-center py-4">No city data available</p>
              )}
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-display font-bold text-white">Most Visited Pages</h3>
            </div>
            <div className="space-y-3">
              {stats.byPage.map((item, i) => (
                <div key={item.page} data-testid={`row-page-${i}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-white">
                      {PAGE_LABELS[item.page] || item.page}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-white" data-testid={`text-page-visits-${i}`}>{item.visits}</span>
                      <span className="text-xs text-slate-500 w-12 text-right">
                        {((item.visits / stats.totalVisits) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                      style={{ width: `${(item.visits / maxPageVisits) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-display font-bold text-white">Daily Traffic ({days} Days)</h3>
            </div>
            <div className="flex items-end gap-1 h-40">
              {stats.byDate.map((item, i) => (
                <div
                  key={item.date}
                  className="flex-1 group relative"
                  data-testid={`bar-date-${i}`}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#1a1f2e] rounded-lg text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-white/10">
                    {item.date}: {item.visits} visits
                  </div>
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-purple-600 to-purple-400 hover:from-purple-500 hover:to-purple-300 transition-all cursor-pointer min-h-[4px]"
                    style={{ height: `${Math.max((item.visits / maxDateVisits) * 100, 3)}%` }}
                  ></div>
                </div>
              ))}
              {stats.byDate.length === 0 && (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-slate-500 text-sm">No daily data</p>
                </div>
              )}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-slate-600">
              <span>{stats.byDate[0]?.date || ""}</span>
              <span>{stats.byDate[stats.byDate.length - 1]?.date || ""}</span>
            </div>
          </div>

          {stats.byReferrer.length > 0 && (
            <div className="glass-card p-6 rounded-2xl border border-white/5">
              <div className="flex items-center gap-2 mb-6">
                <ExternalLink className="w-5 h-5 text-orange-400" />
                <h3 className="text-lg font-display font-bold text-white">Top Referrers</h3>
              </div>
              <div className="space-y-2">
                {stats.byReferrer.map((item, i) => (
                  <div
                    key={item.referrer}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5"
                    data-testid={`row-referrer-${i}`}
                  >
                    <span className="text-sm text-slate-300 truncate max-w-[250px]">{item.referrer}</span>
                    <span className="text-sm font-bold text-orange-400">{item.visits}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="glass-card p-6 rounded-2xl border border-white/5 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-slate-400" />
              <h3 className="text-lg font-display font-bold text-white">Recent Visits</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-testid="table-recent-visits">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Page</th>
                    <th className="text-left py-3 px-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Country</th>
                    <th className="text-left py-3 px-3 text-xs font-medium text-slate-500 uppercase tracking-wider">City</th>
                    <th className="text-left py-3 px-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentVisits.slice(0, 20).map((visit) => (
                    <tr key={visit.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                      <td className="py-2.5 px-3 text-white font-medium">
                        {PAGE_LABELS[visit.page] || visit.page}
                      </td>
                      <td className="py-2.5 px-3 text-slate-300">
                        {visit.country ? (
                          <span className="flex items-center gap-1.5">
                            <span>{COUNTRY_FLAGS[visit.country] || "\u{1F310}"}</span>
                            {visit.country}
                          </span>
                        ) : (
                          <span className="text-slate-600">Unknown</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">
                        {visit.city || <span className="text-slate-600">-</span>}
                        {visit.region && visit.city && <span className="text-slate-600">, {visit.region}</span>}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">
                        {new Date(visit.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  bg,
  loading,
}: {
  icon: any;
  label: string;
  value: number;
  color: string;
  bg: string;
  loading: boolean;
}) {
  return (
    <div className="glass-card p-5 rounded-2xl border border-white/5">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>
      {loading ? (
        <div className="h-8 w-16 bg-white/5 rounded animate-pulse"></div>
      ) : (
        <p className="text-3xl font-display font-bold text-white" data-testid={`text-stat-${label.toLowerCase().replace(/\s/g, "-")}`}>
          {value.toLocaleString()}
        </p>
      )}
      <p className="text-sm text-slate-400 mt-1">{label}</p>
    </div>
  );
}
