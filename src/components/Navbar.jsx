import { Link, useLocation } from 'react-router-dom';
import { Sparkles, LayoutDashboard, ListChecks, PlusCircle, Sun, Moon } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Navbar() {
  const user = useStore((state) => state.user);
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClasses = (path) =>
    `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive(path)
        ? 'bg-base-200 text-base-content'
        : 'text-base-content/70 hover:bg-base-200/50 hover:text-base-content'
    }`;

  return (
    <div className="sticky top-4 z-50 px-4 mb-8 flex justify-center">
      <nav className="w-full max-w-5xl bg-base-100/90 backdrop-blur-xl border border-base-content/10 shadow-sm rounded-2xl">
        <div className="px-4 flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-lg hover:opacity-80 transition-opacity">
            <span className="hidden sm:inline">C4C Portal</span>
          </Link>

          <div className="flex items-center gap-1 md:gap-2">
            <Link to="/submit" className={linkClasses('/submit')}>
              <PlusCircle size={16} /> <span className="hidden sm:inline">Submit Feedback</span>
            </Link>
            <Link to="/entries" className={linkClasses('/entries')}>
              <ListChecks size={16} /> <span className="hidden sm:inline">All Entries</span>
            </Link>

            {user.role === 'admin' && (
              <Link to="/dashboard" className={linkClasses('/dashboard')}>
                <LayoutDashboard size={16} /> <span className="hidden sm:inline">Admin</span>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle btn-sm text-base-content/70 hover:text-base-content hover:bg-base-200"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="text-sm text-base-content/70 hidden md:block">
              Hi, <span className="font-semibold text-base-content">{user.name}</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
