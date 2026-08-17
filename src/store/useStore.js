import { create } from 'zustand';

// --- MOCK DATA FOR MODULES (Simulating Backend) ---

const MOCK_EDUCATION = [
  { id: 1, type: 'School Kit', school: 'Z.P. Primary', kitsDistributed: 150, date: '2026-08-10', status: 'Completed' },
  { id: 2, type: 'Digital Literacy', school: 'Slum Center A', students: 45, date: '2026-08-12', status: 'Ongoing' },
  { id: 3, type: 'Samutkarsh', school: 'Center B', students: 30, date: '2026-08-15', status: 'Planned' },
];

const MOCK_HEALTH = [
  { id: 1, campName: 'Eye Checkup Drive', location: 'Dharavi', beneficiaries: 320, date: '2026-08-01', status: 'Completed' },
  { id: 2, campName: 'Blood Donation', location: 'Pune HQ', donors: 85, date: '2026-08-08', status: 'Completed' },
  { id: 3, campName: 'Nutrition Kit Distribution', location: 'Nashik', beneficiaries: 500, date: '2026-08-20', status: 'Planned' },
];

const MOCK_EMPOWERMENT = [
  { id: 1, program: 'Tailoring Batch 4', participants: 25, location: 'Pune', status: 'Ongoing' },
  { id: 2, program: 'IT Skills for Women', participants: 40, location: 'Mumbai', status: 'Planned' },
  { id: 3, program: 'SHG Financial Literacy', participants: 15, location: 'Satara', status: 'Completed' },
];

const MOCK_VOLUNTEERS = [
  { id: 1, name: 'Amit Sharma', role: 'Teacher', hoursLogged: 45, status: 'Active' },
  { id: 2, name: 'Priya Desai', role: 'Camp Coordinator', hoursLogged: 120, status: 'Active' },
  { id: 3, name: 'Rahul Verma', role: 'Logistics', hoursLogged: 10, status: 'Inactive' },
];

// Central store
export const useStore = create((set, get) => ({
  // ----- Auth -----
  user: { name: 'Admin User', role: 'admin' }, 

  // ----- Theme -----
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

  // ----- Module Data States -----
  educationData: MOCK_EDUCATION,
  healthData: MOCK_HEALTH,
  empowermentData: MOCK_EMPOWERMENT,
  volunteerData: MOCK_VOLUNTEERS,

  loading: false,
  error: '',

  // Generic add function for demo purposes
  addRecord: (module, record) =>
    set((state) => ({
      [`${module}Data`]: [{ id: Date.now(), status: 'Pending', ...record }, ...state[`${module}Data`]],
    })),
}));
