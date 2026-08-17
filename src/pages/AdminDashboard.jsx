import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { FileText, Star, Clock, AlertTriangle } from 'lucide-react';
import { useStore } from '../store/useStore';
import EntryTable from '../components/EntryTable';

export default function AdminDashboard() {
  const entries = useStore((state) => state.entries);

  const stats = useMemo(() => {
    const total = entries.length;
    const avgRating = total ? (entries.reduce((sum, e) => sum + e.rating, 0) / total).toFixed(1) : 0;
    const pending = entries.filter((e) => e.status === 'Pending').length;
    const flagged = entries.filter((e) => e.status === 'Flagged').length;
    return { total, avgRating, pending, flagged };
  }, [entries]);

  const chartData = useMemo(() => {
    const byCategory = {};
    entries.forEach((e) => {
      byCategory[e.category] = (byCategory[e.category] || 0) + 1;
    });
    return Object.entries(byCategory).map(([category, count]) => ({ category, count }));
  }, [entries]);

  const cards = [
    { label: 'Total Entries', value: stats.total, icon: FileText, color: 'text-primary bg-primary/10 border-primary/20' },
    { label: 'Avg Rating', value: `${stats.avgRating} ★`, icon: Star, color: 'text-warning bg-warning/10 border-warning/20' },
    { label: 'Pending Review', value: stats.pending, icon: Clock, color: 'text-secondary bg-secondary/10 border-secondary/20' },
    { label: 'Flagged', value: stats.flagged, icon: AlertTriangle, color: 'text-error bg-error/10 border-error/20' },
  ];

  // Custom tooltip for Recharts to match the premium theme
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-base-100/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-base-300">
          <p className="font-semibold text-base-content text-sm">{label}</p>
          <p className="text-primary font-bold">{payload[0].value} Entries</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-base-content mb-2 tracking-tight">Dashboard Overview</h1>
        <p className="text-base-content/60 text-base">Comprehensive analytics of all collected feedback.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-base-100/90 backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-base-content/10 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border ${color} group-hover:scale-110 transition-transform`}>
              <Icon size={20} />
            </div>
            <div className="text-3xl font-bold text-base-content mb-1 tracking-tight">{value}</div>
            <div className="text-sm font-medium text-base-content/50">{label}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-base-100/90 backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-base-content/10 mb-8">
        <h2 className="text-lg font-bold text-base-content mb-6 tracking-tight">Entries by Category</h2>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-base-content/10" vertical={false} />
              <XAxis dataKey="category" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-base-content/50" axisLine={false} tickLine={false} dy={10} />
              <YAxis allowDecimals={false} tick={{ fill: 'currentColor', fontSize: 12 }} className="text-base-content/50" axisLine={false} tickLine={false} dx={-10} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
              <Bar dataKey="count" fill="var(--color-primary)" radius={[6, 6, 0, 0]} maxBarSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Full table with admin actions */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-base-content mb-4 tracking-tight px-1">Recent Feedback</h2>
        <EntryTable showActions={true} />
      </div>
    </div>
  );
}
