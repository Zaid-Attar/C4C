import { Sun, Moon, Bell, Menu } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Topbar() {
  const user = useStore((state) => state.user);
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);

  return (
    <header className="h-16 bg-base-100/80 backdrop-blur-md border-b border-base-200 sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-4">
        {/* Mobile menu button (placeholder for actual drawer toggle) */}
        <button className="md:hidden btn btn-ghost btn-circle btn-sm text-base-content/70">
          <Menu size={20} />
        </button>
        <h2 className="text-lg font-semibold text-base-content hidden sm:block">Dashboard</h2>
      </div>

      <div className="flex items-center gap-3">
        <button className="btn btn-ghost btn-circle btn-sm text-base-content/70 hover:bg-base-200">
          <Bell size={18} />
        </button>
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle btn-sm text-base-content/70 hover:bg-base-200"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        
        <div className="divider divider-horizontal mx-0 h-6 opacity-30"></div>
        
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold text-base-content leading-none">{user.name}</div>
            <div className="text-xs text-base-content/50 mt-1 capitalize">{user.role}</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {user.name.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
}
