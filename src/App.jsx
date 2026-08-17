import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Auth from './pages/Auth';
import DashboardLayout from './core/DashboardLayout';
import OverviewDashboard from './modules/dashboard/OverviewDashboard';
import EducationDashboard from './modules/education/EducationDashboard';
import HealthDashboard from './modules/health/HealthDashboard';
import EmpowermentDashboard from './modules/empowerment/EmpowermentDashboard';
import EnvironmentDashboard from './modules/environment/EnvironmentDashboard';
import VolunteersDashboard from './modules/volunteers/VolunteersDashboard';
import { useStore } from './store/useStore';
import { ArrowRight } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Decorative gradient meshes */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-secondary/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none animate-blob animation-delay-2000"></div>
      
      <div className="z-10 text-center max-w-3xl px-4 animate-slide-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-100 border border-base-300 text-sm font-medium mb-8 backdrop-blur-md text-base-content/80 shadow-sm">
          <span>Seva Sahayog NGO Platform 2.0</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-base-content mb-6 drop-shadow-sm">
          Empowering Communities with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Absolute Clarity.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-base-content/70 mb-10 max-w-2xl mx-auto font-light">
          A premium, high-performance platform for managing education, health, empowerment, and environmental initiatives.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/auth"
            className="btn btn-primary rounded-full px-8 py-3 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all group"
          >
            Staff Login
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/dashboard"
            className="btn btn-ghost rounded-full px-8 py-3 text-base hover:bg-base-300 transition-all border border-base-300 shadow-sm"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Core Modules wrapped in DashboardLayout */}
        <Route path="/dashboard" element={<DashboardLayout><OverviewDashboard /></DashboardLayout>} />
        <Route path="/education" element={<DashboardLayout><EducationDashboard /></DashboardLayout>} />
        <Route path="/health" element={<DashboardLayout><HealthDashboard /></DashboardLayout>} />
        <Route path="/empowerment" element={<DashboardLayout><EmpowermentDashboard /></DashboardLayout>} />
        <Route path="/environment" element={<DashboardLayout><EnvironmentDashboard /></DashboardLayout>} />
        <Route path="/volunteers" element={<DashboardLayout><VolunteersDashboard /></DashboardLayout>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;