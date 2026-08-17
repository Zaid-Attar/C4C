import { Link, useLocation } from 'react-router-dom';
import { BookOpen, HeartPulse, Shield, Leaf, Users, LayoutDashboard } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Education', path: '/education', icon: BookOpen },
    { label: 'Health', path: '/health', icon: HeartPulse },
    { label: 'Empowerment', path: '/empowerment', icon: Shield },
    { label: 'Environment', path: '/environment', icon: Leaf },
    { label: 'Volunteers', path: '/volunteers', icon: Users },
  ];

  return (
    <aside className="w-64 bg-base-100 border-r border-base-200 h-screen sticky top-0 flex flex-col hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-base-200">
        <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl hover:opacity-80 transition-opacity">
          Seva Sahayog
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-base-content/40 uppercase tracking-wider mb-4 px-2">Modules</div>
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-base-200 text-xs text-base-content/40 text-center">
        v2.0.0 Scaffold
      </div>
    </aside>
  );
}
