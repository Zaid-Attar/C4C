import { useStore } from '../../store/useStore';
import { BookOpen, Users, CheckCircle, Package } from 'lucide-react';
import { useState } from 'react';
import Modal from '../../components/ui/Modal';

export default function EducationDashboard() {
  const data = useStore((state) => state.educationData);
  const addRecord = useStore((state) => state.addRecord);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ type: '', school: '', date: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.type || !formData.school) return;
    
    // Add to Zustand store
    addRecord('education', formData);
    
    // Reset and close
    setFormData({ type: '', school: '', date: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-base-content tracking-tight">Education Initiatives</h1>
        <p className="text-base-content/60 text-sm">Manage School Kits, Samutkarsh, and Digital Literacy programs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[ 
          { label: 'Total Programs', val: data.length, icon: BookOpen, color: 'text-primary bg-primary/10 border-primary/20' },
          { label: 'Kits Distributed', val: '1,250', icon: Package, color: 'text-secondary bg-secondary/10 border-secondary/20' },
          { label: 'Active Students', val: '320', icon: Users, color: 'text-info bg-info/10 border-info/20' },
          { label: 'Completed', val: data.filter(d => d.status === 'Completed').length, icon: CheckCircle, color: 'text-success bg-success/10 border-success/20' },
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
          <h2 className="font-semibold text-base-content">Recent Activity</h2>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-sm btn-primary">Log New Activity</button>
        </div>
        <table className="table w-full text-sm">
          <thead className="bg-base-200/30 text-base-content/60">
            <tr>
              <th>Type</th>
              <th>School / Center</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-base-200/40 border-b-base-200/50">
                <td className="font-medium">{row.type}</td>
                <td>{row.school}</td>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log New Education Activity">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label text-sm font-semibold">Activity Type</label>
            <input 
              type="text" 
              className="input input-bordered w-full bg-base-200/50 focus:bg-base-100" 
              placeholder="e.g. School Kit Distribution"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="label text-sm font-semibold">School / Center Name</label>
            <input 
              type="text" 
              className="input input-bordered w-full bg-base-200/50 focus:bg-base-100" 
              placeholder="e.g. Z.P. Primary School"
              value={formData.school}
              onChange={(e) => setFormData({...formData, school: e.target.value})}
              required
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
          <div className="modal-action pt-4">
            <button type="button" className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Activity</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
