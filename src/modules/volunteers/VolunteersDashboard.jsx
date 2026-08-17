import { useStore } from '../../store/useStore';
import { Users, Clock, Award, Star } from 'lucide-react';

export default function VolunteersDashboard() {
  const data = useStore((state) => state.volunteerData);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-base-content tracking-tight">Volunteer Management</h1>
        <p className="text-base-content/60 text-sm">Track active volunteers, hours logged, and assignments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[ 
          { label: 'Total Volunteers', val: '1,250', icon: Users, color: 'text-primary bg-primary/10 border-primary/20' },
          { label: 'Hours Logged', val: '4,500+', icon: Clock, color: 'text-secondary bg-secondary/10 border-secondary/20' },
          { label: 'Active this month', val: '320', icon: Star, color: 'text-warning bg-warning/10 border-warning/20' },
          { label: 'Certifications', val: '85', icon: Award, color: 'text-success bg-success/10 border-success/20' },
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

      <div className="bg-base-100/90 rounded-2xl border border-base-content/10 overflow-hidden">
        <div className="p-4 border-b border-base-200 flex justify-between items-center">
          <h2 className="font-semibold text-base-content">Top Volunteers (Leaderboard)</h2>
          <button className="btn btn-sm btn-primary">Invite Volunteers</button>
        </div>
        <table className="table w-full text-sm">
          <thead className="bg-base-200/30 text-base-content/60">
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Hours Logged</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-base-200/40 border-b-base-200/50">
                <td className="font-medium flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                    {row.name.charAt(0)}
                  </div>
                  {row.name}
                </td>
                <td>{row.role}</td>
                <td className="font-semibold text-primary">{row.hoursLogged} hrs</td>
                <td>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${row.status === 'Active' ? 'bg-success/20 text-success' : 'bg-base-300 text-base-content/60'}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
