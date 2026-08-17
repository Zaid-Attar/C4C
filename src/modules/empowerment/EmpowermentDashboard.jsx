import { useStore } from '../../store/useStore';
import { Shield, Book, Briefcase, Scissors } from 'lucide-react';
import { useState } from 'react';
import Modal from '../../components/ui/Modal';

export default function EmpowermentDashboard() {
  const data = useStore((state) => state.empowermentData);
  const addRecord = useStore((state) => state.addRecord);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ program: '', location: '', participants: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.program || !formData.location) return;
    
    addRecord('empowerment', formData);
    
    setFormData({ program: '', location: '', participants: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-base-content tracking-tight">Women Empowerment & Skills</h1>
        <p className="text-base-content/60 text-sm">Vocational training, SHG management, and skill development.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[ 
          { label: 'Active SHGs', val: '45', icon: Shield, color: 'text-primary bg-primary/10 border-primary/20' },
          { label: 'Trainees', val: '850', icon: Book, color: 'text-secondary bg-secondary/10 border-secondary/20' },
          { label: 'Employed', val: '320', icon: Briefcase, color: 'text-success bg-success/10 border-success/20' },
          { label: 'Skill Centers', val: '12', icon: Scissors, color: 'text-warning bg-warning/10 border-warning/20' },
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
          <h2 className="font-semibold text-base-content">Training Programs</h2>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-sm btn-primary">New Batch</button>
        </div>
        <table className="table w-full text-sm">
          <thead className="bg-base-200/30 text-base-content/60">
            <tr>
              <th>Program</th>
              <th>Location</th>
              <th>Participants</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-base-200/40 border-b-base-200/50">
                <td className="font-medium">{row.program}</td>
                <td>{row.location}</td>
                <td>{row.participants}</td>
                <td>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${row.status === 'Completed' ? 'bg-success/20 text-success' : 'bg-info/20 text-info'}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Start New Training Batch">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label text-sm font-semibold">Program Name</label>
            <input 
              type="text" 
              className="input input-bordered w-full bg-base-200/50 focus:bg-base-100" 
              placeholder="e.g. Tailoring Batch 5"
              value={formData.program}
              onChange={(e) => setFormData({...formData, program: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="label text-sm font-semibold">Location</label>
            <input 
              type="text" 
              className="input input-bordered w-full bg-base-200/50 focus:bg-base-100" 
              placeholder="e.g. Pune Training Center"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="label text-sm font-semibold">Number of Participants</label>
            <input 
              type="number" 
              className="input input-bordered w-full bg-base-200/50 focus:bg-base-100" 
              placeholder="0"
              value={formData.participants}
              onChange={(e) => setFormData({...formData, participants: e.target.value})}
            />
          </div>
          <div className="modal-action pt-4">
            <button type="button" className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Start Batch</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
