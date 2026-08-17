import { useState, useMemo } from 'react';
import { Search, CheckCircle, Flag, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';

const CATEGORIES = ['All', 'Health', 'Education', 'Livelihood', 'Environment'];
const PAGE_SIZE = 5;

const statusColors = {
  Approved: 'bg-success/20 text-success border-success/30',
  Pending: 'bg-warning/20 text-warning border-warning/30',
  Flagged: 'bg-error/20 text-error border-error/30',
};

export default function EntryTable({ showActions = false }) {
  const entries = useStore((state) => state.entries);
  const updateEntryStatus = useStore((state) => state.updateEntryStatus);
  const deleteEntry = useStore((state) => state.deleteEntry);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      const matchesCategory = category === 'All' || e.category === category;
      const matchesSearch =
        e.activity.toLowerCase().includes(search.toLowerCase()) ||
        e.comment.toLowerCase().includes(search.toLowerCase()) ||
        e.location.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [entries, search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-base-100/90 backdrop-blur-xl rounded-3xl shadow-sm border border-base-content/10 overflow-hidden">
      {/* Search + filter bar */}
      <div className="flex flex-wrap gap-4 items-center p-5 border-b border-base-200">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" size={18} />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by activity, comment, or location..."
            className="input input-bordered w-full pl-11 bg-base-200/50 focus:bg-base-100 text-sm rounded-xl h-11"
          />
        </div>
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          className="select select-bordered bg-base-100 focus:bg-base-100 text-sm rounded-xl h-11"
        >
          {CATEGORIES.map((c) => <option key={c} className="bg-base-100 text-base-content">{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full text-sm">
          <thead className="bg-base-200/30 text-base-content/60 text-xs uppercase tracking-wider border-b border-base-200">
            <tr>
              <th className="font-semibold py-4 px-6">Activity</th>
              <th className="font-semibold py-4">Category</th>
              <th className="font-semibold py-4">Rating</th>
              <th className="font-semibold py-4">Location</th>
              <th className="font-semibold py-4">Date</th>
              <th className="font-semibold py-4">Status</th>
              {showActions && <th className="font-semibold py-4">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-base-200/50">
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={showActions ? 7 : 6} className="text-center text-base-content/40 py-12">
                  No entries match your search.
                </td>
              </tr>
            )}
            {pageItems.map((entry) => (
              <tr key={entry.id} className="hover:bg-base-200/40 transition-colors border-none group">
                <td className="font-medium text-base-content px-6 py-4">{entry.activity}</td>
                <td className="text-base-content/70 py-4">{entry.category}</td>
                <td className="text-warning py-4">{'★'.repeat(entry.rating)}<span className="text-base-300">{'★'.repeat(5-entry.rating)}</span></td>
                <td className="text-base-content/70 py-4">{entry.location}</td>
                <td className="text-base-content/70 py-4">{entry.date}</td>
                <td className="py-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${statusColors[entry.status] || 'bg-base-200 text-base-content'}`}>
                    {entry.status}
                  </span>
                </td>
                {showActions && (
                  <td className="py-4">
                    <div className="flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => updateEntryStatus(entry.id, 'Approved')} title="Approve" className="p-1.5 rounded-lg text-success hover:bg-success/10 transition-colors">
                        <CheckCircle size={18} />
                      </button>
                      <button onClick={() => updateEntryStatus(entry.id, 'Flagged')} title="Flag" className="p-1.5 rounded-lg text-warning hover:bg-warning/10 transition-colors">
                        <Flag size={18} />
                      </button>
                      <button onClick={() => deleteEntry(entry.id)} title="Delete" className="p-1.5 rounded-lg text-error hover:bg-error/10 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center p-4 px-6 text-sm text-base-content/50 border-t border-base-200 bg-base-200/20">
        <span>Page <strong className="text-base-content/80">{page}</strong> of <strong className="text-base-content/80">{totalPages}</strong> — {filtered.length} entries</span>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="btn btn-sm btn-ghost hover:bg-base-200 disabled:opacity-30 rounded-lg"
          >
            Prev
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="btn btn-sm btn-ghost hover:bg-base-200 disabled:opacity-30 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
