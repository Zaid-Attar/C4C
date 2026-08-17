import { useStore } from '../../store/useStore';
import { HeartPulse, Activity, Syringe, Users } from 'lucide-react';
import { useState } from 'react';
import Modal from '../../components/ui/Modal';

export default function HealthDashboard() {
  const data = useStore((state) => state.healthData);
  const addRecord = useStore((state) => state.addRecord);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ campName: '', location: '', beneficiaries: '', date: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.campName || !formData.location) return;
    
    addRecord('health', formData);
    
    setFormData({ campName: '', location: '', beneficiaries: '', date: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-base-content tracking-tight">Health & Nutrition</h1>
        <p className="text-base-content/60 text-sm">Manage health camps, nutrition drives, and blood donations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[ 
          { label: 'Total Camps', val: data.length, icon: HeartPulse, color: 'text-error bg-error/10 border-error/20' },
          { label: 'Beneficiaries', val: '8,420', icon: Users, color: 'text-info bg-info/10 border-info/20' },
          { label: 'Blood Units', val: '1,200', icon: Syringe, color: 'text-primary bg-primary/10 border-primary/20' },
          { label: 'Active Drives', val: data.filter(d => d.status === 'Ongoing').length, icon: Activity, color: 'text-warning bg-warning/10 border-warning/20' },
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
          <h2 className="font-semibold text-base-content">Camp Logs</h2>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-sm btn-primary">Schedule Camp</button>
        </div>
        <table className="table w-full text-sm">
          <thead className="bg-base-200/30 text-base-content/60">
            <tr>
              <th>Camp Name</th>
              <th>Location</th>
              <th>Beneficiaries</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-base-200/40 border-b-base-200/50">
                <td className="font-medium">{row.campName}</td>
                <td>{row.location}</td>
                <td>{row.beneficiaries || row.donors}</td>
                <td>{row.date}</td>
                <td>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${row.status === 'Completed' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Schedule Health Camp">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label text-sm font-semibold">Camp Name</label>
            <input 
              type="text" 
              className="input input-bordered w-full bg-base-200/50 focus:bg-base-100" 
              placeholder="e.g. Eye Checkup Drive"
              value={formData.campName}
              onChange={(e) => setFormData({...formData, campName: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="label text-sm font-semibold">Location</label>
            <input 
              type="text" 
              className="input input-bordered w-full bg-base-200/50 focus:bg-base-100" 
              placeholder="e.g. Dharavi"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label text-sm font-semibold">Expected Beneficiaries</label>
              <input 
                type="number" 
                className="input input-bordered w-full bg-base-200/50 focus:bg-base-100" 
                placeholder="0"
                value={formData.beneficiaries}
                onChange={(e) => setFormData({...formData, beneficiaries: e.target.value})}
              />
            </div>
            <div>
              <label className="label text-sm font-semibold">Date</label>
              <input 
                type="date" 
                className="input input-bordered w-full bg-base-200/50 focus:bg-base-100" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="modal-action pt-4">
            <button type="button" className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Camp</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
