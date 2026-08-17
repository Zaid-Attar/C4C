import { Leaf, Trees, Recycle, Droplet } from 'lucide-react';

export default function EnvironmentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-base-content tracking-tight">Environment & Sustainability</h1>
        <p className="text-base-content/60 text-sm">Urban forestation, tree plantations, and waste management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[ 
          { label: 'Trees Planted', val: '15,400', icon: Trees, color: 'text-success bg-success/10 border-success/20' },
          { label: 'Green Drives', val: '42', icon: Leaf, color: 'text-primary bg-primary/10 border-primary/20' },
          { label: 'Waste Recycled', val: '5.2T', icon: Recycle, color: 'text-warning bg-warning/10 border-warning/20' },
          { label: 'Water Saved', val: '1.2M L', icon: Droplet, color: 'text-info bg-info/10 border-info/20' },
        ].map((stat, i) => (
          <div key={i} className="bg-base-100/90 p-5 rounded-2xl border border-base-content/10 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-base-content leading-none">{stat.val}</div>
              <div className="text-xs font-medium text-base-content/50 mt-1">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-base-100/90 p-12 rounded-2xl border border-base-content/10 text-center flex flex-col items-center justify-center">
        <Trees size={48} className="text-base-content/20 mb-4" />
        <h3 className="text-lg font-semibold text-base-content">No active drives this week</h3>
        <p className="text-base-content/60 max-w-sm mt-2">Plan a new urban forestation drive or check back later for updates from the field.</p>
        <button className="btn btn-primary mt-6">Plan a Drive</button>
      </div>
    </div>
  );
}
