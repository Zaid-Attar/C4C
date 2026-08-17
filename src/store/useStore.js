import { create } from 'zustand';

// TODO: replace with real API call to teammate's endpoint
const MOCK_ENTRIES = [
  { id: 1, category: 'Health', activity: 'Free Eye Checkup Camp', rating: 5, comment: 'Very well organized, doctors were patient.', location: 'Pune', date: '2026-08-01', status: 'Pending' },
  { id: 2, category: 'Education', activity: 'Digital Literacy Workshop', rating: 4, comment: 'Good session, needed more laptops.', location: 'Nashik', date: '2026-08-03', status: 'Approved' },
  { id: 3, category: 'Livelihood', activity: 'Tailoring Skill Training', rating: 3, comment: 'Useful but too short.', location: 'Pune', date: '2026-08-05', status: 'Pending' },
  { id: 4, category: 'Environment', activity: 'Tree Plantation Drive', rating: 5, comment: 'Great community turnout!', location: 'Satara', date: '2026-08-06', status: 'Approved' },
  { id: 5, category: 'Health', activity: 'Blood Donation Camp', rating: 4, comment: 'Smooth process, friendly staff.', location: 'Pune', date: '2026-08-08', status: 'Flagged' },
];

export const useStore = create((set, get) => ({
  // ----- auth -----
  user: { name: 'Zaid', role: 'admin' }, // TODO: replace with real user from login response

  // ----- theme -----
  theme: localStorage.getItem('theme') || 'light',
  toggleTheme: () => set((state) => {
    const nextTheme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    return { theme: nextTheme };
  }),
  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
  },

  // ----- entries -----
  entries: MOCK_ENTRIES,
  loading: false,
  error: '',

  // called by the submission form after a successful POST
  addEntry: (entry) =>
    set((state) => ({
      entries: [{ id: Date.now(), status: 'Pending', ...entry }, ...state.entries],
    })),

  // called by the admin table's Approve/Flag/Delete actions
  updateEntryStatus: (id, status) =>
    set((state) => ({
      entries: state.entries.map((e) => (e.id === id ? { ...e, status } : e)),
    })),

  deleteEntry: (id) =>
    set((state) => ({ entries: state.entries.filter((e) => e.id !== id) })),

  // TODO: replace with real GET /api/entries call
  fetchEntries: async () => {
    set({ loading: true, error: '' });
    try {
      // const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/entries`);
      // set({ entries: res.data, loading: false });
      await new Promise((r) => setTimeout(r, 400)); // fake network delay
      set({ loading: false });
    } catch (err) {
      set({ error: 'Failed to load entries', loading: false });
    }
  },
}));
