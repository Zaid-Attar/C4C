import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-base-200 text-base-content transition-colors duration-300">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Subtle background glow */}
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-base-300/50 to-transparent pointer-events-none -z-10"></div>
        
        <Topbar />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fade-in z-0">
          {children}
        </main>
      </div>
    </div>
  );
}
